"use client";

import React from "react";

export default function Grain() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-10">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.90"
            numOctaves="5"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
