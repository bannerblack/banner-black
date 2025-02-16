import React from "react";
import { getBasicUser, getStoriesByUserId } from "@/app/queries";
import { redirect } from "next/navigation";
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
    console.log("No user found");
    //redirect to login
    redirect("/login");
  }
  const stories = await getStoriesByUserId(user.id);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Choose Story to Add Chapter</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-1">
          {stories === null ? (
            <div>No stories found</div>
          ) : (
            stories.map((story) => (
              <Link className="w-200" href={`/chapter/add/${story.id}`}>
                <Card className="mb-2 w-full p-5" key={story.id}>
                  <CardTitle className="text-lg font-bold">
                    {story.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    <h2 className="text-lg font-bold mt-2">Summary:</h2>
                    <p className="text-sm">{story.summary}</p>
                  </CardDescription>
                </Card>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChooseStorytoAddChapter;
