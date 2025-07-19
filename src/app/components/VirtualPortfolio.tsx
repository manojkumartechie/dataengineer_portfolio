'use client';

import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import VirtualNavigation from './VirtualNavigation';
import MatrixRain from './MatrixRain';
import HolographicInterface from './HolographicInterface';
import NeuralNetwork from './NeuralNetwork';
import DataPipeline from './DataPipeline';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import gsap from 'gsap';

// Lazy load components for better performance
const VirtualHero = lazy(() => import('./VirtualHero'));
const VirtualProjectCards = lazy(() => import('./VirtualProjectCards'));
const VirtualSkills = lazy(() => import('./VirtualSkills'));
const VirtualContact = lazy(() => import('./VirtualContact'));

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

interface SkillCategory {
  category: string;
  color: string;
  skills: Array<{ name: string; level: number }>;
}

interface ContactInfo {
  email: string;
  location: string;
  phone: string;
  linkedin?: string;
  github?: string;
}

interface VirtualPortfolioProps {
  data: {
    projects: Project[];
    skillCategories: SkillCategory[];
    contactInfo: ContactInfo;
  };
}

export default function VirtualPortfolio({ data }: VirtualPortfolioProps) {
  if (!data) return <div>No data available.</div>;

  const { projects = [], skillCategories = [], contactInfo = {
    email: 'manojkumar2004@zoho.in',
    location: 'Bangalore, India',
    phone: '+91 9876543210',
    linkedin: 'https://linkedin.com/in/manojkumartechie',
    github: 'https://github.com/manojkumartechie'
  } } = data;

  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    try {
      // Simulate loading time for virtual effects to initialize
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    } catch (err) {
      setError('Failed to initialize virtual portfolio');
      setIsLoading(false);
    }
  }, []);

  // Virtual navigation - no scrolling, just view transitions
  const handleNavigation = useCallback((sectionId: string) => {
    if (sectionId === activeSection) return;

    // Virtual transition animation
    const currentContent = document.getElementById(`section-${activeSection}`);
    const nextContent = document.getElementById(`section-${sectionId}`);

    if (currentContent && nextContent) {
      // Fade out current section
      gsap.to(currentContent, {
        opacity: 0,
        scale: 0.95,
        rotationY: 15,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          currentContent.style.display = 'none';
          nextContent.style.display = 'block';
          
          // Fade in next section
          gsap.fromTo(nextContent, 
            { 
              opacity: 0, 
              scale: 0.95, 
              rotationY: -15 
            },
            { 
              opacity: 1, 
              scale: 1, 
              rotationY: 0, 
              duration: 0.5, 
              ease: "power2.out" 
            }
          );
        }
      });
    }

    setActiveSection(sectionId);
    setCurrentView(sectionId);
  }, [activeSection]);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Virtual System Error</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
            aria-label="Reload virtual environment"
          >
            Restart Virtual Environment
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        {/* Virtual Background Layers */}
        <MatrixRain />
        <NeuralNetwork />
        <DataPipeline />
        <HolographicInterface activeSection={activeSection} />

        {/* Virtual Navigation */}
        <VirtualNavigation 
          activeSection={activeSection} 
          onNavigate={handleNavigation} 
        />

        {/* Virtual Content Sections */}
        <div className="relative z-20">
          {/* Home Section */}
          <div 
            id="section-home" 
            className={`min-h-screen ${activeSection === 'home' ? 'block' : 'hidden'}`}
          >
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
              <div className="text-cyan-400">Loading Virtual Environment...</div>
            </div>}>
              <VirtualHero onNavigate={handleNavigation} />
            </Suspense>
          </div>

          {/* About Section */}
          <div 
            id="section-about" 
            className={`min-h-screen ${activeSection === 'about' ? 'block' : 'hidden'}`}
          >
            <div className="py-20 relative z-10">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
                    Data Engineer Profile
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-8"></div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Virtual Profile Card */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                    <div className="relative bg-black/40 backdrop-blur-md border border-cyan-500/30 p-8 rounded-3xl">
                      <h3 className="text-3xl font-bold text-white mb-6">
                        Virtual Data Engineer
                      </h3>
                      <div className="space-y-6 text-gray-300 leading-relaxed">
                        <p>
                          Operating in the digital frontier of data engineering, I architect virtual data ecosystems 
                          that process billions of events across distributed systems. My expertise spans real-time 
                          streaming, quantum data processing, and AI-driven pipeline optimization.
                        </p>
                        <p>
                          I've built virtual data infrastructures that exist across multiple cloud dimensions, 
                          implemented neural network-based data quality systems, and created autonomous 
                          data pipelines that self-heal and optimize in real-time.
                        </p>
                        <p>
                          Passionate about emerging technologies like quantum computing, edge AI processing, 
                          and virtual reality data visualization. I work at the intersection of data science 
                          and digital innovation.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Virtual Metrics Dashboard */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: '10+', label: 'Dimensions Explored', color: 'cyan' },
                      { value: '100+', label: 'Virtual Pipelines', color: 'purple' },
                      { value: '1T+', label: 'Quantum Events/Sec', color: 'pink' },
                      { value: '99.99%', label: 'System Reliability', color: 'green' }
                    ].map((metric, index) => (
                      <div 
                        key={index}
                        className="relative group"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r from-${metric.color}-500/20 to-${metric.color}-500/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300`}></div>
                        <div className={`relative bg-black/60 backdrop-blur-md border border-${metric.color}-500/30 p-6 rounded-2xl text-center group-hover:border-${metric.color}-400/50 transition-all duration-300`}>
                          <h4 className={`text-4xl font-bold text-${metric.color}-400 mb-2`}>{metric.value}</h4>
                          <p className="text-gray-300 text-sm">{metric.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div 
            id="section-projects" 
            className={`min-h-screen ${activeSection === 'projects' ? 'block' : 'hidden'}`}
          >
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
              <div className="text-purple-400">Loading Virtual Projects...</div>
            </div>}>
              <VirtualProjectCards projects={projects} />
            </Suspense>
          </div>

          {/* Skills Section */}
          <div 
            id="section-skills" 
            className={`min-h-screen ${activeSection === 'skills' ? 'block' : 'hidden'}`}
          >
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
              <div className="text-green-400">Loading Skill Matrix...</div>
            </div>}>
              <VirtualSkills categories={skillCategories} />
            </Suspense>
          </div>

          {/* Contact Section */}
          <div 
            id="section-contact" 
            className={`min-h-screen ${activeSection === 'contact' ? 'block' : 'hidden'}`}
          >
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
              <div className="text-yellow-400">Loading Communication Hub...</div>
            </div>}>
              <VirtualContact contactInfo={contactInfo} />
            </Suspense>
          </div>
        </div>

        {/* Virtual Reality Overlay */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-lg p-3 text-xs text-cyan-400">
            <div>Virtual Mode: Active</div>
            <div>Section: {activeSection.toUpperCase()}</div>
            <div>Reality Level: 100%</div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}