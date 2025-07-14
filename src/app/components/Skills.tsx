'use client';

import { useRef, useEffect, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// Memoized component to prevent unnecessary re-renders
const Skills = memo(function Skills({ categories }: SkillsProps) {
  useEffect(() => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
      // Simplified hover animations for better performance
      const handleMouseEnter = () => {
        gsap.to(card, {
          background: "rgba(255,255,255,0.25)",
          boxShadow: "0 12px 40px 0 rgba(31,38,135,0.45)",
          duration: 0.3,
          ease: "power2.out",
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(card, {
          background: "rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
          duration: 0.3,
          ease: "power2.in",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Optimized technology and tools arrays with fewer items for better performance
  const technologies = [
    { name: 'Apache Spark', logo: 'https://cdn.simpleicons.org/apachespark/FF8000' },
    { name: 'Apache Kafka', logo: 'https://cdn.simpleicons.org/apachekafka/231F20' },
    { name: 'Apache Flink', logo: 'https://cdn.simpleicons.org/apacheflink/E6526F' },
    { name: 'Hadoop', logo: 'https://cdn.simpleicons.org/apachehadoop/66CCFF' },
    { name: 'Apache Airflow', logo: 'https://cdn.simpleicons.org/apacheairflow/017CEE' },
    { name: 'Snowflake', logo: 'https://cdn.simpleicons.org/snowflake/29B5E8' },
    { name: 'dbt', logo: 'https://cdn.simpleicons.org/dbt/FF694B' },
    { name: 'Databricks', logo: 'https://cdn.simpleicons.org/databricks/FF3621' },
    { name: 'Apache Beam', logo: 'https://cdn.simpleicons.org/apachebeam/D9A441' },
    { name: 'Delta Lake', logo: 'https://cdn.simpleicons.org/deltalake/00ADD4' },
    { name: 'Great Expectations', logo: 'https://cdn.simpleicons.org/greatexpectations/FF6B35' },
    { name: 'Apache Atlas', logo: 'https://cdn.simpleicons.org/apache/D22128' },
    { name: 'Debezium', logo: 'https://cdn.simpleicons.org/apache/D22128' },
    { name: 'Confluent', logo: 'https://cdn.simpleicons.org/confluent/0066CC' },
    { name: 'MLflow', logo: 'https://cdn.simpleicons.org/mlflow/0194E2' },
    { name: 'Kubeflow', logo: 'https://cdn.simpleicons.org/kubeflow/326CE5' },
  ];

  const cloudPlatforms = [
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/amazonwebservices/amazonwebservices-original.svg' },
    { name: 'Azure', logo: 'https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/azure/azure-original.svg' },
    { name: 'GCP', logo: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
    { name: 'AWS Redshift', logo: 'https://cdn.simpleicons.org/amazonredshift/8C4FFF' },
    { name: 'AWS Glue', logo: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
    { name: 'AWS Kinesis', logo: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
    { name: 'Azure Synapse', logo: 'https://cdn.simpleicons.org/microsoftazure/0078D4' },
    { name: 'BigQuery', logo: 'https://cdn.simpleicons.org/googlebigquery/669DF6' },
    { name: 'Cloud Dataflow', logo: 'https://cdn.simpleicons.org/googlecloud/4285F4' },
    { name: 'Azure Data Factory', logo: 'https://cdn.simpleicons.org/microsoftazure/0078D4' },
  ];

  const databases = [
    { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' },
    { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
    { name: 'Redis', logo: 'https://cdn.simpleicons.org/redis/DC382D' },
    { name: 'Cassandra', logo: 'https://cdn.simpleicons.org/apachecassandra/1287B1' },
    { name: 'Elasticsearch', logo: 'https://cdn.simpleicons.org/elasticsearch/005571' },
    { name: 'Neo4j', logo: 'https://cdn.simpleicons.org/neo4j/008CC1' },
    { name: 'InfluxDB', logo: 'https://cdn.simpleicons.org/influxdb/22ADF6' },
    { name: 'Amazon DynamoDB', logo: 'https://cdn.simpleicons.org/amazondynamodb/4053D6' },
    { name: 'Azure Cosmos DB', logo: 'https://cdn.simpleicons.org/microsoftazure/0078D4' },
  ];

  const devopsTools = [
    { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'Kubernetes', logo: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
    { name: 'Terraform', logo: 'https://cdn.simpleicons.org/terraform/623CE4' },
    { name: 'Jenkins', logo: 'https://cdn.simpleicons.org/jenkins/D24939' },
    { name: 'GitLab CI', logo: 'https://cdn.simpleicons.org/gitlab/FC6D26' },
    { name: 'GitHub Actions', logo: 'https://cdn.simpleicons.org/githubactions/2088FF' },
    { name: 'Ansible', logo: 'https://cdn.simpleicons.org/ansible/EE0000' },
    { name: 'Prometheus', logo: 'https://cdn.simpleicons.org/prometheus/E6522C' },
    { name: 'Grafana', logo: 'https://cdn.simpleicons.org/grafana/F46800' },
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Skills Section */}
        <div className="text-center mb-16">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mb-4">
            {/* Optimized 3D Brain Logo */}
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
                <path 
                  d="M30 35 Q25 25 35 20 Q45 15 55 20 Q65 15 75 20 Q85 25 80 35 Q85 45 75 50 Q80 60 70 65 Q60 70 50 65 Q40 70 30 65 Q20 60 25 50 Q15 45 20 35 Q25 25 30 35 Z" 
                  fill="url(#brainGradient)" 
                  filter="url(#shadow)"
                  className="animate-pulse"
                />
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
                </defs>
                <rect x="25" y="25" width="50" height="50" rx="5" fill="url(#chipGradient)" />
                <rect x="30" y="35" width="40" height="2" fill="rgba(255,255,255,0.8)" />
                <rect x="30" y="45" width="40" height="2" fill="rgba(255,255,255,0.8)" />
                <rect x="30" y="55" width="40" height="2" fill="rgba(255,255,255,0.8)" />
                <rect x="30" y="65" width="40" height="2" fill="rgba(255,255,255,0.8)" />
                <circle cx="50" cy="40" r="3" fill="rgba(255,255,255,0.9)" />
                <circle cx="50" cy="60" r="3" fill="rgba(255,255,255,0.9)" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white text-center md:text-left">
              Big Data & Analytics Technologies
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

        {/* Cloud Platforms Section */}
        <div>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mb-6 sm:mb-8">
            <div className="logo-3d mb-4 md:mb-0 md:mr-4">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 100 100" 
                className="w-12 h-12 sm:w-16 sm:h-16"
                role="img"
                aria-label="Cloud platforms represented by a cloud icon"
              >
                <defs>
                  <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4285F4" />
                    <stop offset="33%" stopColor="#FF9900" />
                    <stop offset="66%" stopColor="#0078D4" />
                    <stop offset="100%" stopColor="#34A853" />
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="45" rx="25" ry="15" fill="url(#cloudGradient)" />
                <ellipse cx="35" cy="50" rx="15" ry="10" fill="url(#cloudGradient)" />
                <ellipse cx="65" cy="50" rx="15" ry="10" fill="url(#cloudGradient)" />
                <ellipse cx="50" cy="55" rx="30" ry="12" fill="url(#cloudGradient)" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white text-center md:text-left">
              Cloud Platforms
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {cloudPlatforms.map((platform, index) => (
              <div key={index} className="glass-card rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px]">
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2"
                  loading="lazy"
                  style={{ objectFit: 'contain' }}
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-tight">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Databases Section */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mb-6 sm:mb-8">
            <div className="logo-3d mb-4 md:mb-0 md:mr-4">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 100 100" 
                className="w-12 h-12 sm:w-16 sm:h-16"
                role="img"
                aria-label="Databases represented by a database icon"
              >
                <defs>
                  <linearGradient id="dbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#336791" />
                    <stop offset="50%" stopColor="#47A248" />
                    <stop offset="100%" stopColor="#DC382D" />
                  </linearGradient>
                </defs>
                <ellipse cx="50" cy="25" rx="30" ry="8" fill="url(#dbGradient)" />
                <rect x="20" y="25" width="60" height="30" fill="url(#dbGradient)" />
                <ellipse cx="50" cy="55" rx="30" ry="8" fill="url(#dbGradient)" />
                <ellipse cx="50" cy="75" rx="30" ry="8" fill="url(#dbGradient)" />
                <rect x="20" y="55" width="60" height="20" fill="url(#dbGradient)" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white text-center md:text-left">
              Databases & Storage
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {databases.map((db, index) => (
              <div key={index} className="glass-card rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 text-center flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px]">
                <img
                  src={db.logo}
                  alt={`${db.name} logo`}
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2"
                  loading="lazy"
                  style={{ objectFit: 'contain' }}
                />
                <span className="text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm leading-tight">
                  {db.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DevOps & Infrastructure Section */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mb-6 sm:mb-8">
            <div className="logo-3d mb-4 md:mb-0 md:mr-4">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 100 100" 
                className="w-12 h-12 sm:w-16 sm:h-16"
                role="img"
                aria-label="DevOps tools represented by a gear icon"
              >
                <defs>
                  <linearGradient id="devopsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2496ED" />
                    <stop offset="50%" stopColor="#326CE5" />
                    <stop offset="100%" stopColor="#623CE4" />
                  </linearGradient>
                </defs>
                <path 
                  d="M50 10 L55 20 L60 10 L65 20 L70 15 L75 25 L80 20 L85 30 L80 35 L85 40 L80 50 L85 60 L80 65 L85 70 L75 75 L70 85 L65 80 L60 90 L55 80 L50 90 L45 80 L40 90 L35 80 L30 85 L25 75 L15 70 L20 65 L15 60 L20 50 L15 40 L20 35 L15 30 L25 25 L30 15 L35 20 L40 10 L45 20 Z" 
                  fill="url(#devopsGradient)" 
                  className="animate-spin-slow"
                />
                <circle cx="50" cy="50" r="15" fill="rgba(255,255,255,0.9)" />
                <circle cx="50" cy="50" r="8" fill="rgba(0,0,0,0.2)" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white text-center md:text-left">
              DevOps & Infrastructure
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {devopsTools.map((tool, index) => (
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
});

export default Skills;