"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { PreferenceKey, type UserPreferences } from "@/app/types";

type PreferencesContextType = {
  preferences: UserPreferences | null;
  updatePreference: (key: string, value: any) => Promise<void>;
  isFeatureEnabled: (feature: PreferenceKey) => boolean;
};

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context)
    throw new Error("usePreferences must be used within PreferencesProvider");
  return context;
};

export function PreferencesProvider({
  children,
  initialPreferences,
}: {
  children: React.ReactNode;
  initialPreferences?: UserPreferences;
}) {
  const [preferences, setPreferences] = useState<UserPreferences | null>(
    initialPreferences || null
  );
  const supabase = createClient();

  const updatePreference = async (key: string, value: any) => {
    if (!preferences) return;
    const updatedPreferences = {
      ...preferences,
      [key]: value,
    };

    const { error } = await supabase
      .from("user_preferences")
      .upsert({ preferences: updatedPreferences });

    if (!error) {
      setPreferences(updatedPreferences);
    }
  };

  const isFeatureEnabled = (feature: PreferenceKey): boolean => {
    return preferences?.ui?.[feature] ?? true;
  };

  useEffect(() => {
    if (preferences?.theme) {
      const style = document.createElement("style");
      style.innerHTML = `
        [data-theme="custom"] {
          --background: ${preferences.theme.background};
          --foreground: ${preferences.theme.foreground};
          --card: ${preferences.theme.background};
          --card-foreground: ${preferences.theme.foreground};
          --popover: ${preferences.theme.background};
          --popover-foreground: ${preferences.theme.foreground};
          --primary: ${preferences.theme.primary};
          --secondary: ${preferences.theme.secondary};
          --muted: ${preferences.theme.muted};
          --accent: ${preferences.theme.accent};
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
        return undefined;
      };
    }
  }, [preferences?.theme]);

  return (
    <PreferencesContext.Provider
      value={{ preferences, updatePreference, isFeatureEnabled }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
