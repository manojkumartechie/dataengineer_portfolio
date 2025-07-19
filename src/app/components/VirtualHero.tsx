'use client';

import { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';

interface VirtualHeroProps {
  onNavigate: (sectionId: string) => void;
}

const VirtualHero = memo(function VirtualHero({ onNavigate }: VirtualHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Virtual entrance animations
    const tl = gsap.timeline({ delay: 1 });
    
    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 100, rotationX: -45, scale: 0.8 },
        { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.5, ease: "power3.out" }
      );
    }
    
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { opacity: 0, x: -100, rotationY: 45 },
        { opacity: 1, x: 0, rotationY: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      );
    }
    
    if (descriptionRef.current) {
      tl.fromTo(descriptionRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
    }
    
    if (buttonsRef.current) {
      tl.fromTo(buttonsRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.4"
      );
    }

    // Holographic effect
    if (hologramRef.current) {
      gsap.to(hologramRef.current, {
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>, isEntering: boolean, type: 'primary' | 'secondary') => {
    const button = e.currentTarget;
    
    if (isEntering) {
      if (type === 'primary') {
        gsap.to(button, {
          scale: 1.05,
          rotationY: 5,
          boxShadow: '0 0 30px rgba(0, 245, 255, 0.6), 0 0 60px rgba(138, 92, 246, 0.3)',
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(button, {
          scale: 1.05,
          borderColor: 'rgba(0, 245, 255, 0.8)',
          boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)',
          duration: 0.3,
          ease: "power2.out"
        });
      }
    } else {
      gsap.to(button, {
        scale: 1,
        rotationY: 0,
        boxShadow: type === 'primary' 
          ? '0 0 20px rgba(0, 245, 255, 0.3)' 
          : '0 0 10px rgba(0, 245, 255, 0.1)',
        borderColor: type === 'secondary' ? 'rgba(255, 255, 255, 0.3)' : '',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Virtual Reality Grid Overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      {/* Holographic Overlay */}
      <div 
        ref={hologramRef}
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent via-transparent to-purple-500/10 opacity-20"
      />
      
      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          <span className="block">Welcome to the</span>
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Virtual Data Universe
          </span>
        </h1>
        
        <div 
          ref={subtitleRef}
          className="text-xl sm:text-2xl md:text-3xl text-cyan-300 mb-8 flex items-center justify-center space-x-3"
        >
          <span className="animate-pulse text-2xl">🚀</span>
          <span>Manoj Kumar - Quantum Data Engineer</span>
          <span className="animate-pulse text-2xl">⚡</span>
        </div>
        
        <p 
          ref={descriptionRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Navigate through an immersive digital experience showcasing advanced data engineering 
          architectures, real-time processing systems, and AI-powered analytics platforms. 
          Experience the future of data infrastructure in virtual reality.
        </p>
        
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button
            onClick={() => onNavigate('projects')}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 min-h-[56px] text-lg border-2 border-transparent"
            onMouseEnter={(e) => handleButtonHover(e, true, 'primary')}
            onMouseLeave={(e) => handleButtonHover(e, false, 'primary')}
            style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' }}
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>🔮</span>
              <span>Enter Virtual Systems</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={() => onNavigate('contact')}
            className="group px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 min-h-[56px] text-lg"
            onMouseEnter={(e) => handleButtonHover(e, true, 'secondary')}
            onMouseLeave={(e) => handleButtonHover(e, false, 'secondary')}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>📡</span>
              <span>Establish Connection</span>
            </span>
          </button>
        </div>

        {/* Virtual Data Streams Visualization */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: '⚡', label: 'Real-time Processing', value: '10M+/sec' },
            { icon: '🌐', label: 'Cloud Platforms', value: 'Multi-Cloud' },
            { icon: '🧠', label: 'AI Integration', value: 'Neural Nets' },
            { icon: '🔄', label: 'Data Pipelines', value: 'Quantum Scale' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/30 p-4 rounded-xl group-hover:border-cyan-400/50 transition-all duration-300">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-cyan-400 font-bold text-lg">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Data Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float-${i % 4} ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-0 {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(50px); opacity: 0; }
        }
        
        @keyframes float-1 {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(-30px); opacity: 0; }
        }
        
        @keyframes float-2 {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        
        @keyframes float-3 {
          0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(-10px); opacity: 0; }
        }
      `}</style>
    </section>
  );
});

export default VirtualHero;