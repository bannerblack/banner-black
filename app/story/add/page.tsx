import { AddStoryForm } from "./AddStoryForm";
import { getBasicUser, getAuthorsByUserId } from "@/app/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default async function AddStory() {
  const user = await getBasicUser();
  const authors = await getAuthorsByUserId(user.id);

  if (!authors || authors.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">Add Story</h1>
        </CardHeader>
        <CardContent>
          <p>You need to create an author before you can add stories.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">Add Story</h1>
      </CardHeader>
      <CardDescription className="text-sm px-6">
        <p>
          Create a new story. You can add chapters to it after creation. The
          summary should give readers a good idea of what your story is about.
        </p>
      </CardDescription>
      <CardContent>
        <AddStoryForm authors={authors} userId={user.id} />
      </CardContent>
    </Card>
  );
}
