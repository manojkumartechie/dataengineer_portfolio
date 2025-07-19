'use client';

import { useRef, useEffect, memo, useState } from 'react';
import gsap from 'gsap';

interface ContactInfo {
  email: string;
  location: string;
  phone: string;
  linkedin?: string;
  github?: string;
}

interface VirtualContactProps {
  contactInfo: ContactInfo;
}

const VirtualContact = memo(function VirtualContact({ contactInfo }: VirtualContactProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '> Initializing virtual communication hub...',
    '> Establishing secure connection...',
    '> Status: READY FOR TRANSMISSION'
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Virtual entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(container,
      { opacity: 0, scale: 0.8, rotationX: 45 },
      { opacity: 1, scale: 1, rotationX: 0, duration: 1, ease: "power3.out" }
    );

    // Animate terminal lines
    const terminal = terminalRef.current;
    if (terminal) {
      const lines = terminal.querySelectorAll('.terminal-line');
      tl.fromTo(lines,
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5,
          stagger: 0.3,
          ease: "power2.out"
        },
        "-=0.5"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleConnect = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    setConnectionStatus('connecting');
    
    // Simulate connection process
    const connectionSteps = [
      '> Initiating quantum entanglement...',
      '> Encrypting data stream...',
      '> Establishing secure channel...',
      '> Verifying identity protocols...',
      '> Connection established successfully!'
    ];

    for (let i = 0; i < connectionSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setTerminalLines(prev => [...prev, connectionSteps[i]]);
    }

    setConnectionStatus('connected');
    setIsConnecting(false);
    
    // Reset after some time
    setTimeout(() => {
      setConnectionStatus('idle');
      setTerminalLines([
        '> Virtual communication hub active...',
        '> Ready for new transmission...',
        '> Status: STANDBY'
      ]);
    }, 5000);
  };

  const contactMethods = [
    {
      icon: '📧',
      label: 'Quantum Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: '#00f5ff'
    },
    {
      icon: '🌍',
      label: 'Physical Location',
      value: contactInfo.location,
      href: null,
      color: '#00ff41'
    },
    {
      icon: '📱',
      label: 'Neural Link',
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      color: '#ff006e'
    },
    {
      icon: '💼',
      label: 'LinkedIn Network',
      value: 'Professional Hub',
      href: contactInfo.linkedin,
      color: '#8b5cf6'
    },
    {
      icon: '💻',
      label: 'GitHub Repository',
      value: 'Code Matrix',
      href: contactInfo.github,
      color: '#ffd700'
    }
  ];

  const handleContactHover = (index: number, isEntering: boolean) => {
    const element = document.querySelector(`.contact-item-${index}`);
    if (!element) return;

    if (isEntering) {
      gsap.to(element, {
        scale: 1.05,
        rotationY: 5,
        boxShadow: `0 10px 30px rgba(0, 245, 255, 0.3)`,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(element, {
        scale: 1,
        rotationY: 0,
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.2)`,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="py-20 relative z-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Virtual Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6">
            Communication Hub
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Establish secure connection for data collaboration and virtual partnerships
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Virtual Terminal */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-black/80 backdrop-blur-md border border-green-500/30 rounded-3xl overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between p-4 border-b border-green-500/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-green-400 text-sm font-mono">
                  VIRTUAL_COMM_HUB_v2.1
                </div>
              </div>

              {/* Terminal Content */}
              <div 
                ref={terminalRef}
                className="p-6 font-mono text-sm"
                style={{ minHeight: '300px' }}
              >
                {terminalLines.map((line, index) => (
                  <div 
                    key={index}
                    className="terminal-line text-green-400 mb-2"
                  >
                    {line}
                  </div>
                ))}
                
                {/* Cursor */}
                <div className="text-green-400 animate-pulse">
                  {connectionStatus === 'connecting' ? '> [CONNECTING...]' : '> _'}
                </div>
              </div>

              {/* Connection Button */}
              <div className="p-6 border-t border-green-500/20">
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    connectionStatus === 'connected'
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                      : isConnecting
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black animate-pulse'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500'
                  }`}
                >
                  {connectionStatus === 'connected' ? '✅ Connection Active' : 
                   isConnecting ? '🔄 Establishing Link...' : 
                   '🚀 Initialize Connection'}
                </button>
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Virtual Contact Protocols
              </h3>
              <p className="text-gray-400">
                Multiple channels available for secure data transmission
              </p>
            </div>

            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`contact-item-${index} relative group cursor-pointer`}
                onMouseEnter={() => handleContactHover(index, true)}
                onMouseLeave={() => handleContactHover(index, false)}
                onClick={() => method.href && window.open(method.href, '_blank')}
              >
                <div className="relative bg-gradient-to-r from-black/60 to-gray-900/60 backdrop-blur-md border border-gray-600/30 rounded-xl p-6 group-hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="text-4xl p-3 rounded-xl"
                      style={{ backgroundColor: method.color + '20' }}
                    >
                      {method.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h4 
                        className="text-lg font-bold mb-1"
                        style={{ color: method.color }}
                      >
                        {method.label}
                      </h4>
                      <p className="text-gray-300">
                        {method.value}
                      </p>
                    </div>

                    {method.href && (
                      <div 
                        className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: method.color }}
                      >
                        →
                      </div>
                    )}
                  </div>

                  {/* Hover effect indicator */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                </div>
              </div>
            ))}

            {/* Virtual Availability Status */}
            <div className="relative mt-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-lg"></div>
              <div className="relative bg-black/60 backdrop-blur-md border border-green-500/30 rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-bold">ONLINE</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Virtual presence active • Response time: &lt;24 hours
                </p>
                <p className="text-cyan-400 text-xs mt-2">
                  Timezone: Asia/Kolkata (GMT+5:30)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Footer */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30 rounded-full px-8 py-4">
            <span className="text-yellow-400 font-bold text-lg">
              🌟 Ready for Data Adventures
            </span>
            <div className="text-gray-400 text-sm mt-1">
              Let's build something extraordinary together in the virtual realm
            </div>
          </div>
        </div>

        {/* Floating Contact Indicators */}
        <div className="absolute top-10 right-10 space-y-2">
          {connectionStatus === 'connected' && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg px-3 py-2 text-green-400 text-sm animate-pulse">
              🟢 LIVE CONNECTION
            </div>
          )}
          <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-400 text-sm">
            📡 Signal Strength: 100%
          </div>
        </div>
      </div>
    </div>
  );
});

export default VirtualContact;