"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { chapterFormSchema, type FormState } from "@/app/types";
import { Chapters } from "@/app/types";
import { after } from "node:test";

export async function addChapter(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const result = chapterFormSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
      Story: formData.get("story_id"),
      user_id: formData.get("user_id"),
      chapter_index: Number(formData.get("chapter_index")),
      word_count: 0,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return {
        message: null,
        errors: Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [
            key,
            value?.[0] || "",
          ])
        ),
      };
    }

    const { title, content, Story, user_id, chapter_index } = result.data;
    const word_count = content.split(/\s+/).length;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("Chapters")
      .insert({
        title,
        content,
        Story,
        user_id,
        chapter_index,
        word_count,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Increment story chapter count
    const { data: storyData, error: storyError } = await supabase
      .from("Stories")
      .update({ chapter_count: chapter_index })
      .eq("id", Story)
      .select()
      .single();

    // get word counts of all chapters in story
    const { data: chapterData, error: chapterError } = await supabase
      .from("Chapters")
      .select("word_count")
      .eq("Story", Story);

    if (chapterData == null) {
      const total_word_count = word_count;
    } else {
      const total_word_count = chapterData.reduce(
        (acc, chapter) => acc + chapter.word_count,
          0
        );

        const { data: storyData2, error: storyError2 } = await supabase
          .from("Stories")
          .update({ total_words: total_word_count })
          .eq("id", Story)
          .select()
          .single();

      if (storyError2) {  
        throw storyError2;
      }
    }

    revalidatePath("/");
    redirect(`/story/${Story}`);
  } catch (error) {
    // If it's a redirect, we want to let it happen
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Error in addChapter:", error);
    return {
      message: "Something went wrong. Please try again.",
      errors: {},
    };
  }
}
