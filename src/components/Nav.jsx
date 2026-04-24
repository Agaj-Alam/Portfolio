import { useState, useEffect } from 'react';
import React from 'react';

export function Nav({ dark, setDark, active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About", "Projects", "Skills", "GitHub", "Approaches", "Contact"];
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 clamp(1.5rem,5vw,4rem)",
        height: scrolled ? "56px" : "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? dark
            ? "rgba(8, 10, 15, 0.75)"
            : "rgba(252, 252, 250, 0.75)"
          : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(200%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(200%)" : "none",
        transition: "all .35s cubic-bezier(.4,0,.2,1)",
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: "0.95rem",
          fontWeight: 500,
          letterSpacing: "0.05em",
          color: dark ? "#6ee7b7" : "#059669",
          whiteSpace: "nowrap",
        }}
      >
        &lt;Agaj Alam /&gt;
      </div>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        <div className="hide-on-mobile" style={{ display: "flex", gap: "2rem" }}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                color:
                  active === l.toLowerCase()
                    ? dark
                      ? "#6ee7b7"
                      : "#059669"
                    : dark
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(0,0,0,0.5)",
                transition: "color .2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = dark ? "#fff" : "#000")
              }
              onMouseLeave={(e) =>
              (e.target.style.color =
                active === l.toLowerCase()
                  ? dark
                    ? "#6ee7b7"
                    : "#059669"
                  : dark
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(0,0,0,0.5)")
              }
            >
              {l}
            </a>
          ))}
        </div>
        <button
          onClick={() => setDark(!dark)}
          style={{
            width: 40,
            height: 22,
            borderRadius: 11,
            background: dark ? "rgba(110,231,183,0.2)" : "rgba(5,150,105,0.12)",
            border: `1px solid ${dark ? "rgba(110,231,183,0.3)" : "rgba(5,150,105,0.2)"}`,
            position: "relative",
            transition: "all .3s",
            zIndex: 1001,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 3,
              left: dark ? 21 : 3,
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: dark ? "#6ee7b7" : "#059669",
              transition: "left .3s",
              fontSize: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {dark ? "◐" : "○"}
          </div>
        </button>
        <button
          className="show-on-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: dark ? "#fff" : "#000",
            fontSize: "1.5rem",
            cursor: "pointer",
            zIndex: 1001,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={menuOpen ? "mobile-nav-overlay" : "mobile-nav-overlay mobile-nav-hidden"}
      >
        {links.map((l) => (
          <a
            key={`mobile-${l}`}
            href={`#${l.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "1.5rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: active === l.toLowerCase() ? (dark ? "#6ee7b7" : "#059669") : (dark ? "#fff" : "#000"),
              transition: "color .2s",
            }}
          >
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
