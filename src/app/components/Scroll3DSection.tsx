import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Scroll3DSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 100, opacity: 0, rotateY: 0 },
      {
        y: -100,
        opacity: 1,
        rotateY: 45,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-background">
      <div
        ref={cardRef}
        className="card shadow-glow p-8 max-w-md text-center transition-all duration-300"
      >
        <h2 className="text-2xl font-bold mb-2">Scroll-Triggered 3D Reveal</h2>
        <p>This card animates in 3D as you scroll!</p>
      </div>
    </section>
  );
} 