import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { SKILLS } from '../constants/data';
import { SectionLabel } from './SectionLabel';
import SkillGlobe from './SkillGlobe';

export function SkillCard({ skill, dark, delay, catColor }) {
  const [ref, visible] = useInView(0.05);
  const [hovered, setHovered] = useState(false);

  // animated bar fill on mount
  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    if (visible) {
      const t = setTimeout(
        () => setBarWidth((skill.level / 5) * 100),
        delay * 1000 + 200,
      );
      return () => clearTimeout(t);
    }
  }, [visible, skill.level, delay]);

  return (
    <div
      ref={ref}
      data-cursor="pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(18px) scale(0.97)",
        transition: `opacity .5s ${delay}s, transform .5s ${delay}s cubic-bezier(.4,0,.2,1)`,
        borderRadius: 14,
        padding: "1.1rem 1.2rem",
        background: hovered
          ? dark
            ? `rgba(255,255,255,0.06)`
            : `rgba(0,0,0,0.045)`
          : dark
            ? "rgba(255,255,255,0.025)"
            : "rgba(0,0,0,0.02)",
        border: `1px solid ${hovered ? catColor + "55" : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        boxShadow: hovered
          ? `0 0 0 1px ${catColor}22, 0 8px 30px ${catColor}18`
          : "none",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        transition2: "all .25s cubic-bezier(.4,0,.2,1)",
      }}
    >
      {/* glow spot on hover */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-10%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${catColor}28 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity .3s",
          pointerEvents: "none",
          filter: "blur(12px)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            fontSize: "1.3rem",
            lineHeight: 1,
            filter: hovered ? `drop-shadow(0 0 6px ${catColor})` : "none",
            transition: "filter .3s",
          }}
        >
          {skill.icon}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontWeight: 600,
            fontSize: "0.9rem",
            color: hovered
              ? dark
                ? "#fff"
                : "#000"
              : dark
                ? "rgba(255,255,255,0.8)"
                : "rgba(0,0,0,0.75)",
            transition: "color .2s",
            flex: 1,
          }}
        >
          {skill.name}
        </span>
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.68rem",
            color: hovered
              ? catColor
              : dark
                ? "rgba(255,255,255,0.3)"
                : "rgba(0,0,0,0.3)",
            transition: "color .2s",
          }}
        >
          {"★".repeat(skill.level)}
          {"☆".repeat(5 - skill.level)}
        </span>
      </div>

      {/* animated progress bar */}
      <div
        style={{
          height: 3,
          borderRadius: 2,
          background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 2,
            width: `${barWidth}%`,
            background: `linear-gradient(90deg, ${catColor}, ${catColor}88)`,
            transition: "width 1.1s cubic-bezier(.4,0,.2,1)",
            boxShadow: hovered ? `0 0 8px ${catColor}` : "none",
          }}
        />
      </div>
    </div>
  );
}

export function Skills({ dark }) {
  const [ref, sectionVisible] = useInView(0.1);
  const cats = { Frontend: "#6ee7b7", Backend: "#c4b5fd", Tools: "#fde68a" };
  const catIcons = { Frontend: "◈", Backend: "⬡", Tools: "⚙" };
  const [activeTab, setActiveTab] = useState("Frontend");

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)",
        maxWidth: 1100,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel dark={dark} label="03 — Skills" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "2.5rem",
          marginTop: "1.5rem",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <h2
          style={{
            fontFamily: "'Fraunces',serif",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 800,
            color: dark ? "#fff" : "#0a0a0a",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Craft{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#6ee7b7,#c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            &amp;
          </span>{" "}
          Stack
        </h2>

        {/* tab switcher */}
        <div
          style={{
            display: "flex",
            gap: 6,
            padding: 5,
            borderRadius: 12,
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          }}
        >
          {Object.keys(cats).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                background:
                  activeTab === cat
                    ? dark
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.08)"
                    : "transparent",
                border:
                  activeTab === cat
                    ? `1px solid ${cats[cat]}55`
                    : "1px solid transparent",
                color:
                  activeTab === cat
                    ? cats[cat]
                    : dark
                      ? "rgba(255,255,255,0.45)"
                      : "rgba(0,0,0,0.45)",
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all .2s",
                boxShadow:
                  activeTab === cat ? `0 0 12px ${cats[cat]}22` : "none",
              }}
            >
              {catIcons[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

      {/* all-skills big grid (visible on wider screens) or filtered by tab */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,230px),1fr))",
          gap: "0.85rem",
        }}
      >
        {(SKILLS[activeTab] || []).map((s, i) => (
          <SkillCard
            key={s.name}
            skill={s}
            dark={dark}
            delay={i * 0.07}
            catColor={cats[activeTab]}
          />
        ))}
      </div>

      <SkillGlobe dark={dark} />

      {/* floating legend */}
      <div
        style={{
          marginTop: "2.5rem",
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          opacity: sectionVisible ? 1 : 0,
          transition: "opacity .6s .5s",
        }}
      >
        {Object.entries(cats).map(([cat, color]) => (
          <div
            key={cat}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 6px ${color}`,
              }}
            />
            <span
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.7rem",
                color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                letterSpacing: "0.08em",
              }}
            >
              {cat}
            </span>
          </div>
        ))}
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.7rem",
            color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)",
            marginLeft: "auto",
          }}
        >
          ★ = proficiency level
        </span>
      </div>
    </section>
  );
}

// ─── GITHUB ACTIVITY ─────────────────────────────────────────────────────────
