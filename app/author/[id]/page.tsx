import React from "react";
import { getAuthor } from "@/app/queries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Metadata } from "next";

export default async function AuthorPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const profile = await getAuthor(id);
  console.log(profile);
  return (
    <>
      {profile?.Authors?.[0] && (
        <Card>
          <CardHeader>
            <CardTitle>{profile.Authors[0].username}</CardTitle>
            <CardDescription>{profile.about}</CardDescription>
            <CardContent>
              <div className="mt-4 flex flex-col gap-4">
                {profile.Authors[0].Stories?.map((story) => (
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
      )}
    </>
  );
}
