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
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>
            <Link href={`/story/${story.id}`}>{story.title}</Link> by{" "}
            <Link href={`/profile/${story.Authors?.username}`}>
              {story.Authors?.username}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardDescription className="px-6 mb-2">
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
