import React from "react";
import { getBasicUser, getStoriesByUserId } from "@/app/queries";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
const ChooseStorytoAddChapter = async () => {
  const user = await getBasicUser();
  if (!user) {
    return <div>You must be logged in to add a chapter</div>;
  }
  const stories = await getStoriesByUserId(user.id);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Choose Story to Add Chapter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-1">
          {stories.map((story) => (
            <div key={story.id}>
              <Card className="mb-2 w-full p-5">
                <CardTitle className="text-lg font-bold">
                  <Link href={`/chapter/add/${story.id}`}>{story.title}</Link>
                </CardTitle>
                <CardDescription className="text-sm">
                  {story.summary}
                </CardDescription>
              </Card>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChooseStorytoAddChapter;
