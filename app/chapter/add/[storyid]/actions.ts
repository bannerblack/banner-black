"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { chapterFormSchema, type FormState } from "@/app/types";

export async function addChapter(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = chapterFormSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    story_id: formData.get("story_id"),
    user_id: formData.get("user_id"),
    chapter_index: Number(formData.get("chapter_index")),
  });

  if (!result.success) {
    return {
      message: null,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { title, content, story_id, user_id, chapter_index } = result.data;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Chapters")
    .insert({
      title,
      content,
      story_id,
      user_id,
      chapter_index,
      word_count: content.split(/\s+/).length,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating chapter:", error);
    return {
      message: "Something went wrong. Please try again.",
      errors: {},
    };
  }

  // Update story chapter count
  await supabase.rpc("increment_chapter_count", {
    p_story_id: story_id,
  });

  revalidatePath("/");
  redirect(`/story/${story_id}`);
}
