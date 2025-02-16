import React from "react";
import { getBasicUser } from "../../queries";

import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StoryProps = {
  params: {
    id: string;
  };
};

const Story = async ({ params }: StoryProps) => {
  const { id } = await params;
  const user = await getBasicUser();
  const supabase = await createClient();
  const { data: stories, error } = await supabase
    .from("Stories")
    .select("*")
    .eq("user_id", user.id)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching stories:", error);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{stories.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{stories.summary}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default Story;
