'use client';

import { useRef, useEffect } from 'react';
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

export default function AdvancedProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!card || !image || !content) return;

    // Entrance animation
    gsap.fromTo(card,
      { 
        opacity: 0, 
        y: 100,
        rotationY: -30,
        transformPerspective: 1000
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        delay: index * 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 3D hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out"
      });

      // Parallax effect on image
      gsap.to(image, {
        x: (x - centerX) / 20,
        y: (y - centerY) / 20,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.8)"
      });

      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.8)"
      });
    };

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      gsap.to(image, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      // Animate tech tags
      gsap.fromTo('.tech-tag',
        { scale: 0.8, opacity: 0.7 },
        { 
          scale: 1, 
          opacity: 1,
          duration: 0.2,
          stagger: 0.05,
          ease: "back.out(1.7)"
        }
      );
    };

    const handleMouseLeaveScale = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', () => {
      handleMouseLeave();
      handleMouseLeaveScale();
    });
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative glass-card overflow-hidden rounded-2xl"
      style={{ 
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {/* Animated border */}
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
            className="w-full h-48 object-cover"
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
          
          <p className="text-gray-300 mb-4 leading-relaxed">
            {project.description}
          </p>
          
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="tech-tag px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Mobile buttons */}
          <div className="flex gap-3 md:hidden">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
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
              >
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}