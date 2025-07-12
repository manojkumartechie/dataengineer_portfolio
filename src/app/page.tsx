// Server Component - handles data and passes to client
import dynamic from 'next/dynamic';
import LoadingSpinner from './components/LoadingSpinner';

// Dynamically import ClientPortfolio with SSR disabled to avoid server-side issues
const ClientPortfolio = dynamic(() => import('./components/ClientPortfolio'), {
  ssr: false,
  loading: () => <LoadingSpinner />
});

// Server-side data - this would typically come from a database or API
async function getPortfolioData() {
  // Simulate server-side data fetching
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

  const contactInfo = {
    email: "hello@manojkumar.dev",
    location: "Bangalore, India",
    phone: "+91 98765 43210",
    linkedin: "https://linkedin.com/in/manojkumartechie",
    github: "https://github.com/manojkumartechie"
  };

  return {
    projects,
    skillCategories,
    contactInfo
  };
}

export default async function Home() {
  const portfolioData = await getPortfolioData();
  
  return <ClientPortfolio {...portfolioData} />;
}