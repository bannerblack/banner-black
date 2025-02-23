"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/app/login/actions";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserProvider";
import { usePreferences } from "@/app/providers/PreferencesProvider";
export const UserMenu = () => {
  const user = useUser();
  const { isFeatureEnabled } = usePreferences();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {user ? (
          <Avatar>
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>{user.id?.charAt(0)}</AvatarFallback>
          </Avatar>
        ) : (
          <Button>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isFeatureEnabled("create") && (
          <DropdownMenuItem>
            <Link href="/create">Create</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <form action={signOut}>
            <Button type="submit">Sign Out</Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
