import React, { useEffect, useRef } from 'react';

export function LiveCanvasBg({ dark }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0 };
    
    window.addEventListener('mousemove', (e) => {
      mouse.vx = e.clientX - mouse.x;
      mouse.vy = e.clientY - mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    class Orb {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.radius = radius;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.02 + 0.01;
      }
      
      update() {
        this.angle += this.speed;
        this.x += this.vx + Math.sin(this.angle) * 0.5;
        this.y += this.vy + Math.cos(this.angle) * 0.5;

        // Bounce off walls
        if (this.x < -this.radius) this.vx *= -1;
        if (this.x > width + this.radius) this.vx *= -1;
        if (this.y < -this.radius) this.vy *= -1;
        if (this.y > height + this.radius) this.vy *= -1;

        // Mouse interaction (gentle attraction/repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          const force = (300 - distance) / 300;
          this.x -= dx * force * 0.03;
          this.y -= dy * force * 0.03;
        }
      }
      
      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        
        // Parse hex color to rgb to add alpha
        const r = parseInt(this.color.slice(1, 3), 16);
        const g = parseInt(this.color.slice(3, 5), 16);
        const b = parseInt(this.color.slice(5, 7), 16);
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const orbs = [];
    const colors = dark 
      ? ['#6ee7b7', '#c4b5fd', '#8b5cf6', '#0ea5e9'] // Dark mode colors
      : ['#34d399', '#a78bfa', '#60a5fa', '#f472b6']; // Light mode colors

    // Create 5 large blurred orbs
    for (let i = 0; i < 6; i++) {
      const radius = Math.random() * 200 + 150;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const color = colors[i % colors.length];
      orbs.push(new Orb(x, y, radius, color));
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.globalCompositeOperation = dark ? 'screen' : 'multiply';
      
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dark]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: dark ? '#030712' : '#f8fafc',
        transition: 'background 0.5s ease',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          filter: 'blur(60px)',
          opacity: dark ? 0.6 : 0.4
        }}
      />
      {/* Noise overlay for texture */}
      <div style={{ position: "absolute", inset: 0, opacity: dark ? 0.04 : 0.02, zIndex: 10 }}>
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </div>
  );
}
