"use server";

import { createClient } from "@/utils/supabase/server";

export type BasicUser = {
  id: string | undefined;
  avatarUrl: string | undefined;
};

export async function getBasicUser(): Promise<BasicUser> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    id: user?.id,
    avatarUrl: user?.user_metadata?.avatar_url,
  };
}
