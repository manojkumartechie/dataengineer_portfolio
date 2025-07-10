import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Interactive3DCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const percentX = (x / rect.width) - 0.5;
      const percentY = (y / rect.height) - 0.5;
      gsap.to(card, {
        rotateY: percentX * 30,
        rotateX: -percentY * 30,
        transformPerspective: 700,
        ease: "expo.out",
        duration: 0.4,
      });
    };

    const reset = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "expo.out" });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", reset);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="card shadow-glow p-8 max-w-md text-center transition-all duration-300 hover:shadow-glow-lg"
      style={{ willChange: "transform", cursor: "pointer" }}
    >
      <h2 className="text-2xl font-bold mb-2">AI 3D Parallax Card</h2>
      <p>Move your mouse over this card for a 3D effect!</p>
    </div>
  );
} 