"use client";

import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  opacity: number;
}

const MAX_PARTICLES = 4_800;
const FRAME_INTERVAL = 1000 / 30;

export default function ForgeUICanvas() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, radius: 120 });
  const isVisibleRef = useRef(true);
  const reducedMotionRef = useRef(false);

  const buildParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    contextRef.current = ctx;

    const { width, height } = canvas;
    const fontSize = Math.max(54, Math.min(width * 0.085, 200));
    const logoX = width / 2;
    const logoY = height / 2;
    const gap = width < 640 ? 6 : width < 1100 ? 5 : 4;

    // The text is only used as a temporary mask. The visible canvas stays
    // transparent so the static background never needs to be redrawn.
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.font = `900 ${fontSize}px "Inter", "Segoe UI", system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("FORGE-UI", logoX, logoY);

    const data = ctx.getImageData(0, 0, width, height).data;
    const sampled: Particle[] = [];

    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        if (data[(y * width + x) * 4 + 3] > 128) {
          sampled.push({
            // Start in place so the logo is visible immediately. The old
            // random start created an unwanted shatter-and-assemble intro.
            x,
            y,
            originX: x,
            originY: y,
            size: 0.8 + Math.random() * 1.1,
            vx: 0,
            vy: 0,
            ease: 0.04 + Math.random() * 0.05,
            friction: 0.85 + Math.random() * 0.08,
            opacity: 0.72 + Math.random() * 0.28,
          });
        }
      }
    }

    // Keep the logo recognizable while putting a hard upper bound on the
    // amount of work done by the animation loop on large screens.
    const stride = Math.max(1, Math.ceil(sampled.length / MAX_PARTICLES));
    particlesRef.current = sampled.filter((_, index) => index % stride === 0);
    ctx.clearRect(0, 0, width, height);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    if (!scene || !canvas) return;

    function animate(time: number) {
      if (!isVisibleRef.current) {
        animationFrameRef.current = null;
        return;
      }

      const animationCanvas = canvasRef.current;
      if (!animationCanvas) {
        animationFrameRef.current = null;
        return;
      }

      const ctx = contextRef.current;
      if (!ctx) return;

      // A 30fps visual layer leaves the main thread more room for scrolling,
      // typing, and auth controls while retaining a smooth-feeling motion.
      if (!reducedMotionRef.current && time - lastFrameRef.current < FRAME_INTERVAL) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameRef.current = time;

      const { width, height } = animationCanvas;
      const mouse = mouseRef.current;
      ctx.clearRect(0, 0, width, height);

      // One batched path is substantially cheaper than a gradient and a path
      // per particle on every frame.
      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark
        ? "rgba(255, 255, 255, 0.86)"
        : "rgba(24, 24, 27, 0.7)";
      ctx.beginPath();
      for (const particle of particlesRef.current) {
        if (!reducedMotionRef.current) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < mouse.radius * mouse.radius) {
            const distance = Math.sqrt(distanceSquared) || 1;
            const force = (mouse.radius - distance) / mouse.radius;
            particle.vx -= (dx / distance) * force * 5;
            particle.vy -= (dy / distance) * force * 5;
          }

          particle.vx += (particle.originX - particle.x) * particle.ease;
          particle.vy += (particle.originY - particle.y) * particle.ease;
          particle.vx *= particle.friction;
          particle.vy *= particle.friction;
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        ctx.moveTo(particle.x + particle.size, particle.y);
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      }
      ctx.fill();

      animationFrameRef.current = reducedMotionRef.current
        ? null
        : requestAnimationFrame(animate);
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = motionQuery.matches;
      if (
        !reducedMotionRef.current &&
        isVisibleRef.current &&
        animationFrameRef.current === null
      ) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    const resize = () => {
      canvas.width = scene.clientWidth || window.innerWidth;
      canvas.height = scene.clientHeight || window.innerHeight;
      buildParticles();
    };

    let resizeFrame: number | null = null;
    const onResize = () => {
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = null;
        resize();
      });
    };

    const setPointer = (x: number, y: number) => {
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };
    const onMouseMove = (event: MouseEvent) => setPointer(event.clientX, event.clientY);
    const onMouseLeave = () => setPointer(-9999, -9999);
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) setPointer(touch.clientX, touch.clientY);
    };
    const onTouchEnd = () => setPointer(-9999, -9999);
    const onVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
      if (isVisibleRef.current && animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    window.addEventListener("resize", onResize);
    resizeObserver.observe(scene);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", updateMotionPreference);
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
      contextRef.current = null;
    };
  }, [buildParticles]);

  return (
    <div
      ref={sceneRef}
      id="forge-ui-canvas-container"
      className="forge-ui-scene"
    >
      <div className="forge-ui-background" aria-hidden="true" />
      <canvas ref={canvasRef} id="forge-ui-canvas" aria-hidden="true" />
    </div>
  );
}
