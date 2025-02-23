import { ModeToggle } from "@/components/ModeToggle";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "../login/actions";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import { getAuthorsByUserId } from "../queries";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Reading from "@/components/layout/Dashboard/Reading";
import Writing from "@/components/layout/Dashboard/Writing";
import Creating from "@/components/layout/Dashboard/Creating";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div>
      <div className="container flex flex-col border rounded-lg items-center justify-center gap-4">
        <Tabs defaultValue="reading" className="w-full p-4">
          <TabsList className="">
            <TabsTrigger value="reading">Reading</TabsTrigger>
            <TabsTrigger value="writing">Writing</TabsTrigger>
            <TabsTrigger value="creating">Creating</TabsTrigger>
          </TabsList>
          <TabsContent value="reading" className="w-full border rounded-lg">
            <Reading user={user} />
          </TabsContent>
          <TabsContent value="writing">
            <Writing />
          </TabsContent>
          <TabsContent value="creating">
            <Creating />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
