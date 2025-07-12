'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ThreeScene from './ThreeScene';
gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export default function AdvancedHero({ scrollToSection }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove all GSAP and ScrollTrigger animation for hero title, subtitle, and description
  }, []);

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-purple-900/90 z-10"></div>
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-5">
        <ThreeScene />
      </div>
      
      {/* Overlayed Text Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pointer-events-none">
        <h1 
          ref={titleRef}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Manoj Kumar
          </span>
        </h1>
        <div 
          ref={subtitleRef}
          className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-blue-300 mb-4 sm:mb-6 flex items-center justify-center space-x-2 sm:space-x-3 drop-shadow"
        >
          <span className="animate-pulse">📊</span>
          <span>Data Engineer & Analytics Expert</span>
        </div>
        <p 
          ref={descriptionRef}
          className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow px-4"
        >
          I architect scalable data pipelines, design efficient data infrastructures, 
          and transform complex datasets into actionable business insights. Passionate 
          about big data technologies, cloud-native solutions, and real-time analytics.
        </p>
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pointer-events-auto px-4"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[44px] text-sm sm:text-base"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
                duration: 0.3
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                duration: 0.3
              });
            }}
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 min-h-[44px] text-sm sm:text-base"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: 'rgba(59, 130, 246, 0.8)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                duration: 0.3
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                borderColor: 'rgba(255, 255, 255, 0.3)',
                backgroundColor: 'transparent',
                duration: 0.3
              });
            }}
          >
            Let's Connect
          </button>
        </div>
      </div>
    </section>
  );
}