import React from "react";
import { CreateMenu } from "./CreateMenu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
const Creating = () => {
  return (
    <>
      <div className="create-menu-container my-1">
        <CreateMenu />
        <Card className="mt-2">
          <CardHeader>
            <CardTitle>Create a new story</CardTitle>
          </CardHeader>
          <CardContent>
            <Input type="text" placeholder="Title" />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Creating;
