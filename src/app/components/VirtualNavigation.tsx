'use client';

import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Home, User, Briefcase, Zap, Mail, Menu, X } from 'lucide-react';
import gsap from 'gsap';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const VirtualNavigation = memo(function VirtualNavigation({ activeSection, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const hologram = hologramRef.current;
    if (!nav || !hologram) return;

    // Virtual appearance animation
    const tl = gsap.timeline();
    tl.fromTo(nav, 
      { 
        opacity: 0,
        scale: 0.8,
        rotationX: -45,
      },
      { 
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out"
      }
    );

    // Holographic glow animation
    gsap.to(hologram, {
      opacity: 0.6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

    // Floating animation
    gsap.to(nav, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, []);

  const menuItems = [
    { id: 'home', label: 'Data Hub', icon: Home, color: '#00f5ff' },
    { id: 'about', label: 'Profile', icon: User, color: '#ff006e' },
    { id: 'projects', label: 'Systems', icon: Briefcase, color: '#8b5cf6' },
    { id: 'skills', label: 'Matrix', icon: Zap, color: '#00ff41' },
    { id: 'contact', label: 'Connect', icon: Mail, color: '#ffd700' }
  ];

  const handleMenuClick = useCallback((sectionId: string) => {
    onNavigate(sectionId);
    setIsMenuOpen(false);
    
    // Virtual transition effect
    const nav = navRef.current;
    if (nav) {
      gsap.to(nav, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
  }, [onNavigate]);

  const handleButtonHover = useCallback((e: React.MouseEvent<HTMLButtonElement>, isEntering: boolean, color: string) => {
    const button = e.currentTarget;
    
    if (isEntering) {
      gsap.to(button, {
        scale: 1.1,
        boxShadow: `0 0 30px ${color}`,
        borderColor: color,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(button, {
        scale: 1,
        boxShadow: `0 0 10px ${color}50`,
        borderColor: `${color}80`,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, []);

  return (
    <nav 
      ref={navRef} 
      className="
      fixed top-8 left-1/2 transform -translate-x-1/2 z-50
      bg-black/20 backdrop-blur-md
      border border-cyan-500/30
      rounded-2xl p-4
      shadow-[0_0_50px_rgba(0,245,255,0.3)]
      before:absolute before:inset-0 before:rounded-2xl 
      before:bg-gradient-to-r before:from-cyan-500/10 before:via-purple-500/10 before:to-pink-500/10
      before:blur-xl before:-z-10
    "
    >
      {/* Holographic overlay */}
      <div 
        ref={hologramRef}
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 opacity-30"
      />

      <div className="relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(0,245,255,0.5)]">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-cyan-300 text-sm font-semibold tracking-wider">DATA HUB</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-col space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-3 border-2 ${
                activeSection === item.id
                  ? `text-white bg-gradient-to-r from-${item.color}/20 to-${item.color}/10 border-${item.color} shadow-[0_0_20px_${item.color}50]`
                  : `text-gray-300 border-gray-600/50 hover:border-${item.color}/80`
              }`}
              onMouseEnter={(e) => handleButtonHover(e, true, item.color)}
              onMouseLeave={(e) => handleButtonHover(e, false, item.color)}
              style={{
                boxShadow: activeSection === item.id ? `0 0 20px ${item.color}50` : `0 0 10px ${item.color}20`
              }}
              aria-label={`Navigate to ${item.label} section`}
            >
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
              <span>{item.label}</span>
              {activeSection === item.id && (
                <div 
                  className="absolute right-2 w-2 h-2 rounded-full animate-pulse" 
                  style={{ backgroundColor: item.color }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden mx-auto flex p-3 rounded-xl text-cyan-300 border-2 border-cyan-500/50 hover:border-cyan-400 transition-colors duration-200 shadow-[0_0_15px_rgba(0,245,255,0.3)]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 flex items-center space-x-3 border ${
                  activeSection === item.id
                    ? 'text-white bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400'
                    : 'text-gray-300 border-gray-600/50 hover:border-cyan-400/80'
                }`}
                style={{
                  borderColor: activeSection === item.id ? item.color : '',
                  boxShadow: activeSection === item.id ? `0 0 15px ${item.color}30` : ''
                }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
});

export default VirtualNavigation;