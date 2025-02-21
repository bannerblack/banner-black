import React from "react";
import { createClient } from "@/utils/supabase/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  getChapterById,
  getAuthorsByUserId,
  getBookmarksByChapterId,
} from "@/app/queries";
import Link from "next/link";
import { BookmarkModal } from "@/app/components/modals/BookmarkModal";
import { getBasicUser } from "@/app/queries";
import { revalidatePath } from "next/cache";

const ChapterPage = async ({
  params,
}: {
  params: { id: string; chapterId: string };
}) => {
  const { id, chapterId } = await params;
  const { chapter, prevChapter, nextChapter } = await getChapterById(chapterId);
  const user = await getBasicUser();
  const authors = await getAuthorsByUserId(user.id);
  const bookmarks = await getBookmarksByChapterId(chapterId);

  async function bookmark(authorId: string, note: string, bookmarkId?: string) {
    "use server";
    const supabase = await createClient();

    if (bookmarkId) {
      const { error } = await supabase
        .from("bookmarks")
        .update({
          note,
          updated_at: new Date().toISOString(),
        })
        .eq("id", bookmarkId);

      if (error) {
        console.error("Error updating bookmark:", error);
        throw new Error("Failed to update bookmark");
      }
    } else {
      const { data, error } = await supabase.from("bookmarks").insert({
        Chapter: chapterId,
        Author: authorId,
        note,
        user_id: user.id,
      });

      console.log("bookmarks", data);

      if (error) {
        console.error("Error creating bookmark:", error);
        throw new Error("Failed to create bookmark");
      }
    }

    revalidatePath(`/story/${id}/chapter/${chapterId}`);
    revalidatePath("/reading");
  }

  if (!chapter) return <div>Chapter not found</div>;

  const createdAt = new Date(chapter.created_at);
  const formattedCreatedAt = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="flex justify-between mb-4">
        {prevChapter && (
          <Link href={`/story/${id}/chapter/${prevChapter.id}`}>
            ← {prevChapter.title}
          </Link>
        )}
        {nextChapter && (
          <Link href={`/story/${id}/chapter/${nextChapter.id}`}>
            {nextChapter.title} →
          </Link>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{chapter?.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <p>{chapter?.content}</p>
        </CardContent>
        <CardFooter className="py-4">
          <p>{chapter?.chapter_index}</p>
          <p>{chapter?.word_count}</p>
          <p>{formattedCreatedAt}</p>
          <p>
            <div className="flex items-center gap-2">
              <p>Word Count:</p>
              <p>{chapter?.word_count}</p>
            </div>
          </p>
          <BookmarkModal
            chapterId={chapterId}
            storyId={id}
            authors={authors || []}
            existingBookmarks={bookmarks || []}
            onBookmark={bookmark}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChapterPage;
