import { AddAuthorForm } from "./AddAuthorForm";
import { getBasicUser } from "@/app/queries";

export default async function AddAuthor() {
  const user = await getBasicUser();
  console.log(user);

  return (
    <>
      <h1>Add Author</h1>
      <AddAuthorForm user={user} />
    </>
  );
}
