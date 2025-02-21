import React from "react";
import { createClient } from "@/utils/supabase/server";
import { getAuthorsByUserId } from "@/app/queries";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CreateMenu } from "./CreateMenu";
import StoryCard from "@/app/story/StoryCard";
import BookmarkCard from "./BookmarkCard";

const Reading = async ({ user }: { user: any }) => {
  const supabase = await createClient();

  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select(
      `
      *,
      Chapter (
        id,
        title,
        chapter_index,  
        Story (
          id,
          title,
          Author (
            id,
            username
          )
        )
      )
    `
    )
    .eq("user_id", user?.id);

  if (error) {
    console.error("Error fetching bookmarks:", error);
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Hello, {user?.email}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Bookmarks */}
          <h1>Bookmarks</h1>
          {bookmarks?.map((bookmark) => (
            <div key={bookmark.id}>
              <BookmarkCard
                key={bookmark.id}
                story={bookmark.Chapter.Story}
                chapter={bookmark.Chapter}
                note={bookmark.note}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default Reading;
