'use client';

import { useRef, useEffect } from 'react';
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

export default function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = (): Particle => {
      const element = document.createElement('div');
      element.className = 'absolute rounded-full bg-blue-400 opacity-20';
      
      const size = Math.random() * 4 + 1;
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
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size,
        opacity: Math.random() * 0.5 + 0.1,
        element
      };
    };

    // Create particles
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push(createParticle());
    }

    const animateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;

        gsap.set(particle.element, {
          x: particle.x,
          y: particle.y
        });
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      particlesRef.current.forEach(particle => {
        const dx = e.clientX - particle.x;
        const dy = e.clientY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx -= (dx / distance) * force * 0.01;
          particle.vy -= (dy / distance) * force * 0.01;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      particlesRef.current.forEach(particle => {
        particle.element.remove();
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
}