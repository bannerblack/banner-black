import React from "react";
import { getProfileData } from "@/app/queries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Metadata } from "next";
import StoryCard from "@/app/story/StoryCard";
export default async function AuthorPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const profile = await getProfileData(id);
  console.log("profile", profile);

  return (
    <div>
      {profile && (
        <div className="mb-4">
          <pre className="overflow-auto p-4rounded-lg">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-ellipsis text-3xl font-bold mb-5">
            {profile?.username}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="border rounded-md p-4">
            Info: {profile.Profiles[0].about}
          </p>

          {/* Stories */}
          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-2  mt-10">
              {" "}
              {profile?.Stories?.length} Stories
            </h3>
            {profile?.Stories?.map((story: any) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {/* Recommendations */}
          <div className="mt-4">
            <h3 className="font-semibold text-lg mb-2  mt-10">
              {profile?.reccommendations?.length} Reccomendations
            </h3>
            {profile?.reccommendations?.map((story: any) => (
              <StoryCard key={story.id} story={story.Stories} />
            ))}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
