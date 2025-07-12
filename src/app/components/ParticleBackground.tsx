'use client';

import { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  element: HTMLDivElement;
}

// Memoized component to prevent unnecessary re-renders
const ParticleBackground = memo(function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduced particle count for better performance
    const particleCount = window.innerWidth > 1200 ? 30 : 20;

    const createParticle = (): Particle => {
      const element = document.createElement('div');
      element.className = 'absolute rounded-full bg-blue-400 opacity-20 will-change-transform';
      
      const size = Math.random() * 3 + 1; // Smaller particles
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      
      container.appendChild(element);

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement
        vy: (Math.random() - 0.5) * 0.3,
        size,
        opacity: Math.random() * 0.4 + 0.1,
        element
      };
    };

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle());
    }

    // Optimized animation loop with frame rate limiting
    let lastTime = 0;
    const targetFPS = 30; // Reduced FPS
    const frameInterval = 1000 / targetFPS;

    const animateParticles = (currentTime: number) => {
      animationIdRef.current = requestAnimationFrame(animateParticles);
      
      if (currentTime - lastTime >= frameInterval) {
        particlesRef.current.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around screen
          if (particle.x < 0) particle.x = window.innerWidth;
          if (particle.x > window.innerWidth) particle.x = 0;
          if (particle.y < 0) particle.y = window.innerHeight;
          if (particle.y > window.innerHeight) particle.y = 0;

          // Use transform for better performance
          particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`;
        });
        
        lastTime = currentTime;
      }
    };

    animateParticles(0);

    // Throttled mouse interaction
    let isMouseInteracting = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseInteracting) return;
      isMouseInteracting = true;

      requestAnimationFrame(() => {
        particlesRef.current.forEach(particle => {
          const dx = e.clientX - particle.x;
          const dy = e.clientY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) { // Reduced interaction radius
            const force = (80 - distance) / 80;
            particle.vx -= (dx / distance) * force * 0.005; // Reduced force
            particle.vy -= (dy / distance) * force * 0.005;
          }
        });
        
        isMouseInteracting = false;
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      particlesRef.current.forEach(particle => {
        if (container.contains(particle.element)) {
          container.removeChild(particle.element);
        }
      });
      particlesRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
});

export default ParticleBackground;