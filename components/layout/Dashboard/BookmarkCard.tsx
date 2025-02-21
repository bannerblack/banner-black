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
};

export default function BookmarkCard({
  story,
  chapter,
  note,
}: BookmarkCardProps) {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          <Link href={`/story/${story.id}/chapter/${chapter.id}`}>
            {story.title} - Chapter {chapter.chapter_index + 1}: {chapter.title}{" "}
            By {story.Author?.username}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {note || "No note added"}
        </p>
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
