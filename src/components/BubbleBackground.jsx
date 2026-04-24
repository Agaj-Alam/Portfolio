import React, { useEffect, useRef } from "react";

export default function BubbleBackground({ dark = true }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width, height, dpr;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = window.devicePixelRatio || 1;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener("resize", resize);

        const mouse = { x: width / 2, y: height / 2 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // 🎨 Softer professional palette
        const colors = [
            "rgba(147,197,253,0.4)",
            "rgba(168,85,247,0.35)",
            "rgba(34,211,238,0.35)",
        ];

        class Bubble {
            constructor(x, y, r) {
                this.x = x;
                this.y = y;
                this.r = r;

                this.color =
                    colors[Math.floor(Math.random() * colors.length)];

                this.speed = r > 60 ? 0.0015 : 0.003;

                this.vx = (Math.random() - 0.5) * 0.15;
                this.vy = (Math.random() - 0.5) * 0.15;

                this.angle = Math.random() * Math.PI * 2;
            }

            update() {
                this.angle += this.speed;

                this.x += this.vx + Math.sin(this.angle) * 0.2;
                this.y += this.vy + Math.cos(this.angle) * 0.2;

                this.y -= 0.02; // slower floating

                // 🖱️ mouse repel (very subtle)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }

                // wrap edges
                if (this.x < -this.r) this.x = width + this.r;
                if (this.x > width + this.r) this.x = -this.r;
                if (this.y < -this.r) this.y = height + this.r;
                if (this.y > height + this.r) this.y = -this.r;
            }

            draw() {
                // 🎯 Strong center fade (focus text)
                const centerX = width / 2;
                const centerY = height / 2;

                const dx = this.x - centerX;
                const dy = this.y - centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const fadeRadius = 420; // increased
                const alpha = dist < fadeRadius ? dist / fadeRadius : 1;

                ctx.globalAlpha = alpha;

                const g = ctx.createRadialGradient(
                    this.x,
                    this.y,
                    this.r * 0.3,
                    this.x,
                    this.y,
                    this.r
                );

                // 🔥 reduced opacity
                g.addColorStop(0, this.color.replace(/0\.\d+/, "0.12"));
                g.addColorStop(0.7, this.color.replace(/0\.\d+/, "0.05"));
                g.addColorStop(1, "rgba(0,0,0,0)");

                ctx.beginPath();
                ctx.fillStyle = g;
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fill();

                ctx.globalAlpha = 1;
            }
        }

        const bubbles = [];

        // 🔵 fewer + smaller bubbles

        // large
        for (let i = 0; i < 3; i++) {
            bubbles.push(
                new Bubble(
                    Math.random() * width,
                    Math.random() * height,
                    Math.random() * 50 + 70
                )
            );
        }

        // medium
        for (let i = 0; i < 6; i++) {
            bubbles.push(
                new Bubble(
                    Math.random() * width,
                    Math.random() * height,
                    Math.random() * 30 + 40
                )
            );
        }

        let animationId;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            bubbles.forEach((b) => {
                b.update();
                b.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", resize);
        };
    }, [dark]);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                overflow: "hidden",
                background: dark
                    ? `
          radial-gradient(circle at 20% 20%, rgba(14,165,233,0.12), transparent 60%),
          radial-gradient(circle at 80% 30%, rgba(139,92,246,0.08), transparent 60%),
          #020617
        `
                    : "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    filter: "blur(0.5px)", // reduced blur
                    opacity: 1,
                }}
            />
        </div>
    );
}