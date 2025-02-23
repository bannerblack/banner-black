import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { UserMenu } from "./UserMenu";
import { ThemeSelect } from "@/components/ThemeSelect";
import { CreateMenu } from "@/components/layout/Dashboard/CreateMenu";
import { TypographyH1 } from "./Typography";
const Header = () => {
  return (
    <div className="py-8 px-8 header-wrapper flex items-center align-middle justify-center gap-8">
      <div className="title text-3xl font-bold">
        <Link href="/">Black Banner</Link>
      </div>
      <nav className="header flex justify-between items-center rounded-xl border text-card-foreground shadow px-4 py-2">
        <Link href="/">Home</Link>
      </nav>
      <ModeToggle />
      <CreateMenu />
      <UserMenu />

      <TypographyH1>Black Banner</TypographyH1>
    </div>
  );
};

export default Header;
