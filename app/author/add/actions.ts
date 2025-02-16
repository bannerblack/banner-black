"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addAuthor(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const userId = formData.get("userId") as string;

  if (!username) {
    return {
      errors: {
        username: "Username is required",
      },
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.rpc("create_author_and_profile", {
    p_user: userId,
    p_username: username,
  });

  if (error) {
    if (error.code === "P0001") {
      return {
        errors: {
          username: "Author name already exists",
        },
      };
    }
    console.error("Error creating author and profile:", error);
    return {
      message: "Something went wrong. Please try again.",
    };
  }

  revalidatePath("/");
  redirect(`/author/${data}`);
}

// export async function addAuthor({ username, userId }: AddAuthorParams) {
//   const supabase = await createClient();

//   const { data, error } = await supabase
//     .from("Authors")
//     .insert([
//       {
//         username,
//         user: userId,
//       },
//     ])
//     .select()
//     .single();

//   if (error) {
//     console.error("Error adding author:", error);
//     throw error;
//   }

//   console.log("Author added:", data);

//   // Push profile to supabase
//   const { data: profile, error: profileError } = await supabase
//     .from("Profiles")
//     .insert({
//       id: data.user.id,
//     });

//   if (profileError) {
//     console.error("Error adding profile:", profileError);
//     throw profileError;
//   }

//   // redirect to author page
//   redirect(`/author/${data.id}`);

//   return data;
// }
