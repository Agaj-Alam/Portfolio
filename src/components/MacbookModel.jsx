import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { FaApple } from 'react-icons/fa';

export default function MacbookModel({ hovered, dark }) {
  const group = useRef();
  const lidRef = useRef();

  // Smoothly open and close the lid
  useFrame((state, delta) => {
    // Math.PI / 2 (90 degrees) is perfectly closed, resting on the base.
    // -0.35 radians (~ -20 degrees) is a realistic open angle tilting slightly backwards.
    const target = hovered ? -0.35 : Math.PI / 2;
    lidRef.current.rotation.x = THREE.MathUtils.damp(lidRef.current.rotation.x, target, 2, delta);
  });

  const aluminumColor = '#d1d3d6';
  const screenBezelColor = '#050505';
  const keyboardWellColor = '#c5c5c8';

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* ================= HINGE CYLINDER ================= */}
      {/* The pivot point for the screen. Centered at Z = -1.5 */}
      <mesh position={[0, 0.05, -1.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 3.2, 32]} />
        <meshStandardMaterial color={'#b4b4b8'} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* ================= BASE (Keyboard part) ================= */}
      {/* Center is at 0, extends to Z = ±1.5. Top face is at Y = 0.05 */}
      <RoundedBox args={[4, 0.1, 3]} radius={0.03} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color={aluminumColor} roughness={0.4} metalness={0.8} />
      </RoundedBox>

      {/* Keyboard Well */}
      <mesh position={[0, 0.051, -0.1]}>
        <boxGeometry args={[3.4, 0.001, 1.4]} />
        <meshStandardMaterial color={keyboardWellColor} roughness={0.8} />
      </mesh>

      {/* CSS Keyboard embedded exactly on the Keyboard Well */}
      <Html
        transform
        scale={0.01}
        position={[0, 0.052, -0.1]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <div style={{
          width: '380px',
          height: '140px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 10px',
        }}>
           {/* Left Speaker */}
           <div style={{ width: '25px', height: '120px', background: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.8) 1px, transparent 1px)', backgroundSize: '3px 3px', opacity: 0.8, borderRadius: '2px' }} />
           
           <div style={{
             width: '300px',
             height: '130px',
             background: '#c5c5c8',
             borderRadius: '6px',
             boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.3)',
             display: 'grid',
             gridTemplateColumns: 'repeat(15, 1fr)',
             gridTemplateRows: 'repeat(6, 1fr)',
             gap: '3px',
             padding: '4px'
           }}>
             {Array.from({ length: 90 }).map((_, i) => (
               <div key={i} style={{ 
                  background: '#151515', 
                  borderRadius: '3px', 
                  boxShadow: '0 1px 1px rgba(255,255,255,0.2), inset 0 1px 1px rgba(255,255,255,0.1)',
                  gridColumn: (i === 77 || i === 78 || i === 79) ? 'span 2' : 'span 1'
               }} />
             ))}
           </div>

           {/* Right Speaker */}
           <div style={{ width: '25px', height: '120px', background: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.8) 1px, transparent 1px)', backgroundSize: '3px 3px', opacity: 0.8, borderRadius: '2px' }} />
        </div>
      </Html>

      {/* Trackpad */}
      <mesh position={[0, 0.051, 1]}>
        <boxGeometry args={[1.2, 0.001, 0.8]} />
        <meshStandardMaterial color={'#c0c0c4'} roughness={0.5} />
      </mesh>

      {/* Thumb Groove */}
      <mesh position={[0, 0.05, 1.48]}>
        <boxGeometry args={[0.6, 0.02, 0.05]} />
        <meshStandardMaterial color={'#b0b0b4'} roughness={0.6} />
      </mesh>

      {/* ================= LID (Screen part) ================= */}
      {/* Group pivots exactly at the hinge coordinate */}
      <group ref={lidRef} position={[0, 0.05, -1.5]}>
        
        {/* The Aluminum Lid Body */}
        {/* Positioned so its bottom edge rests perfectly on the hinge */}
        <RoundedBox args={[4, 3, 0.06]} radius={0.03} smoothness={4} position={[0, 1.5, -0.03]}>
          <meshStandardMaterial color={aluminumColor} roughness={0.4} metalness={0.8} />
        </RoundedBox>

        {/* Screen Bezel (Black frame) */}
        <mesh position={[0, 1.5, 0.001]}>
          <boxGeometry args={[3.9, 2.9, 0.001]} />
          <meshStandardMaterial color={screenBezelColor} roughness={0.2} />
        </mesh>

        {/* CSS Screen Content (Wallpaper/Website) */}
        <Html
          transform
          scale={0.01}
          position={[0, 1.5, 0.002]} // Slightly above bezel
          rotation={[0, 0, 0]} // Faces forward perfectly
        >
          <div style={{
            width: '380px',
            height: '280px',
            background: '#0a0a0a',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}>
             {/* Notch */}
             <div style={{
               position: 'absolute',
               top: 0, 
               left: '50%',
               transform: 'translateX(-50%)',
               width: '80px',
               height: '18px',
               background: '#050505',
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

                {/* Abstract Background Mountains (CSS shapes) */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', overflow: 'hidden', zIndex: 1 }}>
                   <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '120%', height: '100%', background: 'linear-gradient(to top, #0f0c29, transparent)', zIndex: 2 }} />
                   <div style={{ position: 'absolute', bottom: '-10%', left: '-20%', width: '70%', height: '90%', background: 'linear-gradient(to bottom right, #403b73, #0f0c29)', borderRadius: '100% 100% 0 0', transform: 'rotate(-5deg)', opacity: 0.8 }} />
                   <div style={{ position: 'absolute', bottom: '-5%', right: '-20%', width: '80%', height: '80%', background: 'linear-gradient(to bottom left, #34345e, #0f0c29)', borderRadius: '100% 100% 0 0', transform: 'rotate(8deg)', opacity: 0.7 }} />
                   <div style={{ position: 'absolute', bottom: '-15%', left: '5%', width: '90%', height: '60%', background: 'linear-gradient(to top, #000, #302b63)', borderRadius: '100% 100% 0 0', opacity: 0.9 }} />
                </div>
             </div>
          </div>
        </Html>

        {/* Apple Logo (Back of the Lid) */}
        {/* Placed accurately on the back face and rotated so it shows outward */}
        <Html
          transform
          scale={0.01}
          position={[0, 1.5, -0.061]} // Behind the lid's Z depth
          rotation={[0, Math.PI, 0]} // Face backwards
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100px',
            height: '100px',
          }}>
            <FaApple size={48} color="#8a8a8e" />
          </div>
        </Html>

      </group>
    </group>
  );
}
