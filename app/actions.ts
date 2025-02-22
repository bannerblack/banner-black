"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteStory(id: number) {
  const supabase = await createClient();
  
  // Get all chapters for this story
  const { data: chapters } = await supabase
    .from("Chapters")
    .select("id")
    .eq("Story", id);

  if (chapters?.length) {
    // Delete bookmarks for all chapters of this story
    const { error: bookmarkError } = await supabase
      .from("bookmarks")
      .delete()
      .in("Chapter", chapters.map(c => c.id));

    if (bookmarkError) {
      console.error("Error deleting bookmarks:", bookmarkError);
      throw new Error("Failed to delete bookmarks");
    }
  }

  // Delete recommendations
  const { error: recError } = await supabase
    .from("reccommendations")
    .delete()
    .eq("Story", id);

  if (recError) {
    console.error("Error deleting recommendations:", recError);
    throw new Error("Failed to delete recommendations");
  }

  // Finally delete the story (which will cascade delete chapters)
  const { error: storyError } = await supabase
    .from("Stories")
    .delete()
    .eq("id", id);

  if (storyError) {
    console.error("Error deleting story:", storyError);
    throw new Error("Failed to delete story");
  }

  revalidatePath("/");
} 