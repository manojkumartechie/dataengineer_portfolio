'use client';

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Hero({ scrollToSection }: HeroProps) {
  const profileRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Remove GSAP animation for hero title
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-2 sm:px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-4 w-14 h-14 sm:w-20 sm:h-20 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-4 w-20 h-20 sm:w-32 sm:h-32 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-10 h-10 sm:w-16 sm:h-16 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse delay-500"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="animate-fade-in-up">
          
          <h1 className="hero-title text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 relative inline-block overflow-hidden">
            Hi, I'm <span className="highlight text-blue-600 dark:text-blue-400 relative z-10">Manoj Kumar</span>
            <span ref={sweepRef} className="light-sweep absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-white/80 to-transparent pointer-events-none" style={{transform: 'translateX(-120%)', filter: 'blur(8px)', zIndex: 20}}></span>
          </h1>
          
          <div className="text-lg xs:text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-3 sm:mb-4">
            <span className="inline-block animate-bounce">📊</span> Data Engineer
          </div>
          
          <p className="text-base xs:text-lg text-slate-500 dark:text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
            I build scalable data pipelines, design efficient data architectures, and transform raw data into actionable insights. 
            Passionate about big data technologies and cloud-native solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <button
              onClick={() => scrollToSection('projects')}
              className="glass-btn min-h-[44px] min-w-[44px]"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="glass-btn min-h-[44px] min-w-[44px]"
            >
              Get In Touch
            </button>
          </div>
          
          {/* Social links */}
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/manojkumartechie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/manojkumartechie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com/manojkumartechie" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 