import React from "react";
import { createClient } from "@/utils/supabase/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { getChapterById } from "@/app/queries";
import Link from "next/link";

const ChapterPage = async ({
  params,
}: {
  params: { id: string; chapterId: string };
}) => {
  const { id, chapterId } = await params;
  const { chapter, prevChapter, nextChapter } = await getChapterById(chapterId);

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
          <Link href={`/story/${params.id}/chapter/${prevChapter.id}`}>
            ← {prevChapter.title}
          </Link>
        )}
        {nextChapter && (
          <Link href={`/story/${params.id}/chapter/${nextChapter.id}`}>
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChapterPage;
