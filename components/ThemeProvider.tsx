"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { themes } from "@/app/config/themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: "class" | "data-theme" | "data-mode";
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

export const themeNames = {
  light: "Light",
  dark: "Dark",
  forest: "Forest",
  "forest-dark": "Forest Dark",
  mocha: "Mocha",
  matcha: "Matcha",
  "matcha-dark": "Matcha Dark",
} as const;

const custom_themes = Object.keys(themeNames);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      themes={custom_themes}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
