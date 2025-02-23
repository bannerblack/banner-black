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
      [key.split(".")[0]]: {
        ...preferences[key.split(".")[0] as keyof UserPreferences],
        [key.split(".")[1]]: value,
      },
    };

    const { error } = await supabase
      .from("user_preferences")
      .upsert({ preferences: updatedPreferences });

    if (!error) {
      setPreferences(updatedPreferences);
    }
  };

  const isFeatureEnabled = (feature: PreferenceKey): boolean => {
    return preferences?.ui?.[feature] ?? true; // Default to true if not set
  };

  return (
    <PreferencesContext.Provider
      value={{ preferences, updatePreference, isFeatureEnabled }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context)
    throw new Error("usePreferences must be used within PreferencesProvider");
  return context;
};
