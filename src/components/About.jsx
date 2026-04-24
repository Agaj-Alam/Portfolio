import { SectionLabel } from "./SectionLabel";
import { useState, useEffect } from "react";
import { ACHIEVEMENTS } from "../constants/data";
import { useInView } from "../hooks/useInView";

export function About({ dark }) {
  const [ref, visible] = useInView();
  const [activeCert, setActiveCert] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setActiveCert(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)",
        maxWidth: 1100,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel dark={dark} label="01 — About" />
      <div
        className="mobile-grid-1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,440px),1fr))",
          gap: "clamp(3rem, 8vw, 5rem)",
          alignItems: "start",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(-30px)",
            transition: "all .7s .1s",
          }}
        >
          <h2
            style={{
              fontFamily: "'Fraunces',serif",
              fontSize: "clamp(2rem,4vw,3rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              color: dark ? "#fff" : "#0a0a0a",
              letterSpacing: "-0.02em",
            }}
          >
            I turn complex
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#6ee7b7,#c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              problems into
              <br />
              clean products.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
              marginBottom: "1.25rem",
            }}
          >
            I'm Agaj Alam— a full-stack enthusiast building my expertise in web
            development and Mobile Applications. I’ve worked on projects with
            React, Spring Boot, and MySQL, and I love turning ideas into real,
            interactive apps.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
              marginBottom: "2rem",
            }}
          >
            I’m passionate about crafting clean UIs and learning to architect
            solid backend systems. While I’m just starting my professional
            journey, I’m dedicated to delivering quality and growing every day.
          </p>
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(30px)",
            transition: "all .7s .25s",
          }}
        >
          <h3
            style={{
              fontFamily: "'Fraunces',serif",
              fontSize: "1.8rem",
              fontWeight: 700,
              color: dark ? "#fff" : "#0a0a0a",
              marginBottom: "2rem",
            }}
          >
            Achievements 🏅
          </h3>
          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 1,
                background: dark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.07)",
              }}
            />
            {ACHIEVEMENTS.map((item, i) => (
              <div
                key={i}
                style={{ marginBottom: "1.75rem", position: "relative" }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "-2rem",
                    top: 14,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background:
                      item.type === "aws"
                        ? "#f59e0b"
                        : item.type === "meta"
                          ? "#3b82f6"
                          : "#10b981",
                    border: `2px solid ${dark ? "#080a0f" : "#fafaf8"}`,
                    transform: "translateX(-4.5px)",
                  }}
                />
                <div
                  onClick={() => setActiveCert(item)}
                  style={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    marginLeft: "-12px",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = dark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.7rem",
                      color: dark ? "#6ee7b7" : "#059669",
                      letterSpacing: "0.1em",
                      marginBottom: 4,
                    }}
                  >
                    {item.year}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: dark ? "#fff" : "#0a0a0a",
                      marginBottom: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {item.title}
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        color: dark ? "#6ee7b7" : "#059669",
                        background: dark
                          ? "rgba(110,231,183,0.1)"
                          : "rgba(5,150,105,0.1)",
                        padding: "2px 8px",
                        borderRadius: 12,
                        letterSpacing: "0.05em",
                      }}
                    >
                      View
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: "0.78rem",
                      color: dark
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(0,0,0,0.45)",
                    }}
                  >
                    {item.org} — {item.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {/* Certificate Modal */}
      {activeCert && (
        <div
          className="modal-overlay" // Class add ki
          onClick={() => setActiveCert(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            cursor: "zoom-out",
          }}
        >
          <div
            className="modal-content" // Class add ki
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 900,
              width: "100%",
              background: dark ? "#0f172a" : "#fff",
              borderRadius: 16,
              padding: "1rem",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              position: "relative",
              cursor: "default",
            }}
          >
            <button
              className="close-btn" // Class add ki
              onClick={() => setActiveCert(null)}
              style={{
                position: "absolute",
                top: -48,
                right: 0,
                color: "#fff",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                width: 40,
                height: 40,
                borderRadius: 20,
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            {activeCert.pdf ? (
              <iframe
                className="cert-iframe" // Class add ki
                src={activeCert.pdf}
                style={{
                  width: "100%",
                  height: "70vh",
                  border: "none",
                  borderRadius: 8,
                  display: "block",
                }}
                title={activeCert.title}
              />
            ) : (
              <img
                src={activeCert.image}
                alt={activeCert.title}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 8,
                  display: "block",
                }}
              />
            )}
            <div
              style={{
                marginTop: "1.5rem",
                textAlign: "center",
                marginBottom: "0.5rem",
              }}
            >
              <h3
                className="cert-title"
                style={{
                  margin: 0,
                  color: dark ? "#f8fafc" : "#0f172a",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "1.3rem",
                }}
              >
                {activeCert.title}
              </h3>
              <p
                style={{
                  margin: "6px 0 0",
                  color: dark ? "#94a3b8" : "#64748b",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.85rem",
                }}
              >
                {activeCert.org}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
