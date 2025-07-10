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
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const description = descriptionRef.current;
    const buttons = buttonsRef.current;

    if (!hero || !title || !subtitle || !description || !buttons) return;

    // Initial entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(title, 
      { 
        opacity: 0, 
        y: 100,
        rotationX: 90,
        transformPerspective: 1000
      },
      { 
        opacity: 1, 
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.8)"
      }
    )
    .fromTo(subtitle,
      { 
        opacity: 0, 
        scale: 0.5,
        filter: 'blur(20px)'
      },
      { 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: "back.out(1.7)"
      },
      "-=0.6"
    )
    .fromTo(description,
      { 
        opacity: 0, 
        y: 50
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.4"
    )
    .fromTo(buttons.children,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      },
      "-=0.4"
    );

    // Parallax scroll effect
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(title, {
          y: progress * -100,
          opacity: 1 - progress * 0.5,
          duration: 0.1
        });
        gsap.to(subtitle, {
          y: progress * -80,
          opacity: 1 - progress * 0.7,
          duration: 0.1
        });
        gsap.to(description, {
          y: progress * -60,
          opacity: 1 - progress * 0.8,
          duration: 0.1
        });
      }
    });

    // Floating animation for title
    gsap.to(title, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
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
      
      <div className="relative z-20 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-left lg:text-left">
            <h1 
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Manoj Kumar
              </span>
            </h1>
            
            <div 
              ref={subtitleRef}
              className="text-2xl md:text-3xl text-blue-300 mb-6 flex items-center space-x-3"
            >
              <span className="animate-pulse">📊</span>
              <span>Data Engineer & Analytics Expert</span>
            </div>
            
            <p 
              ref={descriptionRef}
              className="text-lg text-gray-300 mb-12 max-w-2xl leading-relaxed"
            >
              I architect scalable data pipelines, design efficient data infrastructures, 
              and transform complex datasets into actionable business insights. Passionate 
              about big data technologies, cloud-native solutions, and real-time analytics.
            </p>
            
            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
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
                className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
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

          {/* 3D Interactive Element */}
          <div className="relative">
            <div className="w-full h-96 relative">
              <ThreeScene />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}