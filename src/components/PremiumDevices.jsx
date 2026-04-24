import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { FaApple, FaArrowRight, FaCamera, FaHeart, FaPlay, FaWhatsapp, FaInstagram, FaYoutube, FaGithub, FaGoogle } from "react-icons/fa";
import RealisticMacbook from "./RealisticMacbook";

function PremiumDevices({ dark, fadeUp }) {
  const [ripples, setRipples] = useState([]);
  const [laptopHovered, setLaptopHovered] = useState(false);

  // Parallax and translucent fade effect on scroll
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scrollYOffset = useTransform(scrollY, [0, 500], [0, 150]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const apps = [
    { Icon: FaWhatsapp, color: "#25D366" },
    { Icon: FaInstagram, color: "#E1306C" },
    { Icon: FaYoutube, color: "#FF0000" },
    { Icon: FaGithub, color: "#333" },
    { Icon: FaGoogle, color: "#4285F4" },

    { Icon: FaWhatsapp, color: "#16a34a" },
    { Icon: FaInstagram, color: "#db2777" },
    { Icon: FaYoutube, color: "#dc2626" },
    { Icon: FaGithub, color: "#111" },
    { Icon: FaGoogle, color: "#2563eb" },
  ];

  return (
    <div
      className="mobile-grid-1"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "clamp(3rem, 6vw, 6rem)",
        marginTop: "6rem",
        alignItems: "end", // Align bottoms to sit on the same level desk
        justifyItems: "center",
        perspective: "2000px", 
        opacity: scrollOpacity,
        y: scrollYOffset,
        ...fadeUp(0.45),
      }}
    >
      {/* ================= LAPTOP (3D Realistic MacBook) ================= */}
      <motion.div
        className="scale-mobile"
        onHoverStart={() => setLaptopHovered(true)}
        onHoverEnd={() => setLaptopHovered(false)}
        onClick={() => setLaptopHovered(!laptopHovered)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 420,
          height: 300, // True height of laptop area
          position: "relative",
          marginBottom: "20px", // space for absolute pill
        }}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <RealisticMacbook hovered={laptopHovered} dark={dark} />
        </div>
        
        <motion.div
          animate={{ opacity: laptopHovered ? 0 : 1, y: laptopHovered ? 10 : 0 }}
          style={{
            position: 'absolute',
            bottom: '-50px', // Drop it fully below the laptop baseline
            background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            border: dark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.1)',
            padding: '6px 20px',
            borderRadius: '20px',
            fontSize: '12px',
            color: dark ? '#aaa' : '#666',
            pointerEvents: 'none',
          }}
        >
          Hover to open
        </motion.div>
      </motion.div>

      {/* ================= MOBILE ================= */}
      <motion.div
        className="scale-mobile"
        initial={{ rotateY: -25 }}
        whileHover={{ rotateY: 0, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 120 }}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          onClick={handleClick}
          style={{
            width: 240,
            height: 480,
            borderRadius: 40,
            background: "#e5e5ea", // Titanium-like frame always
            padding: 8, // Bezel thickness
            position: "relative",
            boxShadow: dark
              ? "0 30px 60px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.1)"
              : "0 30px 60px rgba(0,0,0,0.2), inset 0 0 10px rgba(0,0,0,0.05)",
            border: "1px solid #d1d5db",
          }}
        >
          {/* Side Buttons */}
          <div style={{ position: 'absolute', left: -4, top: 100, width: 4, height: 26, background: '#a3a3a3', borderRadius: '4px 0 0 4px' }} />
          <div style={{ position: 'absolute', left: -4, top: 140, width: 4, height: 46, background: '#a3a3a3', borderRadius: '4px 0 0 4px' }} />
          <div style={{ position: 'absolute', left: -4, top: 195, width: 4, height: 46, background: '#a3a3a3', borderRadius: '4px 0 0 4px' }} />
          <div style={{ position: 'absolute', right: -4, top: 150, width: 4, height: 60, background: '#a3a3a3', borderRadius: '0 4px 4px 0' }} />          {/* Screen Content Container */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 32,
              background: 'linear-gradient(135deg, #74ebd5 0%, #9face6 100%)', // matching wallpaper base
              overflow: "hidden",
              position: "relative",
              border: dark ? '2px solid #000' : '2px solid #111',
            }}
          >
             {/* iOS Wallpaper Gradient Overlay */}
             <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 10% 20%, #4facfe 0%, transparent 40%), radial-gradient(circle at 90% 80%, #f093fb 0%, transparent 50%), radial-gradient(circle at 20% 90%, #f5576c 0%, transparent 40%), radial-gradient(circle at 80% 10%, #e0c3fc 0%, transparent 50%)',
                opacity: 0.9,
                mixBlendMode: 'overlay'
             }} />

            {/* Notch */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 90,
                height: 20,
                background: "#000",
                borderRadius: "0 0 12px 12px",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
               <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#111", border: "1px solid #222" }} />
            </div>

            {/* Status Bar */}
            <div style={{ position: 'absolute', top: 6, left: 18, right: 16, display: 'flex', justifyContent: 'space-between', zIndex: 10, color: '#fff', fontSize: '9px', fontWeight: 'bold' }}>
               <span>15:05</span>
               <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                  {/* Signal */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '8px' }}>
                     <div style={{ width: 2, height: 4, background: '#fff', borderRadius: 1 }} />
                     <div style={{ width: 2, height: 6, background: '#fff', borderRadius: 1 }} />
                     <div style={{ width: 2, height: 8, background: '#fff', borderRadius: 1 }} />
                     <div style={{ width: 2, height: 8, background: 'rgba(255,255,255,0.4)', borderRadius: 1 }} />
                  </div>
                  {/* Wifi icon (simulated text) */}
                  <span style={{ fontSize: '7px' }}>📶</span>
                  {/* Battery */}
                  <div style={{ width: 14, height: 7, border: '1px solid #fff', borderRadius: 2, padding: '1px', position: 'relative' }}>
                     <div style={{ background: '#fff', width: '80%', height: '100%', borderRadius: 1 }} />
                     <div style={{ position: 'absolute', right: -2, top: 2, width: 1, height: 3, background: '#fff', borderRadius: 1 }} />
                  </div>
               </div>
            </div>

            {/* Home Screen Content */}
            <div
              style={{
                width: "100%",
                height: "100%",
                padding: "32px 12px 8px", // Top padding for status bar and notch
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 5,
              }}
            >
               {/* Widgets Row */}
               <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                  {/* Weather Widget */}
                  <div style={{ width: '100px', height: '90px', borderRadius: '16px', background: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)', padding: '10px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                     <div>
                        <div style={{ fontSize: '9px', fontWeight: 'bold' }}>London</div>
                        <div style={{ fontSize: '24px', fontWeight: '300', lineHeight: 1.1 }}>20°</div>
                     </div>
                     <div>
                        <div style={{ fontSize: '12px', marginBottom: '2px' }}>☁️</div>
                        <div style={{ fontSize: '7px', fontWeight: 'bold' }}>Mostly Cloudy</div>
                        <div style={{ fontSize: '6px', opacity: 0.8 }}>H:20° L:13°</div>
                     </div>
                  </div>

                  {/* Calendar Widget */}
                  <div style={{ width: '100px', height: '90px', borderRadius: '16px', background: '#fff', padding: '10px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                     <div style={{ color: '#ff3b30', fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>Wednesday</div>
                     <div style={{ color: '#000', fontSize: '24px', fontWeight: '300', lineHeight: 1.1 }}>21</div>
                     <div style={{ marginTop: 'auto', color: '#8e8e93', fontSize: '8px' }}>No events today</div>
                  </div>
               </div>

               {/* App Grid */}
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px 0px', justifyItems: 'center', flex: 1, alignContent: 'start' }}>
                  
                  {/* Row 1 Apps */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#34c759', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}><FaCamera size={18} /></div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>FaceTime</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#fff', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ color: '#ff3b30', fontSize: '7px', fontWeight: 'bold' }}>WED</div>
                        <div style={{ color: '#000', fontSize: '16px', lineHeight: 1 }}>21</div>
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Calendar</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#fff', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ position: 'absolute', width: 12, height: 12, background: '#ffcc00', borderRadius: '50%', top: 8, left: 8, opacity: 0.8 }} />
                        <div style={{ position: 'absolute', width: 12, height: 12, background: '#ff3b30', borderRadius: '50%', top: 8, right: 8, opacity: 0.8 }} />
                        <div style={{ position: 'absolute', width: 12, height: 12, background: '#4cd964', borderRadius: '50%', bottom: 8, left: 8, opacity: 0.8 }} />
                        <div style={{ position: 'absolute', width: 12, height: 12, background: '#5ac8fa', borderRadius: '50%', bottom: 8, right: 8, opacity: 0.8 }} />
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Photos</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#8e8e93', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#333', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <FaCamera size={20} />
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Camera</span>
                  </div>

                  {/* Row 2 Apps */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#007aff', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        ✉️
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Mail</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#fff', borderRadius: 8, position: 'relative', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '10px', background: '#ffcc00' }} />
                        <div style={{ position: 'absolute', top: '16px', left: '6px', right: '6px', height: '2px', background: '#e5e5ea' }} />
                        <div style={{ position: 'absolute', top: '22px', left: '6px', right: '6px', height: '2px', background: '#e5e5ea' }} />
                        <div style={{ position: 'absolute', top: '28px', left: '6px', right: '6px', height: '2px', background: '#e5e5ea' }} />
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Notes</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#fff', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px', paddingLeft: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                           <div style={{ width: 4, height: 4, background: '#ff3b30', borderRadius: '50%' }} />
                           <div style={{ width: 14, height: 2, background: '#e5e5ea' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                           <div style={{ width: 4, height: 4, background: '#ff9500', borderRadius: '50%' }} />
                           <div style={{ width: 14, height: 2, background: '#e5e5ea' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                           <div style={{ width: 4, height: 4, background: '#007aff', borderRadius: '50%' }} />
                           <div style={{ width: 14, height: 2, background: '#e5e5ea' }} />
                        </div>
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Reminders</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#fff', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ width: 28, height: 28, border: '1px solid #000', borderRadius: '50%', position: 'relative' }}>
                           <div style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 10, background: '#ff3b30', transformOrigin: 'bottom center', transform: 'translate(-50%, -100%) rotate(45deg)' }} />
                           <div style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 12, background: '#000', transformOrigin: 'bottom center', transform: 'translate(-50%, -100%) rotate(-30deg)' }} />
                           <div style={{ position: 'absolute', top: '50%', left: '50%', width: 2, height: 8, background: '#000', transformOrigin: 'bottom center', transform: 'translate(-50%, -100%) rotate(90deg)' }} />
                           <div style={{ position: 'absolute', top: '50%', left: '50%', width: 4, height: 4, background: '#000', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
                        </div>
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Clock</span>
                  </div>

                  {/* Row 3 Apps */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#000', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '9px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <FaApple size={10} />tv
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>TV</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#af52de', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        🎙️
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Podcasts</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#1d8aec', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ position: 'relative', width: 18, height: 18 }}>
                           <div style={{ position: 'absolute', top: 0, left: 7, width: 4, height: 18, background: '#fff', borderRadius: 2, transform: 'rotate(25deg)' }} />
                           <div style={{ position: 'absolute', top: 0, right: 7, width: 4, height: 18, background: '#fff', borderRadius: 2, transform: 'rotate(-25deg)' }} />
                           <div style={{ position: 'absolute', top: 10, left: 3, width: 12, height: 4, background: '#fff', borderRadius: 2 }} />
                        </div>
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>App Store</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#5ac8fa', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ position: 'absolute', width: '150%', height: '150%', background: 'conic-gradient(#4cd964 0 90deg, #5ac8fa 90deg 180deg, #ffcc00 180deg 270deg, #ff3b30 270deg 360deg)' }} />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', borderRadius: '50%', padding: '2px' }}>
                           <div style={{ background: '#007aff', width: 6, height: 6, borderRadius: '50%' }} />
                        </div>
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Maps</span>
                  </div>

                  {/* Row 4 Apps */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#fff', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ff3b30', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <FaHeart size={16} />
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Health</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#000', borderRadius: 8, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <div style={{ width: 20, height: 5, background: '#ff3b30', borderRadius: 2 }} />
                        <div style={{ width: 20, height: 5, background: '#4cd964', borderRadius: 2 }} />
                        <div style={{ width: 20, height: 5, background: '#007aff', borderRadius: 2 }} />
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Wallet</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                     <div style={{ width: 38, height: 38, background: '#8e8e93', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#333', fontSize: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        ⚙️
                     </div>
                     <span style={{ fontSize: '8px', color: '#fff', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Settings</span>
                  </div>
               </div>

               {/* Search Pill */}
               <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px', marginTop: 'auto' }}>
                  <div style={{ background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)', padding: '4px 12px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                     <span style={{ fontSize: '10px', color: '#fff' }}>🔍</span>
                     <span style={{ fontSize: '9px', color: '#fff', fontWeight: '500' }}>Search</span>
                  </div>
               </div>

               {/* Dock */}
               <div style={{ background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(20px)', borderRadius: '22px', padding: '10px', display: 'flex', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                  <div style={{ width: 38, height: 38, background: '#34c759', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                     📞
                  </div>
                  <div style={{ width: 38, height: 38, background: '#fff', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                     <div style={{ width: 28, height: 28, background: '#007aff', borderRadius: '50%', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 3, height: 20, background: '#ff3b30', transformOrigin: 'center', transform: 'translate(-50%, -50%) rotate(45deg)', borderRadius: '2px 2px 0 0' }} />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 3, height: 20, background: '#fff', transformOrigin: 'center', transform: 'translate(-50%, -50%) rotate(45deg)', borderRadius: '0 0 2px 2px' }} />
                        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 5, height: 5, background: '#fff', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
                     </div>
                  </div>
                  <div style={{ width: 38, height: 38, background: '#34c759', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                     💬
                  </div>
                  <div style={{ width: 38, height: 38, background: '#ff3b30', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontSize: '18px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                     🎵
                  </div>
               </div>

            </div>

            {/* Home Indicator */}
            <div
              style={{
                position: "absolute",
                bottom: 6,
                left: "50%",
                transform: "translateX(-50%)",
                width: 80,
                height: 4,
                background: "#ffffff",
                opacity: 0.8,
                borderRadius: 10,
                zIndex: 10,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PremiumDevices;