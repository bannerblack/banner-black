"use client";

import { usePreferences } from "@/app/providers/PreferencesProvider";
import { type PreferenceKey } from "@/app/types";

type PreferenceWrapperProps = {
  feature: PreferenceKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function PreferenceWrapper({
  feature,
  children,
  fallback = null,
}: PreferenceWrapperProps) {
  const { isFeatureEnabled } = usePreferences();
  return isFeatureEnabled(feature) ? children : fallback;
}
