// Server Component - handles data and passes to client
import ClientPortfolioWrapper from './components/ClientPortfolioWrapper';

// Server-side data - this would typically come from a database or API
async function getPortfolioData() {
  // Comprehensive projects based on data engineering roadmaps
  const projects = [
    {
      title: "Real-Time Streaming Data Platform",
      description: "Built an end-to-end real-time data platform processing 10M+ events/day using Apache Kafka, Spark Streaming, and AWS Kinesis. Implemented exactly-once processing, schema evolution, and auto-scaling with 99.99% uptime. Features real-time analytics, alerting, and data quality monitoring.",
      tech: ["Apache Kafka", "Apache Spark", "AWS Kinesis", "Apache Flink", "Redis", "Elasticsearch", "Grafana", "Python", "Scala", "Docker", "Kubernetes"],
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://streaming-platform-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/real-time-streaming-platform",
      architecture: "Lambda Architecture with real-time and batch processing layers",
      metrics: "10M+ events/day, <100ms latency, 99.99% uptime",
      challenges: "Handling schema evolution, ensuring exactly-once processing, managing backpressure"
    },
    {
      title: "Cloud-Native Data Warehouse on AWS",
      description: "Designed and implemented a modern cloud data warehouse using AWS Redshift, S3, and Glue. Built automated ETL pipelines with Apache Airflow, implemented data governance with AWS Lake Formation, and created self-service analytics platform with Tableau integration.",
      tech: ["AWS Redshift", "AWS S3", "AWS Glue", "Apache Airflow", "dbt", "Terraform", "AWS Lake Formation", "Tableau", "Python", "SQL", "AWS Lambda"],
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://data-warehouse-aws-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/aws-data-warehouse",
      architecture: "Modern Data Stack with ELT approach using cloud-native services",
      metrics: "500GB+ data processed daily, 40% cost reduction, 10x faster queries",
      challenges: "Data governance implementation, cost optimization, query performance tuning"
    },
    {
      title: "Multi-Cloud Data Lake Architecture",
      description: "Built a multi-cloud data lake spanning AWS, Azure, and GCP using Delta Lake format. Implemented unified data governance, cross-cloud data replication, and federated query capabilities. Features automated data cataloging, lineage tracking, and compliance monitoring.",
      tech: ["Delta Lake", "Apache Spark", "AWS S3", "Azure Data Lake", "GCP Cloud Storage", "Databricks", "Apache Atlas", "Terraform", "Python", "Scala"],
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://multi-cloud-lake-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/multi-cloud-data-lake",
      architecture: "Lakehouse architecture with ACID transactions and unified analytics",
      metrics: "5PB+ data managed, 99.9% data quality score, 60% faster analytics",
      challenges: "Cross-cloud networking, data consistency, unified governance"
    },
    {
      title: "MLOps Data Pipeline Platform",
      description: "Developed an end-to-end MLOps platform with automated feature engineering, model training pipelines, and real-time inference. Integrated with Kubeflow, MLflow, and Apache Airflow for orchestration. Features A/B testing, model monitoring, and automated retraining.",
      tech: ["Kubeflow", "MLflow", "Apache Airflow", "Apache Spark", "Kubernetes", "TensorFlow", "PyTorch", "Apache Kafka", "Redis", "PostgreSQL", "Python"],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://mlops-platform-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/mlops-data-platform",
      architecture: "Event-driven architecture with microservices for ML lifecycle management",
      metrics: "50+ models in production, 90% faster deployment, 25% improved accuracy",
      challenges: "Feature store design, model versioning, real-time inference scaling"
    },
    {
      title: "CDC-Based Data Synchronization System",
      description: "Built a Change Data Capture (CDC) system using Debezium, Kafka Connect, and Apache Kafka to sync data across multiple databases in real-time. Implemented schema registry, data transformation, and conflict resolution with sub-second latency.",
      tech: ["Debezium", "Apache Kafka", "Kafka Connect", "Confluent Schema Registry", "Apache Avro", "PostgreSQL", "MongoDB", "Elasticsearch", "Docker", "Java"],
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://cdc-sync-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/cdc-data-sync",
      architecture: "Event-sourcing pattern with distributed transaction log",
      metrics: "<1s data synchronization, 99.95% data consistency, zero downtime migrations",
      challenges: "Schema evolution handling, conflict resolution, maintaining data consistency"
    },
    {
      title: "Serverless Data Processing Framework",
      description: "Created a serverless data processing framework using AWS Lambda, Step Functions, and EventBridge. Implemented auto-scaling data pipelines with cost optimization, error handling, and monitoring. Supports both batch and streaming workloads with pay-per-use pricing.",
      tech: ["AWS Lambda", "AWS Step Functions", "AWS EventBridge", "AWS S3", "AWS DynamoDB", "Apache Parquet", "Python", "Terraform", "CloudWatch", "SQS"],
      image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://serverless-framework-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/serverless-data-framework",
      architecture: "Event-driven serverless architecture with auto-scaling capabilities",
      metrics: "80% cost reduction, infinite scalability, <5min cold start optimization",
      challenges: "Cold start optimization, state management, cost monitoring"
    },
    {
      title: "Data Quality & Observability Platform",
      description: "Developed a comprehensive data quality and observability platform using Great Expectations, Apache Airflow, and custom monitoring tools. Features automated data profiling, anomaly detection, data lineage tracking, and SLA monitoring with Slack/PagerDuty integration.",
      tech: ["Great Expectations", "Apache Airflow", "Prometheus", "Grafana", "Apache Atlas", "Neo4j", "Python", "PostgreSQL", "Docker", "Kubernetes"],
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://data-quality-platform-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/data-quality-platform",
      architecture: "Microservices architecture with event-driven data quality checks",
      metrics: "99.5% data quality score, 50% faster issue detection, 90% automated remediation",
      challenges: "Defining quality metrics, handling data drift, automated remediation"
    },
    {
      title: "Graph Database Analytics Engine",
      description: "Built a graph analytics engine using Neo4j, Apache Spark GraphX, and Amazon Neptune for complex relationship analysis. Implemented graph algorithms for fraud detection, recommendation systems, and network analysis with real-time query capabilities.",
      tech: ["Neo4j", "Amazon Neptune", "Apache Spark GraphX", "Gremlin", "Cypher", "Python", "Scala", "AWS Lambda", "Apache Kafka", "Redis"],
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400",
      liveUrl: "https://graph-analytics-demo.vercel.app",
      githubUrl: "https://github.com/manojkumartechie/graph-analytics-engine",
      architecture: "Hybrid graph processing with both OLTP and OLAP capabilities",
      metrics: "Billion+ nodes processed, <100ms query response, 95% fraud detection accuracy",
      challenges: "Graph partitioning, query optimization, real-time updates"
    }
  ];

  // Comprehensive skill categories based on data engineering roadmaps
  const skillCategories = [
    {
      category: "Programming Languages",
      color: "#3B82F6",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 98 },
        { name: "Scala", level: 85 },
        { name: "Java", level: 80 },
        { name: "R", level: 75 },
        { name: "Go", level: 70 }
      ]
    },
    {
      category: "Big Data Technologies",
      color: "#8B5CF6",
      skills: [
        { name: "Apache Spark", level: 95 },
        { name: "Apache Kafka", level: 90 },
        { name: "Apache Flink", level: 85 },
        { name: "Hadoop Ecosystem", level: 85 },
        { name: "Apache Storm", level: 75 },
        { name: "Apache Beam", level: 80 }
      ]
    },
    {
      category: "Cloud Platforms",
      color: "#10B981",
      skills: [
        { name: "AWS", level: 92 },
        { name: "Azure", level: 85 },
        { name: "Google Cloud Platform", level: 80 },
        { name: "Databricks", level: 88 },
        { name: "Snowflake", level: 85 },
        { name: "Confluent Cloud", level: 80 }
      ]
    },
    {
      category: "Data Storage & Databases",
      color: "#F59E0B",
      skills: [
        { name: "PostgreSQL", level: 90 },
        { name: "MongoDB", level: 85 },
        { name: "Cassandra", level: 80 },
        { name: "Redis", level: 85 },
        { name: "Elasticsearch", level: 82 },
        { name: "Neo4j", level: 75 }
      ]
    },
    {
      category: "Data Orchestration & Workflow",
      color: "#EF4444",
      skills: [
        { name: "Apache Airflow", level: 92 },
        { name: "Prefect", level: 80 },
        { name: "Dagster", level: 75 },
        { name: "AWS Step Functions", level: 85 },
        { name: "Kubeflow", level: 80 },
        { name: "dbt", level: 88 }
      ]
    },
    {
      category: "Infrastructure & DevOps",
      color: "#06B6D4",
      skills: [
        { name: "Docker", level: 90 },
        { name: "Kubernetes", level: 85 },
        { name: "Terraform", level: 88 },
        { name: "Jenkins", level: 80 },
        { name: "GitLab CI/CD", level: 82 },
        { name: "Ansible", level: 75 }
      ]
    },
    {
      category: "Data Quality & Monitoring",
      color: "#8B5CF6",
      skills: [
        { name: "Great Expectations", level: 85 },
        { name: "Apache Atlas", level: 80 },
        { name: "Prometheus", level: 82 },
        { name: "Grafana", level: 85 },
        { name: "DataDog", level: 78 },
        { name: "Monte Carlo", level: 75 }
      ]
    },
    {
      category: "Stream Processing",
      color: "#F97316",
      skills: [
        { name: "Apache Kafka Streams", level: 88 },
        { name: "Apache Flink", level: 85 },
        { name: "AWS Kinesis", level: 82 },
        { name: "Apache Storm", level: 75 },
        { name: "Pulsar", level: 70 },
        { name: "Azure Event Hubs", level: 78 }
      ]
    }
  ];

  const contactInfo = {
    email: "manojkumar2004@zoho.in",
    location: "Bangalore, India",
    phone: "+91 9876543210",
    linkedin: "https://linkedin.com/in/manojkumartechie",
    github: "https://github.com/manojkumartechie"
  };

  return {
    projects,
    skillCategories,
    contactInfo
  };
}

export default async function Page() {
  const data = await getPortfolioData();
  return (
    <main>
      <ClientPortfolioWrapper data={data} />
    </main>
  );
}