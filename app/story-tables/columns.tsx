"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Story = {
  id: string;
  storyTitle: string;
  author: string;
  createdAt: string;
};

export const columns: ColumnDef<Story>[] = [
  {
    accessorKey: "title",
    header: "Story Title",
  },
  {
    accessorKey: "Author.username",
    header: "Author",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
];
