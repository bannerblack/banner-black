"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authorFormSchema, type FormState } from "@/app/types";

export async function addAuthor(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = authorFormSchema.safeParse({
    username: formData.get("username"),
    about: formData.get("about") || undefined,
  });

  if (!result.success) {
    return {
      message: null,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const username = result.data.username;
  const about = result.data.about;
  const userId = formData.get("userId") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.rpc("create_author_and_profile", {
    p_user: userId,
    p_username: username,
    p_about: about || null,
  });

  if (error) {
    console.error("Error creating author and profile:", error);
    return {
      message: "Something went wrong. Please try again.",
      errors: {},
    };
  }

  revalidatePath("/");
  redirect(`/author/${data}`);
}
