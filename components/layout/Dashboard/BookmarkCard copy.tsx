import { type Stories, type Chapters } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, PencilIcon, TrashIcon } from "lucide-react";
import { PreferenceWrapper } from "@/app/components/PreferenceWrapper";

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
    <Card className="mt-4 p-0 padded">
      <CardDescription>
        <Table className="border-border border-b">
          <TableHeader>
            <TableRow>
              <TableHead className="w-3/12  border-border border-r p-4">
                STORY
              </TableHead>
              <TableHead className="w-1/12  text-center p-4 border-border border-r">
                NO.
              </TableHead>
              <TableHead className="p-4  border-border border-r">
                CHAPTER
              </TableHead>
              <TableHead className="p-4  border-border border-r">
                AUTHOR
              </TableHead>
              <TableHead className="p-4 ">NOTE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium border-border border-r p-4">
                <Link href={`/story/${story.id}`}>{story.title}</Link>
              </TableCell>

              <TableCell className="text-center  p-4">
                {chapter.chapter_index}
              </TableCell>
              <TableCell className="p-4">{chapter.title}</TableCell>
              <TableCell className="p-4">{author?.username}</TableCell>
              <TableCell className="p-4">
                {note && (
                  <p className="text-sm text-muted-foreground ">
                    {note || "No note added"}
                  </p>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Summary Table */}
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-3/12 p-4 border-r border-border ">
                Summary
              </TableHead>
              <TableHead className="p-4 ">
                {story.summary && (
                  <p className="text-sm text-muted-foreground ">
                    {story.summary.slice(0, 300)}...
                  </p>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </CardDescription>
      <CardFooter className="gap-2 mt-5">
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
