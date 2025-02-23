"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";

const themeNames = {
  light: "Light",
  dark: "Dark",
  forest: "Forest",
  "forest-dark": "Forest Dark",
  mocha: "Mocha",
  matcha: "Matcha",
  "matcha-dark": "Matcha Dark",
  system: "System",
} as const;

export function ModeToggle() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((themeName) => (
          <DropdownMenuItem
            key={themeName}
            onClick={() => setTheme(themeName)}
            className={theme === themeName ? "bg-accent" : ""}
          >
            {themeNames[themeName as keyof typeof themeNames] || themeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
