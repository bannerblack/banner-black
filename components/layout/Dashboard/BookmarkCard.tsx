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
import { Empty } from "@phosphor-icons/react";
import { PreferenceWrapper } from "@/app/components/PreferenceWrapper";
import { EmptyIcon, BookOpenTextIcon, NoteIcon } from "./Icons";
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
              <TableHead className="w-1/12  border-border border-r p-4">
                Story
              </TableHead>
              <TableHead className="w-3/12 text-foreground  border-border border-r p-4">
                {story.title}
              </TableHead>
              <TableHead className="w-1/12 text-center p-4 border-border border-r">
                CH.
              </TableHead>
              <TableHead className="w-1/12 text-foreground text-center p-4 border-border border-r">
                No. {chapter.chapter_index}
              </TableHead>
              <TableHead className="w-3/12 text-foreground text-center p-4  border-border border-r">
                {chapter.title}
              </TableHead>
              <TableHead className="w-1/12 text-center p-4  border-border border-r">
                Author
              </TableHead>
              <TableHead className="w-1 2/12 text-foreground text-center p-4">
                {author?.username}
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        {/* Summary Table */}
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {/* Summary Icon */}
              <TableHead className="w-1/12 p-4 text-center border-r border-border ">
                <BookOpenTextIcon className="mx-auto" size={25} />
              </TableHead>
              <TableHead className="w-11/12 text-foreground p-4 border-border border-r">
                {story.summary && (
                  <p className="text-sm text-foreground ">
                    {story.summary.slice(0, 300)}...
                  </p>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              {/* Actions */}
              <TableHead className="p-4 w-6/12 flex gap-2">
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
              </TableHead>

              <TableHead className="w-1/12 p-4 text-center border-r border-border border-l">
                <NoteIcon className="mx-auto" size={25} />
              </TableHead>
              {/* Note */}
              <TableHead className="w-5/12 text-foreground p-4 border-border">
                {note || <EmptyIcon className="w-4 h-4" />}
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </CardDescription>

      {/* Footer
      <CardFooter className="gap-2 mt-5">
        <div className="actions">
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
        </div>

        <TableHead className="w-1/12 text-center font-small text-sm border-border border-r p-3">
          <NoteIcon className="mx-auto" size={25} />
        </TableHead>
        <TableHead className="text-foreground w-3/12 p-4">
          {note || <EmptyIcon className="w-4 h-4" />}
        </TableHead>
      </CardFooter> */}
    </Card>
  );
}
