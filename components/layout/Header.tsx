import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { UserMenu } from "./UserMenu";
import { CreateMenu } from "@/components/layout/Dashboard/CreateMenu";
import { TypographyH1 } from "./Typography";
const Header = () => {
  return (
    <div className="py-8 px-8 header-wrapper flex items-center align-middle justify-center gap-8 for">
      <div className="title">
        <Link href="/">
          <TypographyH1>Black Banner</TypographyH1>
        </Link>
      </div>
      <nav className="header flex justify-between items-center rounded-xl border-border border text-card-foreground px-4 py-2">
        <Link href="/">Home</Link>
      </nav>
      <ModeToggle />
      <CreateMenu />
      <UserMenu />
    </div>
  );
};

export default Header;
