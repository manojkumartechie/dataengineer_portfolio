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
    },
    {
    title: "Real-Time Fraud Detection Pipeline with Kafka & Flink",
    description: "Build an end-to-end real-time fraud detection system that processes millions of financial transactions per second. Implement ML-based anomaly detection with sub-100ms latency for immediate fraud prevention.",
    tech: ["Apache Kafka", "Apache Flink", "Redis", "Elasticsearch", "Docker", "Kubernetes", "Python", "Cassandra", "Grafana"],
    image: "/images/projects/fraud-detection.jpg",
    liveUrl: "https://fraud-detection-demo.example.com",
    githubUrl: "https://github.com/your-username/realtime-fraud-detection",
    architecture: "Event-driven microservices with stream processing",
    metrics: "Processing 1M+ transactions/sec with <50ms latency"
  },
  {
    title: "Multi-Cloud Data Lakehouse Migration Platform",
    description: "Develop a comprehensive migration platform for moving legacy data warehouses to modern lakehouse architecture across AWS, Azure, and GCP. Includes automated schema conversion and data lineage tracking.",
    tech: ["Apache Iceberg", "Delta Lake", "Databricks", "AWS Glue", "Azure Data Factory", "BigQuery", "Terraform", "dbt", "Apache Airflow"],
    image: "/images/projects/data-lakehouse.jpg",
    liveUrl: "https://lakehouse-migration.example.com",
    githubUrl: "https://github.com/your-username/multicloud-lakehouse",
    architecture: "Hybrid multi-cloud with unified metadata layer",
    metrics: "Migrated 500TB+ data with 99.9% accuracy"
  },
  {
    title: "MLOps Pipeline with Real-Time Feature Store",
    description: "Create an enterprise-grade MLOps platform with real-time feature engineering, automated model training, A/B testing, and drift detection. Supports both batch and streaming ML workloads.",
    tech: ["MLflow", "Feast", "Kubeflow", "Apache Spark", "Kafka", "Ray", "TensorFlow", "PyTorch", "Kubernetes", "Prometheus"],
    image: "/images/projects/mlops-pipeline.jpg",
    liveUrl: "https://mlops-platform.example.com",
    githubUrl: "https://github.com/your-username/enterprise-mlops",
    architecture: "Microservices-based ML platform with event-driven workflows",
    metrics: "Deploy models in <10 minutes with 99.95% uptime"
  },
  {
    title: "Real-Time IoT Data Processing at Scale",
    description: "Build a massive-scale IoT data processing system handling sensor data from millions of devices. Implements edge computing, real-time analytics, and predictive maintenance algorithms.",
    tech: ["Apache Kafka", "Apache Beam", "InfluxDB", "TimescaleDB", "Edge Computing", "MQTT", "Apache NiFi", "Grafana", "TensorFlow Lite"],
    image: "/images/projects/iot-processing.jpg",
    liveUrl: "https://iot-analytics.example.com",
    githubUrl: "https://github.com/your-username/iot-data-platform",
    architecture: "Edge-to-cloud streaming with time-series optimization",
    metrics: "Processing 10M+ sensor readings/sec globally"
  },
  {
    title: "CDC-Based Real-Time Data Synchronization",
    description: "Implement a Change Data Capture system for real-time synchronization between multiple databases and data warehouses. Ensures ACID compliance and handles schema evolution automatically.",
    tech: ["Debezium", "Apache Kafka", "PostgreSQL", "MongoDB", "Snowflake", "Apache Kafka Connect", "Schema Registry", "Apache Avro"],
    image: "/images/projects/cdc-sync.jpg",
    liveUrl: "https://cdc-platform.example.com",
    githubUrl: "https://github.com/your-username/realtime-cdc",
    architecture: "Event-sourcing with distributed transaction management",
    metrics: "Zero-downtime sync with <2 sec replication lag"
  },
  {
    title: "Cloud Cost Optimization Analytics Platform",
    description: "Develop a comprehensive cloud cost analytics platform that processes billing data from multiple cloud providers, identifies optimization opportunities, and automates cost-saving actions.",
    tech: ["Apache Spark", "Elasticsearch", "Kibana", "AWS Cost Explorer API", "Azure Billing API", "GCP Billing API", "Apache Airflow", "Python"],
    image: "/images/projects/cost-optimization.jpg",
    liveUrl: "https://cost-optimizer.example.com",
    githubUrl: "https://github.com/your-username/cloud-cost-optimizer",
    architecture: "Multi-cloud data aggregation with ML-driven recommendations",
    metrics: "Average 25% cost reduction across client deployments"
  },
  {
    title: "Real-Time Supply Chain Visibility Platform",
    description: "Create an end-to-end supply chain analytics platform with real-time tracking, demand forecasting, and automated inventory optimization using advanced ML algorithms.",
    tech: ["Apache Kafka", "Apache Spark Streaming", "Neo4j", "Redis", "Apache Airflow", "Prophet", "XGBoost", "Docker", "Kubernetes"],
    image: "/images/projects/supply-chain.jpg",
    liveUrl: "https://supply-chain-viz.example.com",
    githubUrl: "https://github.com/your-username/supply-chain-platform",
    architecture: "Graph-based data model with streaming analytics",
    metrics: "Reduced stockouts by 40% and inventory costs by 15%"
  },
  {
    title: "Streaming ETL with Schema Evolution Support",
    description: "Build a robust streaming ETL pipeline that automatically handles schema changes, data quality validation, and format conversions across different data sources and targets.",
    tech: ["Apache Kafka", "Apache Flink", "Confluent Schema Registry", "Apache Avro", "Delta Lake", "Great Expectations", "dbt", "Snowflake"],
    image: "/images/projects/streaming-etl.jpg",
    liveUrl: "https://streaming-etl.example.com",
    githubUrl: "https://github.com/your-username/streaming-etl-platform",
    architecture: "Schema-aware streaming with automated data quality checks",
    metrics: "99.99% data accuracy with automatic schema migration"
  },
  {
    title: "Real-Time Personalization Engine",
    description: "Develop a high-performance personalization engine for e-commerce that processes user behavior in real-time and delivers personalized recommendations with microsecond latency.",
    tech: ["Apache Kafka", "Apache Flink", "Redis", "Cassandra", "TensorFlow Serving", "Kubernetes", "gRPC", "Apache Pinot", "Grafana"],
    image: "/images/projects/personalization.jpg",
    liveUrl: "https://personalization-engine.example.com",
    githubUrl: "https://github.com/your-username/realtime-personalization",
    architecture: "Event-driven microservices with real-time ML serving",
    metrics: "Sub-millisecond response time with 35% CTR improvement"
  },
  {
    title: "Multi-Source Data Quality Observatory",
    description: "Create a comprehensive data quality monitoring system that continuously validates data across multiple sources, detects anomalies, and provides automated data lineage tracking.",
    tech: ["Apache Spark", "Great Expectations", "Apache Atlas", "Elasticsearch", "Apache Airflow", "Python", "SQL", "Grafana", "PostgreSQL"],
    image: "/images/projects/data-quality.jpg",
    liveUrl: "https://data-observatory.example.com",
    githubUrl: "https://github.com/your-username/data-quality-observatory",
    architecture: "Microservices with event-driven data quality checks",
    metrics: "Monitor 1000+ data sources with 99.9% accuracy"
  },
  {
    title: "Serverless Data Lake Analytics Platform",
    description: "Build a fully serverless data analytics platform using cloud-native services for automatic scaling, cost optimization, and simplified data lake management.",
    tech: ["AWS Lambda", "AWS Glue", "Amazon Athena", "S3", "AWS Step Functions", "Apache Iceberg", "Terraform", "CloudFormation", "Python"],
    image: "/images/projects/serverless-analytics.jpg",
    liveUrl: "https://serverless-analytics.example.com",
    githubUrl: "https://github.com/your-username/serverless-data-lake",
    architecture: "Fully serverless with event-driven processing",
    metrics: "80% cost reduction with auto-scaling capabilities"
  },
  {
    title: "Real-Time Trading Data Pipeline",
    description: "Develop a high-frequency trading data pipeline that processes market data streams, calculates technical indicators, and executes algorithmic trading strategies in real-time.",
    tech: ["Apache Kafka", "Apache Flink", "ClickHouse", "Redis", "WebSocket", "Python", "C++", "Kubernetes", "Prometheus", "Grafana"],
    image: "/images/projects/trading-pipeline.jpg",
    liveUrl: "https://trading-platform.example.com",
    githubUrl: "https://github.com/your-username/trading-data-pipeline",
    architecture: "Ultra-low latency stream processing with FPGA acceleration",
    metrics: "Sub-microsecond latency with 99.999% uptime"
  },
  {
    title: "Compliance and Audit Data Platform",
    description: "Create an enterprise compliance platform that automatically tracks data lineage, ensures GDPR/CCPA compliance, and generates audit reports across all data operations.",
    tech: ["Apache Atlas", "Apache Ranger", "Elasticsearch", "Apache Kafka", "Apache Airflow", "PostgreSQL", "Docker", "Kubernetes", "Python"],
    image: "/images/projects/compliance-platform.jpg",
    liveUrl: "https://compliance-audit.example.com",
    githubUrl: "https://github.com/your-username/compliance-data-platform",
    architecture: "Policy-driven data governance with automated compliance checks",
    metrics: "100% audit trail coverage with automated compliance scoring"
  },
  {
    title: "Edge-to-Cloud ML Pipeline",
    description: "Build a distributed ML pipeline that trains models on edge devices, aggregates insights in the cloud, and deploys updated models back to edge locations for continuous learning.",
    tech: ["Apache Kafka", "TensorFlow Lite", "Kubernetes", "Apache Spark", "MLflow", "Redis", "gRPC", "Edge Computing", "Federated Learning"],
    image: "/images/projects/edge-ml.jpg",
    liveUrl: "https://edge-ml-platform.example.com",
    githubUrl: "https://github.com/your-username/edge-ml-pipeline",
    architecture: "Federated learning with edge-cloud hybrid deployment",
    metrics: "Deployed across 1000+ edge locations with 95% accuracy"
  },
  {
    title: "Real-Time Social Media Analytics",
    description: "Develop a comprehensive social media analytics platform that processes millions of posts, performs sentiment analysis, and tracks trending topics with real-time dashboards.",
    tech: ["Apache Kafka", "Apache Spark Streaming", "Elasticsearch", "Apache NiFi", "Neo4j", "Python", "NLP Libraries", "Kibana", "Docker"],
    image: "/images/projects/social-analytics.jpg",
    liveUrl: "https://social-analytics.example.com",
    githubUrl: "https://github.com/your-username/social-media-analytics",
    architecture: "Stream processing with graph analytics and NLP",
    metrics: "Process 10M+ social posts daily with real-time insights"
  },
  {
    title: "Automated Data Mesh Implementation",
    description: "Implement a data mesh architecture with automated domain data product creation, federated governance, and self-serve analytics capabilities for enterprise organizations.",
    tech: ["Apache Iceberg", "dbt", "Apache Airflow", "Kubernetes", "Apache Kafka", "Snowflake", "Terraform", "DataHub", "Python"],
    image: "/images/projects/data-mesh.jpg",
    liveUrl: "https://data-mesh-platform.example.com",
    githubUrl: "https://github.com/your-username/automated-data-mesh",
    architecture: "Decentralized data architecture with federated governance",
    metrics: "Reduced time-to-insight by 70% across 50+ domains"
  },
  {
    title: "Cross-Cloud Disaster Recovery System",
    description: "Create an automated disaster recovery system that replicates critical data across multiple cloud providers and automatically failovers applications with zero data loss.",
    tech: ["Apache Kafka", "Debezium", "Terraform", "Ansible", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Cloud APIs"],
    image: "/images/projects/disaster-recovery.jpg",
    liveUrl: "https://dr-platform.example.com",
    githubUrl: "https://github.com/your-username/cross-cloud-dr",
    architecture: "Multi-cloud with automated failover and data replication",
    metrics: "RTO < 5 minutes, RPO < 30 seconds across clouds"
  },
  {
    title: "Real-Time Healthcare Data Integration",
    description: "Build a HIPAA-compliant healthcare data integration platform that processes patient data from multiple sources, enables real-time clinical decision support, and maintains data privacy.",
    tech: ["Apache Kafka", "FHIR", "Apache Spark", "Elasticsearch", "PostgreSQL", "Docker", "Kubernetes", "Python", "HL7", "Encryption"],
    image: "/images/projects/healthcare-integration.jpg",
    liveUrl: "https://healthcare-data.example.com",
    githubUrl: "https://github.com/your-username/healthcare-data-platform",
    architecture: "HIPAA-compliant with end-to-end encryption and audit logging",
    metrics: "Process 1M+ patient records daily with 99.99% availability"
  },
  {
    title: "Automated ML Model Lifecycle Management",
    description: "Develop an end-to-end ML model lifecycle management platform with automated training, validation, deployment, monitoring, and retraining based on performance metrics.",
    tech: ["MLflow", "Kubeflow", "Apache Airflow", "Prometheus", "Grafana", "TensorFlow", "PyTorch", "Kubernetes", "Docker", "Python"],
    image: "/images/projects/ml-lifecycle.jpg",
    liveUrl: "https://ml-lifecycle.example.com",
    githubUrl: "https://github.com/your-username/ml-lifecycle-platform",
    architecture: "Event-driven ML ops with automated model governance",
    metrics: "Manage 500+ models with 90% automated decision making"
  },
  {
    title: "Real-Time Energy Grid Analytics",
    description: "Create a smart grid analytics platform that processes real-time energy consumption data, predicts demand patterns, and optimizes energy distribution across the power grid.",
    tech: ["Apache Kafka", "Apache Flink", "InfluxDB", "TimescaleDB", "Apache Spark", "TensorFlow", "Grafana", "Kubernetes", "MQTT"],
    image: "/images/projects/energy-analytics.jpg",
    liveUrl: "https://energy-grid-analytics.example.com",
    githubUrl: "https://github.com/your-username/energy-grid-platform",
    architecture: "Time-series focused with real-time demand forecasting",
    metrics: "Monitor 10,000+ grid points with 15% efficiency improvement"
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
    email: "manojkumar9384@outlook.com",
    location: "Tamil Nadu, India",
    phone: "+91 7826807488",
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