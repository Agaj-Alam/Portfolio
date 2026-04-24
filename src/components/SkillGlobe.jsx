import React, { useState, useEffect, useRef } from 'react';
import { 
  SiJavascript, SiReact, SiTailwindcss, SiFramer, SiBootstrap,
  SiSpring, SiMysql, SiPostgresql, 
  SiIntellijidea, SiPostman, SiGit, SiGithub, SiOpenai 
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaJava } from 'react-icons/fa';

const ICONS = [
  { icon: SiReact, color: "#61dafb", name: "React" },
  { icon: SiJavascript, color: "#f7df1e", name: "JavaScript" },
  { icon: SiTailwindcss, color: "#38b2ac", name: "Tailwind" },
  { icon: SiFramer, color: "#0055FF", name: "Framer Motion" },
  { icon: SiBootstrap, color: "#7952b3", name: "Bootstrap" },
  { icon: FaJava, color: "#f89820", name: "Java" },
  { icon: SiSpring, color: "#6db33f", name: "Spring Boot" },
  { icon: SiMysql, color: "#4479A1", name: "MySQL" },
  { icon: SiPostgresql, color: "#336791", name: "PostgreSQL" },
  { icon: VscVscode, color: "#007acc", name: "VS Code" },
  { icon: SiIntellijidea, color: "#000000", darkColor: "#ffffff", name: "IntelliJ" },
  { icon: SiPostman, color: "#FF6C37", name: "Postman" },
  { icon: SiGit, color: "#f05032", name: "Git" },
  { icon: SiGithub, color: "#181717", darkColor: "#ffffff", name: "GitHub" },
  { icon: SiOpenai, color: "#412991", darkColor: "#ffffff", name: "OpenAI" }
];

export default function SkillGlobe({ dark }) {
  const [points] = useState(() => {
    const samples = ICONS.length;
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    
    // Initial static points on a unit sphere
    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      pts.push({ x, y, z });
    }
    return pts;
  });

  const [hovered, setHovered] = useState(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const [projectedPoints, setProjectedPoints] = useState([]);

  useEffect(() => {
    if (points.length === 0) return;
    
    let animationFrameId;
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Slowly rotate around Y axis
      rotationRef.current.y += delta * 0.25;
      // Slight tilt on X axis
      rotationRef.current.x = 0.2;

      const { x: rx, y: ry } = rotationRef.current;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      // Project points
      const newPts = points.map(p => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        let y1 = p.y;

        // Rotate X
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;
        let x2 = x1;

        return { x: x2, y: y2, z: z2 };
      });

      setProjectedPoints(newPts);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [points]);

  return (
    <div className="scale-mobile" style={{ position: "relative", width: "100%", height: 600, display: "flex", justifyContent: "center", alignItems: "center", marginTop: "3rem" }}>
      {/* Core Glow */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: dark 
            ? "radial-gradient(circle at center, rgba(110,231,183,0.12) 0%, transparent 50%)" 
            : "radial-gradient(circle at center, rgba(5,150,105,0.08) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />
      {/* Wireframe background */}
      <div 
        style={{
          position: "absolute",
          width: 480,
          height: 480,
          borderRadius: "50%",
          border: `1px solid ${dark ? "rgba(110,231,183,0.25)" : "rgba(5,150,105,0.15)"}`,
          boxShadow: `inset 0 0 40px ${dark ? "rgba(110,231,183,0.1)" : "rgba(5,150,105,0.05)"}`,
          transformStyle: "preserve-3d",
          animation: "globe-spin 25s linear infinite",
          pointerEvents: "none"
        }}
      >
         {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map(deg => (
            <div key={`y-${deg}`} style={{ position: 'absolute', inset: 0, border: `1px solid ${dark ? "rgba(110,231,183,0.2)" : "rgba(5,150,105,0.15)"}`, borderRadius: '50%', transform: `rotateY(${deg}deg)` }} />
         ))}
         {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map(deg => (
            <div key={`x-${deg}`} style={{ position: 'absolute', inset: 0, border: `1px solid ${dark ? "rgba(110,231,183,0.2)" : "rgba(5,150,105,0.15)"}`, borderRadius: '50%', transform: `rotateX(${deg}deg)` }} />
         ))}
      </div>
      <style>{`
        @keyframes globe-spin {
          0% { transform: rotateX(15deg) rotateY(0deg); }
          100% { transform: rotateX(15deg) rotateY(360deg); }
        }
      `}</style>

      {/* Floating Icons */}
      <div style={{ position: "relative", width: 500, height: 500, zIndex: 10 }}>
        {projectedPoints.map((p, i) => {
          const item = ICONS[i];
          const radius = 240;
          const left = p.x * radius + 250;
          const top = p.y * radius + 250;
          const zIndex = Math.round((p.z + 1) * 100);
          const scale = (p.z + 1.5) / 2.5; // range: ~0.2 to 1.0
          const opacity = (p.z + 1.5) / 2.5;
          const isHovered = hovered === i;

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                left,
                top,
                transform: `translate(-50%, -50%) scale(${isHovered ? scale * 1.5 : scale})`,
                zIndex: isHovered ? 1000 : zIndex,
                opacity: isHovered ? 1 : Math.max(0.3, opacity),
                transition: "transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.25s",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: dark ? "rgba(20,20,20,0.8)" : "rgba(255,255,255,0.9)",
                  boxShadow: isHovered 
                    ? `0 0 25px ${item.color}80, inset 0 0 10px ${item.color}40` 
                    : `0 8px 24px rgba(0,0,0,${dark ? 0.6 : 0.1}), 0 0 15px ${item.color}20`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "2.4rem",
                  color: dark && item.darkColor ? item.darkColor : item.color,
                  border: `1px solid ${isHovered ? item.color : dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"}`,
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s ease"
                }}
              >
                <item.icon />
              </div>
              {isHovered && (
                <div
                  style={{
                    position: "absolute",
                    top: 76,
                    background: dark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.95)",
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: dark ? "#fff" : "#000",
                    fontFamily: "'DM Sans',sans-serif",
                    whiteSpace: "nowrap",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                    pointerEvents: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  {item.name}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
