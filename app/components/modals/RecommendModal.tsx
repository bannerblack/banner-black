"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShareNetwork } from "@phosphor-icons/react";
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
import { StarIcon } from "lucide-react";
type Recommendation = {
  id: string;
  Author: string;
  comment: string | null;
};

type RecommendModalProps = {
  storyId: string;
  authors: Authors[];
  existingRecommendations: Recommendation[];
  onRecommend: (
    authorId: string,
    comment: string,
    recommendationId?: string
  ) => Promise<void>;
};

export function RecommendModal({
  storyId,
  authors,
  existingRecommendations,
  onRecommend,
}: RecommendModalProps) {
  const [open, setOpen] = useState(false);
  const [authorId, setAuthorId] = useState("");
  const [comment, setComment] = useState("");
  const [existingRecommendation, setExistingRecommendation] =
    useState<Recommendation | null>(null);

  useEffect(() => {
    if (authorId) {
      const existing = existingRecommendations.find(
        (r) => r.Author === authorId
      );
      setExistingRecommendation(existing || null);
      setComment(existing?.comment || "");
    } else {
      setExistingRecommendation(null);
      setComment("");
    }
  }, [authorId, existingRecommendations]);

  const handleSubmit = async () => {
    await onRecommend(authorId, comment, existingRecommendation?.id);
    setOpen(false);
    setComment("");
    setAuthorId("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <ShareNetwork size={20} weight="bold" />
          Recommend
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {existingRecommendation ? "Edit Recommendation" : "Recommend Story"}
          </DialogTitle>
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
                    {existingRecommendations.some(
                      (r) => r.Author === author.id
                    ) && " (Existing)"}
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
            {existingRecommendation ? "Update" : "Submit"} Recommendation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
