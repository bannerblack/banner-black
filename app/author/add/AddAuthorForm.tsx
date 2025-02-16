"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addAuthor } from "./actions";
import { useActionState } from "react";

type AddAuthorFormProps = {
  user: {
    id: string;
    avatarUrl?: string;
  };
};

export function AddAuthorForm({ user }: AddAuthorFormProps) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(addAuthor, initialState);

  return (
    <form action={dispatch} className="space-y-4">
      <input type="hidden" name="userId" value={user.id} />
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="Your author name"
          aria-describedby="username-error"
        />
        {state?.errors?.username && (
          <div id="username-error" className="text-sm text-red-500">
            {state.errors.username}
          </div>
        )}
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
