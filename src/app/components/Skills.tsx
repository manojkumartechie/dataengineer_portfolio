'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { FaPython, FaJava, FaAws, FaDocker, FaGithub, FaGitlab, FaLinux, FaWindows, FaGit, FaJenkins, FaBitbucket, FaTools, FaMicrosoft } from 'react-icons/fa';
import { SiApacheairflow, SiApachehadoop, SiApachekafka, SiApachespark, SiApacheflink, SiApachehive, SiMongodb, SiPostgresql, SiMysql, SiRedis, SiElasticsearch, SiPrometheus, SiGrafana, SiTerraform, SiTableau, SiSnowflake, SiDbt, SiScala, SiRust, SiGo, SiGooglecloud, SiKubernetes } from 'react-icons/si';

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
    { name: 'Spark', icon: SiApachespark },
    { name: 'Kafka', icon: SiApachekafka },
    { name: 'Flink', icon: SiApacheflink },
    { name: 'Hadoop', icon: SiApachehadoop },
    { name: 'Hive', icon: SiApachehive },
    { name: 'Airflow', icon: SiApacheairflow },
    { name: 'Snowflake', icon: SiSnowflake },
    { name: 'dbt', icon: SiDbt },
    { name: 'Tableau', icon: SiTableau },
    { name: 'Elasticsearch', icon: SiElasticsearch },
    { name: 'Prometheus', icon: SiPrometheus },
    { name: 'Grafana', icon: SiGrafana },
    { name: 'Terraform', icon: SiTerraform },
  ];

  const tools = [
    { name: 'Git', icon: FaGit },
    { name: 'GitHub', icon: FaGithub },
    { name: 'GitLab', icon: FaGitlab },
    { name: 'Bitbucket', icon: FaBitbucket },
    { name: 'Jenkins', icon: FaJenkins },
    { name: 'Docker', icon: FaDocker },
    { name: 'Kubernetes', icon: SiKubernetes },
    { name: 'Linux', icon: FaLinux },
    { name: 'Windows', icon: FaWindows },
    { name: 'AWS', icon: FaAws },
    { name: 'Azure', icon: FaMicrosoft },
    { name: 'GCP', icon: SiGooglecloud },
    { name: 'MySQL', icon: SiMysql },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Redis', icon: SiRedis },
    { name: 'Python', icon: FaPython },
    { name: 'Java', icon: FaJava },
    { name: 'Scala', icon: SiScala },
    { name: 'Rust', icon: SiRust },
    { name: 'Go', icon: SiGo },
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
              className="glass-card rounded-2xl p-4 sm:p-6 w-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 skill-category-card"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technologies Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            Technologies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
            {technologies.map((tech, index) => {
              const Icon = tech.icon && typeof tech.icon === 'function' ? tech.icon : FaTools;
              return (
                <div key={index} className="glass-card rounded-2xl p-2 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center flex flex-col items-center justify-center w-full min-h-[80px] min-w-[44px]">
                  <Icon className="text-3xl mx-auto" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-sm mt-2">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 text-center">
            Tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tools.map((tool, index) => {
              const Icon = tool.icon && typeof tool.icon === 'function' ? tool.icon : FaTools;
              return (
                <div key={index} className="glass-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center flex flex-col items-center justify-center">
                  <Icon className="text-3xl mx-auto" />
                  <span className="text-slate-700 dark:text-slate-300 font-medium text-sm mt-2">
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