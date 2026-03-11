import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'cloudforge',
    name: 'CloudForge',
    tagline: 'Cloud Governance & Security Platform',
    description: 'Enterprise cloud governance platform with integrated CSPM pipeline, AI-powered contextual risk scoring (STRIDE+ATLAS), and FinOps cost optimization. Normalizes findings across AWS Security Hub, Azure Defender, and GCP SCC into a unified priority model. Includes OPA policy enforcement, anomaly detection, chargeback allocation, container security scanning, WAF golden templates, and workflow orchestration.',
    tier: 'T1',
    status: 'active',
    techStack: ['Go', 'React', 'OPA', 'Terraform', 'Claude API', 'OpenTelemetry'],
    githubUrl: 'https://github.com/lvonguyen/cloudforge',
    liveUrl: 'https://cloudforge-demo.lvonguyen.com',
    diagramUrl: '/cloudforge-architecture.svg',
    icon: 'shield-gear',
    metrics: ['40+ OPA Policies', '16 Internal Packages', '40 API Endpoints'],
  },
]
