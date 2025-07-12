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

  // Split tools and technologies
  const technologies = [
    { name: 'Apache Spark', icon: Zap },
    { name: 'Apache Kafka', icon: Server },
    { name: 'Apache Flink', icon: Cpu },
    { name: 'Hadoop', icon: Database },
    { name: 'Apache Hive', icon: HardDrive },
    { name: 'Apache Airflow', icon: GitBranch },
    { name: 'Snowflake', icon: Cloud },
    { name: 'dbt', icon: Code },
    { name: 'Tableau', icon: BarChart3 },
    { name: 'Elasticsearch', icon: Database },
    { name: 'Prometheus', icon: Monitor },
    { name: 'Grafana', icon: BarChart3 },
    { name: 'Terraform', icon: Cloud },
  ];

  const tools = [
    { name: 'Git', icon: GitBranch },
    { name: 'GitHub', icon: GitBranch },
    { name: 'GitLab', icon: GitBranch },
    { name: 'Bitbucket', icon: GitBranch },
    { name: 'Jenkins', icon: Server },
    { name: 'Docker', icon: Server },
    { name: 'Kubernetes', icon: Cloud },
    { name: 'Linux', icon: Monitor },
    { name: 'Windows', icon: Monitor },
    { name: 'AWS', icon: Cloud },
    { name: 'Azure', icon: Cloud },
    { name: 'GCP', icon: Cloud },
    { name: 'MySQL', icon: Database },
    { name: 'PostgreSQL', icon: Database },
    { name: 'MongoDB', icon: Database },
    { name: 'Redis', icon: HardDrive },
    { name: 'Python', icon: Code },
    { name: 'Java', icon: Code },
    { name: 'Scala', icon: Code },
    { name: 'Rust', icon: Code },
    { name: 'Go', icon: Code },
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skills Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Skills</h2>
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
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 text-center">
            Technologies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="glass-card rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center flex flex-col items-center justify-center w-full min-h-[100px] sm:min-h-[120px]">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-slate-600 dark:text-slate-300" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-tight">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-6 sm:mb-8 text-center">
            Tools
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div key={index} className="glass-card rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px]">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-slate-600 dark:text-slate-300" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-tight">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 