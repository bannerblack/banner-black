"use server";

import { createClient } from "@/utils/supabase/server";

export async function getBasicUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return {
    id: user?.id,
    avatarUrl: user?.user_metadata.avatar_url,
  };
}
