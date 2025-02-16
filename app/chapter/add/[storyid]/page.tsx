import { AddChapterForm } from "./AddChapterForm";
import { getBasicUser, getStoryById } from "@/app/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

type PageProps = {
  params: { storyid: string };
};

export default async function AddChapter({ params }: PageProps) {
  const user = await getBasicUser();
  const story = await getStoryById(params.storyid);

  if (!story) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">Add Chapter</h1>
        </CardHeader>
        <CardContent>
          <p>Story not found or you don't have permission to add chapters.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">Add Chapter</h1>
        <p className="text-muted-foreground">Story: {story.title}</p>
      </CardHeader>
      <CardDescription className="text-sm px-6">
        <p>
          Add a new chapter to your story. The chapter will be automatically
          numbered based on the existing chapters.
        </p>
      </CardDescription>
      <CardContent>
        <AddChapterForm story={story} userId={user.id} />
      </CardContent>
    </Card>
  );
}
