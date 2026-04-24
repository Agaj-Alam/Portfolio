import React from 'react';

export function SectionLabel({ dark, label }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono',monospace",
        fontSize: "0.72rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
      }}
    >
      {label}
    </div>
  );
}