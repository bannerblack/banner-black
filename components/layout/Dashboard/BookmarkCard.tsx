import { type Stories, type Chapters } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CheckIcon, PencilIcon, TrashIcon } from "lucide-react";

type BookmarkCardProps = {
  story: Stories;
  chapter: Chapters;
  note: string | null;
  author: Stories["Author"];
};

export default function BookmarkCard({
  story,
  chapter,
  note,
  author,
}: BookmarkCardProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          <div className="flex">
            <Link href={`/story/${story.id}`}>{story.title}</Link>
            <Link
              className="ml-3"
              href={`/story/${story.id}/chapter/${chapter.id}`}
            >
              Chapter {chapter.chapter_index + 1}: {chapter.title}
            </Link>
            {author && (
              <Link className="ml-3" href={`/author/${author.id}`}>
                by {author.username}
              </Link>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {story.summary && (
          <p className="text-sm text-muted-foreground">
            {story.summary.slice(0, 100)}...
          </p>
        )}
        {note && (
          <p className="text-sm text-muted-foreground">
            {note || "No note added"}
          </p>
        )}
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/story/${story.id}/chapter/${chapter.id}`}>
            <CheckIcon className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="sm">
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <TrashIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
