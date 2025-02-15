import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "./login/actions";
export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Hello, {user?.email}</h1>
      <h2>{user?.user_metadata.full_name}</h2>
      <p>{user?.user_metadata.avatar_url}</p>
      {/* sign out button */}
      <form action={signOut}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
