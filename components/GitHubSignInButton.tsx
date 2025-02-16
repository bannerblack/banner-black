"use client";

import { signInWithGithub } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const GitHubSignInButton = () => {
  return (
    <form action={signInWithGithub}>
      <Button variant="outline" type="submit" className="w-full">
        <GitHubLogoIcon className="mr-2 size-4" />
        Sign in with GitHub
      </Button>
    </form>
  );
};
