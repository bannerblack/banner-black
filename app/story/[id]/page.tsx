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
} from "@/components/ui/card";
import { BookmarkIcon, PencilIcon, BookOpenIcon, BookIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RecommendModal } from "@/app/components/modals/RecommendModal";

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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{story.title}</CardTitle>
        </CardHeader>
        <CardDescription className="px-6 mb-2">
          <p>
            <Link href={`/profile/${story.Authors?.username}`}>
              by {story.Authors?.username}
            </Link>
          </p>
          <p>
            <BookIcon className="inline-block w-4 h-4 mr-1" />
            {story.chapter_count} chapters
          </p>
        </CardDescription>
        <CardContent>
          <p>{story.summary}</p>
        </CardContent>
      </Card>

      <RecommendModal
        storyId={id}
        authors={authors || []}
        existingRecommendations={recommendations || []}
        onRecommend={recommend}
      />

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
                    CH{chapter.chapter_index + 1}
                  </div>
                  <div className="mt-1 chapter-info flex flex-col gap-1">
                    <div className="main font-bold">
                      <Link href={`/story/${story.id}/chapter/${chapter.id}`}>
                        {chapter.title}
                      </Link>
                    </div>
                    <div>
                      <BookOpenIcon className="inline-block w-4 h-4 mr-1" />
                      {chapter.word_count} words |{" "}
                      <Link href={`/story/${story.id}/chapter/${chapter.id}`}>
                        <BookmarkIcon className="inline-block w-4 h-4 mr-1" />
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
