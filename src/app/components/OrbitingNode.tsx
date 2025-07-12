import { useEffect } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

export default function OrbitingNode() {
  useEffect(() => {
    gsap.to(".ai-node", {
      motionPath: {
        path: "#orbitPath",
        align: "#orbitPath",
        autoRotate: true,
      },
      duration: 6,
      repeat: -1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="flex justify-center py-12">
      <svg width="300" height="300">
        <path
          id="orbitPath"
          d="M150,150 m-100,0 a100,100 0 1,0 200,0 a100,100 0 1,0 -200,0"
          fill="none"
          stroke="#4fd1c5"
        />
        <circle className="ai-node" r="12" fill="#1d8cf8" />
      </svg>
    </div>
  );
} 