'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function LightingEffects() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Pulsing glow effect
    gsap.to(glow, {
      scale: 1.2,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
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