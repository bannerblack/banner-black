import React from "react";
import { createClient } from "@/utils/supabase/server";
import { getAuthorsByUserId } from "@/app/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CreateMenu } from "./CreateMenu";
const Reading = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authors = await getAuthorsByUserId(user?.id);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Hello, {user?.email}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {authors?.map((author) => (
              <li key={author.id}>{author.name}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default Reading;
