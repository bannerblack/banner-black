"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function formatDate(date: string) {
  // Incoming format: 2025-02-22T19:31:42.956207+00:00
  // Outgoing format: 2/22/2025
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("en-US", options);
}
