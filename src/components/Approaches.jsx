import React from 'react';
import { useInView } from '../hooks/useInView';
import { APPROACHES } from '../constants/data';
import { SectionLabel } from './SectionLabel';

export function Approaches({ dark }) {
  const [ref, visible] = useInView();
  return (
    <section
      id="approaches"
      style={{
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)",
        maxWidth: 1100,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel dark={dark} label="05 — Approaches" />
      <h2
        style={{
          fontFamily: "'Fraunces',serif",
          fontSize: "clamp(2rem,4vw,3rem)",
          fontWeight: 800,
          color: dark ? "#fff" : "#0a0a0a",
          letterSpacing: "-0.02em",
          marginBottom: "3rem",
          marginTop: "1.5rem",
        }}
      >
        My Development Approach 💻
      </h2>
      <div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,320px),1fr))",
          gap: "1.5rem",
        }}
      >
        {APPROACHES.map((b, i) => (
          <div
            key={b.id}
            data-cursor="pointer"
            style={{
              padding: "1.75rem",
              borderRadius: 14,
              background: dark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.02)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
              transition: "all .25s",
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transitionDelay: `${i * 0.1}s`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = dark
                ? "rgba(255,255,255,0.14)"
                : "rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.borderColor = dark
                ? "rgba(255,255,255,0.07)"
                : "rgba(0,0,0,0.07)";
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              {b.emoji}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: "0.75rem" }}>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: 100,
                  background: dark
                    ? "rgba(110,231,183,0.1)"
                    : "rgba(5,150,105,0.08)",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.68rem",
                  color: dark ? "#6ee7b7" : "#059669",
                }}
              >
                {b.tag}
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.68rem",
                  color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {b.read}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "'Fraunces',serif",
                fontSize: "1.2rem",
                fontWeight: 700,
                color: dark ? "#fff" : "#0a0a0a",
                marginBottom: "0.5rem",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
              }}
            >
              {b.title}
            </h3>
            <div
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.72rem",
                color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
              }}
            >
              {b.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
