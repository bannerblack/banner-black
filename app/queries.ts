"use server";
import { createClient } from "@/utils/supabase/server";
import { type Authors, type Stories, type Profiles } from "@/app/types";

// Database Tables

// Authors:
// id uuid
// user uuid
// username text
// Profile uuid

// Profiles:
// cre
// about text
// createdby uuid

// Stories:
// id int8
// created_at timestamptz
// Author uuid
// title text
// summary text
// user_id uuid
// chapter_count int8
// views int8
// total_words int8

// Chapters:
// created_at timestamptz
// Story int8
// title text
// content text
// user_id uuid
// chapterIndex int8
// word_count int8

// Users:
// id uuid

export async function getBasicUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Auth error:", error);
    throw error;
  }

  if (!data.user) {
    console.error("No user found");
    throw new Error("No user found");
  }

  return {
    id: data.user.id,
    avatarUrl: data.user.user_metadata?.avatar_url,
  };
}

// Query: get story by id authenticated
export async function getStoryById(id: string): Promise<Stories | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Stories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching story:", error);
    return null;
  }

  return data;
}

// Query: get authors for a user
export async function getAuthorsByUserId(userId: string) {
  const supabase = await createClient();

  const { data: authors, error } = await supabase
    .from("Authors")
    .select("*")
    .eq("user", userId);

  if (error) {
    console.error("Error fetching authors:", error);
    return null;
  }

  return authors;
}

// Query: get stories by user id and return stories and authors
export async function getStoriesByUserId(
  userId: string
): Promise<Stories[] | null> {
  const supabase = await createClient();

  const { data: stories, error } = await supabase
    .from("Stories")
    .select(
      `
      *,
      Authors (
        id,
        username
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching stories:", error);
    return null;
  }

  return stories;
}

// Query: get author by id and return author and stories
export async function getAuthor(id: string): Promise<Authors | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Profiles")
    .select(
      `
      *,
      Authors(*, Stories(*))
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching author:", error);
    return null;
  }

  return data;
}
