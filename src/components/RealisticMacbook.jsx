import React from 'react';
import { motion } from 'framer-motion';
import { FaApple } from 'react-icons/fa';

export default function RealisticMacbook({ hovered, dark }) {
  return (
    <div style={{
      perspective: '2500px',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'scale(1.05)',
    }}>
      {/* WRAPPER */}
      <motion.div
        animate={{
          rotateX: hovered ? 5 : 15, // 15 makes the base perfectly horizontal to the camera
          rotateY: 0, // Always perfectly straight-on
          y: hovered ? 0 : 30, 
        }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }} // Premium, slow Apple-like ease
        style={{
          position: 'relative',
          width: '380px',
          height: '260px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ================= LID (Screen) ================= */}
        <motion.div
          animate={{
            rotateX: hovered ? -10 : -104.5, // Exactly meets the base to close perfectly
          }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            bottom: '50%', // Hinge at Y=50%
            left: '0',
            width: '100%',
            height: '260px',
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            zIndex: 2,
          }}
        >
          {/* Back of the Lid (Aluminum with Apple Logo) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, #eef0f2, #d1d3d6)',
            borderRadius: '16px 16px 0 0',
            backfaceVisibility: 'hidden',
            // Flips it to face outwards, and rotates Z so the logo is upright when closed!
            transform: 'rotateY(180deg) rotateZ(180deg) translateZ(1px)',
            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.6), 0 -2px 10px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FaApple size={48} color="#8a8a8e" />
          </div>

          {/* Front of the Lid (Screen + Bezel) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#000',
            borderRadius: '16px 16px 0 0',
            border: '2px solid #555', // Outer aluminum lip
            boxShadow: 'inset 0 0 0 2px #000', // Inner black
            backfaceVisibility: 'hidden',
            transform: 'translateZ(1px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px 12px 24px 12px', // Bezel thickness
          }}>
             {/* Top Lip of Lid (Simulated Thickness) */}
             <div style={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '6px',
               background: 'linear-gradient(to right, #b4b4b8, #eef0f2 10%, #eef0f2 90%, #b4b4b8)',
               borderRadius: '12px 12px 0 0',
               transformOrigin: 'top center',
               transform: 'rotateX(-90deg)',
             }} />

             {/* Notch */}
             <div style={{
               position: 'absolute',
               top: 12,
               left: '50%',
               transform: 'translateX(-50%)',
               width: '80px',
               height: '18px',
               background: '#000',
               borderRadius: '0 0 8px 8px',
               zIndex: 10,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               gap: '10px'
             }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#111', border: '1px solid #222' }} />
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#10b981', opacity: hovered ? 0.8 : 0, transition: 'opacity 0.3s' }} />
             </div>
             
             {/* Screen Content - Website */}
             <div style={{
               flex: 1,
               background: '#0f0c29',
               borderRadius: '4px',
               overflow: 'hidden',
               position: 'relative'
             }}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  background: 'linear-gradient(to bottom, rgba(15,12,41,1) 0%, rgba(48,43,99,1) 50%, rgba(36,36,62,1) 100%)',
                  backgroundSize: 'cover', 
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}>
                   {/* Navbar */}
                   <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', color: '#fff', alignItems: 'center' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '12px', letterSpacing: '1px' }}>MR</div>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '8px', color: '#aaa' }}>
                         <span style={{color: '#fff'}}>Home</span>
                         <span>About</span>
                         <span>Projects</span>
                         <span>Contact</span>
                      </div>
                   </div>

                   {/* Hero Text */}
                   <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2 }}>
                      <h2 style={{ color: '#fff', fontSize: '18px', margin: 0, fontWeight: 600, lineHeight: 1.2 }}>
                         Creative Developer & <br />
                         <span style={{ color: '#b695ff' }}>UI/UX</span> Designer
                      </h2>
                      <p style={{ color: '#999', fontSize: '8px', margin: 0, maxWidth: '60%', lineHeight: 1.4 }}>
                         I build modern, responsive websites and beautiful digital experiences.
                      </p>
                      <div style={{ marginTop: '8px' }}>
                         <button style={{ 
                            background: '#b695ff', 
                            color: '#fff', 
                            border: 'none', 
                            padding: '6px 12px', 
                            borderRadius: '12px', 
                            fontSize: '8px',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer'
                         }}>
                            View Work <span style={{ fontSize: '6px' }}>↗</span>
                         </button>
                      </div>
                   </div>

                   {/* Abstract Background Mountains */}
                   <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', overflow: 'hidden', zIndex: 1 }}>
                      <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '120%', height: '100%', background: 'linear-gradient(to top, #0f0c29, transparent)', zIndex: 2 }} />
                      <div style={{ position: 'absolute', bottom: '-10%', left: '-20%', width: '70%', height: '90%', background: 'linear-gradient(to bottom right, #403b73, #0f0c29)', borderRadius: '100% 100% 0 0', transform: 'rotate(-5deg)', opacity: 0.8 }} />
                      <div style={{ position: 'absolute', bottom: '-5%', right: '-20%', width: '80%', height: '80%', background: 'linear-gradient(to bottom left, #34345e, #0f0c29)', borderRadius: '100% 100% 0 0', transform: 'rotate(8deg)', opacity: 0.7 }} />
                      <div style={{ position: 'absolute', bottom: '-15%', left: '5%', width: '90%', height: '60%', background: 'linear-gradient(to top, #000, #302b63)', borderRadius: '100% 100% 0 0', opacity: 0.9 }} />
                   </div>
                </div>
             </div>
          </div>
        </motion.div>

        {/* ================= HINGE CYLINDER ================= */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '12%',
          width: '76%',
          height: '14px',
          background: '#b4b4b8',
          borderRadius: '7px',
          transform: 'translateY(-50%) translateZ(2px)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
          zIndex: 3,
        }} />

        {/* ================= BASE (Keyboard part) ================= */}
        <div style={{
          position: 'absolute',
          top: '50%', // Hinge at Y=50%
          left: '0', 
          width: '100%',
          height: '260px',
          background: 'linear-gradient(to bottom, #dcdce0, #b4b4b8)',
          transformOrigin: 'top center',
          transform: 'rotateX(75deg)', // Lay almost flat, coming towards viewer
          borderRadius: '0 0 16px 16px', // Rounded front corners
          boxShadow: '0 30px 40px rgba(0,0,0,0.6), inset 0 2px 2px rgba(255,255,255,0.8), inset 0 -2px 5px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '20px',
          zIndex: 1,
          transformStyle: 'preserve-3d',
        }}>
           <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 20px', alignItems: 'center' }}>
              {/* Left Speaker */}
              <div style={{ width: '25px', height: '110px', background: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.9) 1px, transparent 1px)', backgroundSize: '3px 3px', opacity: 0.4, borderRadius: '2px', boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.5)' }} />
              
              {/* Keyboard Well */}
              <div style={{
                width: '78%',
                height: '115px',
                background: 'linear-gradient(to bottom, #a0a0a5, #c5c5c8)', // Darker top inside
                borderRadius: '6px',
                boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.7)',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'repeat(15, 1fr)',
                gridTemplateRows: 'repeat(6, 1fr)',
                gap: '3px',
                padding: '4px',
                transformStyle: 'preserve-3d',
              }}>
                {Array.from({ length: 90 }).map((_, i) => (
                  <div key={i} style={{ 
                     background: 'linear-gradient(to bottom, #2a2a2a, #111)',
                     borderRadius: '3px', 
                     border: '1px solid #000',
                     borderBottom: '2px solid #000',
                     boxShadow: '0 2px 4px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)',
                     gridColumn: (i === 77 || i === 78 || i === 79) ? 'span 2' : 'span 1',
                     transform: 'translateZ(2px)', // Pop keys out!
                  }} />
                ))}
              </div>

              {/* Right Speaker */}
              <div style={{ width: '25px', height: '110px', background: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.9) 1px, transparent 1px)', backgroundSize: '3px 3px', opacity: 0.4, borderRadius: '2px', boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.5)' }} />
           </div>
           
           {/* Thumb groove */}
           <div style={{
             marginTop: '12px',
             width: '50px',
             height: '7px',
             background: 'linear-gradient(to bottom, #a0a0a5, #d8d8dc)',
             borderRadius: '0 0 6px 6px',
             boxShadow: 'inset 0 3px 4px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.8)'
           }} />

           {/* Trackpad */}
           <div style={{
             marginTop: '4px',
             width: '36%',
             height: '80px',
             background: 'linear-gradient(to bottom, #cfcfd1, #c5c5c8)',
             borderRadius: '6px',
             boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15), inset 0 1px 1px rgba(0,0,0,0.2), 0 1px 0 rgba(255,255,255,0.7)',
             border: '1px solid #b4b4b8',
           }} />
           
           {/* Bottom Lip (Simulated Thickness & Thumb Groove) */}
           <div style={{
             position: 'absolute',
             bottom: '0px',
             left: 0,
             width: '100%',
             height: '7px',
             background: 'linear-gradient(to right, #a0a0a5, #c8c8cc 10%, #c8c8cc 90%, #a0a0a5)',
             borderRadius: '0 0 12px 12px',
             transformOrigin: 'bottom center',
             transform: 'translateY(0%) rotateX(-90deg)',
             display: 'flex',
             justifyContent: 'center',
           }}>
              {/* Thumb groove */}
              <div style={{
                 width: '60px',
                 height: '3px',
                 background: '#909095',
                 borderRadius: '0 0 4px 4px',
                 boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
              }} />
           </div>
        </div>
      </motion.div>
    </div>
  );
}
