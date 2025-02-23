export const themes = {
  light: {
    name: "Light",
    colors: {
      background: "#ffffff",
      foreground: "#11181C",
      primary: "#006FEE",
      secondary: "#7828C8",
      accent: "#17C964",
      muted: "#687076"
    }
  },
  dark: {
    name: "Dark",
    colors: {
      background: "#000000",
      foreground: "#ECEDEE",
      primary: "#2563eb",
      secondary: "#9333ea",
      accent: "#22c55e",
      muted: "#A1A1AA"
    }
  },
  forest: {
    name: "Forest",
    colors: {
      background: "#1C2421",
      foreground: "#E8EDEB",
      primary: "#2D503C",
      secondary: "#4A7862",
      accent: "#89B6A5",
      muted: "#718878"
    }
  },
  rose: {
    name: "Rose",
    colors: {
      background: "#FDF2F4",
      foreground: "#4A3034",
      primary: "#E4A7B4",
      secondary: "#C88B98",
      accent: "#F6CAD2",
      muted: "#B47F89"
    }
  },
  mocha: {
    name: "Mocha",
    colors: {
      background: "#2C1810",
      foreground: "#E8E1DD",
      primary: "#8B4513",
      secondary: "#A0522D",
      accent: "#CD853F",
      muted: "#6B4423"
    }
  }
} as const;

export type ThemeKey = keyof typeof themes; 