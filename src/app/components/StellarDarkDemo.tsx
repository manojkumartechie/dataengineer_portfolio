import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function StellarDarkDemo() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          scale: 0.7,
          rotateY: 60,
          rotateX: 20,
          transformPerspective: 800,
        },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground dark:bg-background dark:text-foreground">
      <div
        ref={cardRef}
        className="card shadow-glow animate-glow p-8 max-w-md text-center transition-all duration-300 hover:shadow-glow-lg"
      >
        <h2 className="text-3xl font-bold mb-4">Stellar Dark Demo</h2>
        <p className="mb-6">This card demonstrates a modern dark theme, smooth transitions, lighting/glow effects, and a GSAP-powered 3D entrance animation.</p>
        <button className="button-glow">Try Me</button>
      </div>
    </div>
  );
} 