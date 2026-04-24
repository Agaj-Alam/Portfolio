import { SectionLabel } from './SectionLabel';
import { useState } from 'react';
import React from 'react';
import { useInView } from '../hooks/useInView';

export function Contact({ dark }) {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState("idle");

  return (
    <section
      id="contact"
      style={{
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,5vw,4rem)",
        maxWidth: 1100,
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <SectionLabel dark={dark} label="06 — Contact" />
      <div
        ref={ref}
        className="mobile-grid-1"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,420px),1fr))",
          gap: "clamp(3rem, 8vw, 5rem)",
          marginTop: "3rem",
          alignItems: "start",
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
              fontSize: "clamp(2rem,4vw,3.2rem)",
              fontWeight: 800,
              color: dark ? "#fff" : "#0a0a0a",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Let's Build
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#6ee7b7,#c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Something Real.
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
              marginBottom: "2.5rem",
            }}
          >
            Available for Internship, full-time roles, and interesting collabs. I
            respond within 24h.
          </p>
          {[
            ["✉", "agajalam283@gmail.com", "mailto:alex@example.com"],
            ["↗", "linkedin.com/in/agaj-alam/", "#"],

          ].map(([icon, label, href]) => (
            <a
              key={label}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: "1rem",
                textDecoration: "none",
                color: dark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)",
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.85rem",
                transition: "color .15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = dark ? "#6ee7b7" : "#059669")
              }
              onMouseLeave={(e) =>
              (e.currentTarget.style.color = dark
                ? "rgba(255,255,255,0.65)"
                : "rgba(0,0,0,0.65)")
              }
            >
              <span style={{ width: 18, opacity: 0.6 }}>{icon}</span>
              {label}
            </a>
          ))}
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(30px)",
            transition: "all .7s .2s",
          }}
        >
          {status === "done" ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 2rem",
                borderRadius: 16,
                background: dark
                  ? "rgba(110,231,183,0.06)"
                  : "rgba(5,150,105,0.05)",
                border: `1px solid ${dark ? "rgba(110,231,183,0.2)" : "rgba(5,150,105,0.15)"}`,
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  animation: "bounceIn .5s",
                }}
              >
                ✓
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces',serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: dark ? "#6ee7b7" : "#059669",
                  marginBottom: "0.5rem",
                }}
              >
                Message Sent!
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                }}
              >
                I'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setForm({ name: "", email: "", msg: "" });
                }}
                style={{
                  marginTop: "1.5rem",
                  padding: "10px 24px",
                  borderRadius: 8,
                  background: "transparent",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
                  color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.8rem",
                }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "1rem" }}>
              {[
                ["name", "Name", "text"],
                ["email", "Email", "email"],
              ].map(([key, ph, type]) => (
                <input
                  key={key}
                  type={type}
                  placeholder={ph}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: dark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.025)",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)"}`,
                    color: dark ? "#fff" : "#0a0a0a",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.95rem",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color .2s",
                  }}
                  onFocus={(e) =>
                  (e.target.style.borderColor = dark
                    ? "rgba(110,231,183,0.35)"
                    : "rgba(5,150,105,0.3)")
                  }
                  onBlur={(e) =>
                  (e.target.style.borderColor = dark
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.09)")
                  }
                />
              ))}
              <textarea
                placeholder="Message"
                rows={5}
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 10,
                  resize: "vertical",
                  background: dark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.025)",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)"}`,
                  color: dark ? "#fff" : "#0a0a0a",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color .2s",
                }}
                onFocus={(e) =>
                (e.target.style.borderColor = dark
                  ? "rgba(110,231,183,0.35)"
                  : "rgba(5,150,105,0.3)")
                }
                onBlur={(e) =>
                (e.target.style.borderColor = dark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.09)")
                }
              />
              <button
                onClick={async () => {
                  if (!form.name || !form.email || !form.msg) return;
                  setStatus("sending");
                  try {
                    await fetch("https://formsubmit.co/ajax/agajalam283@gmail.com", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        message: form.msg,
                      }),
                    });
                    setStatus("done");
                  } catch (error) {
                    console.error("Error sending message:", error);
                    setStatus("idle");
                  }
                }}
                disabled={status === "sending"}
                style={{
                  padding: "14px",
                  borderRadius: 10,
                  background: dark ? "#6ee7b7" : "#059669",
                  color: dark ? "#0a0a0a" : "#fff",
                  border: "none",
                  fontFamily: "'DM Mono',monospace",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  transition: "all .2s",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (status !== "sending") {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = dark
                      ? "0 12px 40px rgba(110,231,183,0.4)"
                      : "0 12px 40px rgba(5,150,105,0.35)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "";
                  e.target.style.boxShadow = "";
                }}
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
