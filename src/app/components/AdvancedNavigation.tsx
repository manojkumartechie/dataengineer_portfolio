'use client';

import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Home, User, Briefcase, Zap, Mail, Menu, X } from 'lucide-react';
import gsap from 'gsap';

interface NavigationProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

// Memoized component to prevent unnecessary re-renders
const AdvancedNavigation = memo(function AdvancedNavigation({ activeSection, scrollToSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Optimized initial entrance animation
    const tl = gsap.timeline();
    tl.fromTo(nav, 
      { 
        y: -100, 
        opacity: 0,
        backdropFilter: 'blur(0px)'
      },
      { 
        y: 0, 
        opacity: 1,
        backdropFilter: 'blur(16px)',
        duration: 1,
        ease: "power2.out"
      }
    );

    // Optimized scroll-based navbar behavior with throttling
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide navbar
            gsap.to(nav, {
              y: -100,
              duration: 0.3,
              ease: "power2.out"
            });
          } else {
            // Scrolling up - show navbar
            gsap.to(nav, {
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  // Memoized handlers to prevent unnecessary re-renders
  const handleMenuClick = useCallback((sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  }, [scrollToSection]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => {
      const newState = !prev;
      
      if (newState) {
        // Opening menu animation
        const tl = gsap.timeline();
        tl.to('.mobile-menu', {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
        .fromTo('.mobile-menu-item',
          { opacity: 0, x: -30 },
          { 
            opacity: 1, 
            x: 0,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.out"
          },
          "-=0.1"
        );
      } else {
        // Closing menu animation
        gsap.to('.mobile-menu', {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.in"
        });
      }
      
      return newState;
    });
  }, []);

  // Memoized button hover handlers
  const handleButtonHover = useCallback((e: React.MouseEvent<HTMLButtonElement>, isEntering: boolean) => {
    gsap.to(e.currentTarget, {
      scale: isEntering ? 1.05 : 1,
      duration: 0.2,
      ease: "power2.out"
    });
  }, []);

  return (
    <nav 
      ref={navRef} 
      className="fixed top-0 w-full z-50 glass-card border-b border-white/10"
      style={{ backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-white flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="hidden sm:inline">Portfolio</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeSection === item.id
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
                aria-label={`Navigate to ${item.label} section`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden mobile-menu ${isMenuOpen ? 'block' : 'hidden'} opacity-0 -translate-y-4`}>
          <div className="px-2 pt-2 pb-3 space-y-2 glass-card border-t border-white/10 mt-2 rounded-lg">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`mobile-menu-item block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center space-x-3 min-h-[44px] ${
                  activeSection === item.id
                    ? 'text-blue-400 bg-blue-400/10'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label={`Navigate to ${item.label} section`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default AdvancedNavigation;