import React from "react";
import { Switch } from "@/components/ui/switch";
const Preferences = () => {
  return (
    <div className="padded">
      <h1 className="text-2xl font-bold">Preferences</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Theme</h2>
          <Switch />
        </div>
      </div>
    </div>
  );
};

export default Preferences;
