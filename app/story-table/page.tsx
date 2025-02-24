import { Story, columns } from "./columns";
import { DataTable } from "./data-table";
import { getStoriesByUserId, getBasicUser } from "../queries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
async function getData(): Promise<Story[]> {
  const user = await getBasicUser();
  const stories = await getStoriesByUserId(user.id);
  return stories || [];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      {data.length === 0 && (
        <div className="container mx-auto py-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">No stories found</CardTitle>
              <CardDescription className="text-md">
                Sorry, no stories found. You can add an Author, then add a Story
                and chapters, then they will appear here.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}
      {data.length > 0 && (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
}
