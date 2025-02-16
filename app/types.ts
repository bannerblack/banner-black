import { z } from "zod";

// Zod Schemas
export const authorFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  about: z
    .string()
    .max(1000, {
      message: "About must be less than 1000 characters",
    })
    .optional(),
});

export const storyFormSchema = z.object({
  Author: z.string({
    required_error: "Please select an author",
  }),
  user_id: z.string(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  summary: z.string().min(10, {
    message: "Summary must be at least 10 characters.",
  }),
});

export const chapterFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  Story: z.coerce.number(),
  user_id: z.string(),
  chapter_index: z.number(),
  word_count: z.number(),
});

// Database Types
export type Authors = {
  id: string;
  created_at: string;
  user: string;
  username: string;
};

export type Profiles = {
  id: string;
  created_at: string;
  about: string | null;
  user_id: string;
  Authors?: Authors[];
};

export type Stories = {
  id: number;
  created_at: string;
  Author?: Authors;
  title: string;
  summary: string;
  user_id: string;
  chapter_count: number;
  views: number;
  total_words: number;
};

// create table public."Chapters" (
//   id uuid not null default gen_random_uuid (),
//   created_at timestamp with time zone not null default now(),
//   "Story" bigint not null,
//   title text not null default ''::text,
//   content text not null default ''::text,
//   user_id uuid not null default auth.uid (),
//   chapter_index bigint not null default '1'::bigint,
//   word_count bigint null,
//   constraint Chapters_pkey primary key (id),
//   constraint Chapters_Story_fkey foreign KEY ("Story") references "Stories" (id) on delete CASCADE
// ) TABLESPACE pg_default;

export type Chapters = {
  id: string;
  created_at: string;
  Story: number;
  title: string;
  content: string;
  user_id: string;
  chapter_index: number;
  word_count: number;
};

// Form State Types
export type FormState = {
  message: string | null;
  errors: {
    [key: string]: string;
  };
};

// API Response Types
export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

// Utility Types
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
