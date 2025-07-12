'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function AnimatedBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    // Animate gradient: forward (45deg) to backward (135deg) and back, smoothly
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(bg, {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      duration: 4,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 opacity-10 dark:opacity-5 z-0"
      style={{
        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
      }}
    />
  );
}