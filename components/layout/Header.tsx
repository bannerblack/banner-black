import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { UserMenu } from "./UserMenu";

const Header = () => {
  return (
    <div className="py-8 px-8 header-wrapper flex items-center align-middle justify-center gap-8">
      <div className="title text-3xl font-bold">
        <Link href="/">Black Banner</Link>
      </div>
      <nav className="header flex justify-between items-center rounded-xl border bg-card text-card-foreground shadow px-4 py-2">
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <ModeToggle />
      <UserMenu />
    </div>
  );
};

export default Header;
