'use client';

import { useState, useEffect } from 'react';
import AdvancedNavigation from './components/AdvancedNavigation';
import AdvancedHero from './components/AdvancedHero';
import AdvancedProjectCard from './components/AdvancedProjectCard';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import AnimatedBackground from './components/AnimatedBackground';
import LightingEffects from './components/LightingEffects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Global scroll-triggered animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      gsap.fromTo(section,
        { opacity: 0.8 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          }
        }
      );
    });

    // Smooth scrolling enhancement
    gsap.registerPlugin(ScrollTrigger);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (gsap && gsap.to && gsap.plugins && gsap.plugins.scrollTo) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: { y: element, offsetY: 80 },
          ease: "power2.inOut"
        });
      } else {
        // Fallback if GSAP scrollTo plugin is not available
        const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  // Project data
  const projects = [
    {
      title: "Real-Time Data Pipeline",
      description: "Built a scalable real-time data pipeline processing 1M+ events per minute using Apache Kafka, Spark Streaming, and AWS EMR. Implemented comprehensive data quality checks and monitoring with 99.9% uptime.",
      tech: ["Apache Kafka", "Apache Spark", "AWS EMR", "Python", "Docker", "Prometheus"],
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://data-pipeline-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/real-time-data-pipeline"
    },
    {
      title: "Data Warehouse Architecture",
      description: "Designed and implemented a modern data warehouse using Snowflake, dbt, and Airflow. Created dimensional models and automated data transformation pipelines with advanced data governance.",
      tech: ["Snowflake", "dbt", "Apache Airflow", "Python", "SQL", "GitHub Actions"],
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://data-warehouse-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/data-warehouse-architecture"
    },
    {
      title: "ML Model Pipeline",
      description: "End-to-end machine learning pipeline for predictive analytics using MLflow, Kubeflow, and AWS SageMaker. Automated model training, deployment, and monitoring with A/B testing capabilities.",
      tech: ["MLflow", "Kubeflow", "AWS SageMaker", "Python", "Docker", "Kubernetes"],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://ml-pipeline-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/ml-model-pipeline"
    },
    {
      title: "Data Lake Platform",
      description: "Built a comprehensive data lake platform on AWS S3 with Delta Lake format, implementing advanced data governance, access controls, and automated data cataloging with metadata management.",
      tech: ["AWS S3", "Delta Lake", "Apache Hudi", "AWS Glue", "Python", "Terraform"],
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://data-lake-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/data-lake-platform"
    },
    {
      title: "Streaming Analytics Dashboard",
      description: "Real-time streaming analytics dashboard using Apache Flink, Elasticsearch, and Kibana. Processed streaming data with complex event processing and real-time alerting system.",
      tech: ["Apache Flink", "Elasticsearch", "Kibana", "Java", "Docker", "Prometheus"],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://streaming-analytics-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/streaming-analytics-dashboard"
    },
    {
      title: "Data Quality Framework",
      description: "Comprehensive data quality framework using Great Expectations, Apache Airflow, and custom monitoring. Automated data validation, profiling, and alerting system with detailed reporting.",
      tech: ["Great Expectations", "Apache Airflow", "Python", "PostgreSQL", "Slack API", "Grafana"],
      image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://data-quality-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/data-quality-framework"
    }
  ];

  // Skills data
  const skillCategories = [
    {
      category: "Big Data Technologies",
      color: "#3B82F6",
      skills: [
        { name: "Apache Spark", level: 95 },
        { name: "Apache Kafka", level: 90 },
        { name: "Apache Airflow", level: 85 },
        { name: "Apache Flink", level: 80 },
        { name: "Hadoop", level: 85 },
        { name: "Hive", level: 80 }
      ]
    },
    {
      category: "Cloud & Infrastructure",
      color: "#8B5CF6",
      skills: [
        { name: "AWS", level: 90 },
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 80 },
        { name: "Terraform", level: 75 },
        { name: "AWS EMR", level: 85 },
        { name: "AWS Glue", level: 80 }
      ]
    },
    {
      category: "Data Engineering Tools",
      color: "#10B981",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 90 },
        { name: "dbt", level: 85 },
        { name: "Snowflake", level: 80 },
        { name: "Delta Lake", level: 75 },
        { name: "Great Expectations", level: 80 }
      ]
    },
    {
      category: "ML & Analytics",
      color: "#F59E0B",
      skills: [
        { name: "MLflow", level: 85 },
        { name: "Kubeflow", level: 75 },
        { name: "AWS SageMaker", level: 80 },
        { name: "Pandas", level: 90 },
        { name: "NumPy", level: 85 },
        { name: "Scikit-learn", level: 80 }
      ]
    }
  ];

  // Contact data
  const contactInfo = {
    email: "hello@manojkumar.dev",
    location: "Bangalore, India",
    phone: "+91 98765 43210",
    linkedin: "https://linkedin.com/in/manojkumartechie",
    github: "https://github.com/manojkumartechie"
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Lighting Effects */}
      <LightingEffects />

      {/* Navigation */}
      <AdvancedNavigation activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Home Section */}
      <AdvancedHero scrollToSection={scrollToSection} />

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transforming data into insights, building the future of analytics
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-3xl font-bold text-white mb-6">
                Passionate Data Engineer
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                With over 5 years of experience in data engineering, I specialize in building 
                scalable data pipelines, designing efficient data architectures, and transforming 
                raw data into actionable insights. I love solving complex data challenges and 
                optimizing performance at scale.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                My journey in data started with curiosity about how data drives business decisions 
                and has evolved into a passion for building robust, scalable data infrastructure. 
                I believe in data quality, performance optimization, and continuous learning.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When I'm not building data pipelines, you can find me exploring new big data 
                technologies, contributing to open-source data projects, or sharing knowledge 
                with the data engineering community.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl text-center">
                <h4 className="text-4xl font-bold text-blue-400 mb-2">5+</h4>
                <p className="text-gray-300">Years Experience</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <h4 className="text-4xl font-bold text-purple-400 mb-2">25+</h4>
                <p className="text-gray-300">Data Pipelines Built</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <h4 className="text-4xl font-bold text-pink-400 mb-2">1M+</h4>
                <p className="text-gray-300">Events/Minute Processed</p>
              </div>
              <div className="glass-card p-6 rounded-xl text-center">
                <h4 className="text-4xl font-bold text-green-400 mb-2">99.9%</h4>
                <p className="text-gray-300">Pipeline Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcasing my expertise in building scalable data infrastructure and innovative solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <AdvancedProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <Skills categories={skillCategories} />

      {/* Contact Section */}
      <Contact contactInfo={contactInfo} />

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm text-white py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center space-x-6 mb-8">
              <a 
                href="https://github.com/manojkumartechie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com/in/manojkumartechie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com/manojkumartechie" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-lg">
              © 2024 Manoj Kumar. Crafted with passion and powered by data.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}