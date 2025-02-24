"use client";

import { usePreferences } from "@/app/providers/PreferencesProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

export default function PreferencesPage() {
  const { preferences, updatePreference, isFeatureEnabled } = usePreferences();
  const { theme } = useTheme();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Preferences</h1>

      <div className="space-y-6">
        {/* UI Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>UI Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showSidebar">Show Sidebar</Label>
              <Switch
                id="showSidebar"
                checked={isFeatureEnabled("showSidebar")}
                onCheckedChange={(checked) =>
                  updatePreference("ui.showSidebar", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="showNotifications">Show Notifications</Label>
              <Switch
                id="showNotifications"
                checked={isFeatureEnabled("showNotifications")}
                onCheckedChange={(checked) =>
                  updatePreference("ui.showNotifications", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Theme Customization */}
        {theme === "custom" && (
          <Card>
            <CardHeader>
              <CardTitle>Custom Theme Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="background">Background</Label>
                  <Input
                    id="background"
                    type="color"
                    value={preferences?.theme?.background || "#ffffff"}
                    onChange={(e) =>
                      updatePreference("theme.background", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foreground">Foreground</Label>
                  <Input
                    id="foreground"
                    type="color"
                    value={preferences?.theme?.foreground || "#000000"}
                    onChange={(e) =>
                      updatePreference("theme.foreground", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary">Primary</Label>
                  <Input
                    id="primary"
                    type="color"
                    value={preferences?.theme?.primary || "#000000"}
                    onChange={(e) =>
                      updatePreference("theme.primary", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary">Secondary</Label>
                  <Input
                    id="secondary"
                    type="color"
                    value={preferences?.theme?.secondary || "#f1f5f9"}
                    onChange={(e) =>
                      updatePreference("theme.secondary", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
