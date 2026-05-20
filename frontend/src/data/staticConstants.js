export const RSI_PILLARS = [
  { id: 'engagement', points: 30,  name: 'Transactional Engagement', variable: 'IsActiveMember',              color: '#14b8a6' },
  { id: 'product',    points: 60,  name: 'Product Depth',             variable: 'NumOfProducts × 15, cap 4',  color: '#f5a623' },
  { id: 'tenure',     points: 25,  name: 'Relationship Maturity',     variable: 'Tenure / MaxTenure × 25',    color: '#a78bfa' },
  { id: 'balance',    points: 20,  name: 'Financial Commitment',      variable: 'Balance > 0',                color: '#34d399' },
  { id: 'card',       points: 10,  name: 'Stickiness Indicator',      variable: 'HasCrCard',                  color: '#8fa3c0' },
]

export const RSI_TIERS = [
  {
    id: 'risk',
    name: 'High Flight Risk',
    range: 'RSI 0 – 40',
    color: '#f87171',
    bgAlpha: 'rgba(248,113,113,0.08)',
    borderAlpha: 'rgba(248,113,113,0.3)',
    desc: 'Customer is profoundly disconnected from the institution. No transactional velocity, no product anchoring. Relationship is functionally severed.',
    action: '⚡ Immediate aggressive retention intervention',
    actionBg: 'rgba(248,113,113,0.1)',
    actionBorder: 'rgba(248,113,113,0.25)',
  },
  {
    id: 'nurture',
    name: 'Needs Nurturing',
    range: 'RSI 40 – 65',
    color: '#f5a623',
    bgAlpha: 'rgba(245,166,35,0.08)',
    borderAlpha: 'rgba(245,166,35,0.3)',
    desc: 'Mixed behavioral signals. Highly active but zero balance, or massive balance with full inactivity. Moderate engagement campaigns recommended.',
    action: '◈ Targeted engagement + utility-driven onboarding',
    actionBg: 'rgba(245,166,35,0.1)',
    actionBorder: 'rgba(245,166,35,0.25)',
  },
  {
    id: 'sticky',
    name: 'Loyal / Sticky',
    range: 'RSI 65 – 100',
    color: '#14b8a6',
    bgAlpha: 'rgba(20,184,166,0.08)',
    borderAlpha: 'rgba(20,184,166,0.3)',
    desc: 'Optimal behavioral state of deep institutional integration. Stable liquidity, near-zero defensive retention spend. Prime cross-sell candidates.',
    action: '✦ Premium utility-based cross-sell opportunities',
    actionBg: 'rgba(20,184,166,0.1)',
    actionBorder: 'rgba(20,184,166,0.25)',
  },
]

export const DASHBOARD_MODULES = [
  {
    id: 1, num: 'MODULE 01',
    title: 'Engagement vs Churn Overview',
    desc: 'Executive KPI cards with live churn rates from the FastAPI backend. Interactive engagement filters exposing the active/inactive churn gap. Recharts visualizations across all four behavioral engagement profiles.',
    badges: ['Recharts', 'KPI Cards', 'Engagement Filters'],
    icon: 'BarChart2',
  },
  {
    id: 2, num: 'MODULE 02',
    title: 'Product Utilization Impact',
    desc: 'Interactive product count slider rendering the non-linear churn curve in real-time. Highlights the two-product attrition trough. Actively discourages quota-driven over-selling.',
    badges: ['Slider', 'Non-linear Curve', 'Paradox Alert'],
    icon: 'Layers',
  },
  {
    id: 3, num: 'MODULE 03',
    title: 'High-Value Disengaged Detector',
    desc: 'Dual balance and salary threshold sliders isolating top-quartile customers with IsActiveMember = 0. Generates live silent-churn watchlists for private banking outreach.',
    badges: ['Silent Churn Radar', 'Dual Sliders', 'CustomerID Export'],
    icon: 'Radar',
  },
  {
    id: 4, num: 'MODULE 04',
    title: 'Retention Strength Scoring',
    desc: 'Real-time RSI calculation via the 145-point pipeline. Bins customers into High Flight Risk, Needs Nurturing, or Sticky tiers. Triggers automated retention and cross-sell campaigns.',
    badges: ['RSI Engine', 'Tier Automation', 'Email Triggers'],
    icon: 'Activity',
  },
]

export const ENGAGEMENT_PROFILES = [
  { name: 'Active Engaged',        risk: 'Lowest Risk',       riskColor: 'teal',  desc: 'Continuous transactional velocity. Regular logins, payments, daily interactions. Core of stable institutional liquidity.' },
  { name: 'Active, Low-Product',   risk: 'Medium Risk',       riskColor: 'amber', desc: 'High login frequency but restricted to one shallow product. Susceptible to competitor poaching with better rates on secondary products.' },
  { name: 'Inactive High-Balance', risk: 'Silent Churn Risk', riskColor: 'coral', desc: 'Stores large capital but zero day-to-day engagement. Primary silent churn candidates — can trigger sudden, massive capital withdrawals.' },
  { name: 'Inactive Disengaged',   risk: 'Highest Risk',      riskColor: 'coral', desc: 'No transactional activity, no product depth. Functionally dormant. Switching cost is virtually zero.' },
]

export const TECH_STACK = ['React 18', 'Vite', 'FastAPI', 'Python', 'Pandas', 'Framer Motion', 'Recharts', 'Lucide Icons']

export const NAV_LINKS = [
  { label: 'Pipeline',   href: '#pipeline'   },
  { label: 'Engagement', href: '#engagement' },
  { label: 'Products',   href: '#products'   },
  { label: 'RSI',        href: '#rsi'        },
  { label: 'Modules',    href: '#modules'    },
  { label: 'Geography',  href: '#geography'  },
  { label: 'About',      href: '#about'      },
]

export const HERO_PILLS = [
  { label: 'n = 10,000 customers',    type: 'amber'   },
  { label: '3 Geographies',           type: 'teal'    },
  { label: 'France · Germany · Spain', type: 'default' },
  { label: 'The European Central Bank', type: 'default' },
  { label: 'ECB Framework · 2026',    type: 'default' },
]

export const PIPELINE_STAGES = [
  { num: '01', title: 'Data Ingestion', desc: '10,000 retail banking records ingested via FastAPI Pandas engine.', accentColor: 'teal' },
  { num: '02', title: 'Feature Extraction', desc: 'Deriving behavioral signals from raw transactional data.', accentColor: 'teal' },
  { num: '03', title: 'Engagement Scoring', desc: 'Evaluating product depth and active membership gaps.', accentColor: 'amber' },
  { num: '04', title: 'Risk Stratification', desc: 'Binning customers into retention strength tiers.', accentColor: 'amber' },
  { num: '05', title: 'Retention Activation', desc: 'Targeted outreach based on RSI and geographic outliers.', accentColor: 'coral' }
]
