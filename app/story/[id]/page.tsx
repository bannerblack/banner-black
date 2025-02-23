import React from "react";
import {
  getBasicUser,
  getStoryById,
  getAuthorsByUserId,
  getRecommendationsByStoryId,
} from "../../queries";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { RecommendModal } from "@/app/components/modals/RecommendModal";
import { BookmarkModal } from "@/app/components/modals/BookmarkModal";
import { formatDate } from "@/app/(root)/actions";
type StoryProps = {
  params: {
    id: string;
  };
};

const Story = async ({ params }: StoryProps) => {
  const { id } = await params;
  const user = await getBasicUser();
  const story = await getStoryById(id);
  const authors = await getAuthorsByUserId(user.id);
  const firstChapter = story?.Chapters?.[0];
  const recommendations = await getRecommendationsByStoryId(id);

  if (!story) {
    return <div>Story not found</div>;
  }

  console.log(story);

  async function recommend(
    authorId: string,
    comment: string,
    recommendationId?: string
  ) {
    "use server";
    const supabase = await createClient();

    if (recommendationId) {
      // Update existing recommendation
      const { error } = await supabase
        .from("reccommendations")
        .update({
          comment,
          updated_at: new Date().toISOString(),
        })
        .eq("id", recommendationId);

      if (error) console.error(error);
    } else {
      // Create new recommendation
      const { error } = await supabase.from("reccommendations").insert({
        user_id: user.id,
        Story: id,
        Author: authorId,
        comment,
      });

      if (error) console.error(error);
    }
  }

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

      if (error) console.error(error);
    } else {
      const { error } = await supabase.from("bookmarks").insert({
        Chapter: firstChapter?.id,
        Author: authorId,
        note,
        user_id: user.id,
      });

      if (error) console.error(error);
    }
  }

  return (
    <>
      <Card>
        {/* <pre>{JSON.stringify(story, null, 2)}</pre> */}
        <CardHeader>
          <CardTitle className="text-2xl">
            {story.title} by{" "}
            <Link href={`/author/${story.Author?.id}`}>
              {story.Author?.username}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardDescription className="border-t border-b px-6 py-3 flex flex-row gap-2">
          <p>Chapters: {story.chapter_count}</p>
          <p>Words: {story.total_words}</p>
          <p>Views: {story.views}</p>
          <p>Likes: {story.likes}</p>
        </CardDescription>
        <CardDescription className="border-b px-6 py-3 mb-4 flex flex-row gap-2">
          <p>Comments: {story.comments}</p>
          <p>Bookmarks: {story.bookmarks}</p>
          {/* Created at and updated at */}
          <p>Created: {formatDate(story.created_at)}</p>
          <p>Updated: {formatDate(story.updated_at)}</p>
        </CardDescription>
        <CardContent>
          <p>{story.summary}</p>
        </CardContent>
      </Card>

      <CardFooter className="p-2 border rounded-md mt-4 flex justify-center gap-4">
        <RecommendModal
          storyId={id}
          authors={authors || []}
          existingRecommendations={recommendations || []}
          onRecommend={recommend}
        />

        <BookmarkModal
          storyId={id}
          chapterId={firstChapter?.id || ""}
          authors={authors || []}
          existingBookmarks={[]}
          onBookmark={bookmark}
        />
      </CardFooter>
      {/* Recommend Modal */}

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Chapters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-4">
          {/* Chapter Info */}
          {story.Chapters && (
            <div className="flex flex-col gap-4">
              {story.Chapters.map((chapter) => (
                <div className="flex flex-row gap-4">
                  <div className="side border rounded-lg p-4">
                    CH{chapter.chapter_index}
                  </div>
                  <div className="mt-1 chapter-info flex flex-col gap-1">
                    <div className="main font-bold">
                      <Link href={`/story/${story.id}/chapter/${chapter.id}`}>
                        {chapter.title}
                      </Link>
                    </div>
                    <div>
                      {chapter.word_count} words |{" "}
                      <Link href={`/story/${story.id}/chapter/${chapter.id}`}>
                        Bookmark
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Story;
