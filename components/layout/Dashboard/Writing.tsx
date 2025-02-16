import React from "react";
import { createClient } from "@/utils/supabase/server";
import { getBasicUser } from "@/app/queries";
const Writing = async () => {
  const user = await getBasicUser();
  // Get the user's stories
  const supabase = await createClient();
  const { data: stories, error } = await supabase
    .from("Stories")
    .select("*")
    .eq("id", user.id);

  if (error) {
    console.error(error);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Writing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories?.map((story) => (
          <div key={story.id}>{story.title}</div>
        ))}
      </div>
    </div>
  );
};

export default Writing;
