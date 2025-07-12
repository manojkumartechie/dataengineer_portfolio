'use client';

import { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Memoized component to prevent unnecessary re-renders
const AdvancedProjectCard = memo(function AdvancedProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!card || !image || !content) return;

    // Optimized entrance animation with reduced complexity
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
        once: true // Only animate once for better performance
      }
    });

    tl.fromTo(card,
      { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1, // Reduced stagger delay
        ease: "power2.out"
      }
    );

    // Simplified hover effects for better performance
    let hoverTween: gsap.core.Tween | null = null;
    let imageTween: gsap.core.Tween | null = null;

    const handleMouseEnter = () => {
      // Kill existing tweens to prevent conflicts
      if (hoverTween) hoverTween.kill();
      if (imageTween) imageTween.kill();

      hoverTween = gsap.to(card, {
        scale: 1.03,
        duration: 0.3,
        ease: "power2.out"
      });

      imageTween = gsap.to(image, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });

      // Animate tech tags with reduced complexity
      gsap.fromTo('.tech-tag',
        { scale: 0.95 },
        { 
          scale: 1, 
          duration: 0.2,
          stagger: 0.03,
          ease: "power2.out"
        }
      );
    };

    const handleMouseLeave = () => {
      if (hoverTween) hoverTween.kill();
      if (imageTween) imageTween.kill();

      hoverTween = gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      imageTween = gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (hoverTween) hoverTween.kill();
      if (imageTween) imageTween.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === card) trigger.kill();
      });
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative glass-card overflow-hidden rounded-2xl will-change-transform"
    >
      {/* Simplified animated border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      <div className="absolute inset-0.5 bg-slate-900 rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl mb-6">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover will-change-transform"
            loading="lazy" // Lazy loading for better performance
            decoding="async" // Async decoding
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Overlay buttons */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105"
                  aria-label={`View live demo of ${project.title}`}
                >
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 transform hover:scale-105"
                  aria-label={`View source code of ${project.title}`}
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef}>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 6).map((tech, techIndex) => ( // Limit to 6 tags for better layout
              <span
                key={techIndex}
                className="tech-tag px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 6 && (
              <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-sm rounded-full">
                +{project.tech.length - 6} more
              </span>
            )}
          </div>

          {/* Mobile buttons */}
          <div className="flex gap-3 md:hidden">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                aria-label={`View live demo of ${project.title}`}
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                aria-label={`View source code of ${project.title}`}
              >
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdvancedProjectCard;