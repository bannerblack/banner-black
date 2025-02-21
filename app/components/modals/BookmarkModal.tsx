"use client";

import { useState, useEffect } from "react";
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
import { BookmarkIcon } from "lucide-react";

type Bookmark = {
  id: string;
  Author: string;
  note: string | null;
};

type BookmarkModalProps = {
  chapterId: string;
  storyId: string;
  authors?: Authors[];
  existingBookmarks?: Bookmark[];
  onBookmark: (
    authorId: string,
    note: string,
    bookmarkId?: string
  ) => Promise<void>;
};

export function BookmarkModal({
  chapterId,
  storyId,
  authors = [],
  existingBookmarks = [],
  onBookmark,
}: BookmarkModalProps) {
  const [open, setOpen] = useState(false);
  const [authorId, setAuthorId] = useState("");
  const [note, setNote] = useState("");
  const [existingBookmark, setExistingBookmark] = useState<Bookmark | null>(
    null
  );

  useEffect(() => {
    if (authorId) {
      const existing = existingBookmarks.find((b) => b.Author === authorId);
      setExistingBookmark(existing || null);
      setNote(existing?.note || "");
    } else {
      setExistingBookmark(null);
      setNote("");
    }
  }, [authorId, existingBookmarks]);

  const handleSubmit = async () => {
    await onBookmark(authorId, note, existingBookmark?.id);
    setOpen(false);
    setNote("");
    setAuthorId("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <BookmarkIcon className="w-4 h-4 mr-2" />
          Bookmark
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {existingBookmark ? "Edit Bookmark" : "Add Bookmark"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Bookmark as:</label>
            <Select value={authorId} onValueChange={setAuthorId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an author" />
              </SelectTrigger>
              <SelectContent>
                {authors.length > 0 ? (
                  authors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.username}
                      {existingBookmarks.some((b) => b.Author === author.id) &&
                        " (Existing)"}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-authors">No authors found</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Note (optional):</label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note to your bookmark..."
              className="h-32"
            />
          </div>
          <Button onClick={handleSubmit} disabled={!authorId}>
            {existingBookmark ? "Update" : "Add"} Bookmark
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
