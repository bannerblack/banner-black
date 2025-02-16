"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addAuthor } from "./actions";
import { useActionState } from "react";
import { type FormState } from "@/app/types";

type AddAuthorFormProps = {
  user: {
    id: string;
    avatarUrl?: string;
  };
};

export function AddAuthorForm({ user }: AddAuthorFormProps) {
  const initialState: FormState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(addAuthor, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      <input type="hidden" name="userId" value={user.id} />

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="Your author name"
          aria-describedby={
            state?.errors?.username ? "username-error" : undefined
          }
          aria-invalid={!!state?.errors?.username}
        />
        {state?.errors?.username && (
          <div id="username-error" className="text-sm text-destructive">
            {state.errors.username}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="about">About (Optional)</Label>
        <Textarea
          id="about"
          name="about"
          placeholder="Tell us about yourself..."
          className="h-32 resize-none"
          maxLength={1000}
          aria-describedby={state?.errors?.about ? "about-error" : undefined}
          aria-invalid={!!state?.errors?.about}
        />
        {state?.errors?.about && (
          <div id="about-error" className="text-sm text-destructive">
            {state.errors.about}
          </div>
        )}
        <div className="text-sm text-muted-foreground">
          Maximum 1000 characters
        </div>
      </div>

      {state?.message && (
        <div className="text-sm font-medium text-destructive">
          {state.message}
        </div>
      )}
      <Button type="submit">Create Author</Button>
    </form>
  );
}
