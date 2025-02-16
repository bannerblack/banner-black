import React from "react";
import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Chapter = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Chapters")
    .select("*")
    .eq("id", params.id)
    .single();
  if (error) {
    console.error(error);
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{data?.title}</CardTitle>
        </CardHeader>
      </Card>
    </>
  );
};

export default Chapter;
