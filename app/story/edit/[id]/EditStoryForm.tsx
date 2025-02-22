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
import { updateStory } from "./actions";
import { useRouter } from "next/navigation";
import { type Stories, type Authors } from "@/app/types";
import { useState } from "react";

type EditStoryFormProps = {
  story: Stories;
  authors: Authors[];
  userId: string;
};

export function EditStoryForm({ story, authors, userId }: EditStoryFormProps) {
  const router = useRouter();

  // Find the matching author from available authors
  const currentAuthor = authors.find(
    (author) => author.id === story.Author?.id
  );

  const [title, setTitle] = useState(story.title);
  const [summary, setSummary] = useState(story.summary);
  const [selectedAuthorId, setSelectedAuthorId] = useState(
    story.Author?.id || ""
  );

  // Get the current author's username for display
  const selectedAuthorName = authors.find(
    (author) => author.id === selectedAuthorId
  )?.username;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateStory(story.id, {
      title,
      summary,
      Author: selectedAuthorId,
      user_id: userId,
    });
    router.push(`/story/${story.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="author_id">Author</Label>
        <Select
          defaultValue={selectedAuthorId}
          value={selectedAuthorId}
          onValueChange={setSelectedAuthorId}
        >
          <SelectTrigger>
            <SelectValue>
              {selectedAuthorName || "Select an author"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {authors.map((author) => (
              <SelectItem key={author.id} value={author.id}>
                {author.username}
                {author.id === story.Author?.id && " (Current)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="h-32"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit">Save Changes</Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
