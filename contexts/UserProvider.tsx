"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { type BasicUser } from "@/lib/user";

const UserContext = createContext<BasicUser>({
  id: undefined,
  avatarUrl: undefined,
});

export const UserProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: BasicUser;
}) => {
  const [user, setUser] = useState<BasicUser>(initialUser);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
