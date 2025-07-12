import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const shapes = [
  "M50,10 Q90,50 50,90 Q10,50 50,10 Z", // diamond
  "M50,10 Q90,30 90,70 Q50,90 10,70 Q10,30 50,10 Z", // squished diamond
];

export default function SvgMorphDemo() {
  const pathRef = useRef<SVGPathElement>(null);
  const [morphed, setMorphed] = useState(false);

  const morph = () => {
    gsap.to(pathRef.current, {
      attr: { d: morphed ? shapes[0] : shapes[1] },
      duration: 1.2,
      ease: "elastic.inOut(1,0.75)",
    });
    setMorphed((m) => !m);
  };

  return (
    <div className="flex flex-col items-center py-12">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <path
          ref={pathRef}
          d={shapes[0]}
          fill="#4fd1c5"
          stroke="#1d8cf8"
          strokeWidth={3}
        />
      </svg>
      <button className="button-glow mt-4" onClick={morph}>
        Morph Shape
      </button>
    </div>
  );
} 