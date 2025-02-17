import React from "react";
import { createClient } from "@/utils/supabase/server";
import { getBasicUser, getStoriesByUserId } from "@/app/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StoryCard from "@/app/story/StoryCard";

const Writing = async () => {
  const user = await getBasicUser();
  const stories = await getStoriesByUserId(user.id);

  return (
    <div>
      <div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Stories</CardTitle>
          </CardHeader>
          <CardContent>
            {stories && stories.length > 0 ? (
              stories.map((story) => (
                <div key={story.id}>
                  <StoryCard story={story} />
                </div>
              ))
            ) : (
              <div>No stories found</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Writing;
