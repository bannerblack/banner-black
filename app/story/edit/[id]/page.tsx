import { getBasicUser, getStoryById, getAuthorsByUserId } from "@/app/queries";
import { EditStoryForm } from "./EditStoryForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function EditStory({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const user = await getBasicUser();
  const story = await getStoryById(id);
  const authors = await getAuthorsByUserId(user.id);

  if (!story) {
    return <div>Story not found</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Story</CardTitle>
        <CardDescription>
          Update your story details. The changes will be reflected everywhere
          the story appears.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EditStoryForm story={story} authors={authors || []} userId={user.id} />
      </CardContent>
    </Card>
  );
}
