'use client';

import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Skills from './components/Skills';
import Contact from './components/Contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

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
    const cards = document.querySelectorAll('.about-glass-card');
    cards.forEach(card => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, rotateY: 0 },
        {
          y: -100,
          opacity: 1,
          rotateY: 45,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
          ease: "power2.out",
        }
      );
    });
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Project data
  const projects = [
    {
      title: "Real-Time Data Pipeline",
      description: "Built a scalable real-time data pipeline processing 1M+ events per minute using Apache Kafka, Spark Streaming, and AWS EMR. Implemented data quality checks and monitoring.",
      tech: ["Apache Kafka", "Apache Spark", "AWS EMR", "Python", "Docker", "Prometheus"],
      image: "https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=Data+Pipeline",
      liveUrl: "https://data-pipeline-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/real-time-data-pipeline"
    },
    {
      title: "Data Warehouse Architecture",
      description: "Designed and implemented a modern data warehouse using Snowflake, dbt, and Airflow. Created dimensional models and automated data transformation pipelines.",
      tech: ["Snowflake", "dbt", "Apache Airflow", "Python", "SQL", "GitHub Actions"],
      image: "https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Data+Warehouse",
      liveUrl: "https://data-warehouse-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/data-warehouse-architecture"
    },
    {
      title: "ML Model Pipeline",
      description: "End-to-end machine learning pipeline for predictive analytics using MLflow, Kubeflow, and AWS SageMaker. Automated model training, deployment, and monitoring.",
      tech: ["MLflow", "Kubeflow", "AWS SageMaker", "Python", "Docker", "Kubernetes"],
      image: "https://via.placeholder.com/400x250/10B981/FFFFFF?text=ML+Pipeline",
      liveUrl: "https://ml-pipeline-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/ml-model-pipeline"
    },
    {
      title: "Data Lake Platform",
      description: "Built a data lake platform on AWS S3 with Delta Lake format, implementing data governance, access controls, and automated data cataloging.",
      tech: ["AWS S3", "Delta Lake", "Apache Hudi", "AWS Glue", "Python", "Terraform"],
      image: "https://via.placeholder.com/400x250/F59E0B/FFFFFF?text=Data+Lake",
      liveUrl: "https://data-lake-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/data-lake-platform"
    },
    {
      title: "Streaming Analytics Dashboard",
      description: "Real-time streaming analytics dashboard using Apache Flink, Elasticsearch, and Kibana. Processed streaming data with complex event processing.",
      tech: ["Apache Flink", "Elasticsearch", "Kibana", "Java", "Docker", "Prometheus"],
      image: "https://via.placeholder.com/400x250/EF4444/FFFFFF?text=Streaming+Analytics",
      liveUrl: "https://streaming-analytics-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/streaming-analytics-dashboard"
    },
    {
      title: "Data Quality Framework",
      description: "Comprehensive data quality framework using Great Expectations, Apache Airflow, and custom monitoring. Automated data validation and alerting system.",
      tech: ["Great Expectations", "Apache Airflow", "Python", "PostgreSQL", "Slack API", "Grafana"],
      image: "https://via.placeholder.com/400x250/06B6D4/FFFFFF?text=Data+Quality",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Home Section */}
      <Hero scrollToSection={scrollToSection} />

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">About Me</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left glass-card p-8 about-glass-card">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  Passionate Data Engineer
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  With over 5 years of experience in data engineering, I specialize in building 
                  scalable data pipelines, designing efficient data architectures, and transforming 
                  raw data into actionable insights. I love solving complex data challenges.
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  My journey in data started with curiosity about how data drives business decisions 
                  and has evolved into a passion for building robust, scalable data infrastructure. 
                  I believe in data quality, performance optimization, and continuous learning.
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  When I'm not building data pipelines, you can find me exploring new big data 
                  technologies, contributing to open-source data projects, or sharing knowledge 
                  with the data engineering community.
                </p>
              </div>
            </div>
            <div className="animate-slide-in-right glass-card p-8 about-glass-card">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</h4>
                  <p className="text-slate-600 dark:text-slate-300">Years Experience</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">25+</h4>
                  <p className="text-slate-600 dark:text-slate-300">Data Pipelines Built</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">1M+</h4>
                  <p className="text-slate-600 dark:text-slate-300">Events/Minute Processed</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">99.9%</h4>
                  <p className="text-slate-600 dark:text-slate-300">Pipeline Uptime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
              Here are some of my recent data engineering projects that showcase my expertise in building scalable data infrastructure and pipelines.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* SVG Morphing Demo */}
      {/* <SvgMorphDemo /> */}

      {/* Skills Section */}
      <Skills categories={skillCategories} />

      {/* Glow Pulse Button Demo */}
      {/* <div className="flex justify-center py-12">
        <GlowPulseButton />
      </div> */}

      {/* Contact Section */}
      <Contact contactInfo={contactInfo} />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            © 2024 Manoj Kumar. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
