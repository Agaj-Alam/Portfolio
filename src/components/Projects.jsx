import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { PROJECTS } from '../constants/data';
import { SectionLabel } from './SectionLabel';

export function ProjectCard({ p, dark, idx }) {
  const [ref, visible] = useInView(0.1);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${30 + idx * 10}px)`,
        transition: `all .6s ${idx * 0.1}s cubic-bezier(.4,0,.2,1)`,
      }}
    >
      <div
        data-cursor="pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: 16,
          overflow: "hidden",
          background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
          transition: "all .35s cubic-bezier(.4,0,.2,1)",
          transform: hovered ? "translateY(-6px)" : "none",
          boxShadow: hovered
            ? `0 24px 60px ${dark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.12)"}, 0 0 0 1px ${p.color}22`
            : "none",
        }}
      >
        <div
          style={{
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg,${p.color}18,${p.accent}28)`,
            borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
            fontSize: "4rem",
            transition: "all .3s",
            transform: hovered ? "scale(1.03)" : "scale(1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: dark
                ? "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)"
                : "linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          {p.images ? (
            <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "10px", height: "100%", width: "100%", padding: "10px", overflowX: "auto", alignItems: "center", justifyContent: "center" }}>
              {p.images.map((img, i) => (
                <img key={i} src={img} alt={`${p.title} screenshot ${i+1}`} style={{ height: "100%", borderRadius: "8px", objectFit: "contain", background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
              ))}
            </div>
          ) : (
            <span style={{ position: "relative", zIndex: 1 }}>{p.emoji}</span>
          )}
        </div>

        <div style={{ padding: "1.75rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.7rem",
                color: p.color,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {p.category}
            </span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[
                ["Live ↗", p.live],
                ["GitHub ↗", p.github],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    fontFamily: "'DM Mono',monospace",
                    fontSize: "0.7rem",
                    color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                    textDecoration: "none",
                    padding: "3px 8px",
                    borderRadius: 4,
                    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = p.color;
                    e.target.style.borderColor = p.color + "66";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = dark
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(0,0,0,0.4)";
                    e.target.style.borderColor = dark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.08)";
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <h3
            style={{
              fontFamily: "'Fraunces',serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              marginBottom: "0.6rem",
              color: dark ? "#fff" : "#0a0a0a",
              letterSpacing: "-0.02em",
            }}
          >
            {p.title}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.92rem",
              lineHeight: 1.65,
              color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
              marginBottom: "1rem",
            }}
          >
            {p.description}
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.4rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
            }}
          >
            {p.tags.map((t) => (
              <span
                key={t}
                style={{
                  padding: "3px 10px",
                  borderRadius: 100,
                  background: `${p.color}15`,
                  border: `1px solid ${p.color}30`,
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.7rem",
                  color: p.color,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              background: expanded ? `${p.color}12` : "transparent",
              border: `1px solid ${expanded ? p.color + "40" : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              color: expanded
                ? p.color
                : dark
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.4)",
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              transition: "all .2s",
            }}
          >
            {expanded ? "▲ Close Case Study" : "▼ Read Case Study"}
          </button>
          <div
            style={{
              overflow: "hidden",
              maxHeight: expanded ? "420px" : 0,
              transition: "max-height .4s cubic-bezier(.4,0,.2,1)",
              opacity: expanded ? 1 : 0,
            }}
          >
            <div
              style={{ paddingTop: "1.25rem", display: "grid", gap: "0.75rem" }}
            >
              {[
                ["Problem", p.problem],
                ["Solution", p.solution],
                ["Challenges", p.challenges],
                ["Results", p.result],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    padding: "0.875rem",
                    borderRadius: 8,
                    background: dark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.025)",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.65rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: p.color,
                      marginBottom: 6,
                    }}
                  >
                    {k}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: "0.88rem",
                      lineHeight: 1.6,
                      color: dark
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(0,0,0,0.65)",
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects({ dark }) {
  return (
    <section
      id="projects"
      style={{
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)",
        maxWidth: 1100,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel dark={dark} label="02 — Projects" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "3rem",
          marginTop: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Fraunces',serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: dark ? "#fff" : "#0a0a0a",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Selected
          <br />
          Work
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.95rem",
            color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
            maxWidth: 280,
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          Each built to solve real problems, ship fast, and scale.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,460px),1fr))",
          gap: "1.5rem",
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} dark={dark} idx={i} />
        ))}
      </div>
    </section>
  );
}

// ─── SKILLS — Animated Card Grid ─────────────────────────────────────────────