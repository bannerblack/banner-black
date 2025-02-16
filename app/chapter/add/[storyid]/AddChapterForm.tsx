"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addChapter } from "./actions";
import { useActionState } from "react";
import { type FormState } from "@/app/types";
import { type Stories } from "@/app/types";

type AddChapterFormProps = {
  story: Stories;
  userId: string;
};

export function AddChapterForm({ story, userId }: AddChapterFormProps) {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(addChapter, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      <input type="hidden" name="user_id" value={userId} />
      <input type="hidden" name="story_id" value={story.id.toString()} />
      <input
        type="hidden"
        name="chapter_index"
        value={story.chapter_count.toString()}
      />

      <div className="space-y-2">
        <Label htmlFor="title">Chapter Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Chapter title"
          aria-describedby={state?.errors?.title ? "title-error" : undefined}
          aria-invalid={!!state?.errors?.title}
        />
        {state?.errors?.title && (
          <div id="title-error" className="text-sm text-destructive">
            {state.errors.title}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your chapter content here..."
          className="h-96 resize-none"
          aria-describedby={
            state?.errors?.content ? "content-error" : undefined
          }
          aria-invalid={!!state?.errors?.content}
        />
        {state?.errors?.content && (
          <div id="content-error" className="text-sm text-destructive">
            {state.errors.content}
          </div>
        )}
      </div>

      {state?.message && (
        <div className="text-sm font-medium text-destructive">
          {state.message}
        </div>
      )}
      <Button type="submit">Add Chapter</Button>
    </form>
  );
}
