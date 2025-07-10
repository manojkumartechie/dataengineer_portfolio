'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function LightingEffects() {
  const lightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    const glow = glowRef.current;
    if (!light || !glow) return;

    // Animated light sweep
    const lightSweep = gsap.timeline({ repeat: -1 });
    lightSweep.to(light, {
      x: '100vw',
      duration: 8,
      ease: "power2.inOut"
    })
    .set(light, { x: '-200px' });

    // Pulsing glow effect
    gsap.to(glow, {
      scale: 1.2,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Scroll-triggered lighting
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(light, {
          opacity: 0.3 + (progress * 0.4),
          duration: 0.1
        });
      }
    });

    return () => {
      lightSweep.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Light sweep */}
      <div
        ref={lightRef}
        className="fixed top-0 left-0 w-48 h-full opacity-20 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
          transform: 'skewX(-20deg)',
          x: '-200px'
        }}
      />
      
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="fixed top-1/2 left-1/2 w-96 h-96 opacity-10 pointer-events-none z-5"
        style={{
          background: 'radial-gradient(circle, rgba(79,209,197,0.6) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  );
}