"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addStory } from "./actions";
import { useActionState } from "react";
import { type FormState } from "@/app/types";
import { type Authors } from "@/app/types";

type AddStoryFormProps = {
  authors: Authors[];
  userId: string;
};

export function AddStoryForm({ authors, userId }: AddStoryFormProps) {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(addStory, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      <input type="hidden" name="user_id" value={userId} />

      <div className="space-y-2">
        <Label htmlFor="author_id">Author</Label>
        <Select name="author_id" defaultValue="">
          <SelectTrigger
            id="author_id"
            aria-describedby={
              state?.errors?.Author ? "author-error" : undefined
            }
            aria-invalid={!!state?.errors?.Author}
          >
            <SelectValue placeholder="Select an author" />
          </SelectTrigger>
          <SelectContent>
            {authors.map((author) => (
              <SelectItem key={author.id} value={author.id}>
                {author.username}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state?.errors?.Author && (
          <div id="author-error" className="text-sm text-destructive">
            {state.errors.Author}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Story title"
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
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          placeholder="Write a brief summary of your story..."
          className="h-32 resize-none"
          aria-describedby={
            state?.errors?.summary ? "summary-error" : undefined
          }
          aria-invalid={!!state?.errors?.summary}
        />
        {state?.errors?.summary && (
          <div id="summary-error" className="text-sm text-destructive">
            {state.errors.summary}
          </div>
        )}
      </div>

      {state?.message && (
        <div className="text-sm font-medium text-destructive">
          {state.message}
        </div>
      )}
      <Button type="submit">Create Story</Button>
    </form>
  );
}
