"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type Authors } from "@/app/types";

type RecommendModalProps = {
  storyId: string;
  authors: Authors[];
  onRecommend: (authorId: string, comment: string) => Promise<void>;
};

export function RecommendModal({
  storyId,
  authors,
  onRecommend,
}: RecommendModalProps) {
  const [open, setOpen] = useState(false);
  const [authorId, setAuthorId] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    await onRecommend(authorId, comment);
    setOpen(false);
    setComment("");
    setAuthorId("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Recommend</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recommend Story</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Recommend as:</label>
            <Select value={authorId} onValueChange={setAuthorId}>
              <SelectTrigger>
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
          </div>
          <div>
            <label className="text-sm font-medium">Comment (optional):</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like about this story?"
              className="h-32"
            />
          </div>
          <Button onClick={handleSubmit} disabled={!authorId}>
            Submit Recommendation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
