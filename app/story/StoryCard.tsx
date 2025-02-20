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

const StoryCard = ({ story }: { story: Stories }) => {
  console.log(story);
  const date = new Date(story.created_at);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <pre>{JSON.stringify(story, null, 2)}</pre>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>
            {/* Story Title */}
            <Link href={`/story/${story.id}`}>{story.title}</Link> by{" "}
            {/* Author Username */}
            <Link href={`/author/${story.Author?.id}`}>
              {story?.Author.username}
            </Link>
          </CardTitle>
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
