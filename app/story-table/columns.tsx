"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Story = {
  id: string;
  storyTitle: string;
  pairing: string;
  words: number;
};

export const columns: ColumnDef<Story>[] = [
  {
    accessorKey: "storyTitle",
    header: "Story Title",
  },
  {
    accessorKey: "pairing",
    header: "Pairing",
  },
  {
    accessorKey: "words",
    header: "Word Count",
  },
];
