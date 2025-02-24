"use server";
import { createClient } from "@/utils/supabase/server";
import {
  type Authors,
  type Stories,
  type Profiles,
  Chapters,
  type UserPreferences,
} from "@/app/types";


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
    .select(
      `
      *,
      Authors (
        id,
        username
      ),
      Chapters (
        id,
        title,
        chapter_index,
        word_count,
        created_at
      )
    `
    )
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

// get authors and stories and recommendations for profile page
export async function getProfileData(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Authors")
    .select("*, Profiles(*), Stories(*, Author(id, username)), reccommendations(*, Stories(id, title, Author(username, id)))")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }

  return data;
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
      Author (
        id,
        username
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching stories:", error);
    return null;
  }

  return stories;
}

// Query: get author by id and return author and stories
export async function getAuthor(id: string): Promise<Profiles | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Profiles")
    .select(
      `
      *,
      Authors (
        id,
        username,
        Stories (*)
      )
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

// Query: get chapter by id and return chapter with navigation
export async function getChapterById(id: string): Promise<{
  chapter: Chapters | null;
  prevChapter: Pick<Chapters, "id" | "title"> | null;
  nextChapter: Pick<Chapters, "id" | "title"> | null;
}> {
  const supabase = await createClient();

  // Get current chapter
  const { data: chapter, error } = await supabase
    .from("Chapters")
    .select("*, Story")
    .eq("id", id)
    .single();

  if (error || !chapter) {
    console.error("Error fetching chapter:", error);
    return { chapter: null, prevChapter: null, nextChapter: null };
  }

  // Get prev and next chapters
  const { data: siblings } = await supabase
    .from("Chapters")
    .select("id, title, chapter_index")
    .eq("Story", chapter.Story)
    .order("chapter_index");

  // Ensure siblings is an array
  const siblingsArray = siblings || [];

  const currentIndex = siblingsArray.findIndex((c) => c.id === id);
  const prevChapter = currentIndex > 0 ? siblingsArray[currentIndex - 1] : null;
  const nextChapter = currentIndex < siblingsArray.length - 1 ? siblingsArray[currentIndex + 1] : null;

  return {
    chapter,
    prevChapter,
    nextChapter,
  };
}

// create table public.bookmarks (
//   id uuid not null default gen_random_uuid (),
//   created_at timestamp with time zone not null default now(),
//   "Author" uuid null,
//   "Chapter" uuid null,
//   note text null,
//   constraint bookmarks_pkey primary key (id),
//   constraint bookmarks_Author_fkey foreign KEY ("Author") references "Authors" (id),
//   constraint bookmarks_Chapter_fkey foreign KEY ("Chapter") references "Chapters" (id)
// ) TABLESPACE pg_default;

export async function getBookmarksByUserId(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("Author", userId);

  if (error) {
    console.error("Error fetching bookmarks:", error);
    return null;
  }

  return data;
}

// create table public.comments (
//   id uuid not null default gen_random_uuid (),
//   created_at timestamp with time zone not null default now(),
//   "Author" uuid null,
//   "Chapter" uuid null,
//   hidden boolean null default false,
//   constraint comments_pkey primary key (id),
//   constraint comments_Author_fkey foreign KEY ("Author") references "Authors" (id),
//   constraint comments_Chapter_fkey foreign KEY ("Chapter") references "Chapters" (id)
// ) TABLESPACE pg_default;

//get comments by chapter id
export async function getCommentsByChapterId(chapterId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Comments")
    .select("*")
    .eq("Chapter", chapterId);

  if (error) {
    console.error("Error fetching comments:", error);
    return null;
  }

  return data;
}

// create table public.reccommendations (
//   id uuid not null default gen_random_uuid (),
//   created_at timestamp with time zone not null default now(),
//   "Author" uuid null,
//   "Story" bigint null,
//   comment text null,
//   constraint reccommendations_pkey primary key (id),
//   constraint reccommendations_Author_fkey foreign KEY ("Author") references "Authors" (id),
//   constraint reccommendations_Story_fkey foreign KEY ("Story") references "Stories" (id)
// ) TABLESPACE pg_default;

//get reccommendations by author id
export async function getReccommendationsByAuthorId(authorId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Reccommendations")
    .select("*")
    .eq("Author", authorId);

  if (error) {
    console.error("Error fetching reccommendations:", error);
    return null;
  }

  return data;
}

export async function getRecommendationsByStoryId(storyId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reccommendations")
    .select("*")
    .eq("Story", storyId);

  if (error) {
    console.error("Error fetching recommendations:", error);
    return null;
  }

  return data;
}

export async function getBookmarksByChapterId(chapterId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`
      *,
      Author (
        id,
        username
      ),
      Chapter (
        id,
        title,
        chapter_index
      )
    `)
    .eq("Chapter", chapterId);

  if (error) {
    console.error("Error fetching bookmarks:", error);
    return null;
  }

  return data;
}

export async function getPreferences(): Promise<UserPreferences | null> {
  const supabase = await createClient();
  const user = await getBasicUser();

  const { data, error } = await supabase
    .from("user_preferences")
    .select("preferences")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching preferences:", error);
    return null;
  }

  return data.preferences;
}
