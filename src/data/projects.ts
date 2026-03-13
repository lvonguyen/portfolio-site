import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'cloudforge',
    name: 'CloudForge',
    tagline: 'Cloud Governance & Security Platform',
    description: 'Reference architecture demonstrating enterprise security patterns across identity, infrastructure, governance, and SDLC — built end-to-end, not just designed. Integrates CSPM aggregation (SecurityHub, Defender, SCC), AI-powered risk scoring, tiered remediation dispatch, ServiceNow GRC workflows, zero trust policy engine, and FinOps cost optimization. Backed by STRIDE threat models, 14 ADRs with trade-off analysis, and a layered CI/CD security pipeline (SAST, SBOM, container scanning).',
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
