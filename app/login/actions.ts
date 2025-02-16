"use server";

import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signInWithGithub() {
  "use server";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }

  redirect("/login");
}
