'use client';

import { useRef, useEffect, memo, useState } from 'react';
import gsap from 'gsap';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  color: string;
  skills: Skill[];
}

interface VirtualSkillsProps {
  categories: SkillCategory[];
}

const VirtualSkills = memo(function VirtualSkills({ categories }: VirtualSkillsProps) {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Virtual entrance animation
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(container,
      { opacity: 0, scale: 0.8, rotationX: 45 },
      { opacity: 1, scale: 1, rotationX: 0, duration: 1, ease: "power3.out" }
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    // Draw virtual skill radar
    const canvas = radarRef.current;
    if (!canvas || !categories.length) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    
    const activeSkills = categories[activeCategory]?.skills || [];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw radar grid
    const gridLevels = 5;
    for (let i = 1; i <= gridLevels; i++) {
      const levelRadius = (radius * i) / gridLevels;
      ctx.beginPath();
      ctx.arc(centerX, centerY, levelRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 245, 255, ${0.2 / i})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw skill axes
    const skillCount = activeSkills.length;
    if (skillCount === 0) return;

    const angleStep = (Math.PI * 2) / skillCount;
    
    activeSkills.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const endX = centerX + Math.cos(angle) * radius;
      const endY = centerY + Math.sin(angle) * radius;
      
      // Draw axis line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw skill level
      const skillRadius = (radius * skill.level) / 100;
      const skillX = centerX + Math.cos(angle) * skillRadius;
      const skillY = centerY + Math.sin(angle) * skillRadius;
      
      // Skill point
      ctx.beginPath();
      ctx.arc(skillX, skillY, hoveredSkill === skill.name ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = categories[activeCategory].color;
      ctx.fill();
      
      // Skill label
      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '12px Courier New';
      ctx.textAlign = angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? 'right' : 'left';
      ctx.fillText(skill.name, labelX, labelY);
      
      // Skill level text
      ctx.fillStyle = categories[activeCategory].color;
      ctx.font = '10px Courier New';
      ctx.textAlign = 'center';
      ctx.fillText(`${skill.level}%`, skillX, skillY - 10);
    });

    // Draw connecting lines between skills
    if (activeSkills.length > 2) {
      ctx.beginPath();
      activeSkills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const skillRadius = (radius * skill.level) / 100;
        const skillX = centerX + Math.cos(angle) * skillRadius;
        const skillY = centerY + Math.sin(angle) * skillRadius;
        
        if (index === 0) {
          ctx.moveTo(skillX, skillY);
        } else {
          ctx.lineTo(skillX, skillY);
        }
      });
      ctx.closePath();
      ctx.strokeStyle = categories[activeCategory].color + '60';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = categories[activeCategory].color + '20';
      ctx.fill();
    }
  }, [activeCategory, categories, hoveredSkill]);

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
    
    // Animate category switch
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach((button, i) => {
      gsap.to(button, {
        scale: i === index ? 1.1 : 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  };

  const handleSkillHover = (skillName: string | null) => {
    setHoveredSkill(skillName);
  };

  return (
    <div 
      ref={containerRef}
      className="py-20 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Virtual Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
            Virtual Skill Matrix
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Navigate through advanced data engineering competencies in virtual space
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(index)}
              className={`category-button px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
                activeCategory === index
                  ? 'border-current text-white'
                  : 'border-gray-600 text-gray-400 hover:border-gray-400'
              }`}
              style={{
                backgroundColor: activeCategory === index ? category.color + '20' : 'transparent',
                borderColor: activeCategory === index ? category.color : '',
                color: activeCategory === index ? category.color : '',
                boxShadow: activeCategory === index ? `0 0 20px ${category.color}40` : 'none'
              }}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Virtual Radar Chart */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-black/60 backdrop-blur-md border border-green-500/30 rounded-3xl p-8">
              <canvas
                ref={radarRef}
                width={400}
                height={400}
                className="w-full h-auto max-w-md mx-auto"
              />
              
              {/* Virtual Status */}
              <div className="text-center mt-4">
                <div className="text-green-400 font-bold text-lg">
                  {categories[activeCategory]?.category || 'Loading...'}
                </div>
                <div className="text-gray-400 text-sm">
                  Virtual Proficiency Map
                </div>
              </div>
            </div>
          </div>

          {/* Skills List */}
          <div className="space-y-4">
            {categories[activeCategory]?.skills.map((skill, skillIndex) => (
              <div
                key={skillIndex}
                className="relative group cursor-pointer"
                onMouseEnter={() => handleSkillHover(skill.name)}
                onMouseLeave={() => handleSkillHover(null)}
              >
                <div className="relative bg-gradient-to-r from-black/60 to-gray-900/60 backdrop-blur-md border border-green-500/20 rounded-xl p-4 group-hover:border-green-400/40 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold">{skill.name}</span>
                    <span 
                      className="text-lg font-bold"
                      style={{ color: categories[activeCategory].color }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  
                  {/* Virtual Progress Bar */}
                  <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${categories[activeCategory].color}40, ${categories[activeCategory].color})`
                      }}
                    />
                    
                    {/* Animated glow effect */}
                    <div
                      className="absolute top-0 left-0 h-full rounded-full opacity-60"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, transparent, ${categories[activeCategory].color}80, transparent)`,
                        animation: hoveredSkill === skill.name ? 'shimmer 2s infinite' : 'none'
                      }}
                    />
                  </div>

                  {/* Skill level indicators */}
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                    <span>Master</span>
                  </div>

                  {/* Hover effect overlay */}
                  {hoveredSkill === skill.name && (
                    <div className="absolute top-2 right-2 text-green-400 text-sm font-bold animate-pulse">
                      ● ACTIVE
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Virtual Metrics */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: '🧠', label: 'Neural Processing', value: 'Advanced AI' },
            { icon: '⚡', label: 'Real-time Systems', value: 'Quantum Scale' },
            { icon: '🌐', label: 'Multi-Cloud', value: 'Universal' },
            { icon: '🔄', label: 'Data Flow', value: 'Infinite Loop' }
          ].map((metric, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <div className="relative bg-black/60 backdrop-blur-md border border-green-500/30 p-4 rounded-xl text-center group-hover:border-green-400/50 transition-all duration-300">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className="text-green-400 font-bold text-sm">{metric.value}</div>
                <div className="text-gray-400 text-xs">{metric.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
});

export default VirtualSkills;