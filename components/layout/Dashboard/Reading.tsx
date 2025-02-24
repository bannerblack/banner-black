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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { columns } from "@/app/story-table/columns";
import { DataTable } from "@/app/story-table/data-table";
import type { Story } from "@/app/story-table/columns";
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
          summary,
          created_at,
          Author (
            id,
            username
          )
        )
      )
    `
    )
    .eq("user_id", user?.id);

  const stories = bookmarks?.map((bookmark) => ({
    id: bookmark.Chapter.Story.id,
    storyTitle: bookmark.Chapter.Story.title,
    author: bookmark.Chapter.Story.Author.username,
    createdAt: bookmark.Chapter.Story.created_at,
  }));

  if (error) {
    console.error("Error fetching bookmarks:", error);
  }
  return (
    <>
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="w-full py-10 px-5 bg-background flex justify-between">
          <h1 className="text-2xl w-1/2 font-bold border-border border-b pb-4 text-foreground">
            Bookmarks
          </h1>
          <div className="flex gap-2">
            <TabsTrigger value="list" className="border border-border">
              List
            </TabsTrigger>
            <TabsTrigger value="table" className="border border-border">
              Table
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="list" className="px-5">
          <div className="flex flex-col gap-4">
            {bookmarks?.map((bookmark) => (
              <div key={bookmark.id}>
                <BookmarkCard
                  key={bookmark.id}
                  story={bookmark.Chapter.Story}
                  chapter={bookmark.Chapter}
                  note={bookmark.note}
                  author={bookmark.Chapter.Story.Author}
                />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="table" className="p-5">
          <DataTable<Story, any> columns={columns} data={stories || []} />
        </TabsContent>
        <TabsContent value="create" className="p-5"></TabsContent>
      </Tabs>
    </>
  );
};

export default Reading;
