"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type UpdateStoryData = {
  title: string;
  summary: string;
  Author: string;
  user_id: string;
};

export async function updateStory(id: number, data: UpdateStoryData) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("Stories")
    .update(data)
    .eq("id", id);

  if (error) {
    console.error("Error updating story:", error);
    throw new Error("Failed to update story");
  }

  revalidatePath(`/story/${id}`);
} 