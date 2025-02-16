"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/contexts/UserProvider";

const AvatarBinder = () => {
  const user = useUser();
  return (
    <Avatar>
      <AvatarImage src={user.avatarUrl} />
      <AvatarFallback>{user.id?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarBinder;
