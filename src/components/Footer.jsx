import React from 'react';

export function Footer({ dark }) {
  return (
    <footer
      style={{
        padding: "3rem clamp(1.5rem,5vw,4rem)",
        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: "0.8rem",
          color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
        }}
      >
        © 2026 Agaj Alam — Built with React
      </div>
      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: "0.78rem",
          color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
        }}
      >
        Designed to impress. Built to scale.
      </div>
    </footer>
  );
}