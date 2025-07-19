'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function LoadingSpinner() {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spinner = spinnerRef.current;
    const particles = particlesRef.current;
    
    if (spinner) {
      // Main spinner rotation
      gsap.to(spinner, {
        rotation: 360,
        duration: 2,
        repeat: -1,
        ease: "none"
      });

      // Pulsing effect
      gsap.to(spinner, {
        scale: 1.1,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });
    }

    if (particles) {
      // Animate loading particles
      const particleElements = particles.querySelectorAll('.loading-particle');
      particleElements.forEach((particle, index) => {
        gsap.to(particle, {
          rotation: 360,
          duration: 3 + index * 0.5,
          repeat: -1,
          ease: "none"
        });

        gsap.to(particle, {
          scale: 1.2,
          duration: 1.5,
          delay: index * 0.2,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut"
        });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          animation: 'matrix-scroll 10s linear infinite'
        }}></div>
      </div>

      <div className="text-center relative z-10">
        {/* Main Spinner */}
        <div className="relative mb-8">
          <div 
            ref={spinnerRef}
            className="w-24 h-24 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full mx-auto mb-6"
          />
          
          {/* Outer ring */}
          <div className="absolute inset-0 w-32 h-32 border-2 border-purple-500/20 rounded-full animate-spin-slow mx-auto"></div>
          
          {/* Inner core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
          Initializing Virtual Universe
        </h2>
        
        <div className="space-y-2">
          <p className="text-gray-400">Loading quantum data structures...</p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Loading Particles */}
        <div ref={particlesRef} className="mt-12">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="loading-particle absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
              style={{
                left: `${50 + Math.cos(i * Math.PI / 4) * 100}px`,
                top: `${50 + Math.sin(i * Math.PI / 4) * 100}px`,
              }}
            />
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse rounded-full" 
                 style={{ animation: 'loading-progress 3s ease-in-out infinite' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Establishing neural connections...</p>
        </div>

        {/* System Status */}
        <div className="mt-8 text-left max-w-md mx-auto space-y-1">
          {[
            'Initializing holographic interface...',
            'Loading matrix rain algorithms...',
            'Establishing data pipeline connections...',
            'Calibrating virtual reality systems...',
            'Activating neural network protocols...'
          ].map((status, index) => (
            <div 
              key={index}
              className="text-xs text-green-400 font-mono opacity-0"
              style={{ 
                animation: `fade-in-up 0.5s ease-out ${index * 0.3}s forwards`
              }}
            >
              &gt; {status}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes matrix-scroll {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, 30px); }
        }
        
        @keyframes loading-progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 0.7;
            transform: translateY(0);
          }
        }
        
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
      `}</style>
    </div>
  );
}