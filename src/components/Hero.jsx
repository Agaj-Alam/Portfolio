import { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import PremiumDevices from './PremiumDevices';
import resumeFile from '../assets/AGAJ_ALAM.docx';

export function Hero({ dark }) {
  const typed = useTypewriter(
    ["Fast.", "Scalable.", "Beautiful.", "Maintainable.", "Impactful."],
    90,
    1600,
  );

  function useTypewriterOnce(text, speed = 80) {
    const [display, setDisplay] = useState("");

    useEffect(() => {
      let i = 0;

      const interval = setInterval(() => {
        setDisplay(text.slice(0, i + 1));
        i++;

        if (i === text.length) {
          clearInterval(interval); // ✅ stops forever
        }
      }, speed);

      return () => clearInterval(interval);
    }, [text, speed]);

    return display;
  }

  const typedName = useTypewriterOnce("Hi, I'm AGAJ ALAM", 80);

  // const typed = useTypewriter(["Fast.", "Scalable.", "Beautiful.", "Maintainable.", "Impactful."], 90, 1600);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `all .7s ${delay}s cubic-bezier(.4,0,.2,1)`,
  });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px clamp(1.5rem,5vw,4rem) 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: dark
            ? "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)"
            : "linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: 900, width: "100%", textAlign: "center", zIndex: 1 }}
      >
        {/* badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 100,
            border: `1px solid ${dark ? "rgba(110,231,183,0.25)" : "rgba(5,150,105,0.2)"}`,
            background: dark
              ? "rgba(110,231,183,0.06)"
              : "rgba(5,150,105,0.04)",
            marginBottom: "2rem",
            ...fadeUp(0),
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#6ee7b7",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: dark ? "#6ee7b7" : "#059669",
            }}
          >
            Available for Internships & Opportunities
          </span>
        </div>

        {/* Typing Name */}
        <div
          style={{
            ...fadeUp(0.08),
            marginBottom: "1.2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Fraunces', serif",

              fontSize: "clamp(1.4rem,3vw,2rem)",
              fontWeight: 600,
              opacity: 0.9,
              background: "linear-gradient(135deg,#6ee7b7,#c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {typedName}
            <span
              style={{
                color: "#6ee7b7",
                animation: "blink 1s step-end infinite",
              }}
            >
              |
            </span>
          </div>
        </div>

        {/* headline */}
        <h1
          style={{
            fontSize: "clamp(2.8rem,8vw,6.5rem)",
            fontFamily: "'Fraunces',serif",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            margin: "0 0 1.5rem",
            color: dark ? "#fff" : "#0a0a0a",
            ...fadeUp(0.1),
          }}
        >
          I Build Web Apps & Mobile Apps
          <br />
          <span style={{ position: "relative", display: "inline-block" }}>
            <span
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "linear-gradient(135deg,#6ee7b7,#c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                opacity: dark ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
              aria-hidden="true"
            >
              That Ship.
            </span>
            <span
              style={{
                backgroundImage: "linear-gradient(135deg,#059669,#7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                opacity: dark ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              That Ship.
            </span>
          </span>
        </h1>

        {/* typed */}
        <div
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "clamp(1.1rem,2.5vw,1.5rem)",
            color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
            marginBottom: "3rem",
            height: "2em",
            ...fadeUp(0.25),
          }}
        >
          Full-Stack Engineer → Code that is{" "}
          <span style={{ color: dark ? "#6ee7b7" : "#059669" }}>{typed}</span>
          <span
            style={{
              animation: "blink 1s step-end infinite",
              color: dark ? "#6ee7b7" : "#059669",
            }}
          >
            |
          </span>
        </div>





        {/* PREMIUM DEVICE SECTION */}
        <PremiumDevices dark={dark} fadeUp={fadeUp} />


        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "5rem",
            flexWrap: "wrap",
            ...fadeUp(0.4),
          }}
        >
          <a href="#projects" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "14px 32px",
                borderRadius: 8,
                background: dark ? "#6ee7b7" : "#059669",
                color: dark ? "#0a0a0a" : "#fff",
                border: "none",
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = dark
                  ? "0 12px 40px rgba(110,231,183,0.35)"
                  : "0 12px 40px rgba(5,150,105,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "";
                e.target.style.boxShadow = "";
              }}
            >
              View Projects →
            </button>
          </a>
          <a href={resumeFile} download="AGAJ_ALAM.docx" style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "14px 32px",
                borderRadius: 8,
                background: "transparent",
                color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
                fontFamily: "'DM Mono',monospace",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = dark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.04)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.transform = "";
              }}
            >
              ↓ Resume
            </button>
          </a>
        </div>





      </div>

      {/* scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.4,
          marginBottom: "4rem",
          marginTop: "2rem"
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: dark ? "#fff" : "#000",
          }}
        >
          Scroll Down ⇩
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
            animation: "scrollLine 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
