"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { storyFormSchema, type FormState } from "@/app/types";

export async function addStory(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = storyFormSchema.safeParse({
    Author: formData.get("author_id"),
    user_id: formData.get("user_id"),
    title: formData.get("title"),
    summary: formData.get("summary"),
  });

  if (!result.success) {
    return {
      message: null,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { Author, user_id, title, summary } = result.data;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Stories")
    .insert({
      user_id,
      Author,
      title,
      summary,
      chapter_count: 0,
      views: 0,
      total_words: 0,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating story:", error);
    return {
      message: "Something went wrong. Please try again.",
      errors: {},
    };
  }

  revalidatePath("/");
  redirect(`/story/${data.id}`);
}
