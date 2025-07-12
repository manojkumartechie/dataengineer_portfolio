'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Database, 
  Cloud, 
  Code, 
  BarChart3, 
  Server, 
  GitBranch,
  Monitor,
  Cpu,
  HardDrive,
  Zap
} from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
  color: string;
}

interface SkillsProps {
  categories: SkillCategory[];
}

export default function Skills({ categories }: SkillsProps) {
  useEffect(() => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
      // Remove scroll-triggered 3D reveal effect
      // Only keep GSAP glassmorphism animation on hover
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          background: "rgba(255,255,255,0.25)",
          boxShadow: "0 12px 40px 0 rgba(31,38,135,0.45)",
          backdropFilter: "blur(16px)",
          duration: 0.5,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          background: "rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
          backdropFilter: "blur(8px)",
          duration: 0.5,
          ease: "power2.in",
        });
      });
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Technologies with real logos from Simple Icons CDN
  const technologies = [
    { name: 'Apache Spark', logo: 'https://cdn.simpleicons.org/apachespark/FF8000' },
    { name: 'Apache Kafka', logo: 'https://cdn.simpleicons.org/apachekafka/231F20' },
    { name: 'Apache Flink', logo: 'https://cdn.simpleicons.org/apacheflink/E6526F' },
    { name: 'Hadoop', logo: 'https://cdn.simpleicons.org/apachehadoop/66CCFF' },
    { name: 'Apache Hive', logo: 'https://cdn.simpleicons.org/apachehive/FDEE21' },
    { name: 'Apache Airflow', logo: 'https://cdn.simpleicons.org/apacheairflow/017CEE' },
    { name: 'Snowflake', logo: 'https://cdn.simpleicons.org/snowflake/29B5E8' },
    { name: 'dbt', logo: 'https://cdn.simpleicons.org/dbt/FF694B' },
    { name: 'Tableau', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tableau.svg' },
    { name: 'Elasticsearch', logo: 'https://cdn.simpleicons.org/elasticsearch/005571' },
    { name: 'Prometheus', logo: 'https://cdn.simpleicons.org/prometheus/E6522C' },
    { name: 'Grafana', logo: 'https://cdn.simpleicons.org/grafana/F46800' },
    { name: 'Terraform', logo: 'https://cdn.simpleicons.org/terraform/623CE4' },
  ];

  // Tools with real logos from Simple Icons CDN
  const tools = [
    { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
    { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/181717' },
    { name: 'GitLab', logo: 'https://cdn.simpleicons.org/gitlab/FCA121' },
    { name: 'Bitbucket', logo: 'https://cdn.simpleicons.org/bitbucket/0052CC' },
    { name: 'Jenkins', logo: 'https://cdn.simpleicons.org/jenkins/D24939' },
    { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'Kubernetes', logo: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
    { name: 'Linux', logo: 'https://cdn.simpleicons.org/linux/FCC624' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/amazonwebservices/amazonwebservices-original.svg' },
    { name: 'Azure', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/azure/azure-original.svg' },
    { name: 'GCP', logo: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
    { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/4479A1' },
    { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' },
    { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
    { name: 'Redis', logo: 'https://cdn.simpleicons.org/redis/DC382D' },
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skills Section */}
        <div className="text-center mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mb-4">
            {/* 3D Brain/Lightbulb Logo for Skills */}
            <div className="logo-3d mb-4 md:mb-0 md:mr-6">
              <svg 
                width="80" 
                height="80" 
                viewBox="0 0 100 100" 
                className="w-16 h-16 sm:w-20 sm:h-20"
                role="img"
                aria-label="Skills represented by a brain icon"
              >
                <defs>
                  <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="50%" stopColor="#764ba2" />
                    <stop offset="100%" stopColor="#f093fb" />
                  </linearGradient>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
                  </filter>
                </defs>
                {/* Brain shape */}
                <path 
                  d="M30 35 Q25 25 35 20 Q45 15 55 20 Q65 15 75 20 Q85 25 80 35 Q85 45 75 50 Q80 60 70 65 Q60 70 50 65 Q40 70 30 65 Q20 60 25 50 Q15 45 20 35 Q25 25 30 35 Z" 
                  fill="url(#brainGradient)" 
                  filter="url(#shadow)"
                  className="animate-pulse"
                />
                {/* Brain details */}
                <path 
                  d="M35 30 Q40 25 45 30 Q50 35 45 40 Q40 35 35 30" 
                  fill="rgba(255,255,255,0.3)" 
                />
                <path 
                  d="M55 30 Q60 25 65 30 Q70 35 65 40 Q60 35 55 30" 
                  fill="rgba(255,255,255,0.3)" 
                />
                <circle cx="42" cy="45" r="2" fill="rgba(255,255,255,0.6)" />
                <circle cx="58" cy="45" r="2" fill="rgba(255,255,255,0.6)" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white text-center md:text-left">Skills</h2>
          </div>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            I've worked with a variety of big data technologies and tools to build scalable data infrastructure and pipelines.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-10 sm:mb-20">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="glass-card rounded-2xl p-4 sm:p-6 w-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 skill-category-card min-h-[200px]"
            >
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 text-center">
                {category.category}
              </h3>
              <div className="space-y-2 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mb-6 sm:mb-8">
            {/* 3D Chip/Network Logo for Technologies */}
            <div className="logo-3d mb-4 md:mb-0 md:mr-4">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 100 100" 
                className="w-12 h-12 sm:w-16 sm:h-16"
                role="img"
                aria-label="Technologies represented by a microchip icon"
              >
                <defs>
                  <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4facfe" />
                    <stop offset="50%" stopColor="#00f2fe" />
                    <stop offset="100%" stopColor="#43e97b" />
                  </linearGradient>
                  <filter id="chipShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
                  </filter>
                </defs>
                {/* Chip base */}
                <rect 
                  x="25" y="25" width="50" height="50" 
                  rx="5" 
                  fill="url(#chipGradient)" 
                  filter="url(#chipShadow)"
                />
                {/* Circuit lines */}
                <rect x="30" y="35" width="40" height="2" fill="rgba(255,255,255,0.8)" />
                <rect x="30" y="45" width="40" height="2" fill="rgba(255,255,255,0.8)" />
                <rect x="30" y="55" width="40" height="2" fill="rgba(255,255,255,0.8)" />
                <rect x="30" y="65" width="40" height="2" fill="rgba(255,255,255,0.8)" />
                {/* Vertical lines */}
                <rect x="35" y="30" width="2" height="40" fill="rgba(255,255,255,0.6)" />
                <rect x="45" y="30" width="2" height="40" fill="rgba(255,255,255,0.6)" />
                <rect x="55" y="30" width="2" height="40" fill="rgba(255,255,255,0.6)" />
                <rect x="65" y="30" width="2" height="40" fill="rgba(255,255,255,0.6)" />
                {/* Connection points */}
                <circle cx="50" cy="40" r="3" fill="rgba(255,255,255,0.9)" />
                <circle cx="50" cy="60" r="3" fill="rgba(255,255,255,0.9)" />
                {/* External pins */}
                <rect x="15" y="35" width="10" height="3" fill="#666" />
                <rect x="15" y="45" width="10" height="3" fill="#666" />
                <rect x="15" y="55" width="10" height="3" fill="#666" />
                <rect x="75" y="35" width="10" height="3" fill="#666" />
                <rect x="75" y="45" width="10" height="3" fill="#666" />
                <rect x="75" y="55" width="10" height="3" fill="#666" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white text-center md:text-left">
              Technologies
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="glass-card rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center flex flex-col items-center justify-center w-full min-h-[100px] sm:min-h-[120px]">
                <img
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2"
                  loading="lazy"
                  style={{ objectFit: 'contain' }}
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-tight">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mb-6 sm:mb-8">
            {/* 3D Gear/Wrench Logo for Tools */}
            <div className="logo-3d mb-4 md:mb-0 md:mr-4">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 100 100" 
                className="w-12 h-12 sm:w-16 sm:h-16"
                role="img"
                aria-label="Tools represented by a gear icon"
              >
                <defs>
                  <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff9a9e" />
                    <stop offset="50%" stopColor="#fecfef" />
                    <stop offset="100%" stopColor="#fecfef" />
                  </linearGradient>
                  <filter id="gearShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
                  </filter>
                </defs>
                {/* Gear teeth */}
                <path 
                  d="M50 10 L55 20 L60 10 L65 20 L70 15 L75 25 L80 20 L85 30 L80 35 L85 40 L80 50 L85 60 L80 65 L85 70 L75 75 L70 85 L65 80 L60 90 L55 80 L50 90 L45 80 L40 90 L35 80 L30 85 L25 75 L15 70 L20 65 L15 60 L20 50 L15 40 L20 35 L15 30 L25 25 L30 15 L35 20 L40 10 L45 20 Z" 
                  fill="url(#gearGradient)" 
                  filter="url(#gearShadow)"
                  className="animate-spin-slow"
                />
                {/* Inner circle */}
                <circle 
                  cx="50" cy="50" r="15" 
                  fill="rgba(255,255,255,0.9)" 
                  stroke="rgba(0,0,0,0.1)" 
                  strokeWidth="1"
                />
                {/* Center hole */}
                <circle cx="50" cy="50" r="8" fill="rgba(0,0,0,0.2)" />
                {/* Highlight */}
                <circle cx="45" cy="45" r="3" fill="rgba(255,255,255,0.8)" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white text-center md:text-left">
              Tools
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {tools.map((tool, index) => (
              <div key={index} className="glass-card rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px]">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2"
                  loading="lazy"
                  style={{ objectFit: 'contain' }}
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-tight">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 