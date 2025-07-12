import { useState, useEffect, lazy, Suspense } from 'react';
import AdvancedNavigation from './AdvancedNavigation';
import AdvancedHero from './AdvancedHero';
import Skills from './Skills';
import Contact from './Contact';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Lazy load heavy components for better performance
const AdvancedProjectCard = lazy(() => import('./AdvancedProjectCard'));
const CustomCursor = lazy(() => import('./CustomCursor'));
const ParticleBackground = lazy(() => import('./ParticleBackground'));
const AnimatedBackground = lazy(() => import('./AnimatedBackground'));
const LightingEffects = lazy(() => import('./LightingEffects'));

// Register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
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

interface ClientPortfolioProps {
  projects: Project[];
  skillCategories: SkillCategory[];
  contactInfo: ContactInfo;
}

export default function ClientPortfolio({ projects, skillCategories, contactInfo }: ClientPortfolioProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Memoized scroll handler to prevent excessive re-renders
  const handleScroll = () => {
    const sections = ['home', 'about', 'projects', 'skills', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          if (activeSection !== section) {
            setActiveSection(section);
          }
          break;
        }
      }
    }
  };

  useEffect(() => {
    // Check if desktop for conditional rendering
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    try {
      // Simulate loading time for animations to initialize
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800); // Reduced loading time

      // Throttled scroll handler for better performance
      let ticking = false;
      const throttledScrollHandler = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', throttledScrollHandler, { passive: true });

      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', throttledScrollHandler);
        window.removeEventListener('resize', checkIsDesktop);
      };
    } catch (err) {
      setError('Failed to initialize portfolio');
      setIsLoading(false);
    }
  }, [activeSection]); // Added activeSection to dependency array

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      try {
        // Optimized scroll-triggered animations with reduced complexity
        const sections = document.querySelectorAll('section');
        sections.forEach((section) => {
          gsap.fromTo(section,
            { opacity: 0.9 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                end: "bottom 15%",
                scrub: 1,
                once: true, // Only animate once for better performance
              }
            }
          );
        });
      } catch (err) {
        console.warn('GSAP animations failed to initialize:', err);
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [isLoading]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      try {
        if (typeof window !== 'undefined' && gsap?.to && ScrollToPlugin) {
          gsap.to(window, {
            duration: 1.2, // Slightly faster scroll
            scrollTo: { y: element, offsetY: 80 },
            ease: "power2.inOut"
          });
        } else {
          // Fallback for smooth scrolling
          const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } catch (err) {
        // Fallback to basic scrolling
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="glass-btn"
            aria-label="Reload page"
          >
            Try Again
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
      <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
        {/* Conditionally render heavy components only on desktop */}
        {isDesktop && (
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>
        )}
        
        {/* Animated Background - lighter version */}
        <Suspense fallback={null}>
          <AnimatedBackground />
        </Suspense>
        
        {/* Particle Background - only on larger screens */}
        {isDesktop && (
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>
        )}
        
        {/* Lighting Effects */}
        <Suspense fallback={null}>
          <LightingEffects />
        </Suspense>

        {/* Navigation */}
        <AdvancedNavigation activeSection={activeSection} scrollToSection={scrollToSection} />

        {/* Home Section */}
        <AdvancedHero scrollToSection={scrollToSection} />

        {/* About Section */}
        <section id="about" className="py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                About Me
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-4 sm:mb-6"></div>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Transforming data into insights, building the future of analytics
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="glass-card p-6 sm:p-8 rounded-2xl">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
                  Passionate Data Engineer
                </h3>
                <div className="space-y-4 sm:space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    With over 5 years of experience in data engineering, I specialize in building 
                    scalable data pipelines, designing efficient data architectures, and transforming 
                    raw data into actionable insights. I love solving complex data challenges and 
                    optimizing performance at scale.
                  </p>
                  <p>
                    My journey in data started with curiosity about how data drives business decisions 
                    and has evolved into a passion for building robust, scalable data infrastructure. 
                    I believe in data quality, performance optimization, and continuous learning.
                  </p>
                  <p>
                    When I'm not building data pipelines, you can find me exploring new big data 
                    technologies, contributing to open-source data projects, or sharing knowledge 
                    with the data engineering community.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="glass-card p-4 sm:p-6 rounded-xl text-center">
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-2">5+</h4>
                  <p className="text-gray-300 text-sm sm:text-base">Years Experience</p>
                </div>
                <div className="glass-card p-4 sm:p-6 rounded-xl text-center">
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-2">25+</h4>
                  <p className="text-gray-300 text-sm sm:text-base">Data Pipelines Built</p>
                </div>
                <div className="glass-card p-4 sm:p-6 rounded-xl text-center">
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-400 mb-2">1M+</h4>
                  <p className="text-gray-300 text-sm sm:text-base">Events/Minute Processed</p>
                </div>
                <div className="glass-card p-4 sm:p-6 rounded-xl text-center">
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-2">99.9%</h4>
                  <p className="text-gray-300 text-sm sm:text-base">Pipeline Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 sm:py-16 lg:py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Featured Projects
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-4 sm:mb-6"></div>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Showcasing my expertise in building scalable data infrastructure and innovative solutions
              </p>
            </div>
            
            {/* Responsive Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <Suspense key={index} fallback={<div className="glass-card rounded-2xl h-96 animate-pulse" />}>
                  <AdvancedProjectCard project={project} index={index} />
                </Suspense>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <Skills categories={skillCategories} />

        {/* Contact Section */}
        <Contact contactInfo={contactInfo} />

        {/* Footer */}
        <footer className="bg-slate-900/50 backdrop-blur-sm text-white py-8 sm:py-12 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center space-x-6 mb-6 sm:mb-8">
                <a 
                  href="https://github.com/manojkumartechie" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
                  aria-label="Visit GitHub profile"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/in/manojkumartechie" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
                  aria-label="Visit LinkedIn profile"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/manojkumartechie" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
                  aria-label="Visit Twitter profile"
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
              <p className="text-gray-400 text-base sm:text-lg">
                © 2024 Manoj Kumar. Crafted with passion and powered by data.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}