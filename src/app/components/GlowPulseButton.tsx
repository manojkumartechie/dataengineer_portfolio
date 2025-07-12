import { useRef } from "react";
import gsap from "gsap";

export default function GlowPulseButton() {
  const btnRef = useRef<HTMLButtonElement>(null);

  const pulse = () => {
    gsap.fromTo(
      btnRef.current,
      {
        boxShadow: "0 0 8px 2px #4fd1c5",
        filter: "blur(0px)",
      },
      {
        boxShadow: "0 0 24px 8px #00fff0",
        filter: "blur(2px)",
        duration: 0.6,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      }
    );
  };

  return (
    <button ref={btnRef} className="button-glow" onClick={pulse}>
      Pulse Glow
    </button>
  );
} 