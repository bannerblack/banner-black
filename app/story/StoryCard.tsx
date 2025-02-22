"use client";

import React from "react";
import Link from "next/link";
import { Stories } from "../types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { deleteStory } from "@/app/actions";

const StoryCard = ({ story }: { story: Stories }) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteStory(story.id);
    router.refresh();
  };

  console.log(story);
  const date = new Date(story.created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <Card className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              <Link href={`/story/${story.id}`}>{story.title}</Link>
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/story/edit/${story.id}`}>
                  <PencilIcon className="h-4 w-4" />
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Story</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{story.title}"? This will
                      permanently delete the story and all its chapters. This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardDescription className="px-6 mb-2">
          {/* Created Date */}
          Created: {formattedDate} | Views: {story.views} | Chapters:{" "}
          {story.chapter_count} | Total Words: {story.total_words}
        </CardDescription>
        <CardContent>
          <p>{story.summary}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryCard;
