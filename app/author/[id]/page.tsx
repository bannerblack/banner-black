import React from "react";
import { getAuthor } from "@/app/queries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const Author = async ({ params }: { params: { id: string } }) => {
  const info = await params;
  const author = await getAuthor(info.id);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{author.Authors.username}</CardTitle>
          <CardDescription>{author.about}</CardDescription>
          <CardContent>
            <div className="mt-4 flex flex-col gap-4">
              {author.Authors.Stories.map((story) => (
                <Card key={story.id} className="w-1/2">
                  <CardHeader>
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription>{story.summary}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </>
  );
};

export default Author;
