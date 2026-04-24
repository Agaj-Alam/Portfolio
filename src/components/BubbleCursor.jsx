import React, { useEffect, useRef } from 'react';

export function BubbleCursor({ dark }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    let mouse = { x: -1000, y: -1000 };
    let isHovering = false;
    let isClicking = false;

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });
    
    window.addEventListener('mousedown', () => isClicking = true);
    window.addEventListener('mouseup', () => isClicking = false);
    
    const onOver = (e) => {
      const el = e.target;
      isHovering = !!(
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest?.("a") ||
        el.closest?.("button") ||
        el.dataset?.cursor === "pointer"
      );
    };
    window.addEventListener("mouseover", onOver, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    class Bubble {
      constructor(x, y, isMain = false) {
        this.x = x;
        this.y = y;
        this.isMain = isMain;
        this.size = isMain ? 80 : Math.random() * 25 + 10;
        this.life = 1;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4 - 2; // Float upwards slightly
      }
      
      update(targetX, targetY) {
        if (this.isMain) {
          // Main bubble smoothly follows mouse
          this.x += (targetX - this.x) * 0.3;
          this.y += (targetY - this.y) * 0.3;
          
          // Size adapts to interaction
          const targetSize = isHovering ? 120 : (isClicking ? 60 : 80);
          this.size += (targetSize - this.size) * 0.2;
        } else {
          // Trail bubbles float and fade
          this.x += this.vx;
          this.y += this.vy;
          this.life -= 0.02;
          this.size *= 0.95;
        }
      }
      
      draw() {
        if (this.life <= 0) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0, this.size / 2), 0, Math.PI * 2);
        
        const alpha = this.isMain ? 1 : this.life;
        
        if (this.isMain) {
          if (isHovering) {
            ctx.fillStyle = dark ? `rgba(110, 231, 183, 0.15)` : `rgba(5, 150, 105, 0.1)`;
            ctx.strokeStyle = dark ? `rgba(110, 231, 183, 0.6)` : `rgba(5, 150, 105, 0.5)`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, 0.05)`;
            ctx.strokeStyle = dark ? `rgba(255, 255, 255, 0.4)` : `rgba(0, 0, 0, 0.4)`;
          }
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();
          
          // Small inner dot for main bubble
          if (!isHovering) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = dark ? '#fff' : '#000';
            ctx.fill();
          }
        } else {
          ctx.fillStyle = dark ? `rgba(110, 231, 183, ${alpha * 0.3})` : `rgba(5, 150, 105, ${alpha * 0.3})`;
          ctx.strokeStyle = dark ? `rgba(110, 231, 183, ${alpha * 0.5})` : `rgba(5, 150, 105, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
        }
      }
    }

    const mainBubble = new Bubble(width / 2, height / 2, true);
    const trailBubbles = [];
    
    let lastMouse = { x: mouse.x, y: mouse.y };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Add trail bubbles when moving
      const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
      if (dist > 5 && Math.random() > 0.5) {
        trailBubbles.push(new Bubble(mainBubble.x, mainBubble.y, false));
        lastMouse = { x: mouse.x, y: mouse.y };
      }
      
      mainBubble.update(mouse.x, mouse.y);
      mainBubble.draw();
      
      for (let i = trailBubbles.length - 1; i >= 0; i--) {
        const b = trailBubbles[i];
        b.update();
        b.draw();
        if (b.life <= 0) {
          trailBubbles.splice(i, 1);
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dark]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
      <style>{`@media (pointer: fine) { *, *::before, *::after { cursor: none !important; } }`}</style>
    </>
  );
}
