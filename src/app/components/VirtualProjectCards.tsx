'use client';

import { useRef, useEffect, memo, useState } from 'react';
import gsap from 'gsap';

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  architecture?: string;
  metrics?: string;
  challenges?: string;
}

interface VirtualProjectCardsProps {
  projects: Project[];
}

const VirtualProjectCards = memo(function VirtualProjectCards({ projects }: VirtualProjectCardsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    if (!container || !grid) return;

    // Virtual entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(container,
      { opacity: 0, scale: 0.8, rotationX: 45 },
      { opacity: 1, scale: 1, rotationX: 0, duration: 1, ease: "power3.out" }
    );

    // Animate project cards in a wave pattern
    const cards = grid.querySelectorAll('.project-card');
    tl.fromTo(cards,
      { 
        opacity: 0, 
        y: 100, 
        rotationY: -45,
        scale: 0.8 
      },
      { 
        opacity: 1, 
        y: 0, 
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 1.5,
          grid: "auto",
          from: "start"
        },
        ease: "back.out(1.7)" 
      },
      "-=0.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = document.querySelector(`.project-card-${index}`);
    if (!card) return;

    if (isEntering) {
      setHoveredProject(index);
      gsap.to(card, {
        scale: 1.05,
        rotationY: 5,
        z: 50,
        boxShadow: '0 20px 40px rgba(0, 245, 255, 0.4), 0 0 60px rgba(138, 92, 246, 0.2)',
        duration: 0.4,
        ease: "power2.out"
      });

      // Animate tech tags
      const techTags = card.querySelectorAll('.tech-tag');
      gsap.fromTo(techTags,
        { scale: 0.9, opacity: 0.7 },
        { 
          scale: 1, 
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out"
        }
      );
    } else {
      setHoveredProject(null);
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        z: 0,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div 
      ref={containerRef}
      className="py-20 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Virtual Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
            Virtual Project Matrix
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore immersive data engineering solutions in virtual reality
          </p>
        </div>
        
        {/* Virtual Project Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.slice(0, 12).map((project, index) => (
            <div
              key={index}
              className={`project-card project-card-${index} group relative cursor-pointer`}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
              onClick={() => handleCardClick(project)}
            >
              {/* Holographic Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <div className="absolute inset-0.5 bg-black rounded-2xl"></div>
              
              {/* Card Content */}
              <div className="relative z-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 h-full">
                {/* Virtual Project Image */}
                <div className="relative overflow-hidden rounded-xl mb-6 group-hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all duration-300">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Holographic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Virtual Status Indicator */}
                  <div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_rgba(0,255,65,0.6)] animate-pulse"></div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  {/* Virtual Metrics */}
                  {project.metrics && (
                    <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20">
                      <div className="text-xs text-cyan-300 font-semibold mb-1">SYSTEM METRICS</div>
                      <div className="text-sm text-gray-300">{project.metrics}</div>
                    </div>
                  )}
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="tech-tag px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full border border-gray-500/30">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Virtual Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🚀 Launch
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-lg font-medium hover:from-gray-600 hover:to-gray-500 transition-all duration-200 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        💻 Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover State Indicator */}
                {hoveredProject === index && (
                  <div className="absolute top-3 left-3 text-cyan-400 text-sm font-bold animate-pulse">
                    ● ACTIVE
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Virtual Project Counter */}
        <div className="text-center mt-12">
          <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-cyan-500/30 rounded-full px-6 py-3">
            <span className="text-cyan-400 font-bold">
              {projects.length} Virtual Systems Deployed
            </span>
          </div>
        </div>
      </div>

      {/* Virtual Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-3xl p-8">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-cyan-400 text-2xl transition-colors duration-200"
              >
                ✕
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  {selectedProject.title}
                </h3>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedProject.description}
                </p>

                {selectedProject.architecture && (
                  <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
                    <h4 className="text-cyan-300 font-bold mb-2">🏗️ ARCHITECTURE</h4>
                    <p className="text-gray-300">{selectedProject.architecture}</p>
                  </div>
                )}

                {selectedProject.metrics && (
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
                    <h4 className="text-green-300 font-bold mb-2">📊 PERFORMANCE METRICS</h4>
                    <p className="text-gray-300">{selectedProject.metrics}</p>
                  </div>
                )}

                {selectedProject.challenges && (
                  <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
                    <h4 className="text-orange-300 font-bold mb-2">⚡ TECHNICAL CHALLENGES</h4>
                    <p className="text-gray-300">{selectedProject.challenges}</p>
                  </div>
                )}

                {/* Full Tech Stack */}
                <div>
                  <h4 className="text-purple-300 font-bold mb-3">🔧 TECHNOLOGY STACK</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-lg border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:from-cyan-400 hover:to-blue-500 transition-all duration-200"
                    >
                      🚀 Launch Virtual Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-xl font-bold hover:from-gray-600 hover:to-gray-500 transition-all duration-200"
                    >
                      💻 Access Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default VirtualProjectCards;