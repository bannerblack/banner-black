import { AddAuthorForm } from "./AddAuthorForm";
import { getBasicUser } from "@/app/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default async function AddAuthor() {
  const user = await getBasicUser();
  console.log(user);

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">Add Author</h1>
        </CardHeader>
        <CardDescription className="text-sm px-6">
          <p>
            To start adding stories, you first need to create an author to
            publish them under. You can publish all of your stories under the
            same author name, or you can create multiple authors, it's up to
            you. Note: Usernames are unique and can be changed later.
          </p>
        </CardDescription>
        <CardContent>
          <AddAuthorForm user={user} />
        </CardContent>
      </Card>
    </>
  );
}
