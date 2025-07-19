'use client';

import { useEffect, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    category: "Programming Languages",
    color: "#306998",
    skills: [
      { name: "Python", level: 5, icon: "https://cdn.simpleicons.org/python/3776AB" },
    
      { name: "Scala", level: 3, icon: "https://cdn.simpleicons.org/scala/DC322F" },
    ],
  },
  {
    category: "Big Data & Analytics",
    color: "#ffa940",
    skills: [
      { name: "Apache Spark", level: 5, icon: "https://cdn.simpleicons.org/apachespark/FF8000" },
      { name: "Apache Flink", level: 4, icon: "https://cdn.simpleicons.org/apacheflink/E6526F" },
      { name: "Apache Beam", level: 3, icon: "https://beam.apache.org/images/logos/full-color/nameless/beam-logo-full-color-nameless.svg" },
      { name: "Apache Kafka", level: 5, icon: "https://cdn.simpleicons.org/apachekafka/231F20" },
      { name: "Hadoop", level: 4, icon: "https://cdn.simpleicons.org/apachehadoop/66CCFF" },
      { name: "dbt", level: 4, icon: "https://cdn.simpleicons.org/dbt/FF694B" },
      { name: "Databricks", level: 5, icon: "https://cdn.simpleicons.org/databricks/FF3621" },
    ],
  },
  {
    category: "Orchestration & Workflow",
    color: "#5288d8",
    skills: [
      { name: "Apache Airflow", level: 5, icon: "https://cdn.simpleicons.org/apacheairflow/017CEE" },
      { name: "Luigi", level: 3, icon: "https://raw.githubusercontent.com/spotify/luigi/master/doc/luigi.png" },
      { name: "AWS Glue", level: 4, icon: "https://icon.icepanel.io/AWS/svg/Analytics/Glue.svg" },
    ],
  },
  {
    category: "Cloud Platforms",
    color: "#5E9ED6",
    skills: [
      {
        name: "AWS",
        level: 5,
        icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/amazonwebservices/amazonwebservices-original.svg",
      },
      {
        name: "Azure",
        level: 3,
        icon: "https://cdn.jsdelivr.net/npm/devicon@2.15.1/icons/azure/azure-original.svg",
      },
      { name: "GCP", level: 3, icon: "https://cdn.simpleicons.org/googlecloud/4285F4" },
      { name: "AWS Redshift", level: 4, icon: "https://icon.icepanel.io/AWS/svg/Analytics/Redshift.svg" },
      { name: "BigQuery", level: 4, icon: "https://cdn.simpleicons.org/googlebigquery/669DF6" },
      { name: "Snowflake", level: 4, icon: "https://cdn.simpleicons.org/snowflake/29B5E8" },
      { name: "Databricks Lakehouse", level: 3, icon: "https://cdn.simpleicons.org/databricks/FF3621" },
    ],
  },
  {
    category: "Databases & Storage",
    color: "#1287B1",
    skills: [
      { name: "PostgreSQL", level: 5, icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "MongoDB", level: 3, icon: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Redis", level: 3, icon: "https://cdn.simpleicons.org/redis/DC382D" },
      { name: "Cassandra", level: 2, icon: "https://cdn.simpleicons.org/apachecassandra/1287B1" },
      { name: "Elasticsearch", level: 2, icon: "https://cdn.simpleicons.org/elasticsearch/005571" },
      { name: "Neo4j", level: 2, icon: "https://cdn.simpleicons.org/neo4j/008CC1" },
    ],
  },
  {
    category: "DevOps & Infrastructure",
    color: "#2496ED",
    skills: [
      { name: "Docker", level: 5, icon: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Kubernetes", level: 4, icon: "https://cdn.simpleicons.org/kubernetes/326CE5" },
      { name: "Terraform", level: 4, icon: "https://cdn.simpleicons.org/terraform/623CE4" },
      { name: "Jenkins", level: 3, icon: "https://cdn.simpleicons.org/jenkins/D24939" },
      { name: "GitLab CI", level: 3, icon: "https://cdn.simpleicons.org/gitlab/FC6D26" },
      { name: "GitHub Actions", level: 3, icon: "https://cdn.simpleicons.org/githubactions/2088FF" },
      { name: "Ansible", level: 3, icon: "https://cdn.simpleicons.org/ansible/EE0000" },
    ],
  },
  {
    category: "Monitoring & Observability",
    color: "#F59E42",
    skills: [
      { name: "Prometheus", level: 3, icon: "https://cdn.simpleicons.org/prometheus/E6522C" },
      { name: "Grafana", level: 3, icon: "https://cdn.simpleicons.org/grafana/F46800" },
    ],
  },
  {
    category: "Data Quality & Lineage",
    color: "#EC4899",
    skills: [
      { name: "Great Expectations", level: 3, icon: "https://avatars.githubusercontent.com/u/31670619?s=200&v=4" },
      { name: "Apache Atlas", level: 2, icon: "https://cdn.simpleicons.org/apache/D22128" },
    ],
  },
  
  
];

const Skills = memo(function Skills() {
  useEffect(() => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          background: 'rgba(255,255,255,0.25)',
          boxShadow: '0 12px 40px rgba(31,38,135,0.4)',
          duration: 0.3,
          ease: 'power2.out',
        });
      };
      const handleMouseLeave = () => {
        gsap.to(card, {
          background: 'rgba(255,255,255,0.15)',
          boxShadow: '0 8px 32px rgba(31,38,135,0.3)',
          duration: 0.3,
          ease: 'power2.in',
        });
      };
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
            Data Engineering Skills
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4" />
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Specialized expertise in modern data stack, pipelines, orchestration, observability, and cloud-native infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 relative shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col min-h-[220px]"
            >
              <div
                className="absolute top-0 left-0 w-full h-1.5"
                style={{ background: category.color, borderRadius: '8px 8px 0 0' }}
              />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white my-4 text-center">
                {category.category}
              </h3>

              <div className="space-y-3">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="flex items-center space-x-3">
                    {skill.icon && (
                      <img
                        src={skill.icon}
                        alt={`${skill.name} logo`}
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                      />
                    )}
                    <span className="text-md text-slate-700 dark:text-slate-200 font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Skills;
