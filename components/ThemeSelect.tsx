"use client";

import { useTheme } from "next-themes";
import { themes, type ThemeKey } from "@/app/config/themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themeNames } from "./ThemeProvider";
export function ThemeSelect() {
  const { theme, setTheme } = useTheme();

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem key={theme} value={theme}>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
              {themeNames[theme as keyof typeof themeNames] || theme}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
