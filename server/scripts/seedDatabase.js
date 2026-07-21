require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Project = require("../models/Project");
const logger = require("../utils/logger");
const projects = [
  {
    title: "NexaPay \u2014 Multi-Currency Digital Wallet & Payment Gateway",
    slug: "nexapay",
    tagline:
      "Real-time cross-border transactions with sub-200ms latency across 38 currencies.",
    description:
      "NexaPay \u2014 Multi-Currency Digital Wallet & Payment Gateway is a production-grade fintech platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "FinTech",
    status: "Finished",
    completionPercentage: 100,
    startDate: "2022-02-10",
    completionDate: "2022-03-20",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Stripe API",
      "WebSockets",
      "Redis",
      "JWT",
      "Docker",
    ],
    features: [
      "Secure authentication for NexaPay",
      "Role-based access control for NexaPay",
      "Responsive dashboards for NexaPay",
      "Exportable pdf and excel reports for NexaPay",
      "Audit logs for NexaPay",
      "Email notifications for NexaPay",
      "Analytics charts for NexaPay",
      "Mobile-first ux for NexaPay",
    ],
    challenges:
      "The main challenge was designing NexaPay to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "NexaPay delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: "https://demo.sekaportfolio.dev/nexapay",
    githubUrl: "https://github.com/sekashalom/nexapay",
    thumbnailUrl: "/projects/nexapay.svg",
    screenshots: [
      "/projects/nexapay-dashboard.svg",
      "/projects/nexapay-analytics.svg",
    ],
    isFeatured: true,
    order: 1,
    financialMetrics: {
      transactionsHandled: "2.4M+ transactions processed",
      uptime: "99.98% uptime",
      performanceGain: "185ms average response time",
      usersServed: "40,000+ registered users",
    },
  },
  {
    title:
      "AuditTrail Pro \u2014 Enterprise Financial Compliance & Audit Management System",
    slug: "audittrail-pro",
    tagline:
      "SOX-compliant audit workflows with automated evidence collection and risk scoring.",
    description:
      "AuditTrail Pro \u2014 Enterprise Financial Compliance & Audit Management System is a production-grade banking platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "Banking",
    status: "Finished",
    completionPercentage: 100,
    startDate: "2022-03-10",
    completionDate: "2022-04-20",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "PDF-lib",
      "ExcelJS",
      "Nodemailer",
      "RBAC",
    ],
    features: [
      "Secure authentication for AuditTrail Pro",
      "Role-based access control for AuditTrail Pro",
      "Responsive dashboards for AuditTrail Pro",
      "Exportable pdf and excel reports for AuditTrail Pro",
      "Audit logs for AuditTrail Pro",
      "Email notifications for AuditTrail Pro",
      "Analytics charts for AuditTrail Pro",
      "Mobile-first ux for AuditTrail Pro",
    ],
    challenges:
      "The main challenge was designing AuditTrail Pro to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "AuditTrail Pro delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: "https://demo.sekaportfolio.dev/audittrail-pro",
    githubUrl: "https://github.com/sekashalom/audittrail-pro",
    thumbnailUrl: "/projects/audittrail-pro.svg",
    screenshots: [
      "/projects/audittrail-pro-dashboard.svg",
      "/projects/audittrail-pro-analytics.svg",
    ],
    isFeatured: true,
    order: 2,
    financialMetrics: {
      transactionsHandled: "850+ audit engagements/year",
      uptime: "99.3% on-time report delivery",
      performanceGain: "68% preparation time reduction",
      usersServed: "12 financial institutions",
    },
  },
  {
    title:
      "CapiTrack \u2014 Investment Portfolio Management & Real-Time Market Dashboard",
    slug: "capitrack",
    tagline:
      "Live equity tracking, P&L analytics, and personalized watchlists with smart alerts.",
    description:
      "CapiTrack \u2014 Investment Portfolio Management & Real-Time Market Dashboard is a production-grade fintech platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "FinTech",
    status: "Finished",
    completionPercentage: 100,
    startDate: "2022-04-10",
    completionDate: "2022-05-20",
    techStack: [
      "React",
      "Recharts",
      "Node.js",
      "MongoDB",
      "WebSockets",
      "Alpha Vantage API",
      "JWT",
      "Axios",
    ],
    features: [
      "Secure authentication for CapiTrack",
      "Role-based access control for CapiTrack",
      "Responsive dashboards for CapiTrack",
      "Exportable pdf and excel reports for CapiTrack",
      "Audit logs for CapiTrack",
      "Email notifications for CapiTrack",
      "Analytics charts for CapiTrack",
      "Mobile-first ux for CapiTrack",
    ],
    challenges:
      "The main challenge was designing CapiTrack to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "CapiTrack delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: "https://demo.sekaportfolio.dev/capitrack",
    githubUrl: "https://github.com/sekashalom/capitrack",
    thumbnailUrl: "/projects/capitrack.svg",
    screenshots: [
      "/projects/capitrack-dashboard.svg",
      "/projects/capitrack-analytics.svg",
    ],
    isFeatured: true,
    order: 3,
    financialMetrics: {
      transactionsHandled: "$4.2M AUM tracked in beta",
      uptime: "99.5% data availability",
      performanceGain: "95ms real-time data latency",
      usersServed: "1,200+ positions managed",
    },
  },
  {
    title:
      "PayrollNexus \u2014 Automated Payroll Processing & Tax Compliance Engine",
    slug: "payrollnexus",
    tagline:
      "One-click payroll processing for 500+ employees with full statutory tax automation.",
    description:
      "PayrollNexus \u2014 Automated Payroll Processing & Tax Compliance Engine is a production-grade management platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "Management",
    status: "Finished",
    completionPercentage: 100,
    startDate: "2023-05-10",
    completionDate: "2023-06-20",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "ExcelJS",
      "PDF-lib",
      "Nodemailer",
      "Cron Jobs",
    ],
    features: [
      "Secure authentication for PayrollNexus",
      "Role-based access control for PayrollNexus",
      "Responsive dashboards for PayrollNexus",
      "Exportable pdf and excel reports for PayrollNexus",
      "Audit logs for PayrollNexus",
      "Email notifications for PayrollNexus",
      "Analytics charts for PayrollNexus",
      "Mobile-first ux for PayrollNexus",
    ],
    challenges:
      "The main challenge was designing PayrollNexus to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "PayrollNexus delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: "https://demo.sekaportfolio.dev/payrollnexus",
    githubUrl: "https://github.com/sekashalom/payrollnexus",
    thumbnailUrl: "/projects/payrollnexus.svg",
    screenshots: [
      "/projects/payrollnexus-dashboard.svg",
      "/projects/payrollnexus-analytics.svg",
    ],
    isFeatured: true,
    order: 4,
    financialMetrics: {
      transactionsHandled: "500+ employees monthly",
      uptime: "99.7% payroll availability",
      performanceGain: "3 days reduced to 45 minutes",
      usersServed: "4 currency zones",
    },
  },
  {
    title:
      "LoanIQ \u2014 Microfinance Loan Origination & Lifecycle Management Platform",
    slug: "loaniq",
    tagline:
      "End-to-end digital loan processing from application to disbursement and collections.",
    description:
      "LoanIQ \u2014 Microfinance Loan Origination & Lifecycle Management Platform is a production-grade fintech platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "FinTech",
    status: "Finished",
    completionPercentage: 100,
    startDate: "2023-06-10",
    completionDate: "2023-07-20",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "JWT",
      "Stripe",
      "Twilio SMS",
      "Nodemailer",
      "Recharts",
    ],
    features: [
      "Secure authentication for LoanIQ",
      "Role-based access control for LoanIQ",
      "Responsive dashboards for LoanIQ",
      "Exportable pdf and excel reports for LoanIQ",
      "Audit logs for LoanIQ",
      "Email notifications for LoanIQ",
      "Analytics charts for LoanIQ",
      "Mobile-first ux for LoanIQ",
    ],
    challenges:
      "The main challenge was designing LoanIQ to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "LoanIQ delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: "https://demo.sekaportfolio.dev/loaniq",
    githubUrl: "https://github.com/sekashalom/loaniq",
    thumbnailUrl: "/projects/loaniq.svg",
    screenshots: [
      "/projects/loaniq-dashboard.svg",
      "/projects/loaniq-analytics.svg",
    ],
    isFeatured: false,
    order: 5,
    financialMetrics: {
      transactionsHandled: "$820,000 loan portfolio managed",
      uptime: "99.4% servicing uptime",
      performanceGain: "5 days reduced to 4 hours",
      usersServed: "230+ active borrowers",
    },
  },
  {
    title:
      "BudgetCommand \u2014 Corporate Budget Planning & Variance Analysis Tool",
    slug: "budgetcommand",
    tagline:
      "Collaborative department-level budgeting with live actuals vs. forecast variance tracking.",
    description:
      "BudgetCommand \u2014 Corporate Budget Planning & Variance Analysis Tool is a production-grade management platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "Management",
    status: "Finished",
    completionPercentage: 100,
    startDate: "2023-07-10",
    completionDate: "2023-08-20",
    techStack: [
      "React",
      "Recharts",
      "Node.js",
      "MongoDB",
      "ExcelJS",
      "Express",
      "Socket.IO",
      "JWT",
    ],
    features: [
      "Secure authentication for BudgetCommand",
      "Role-based access control for BudgetCommand",
      "Responsive dashboards for BudgetCommand",
      "Exportable pdf and excel reports for BudgetCommand",
      "Audit logs for BudgetCommand",
      "Email notifications for BudgetCommand",
      "Analytics charts for BudgetCommand",
      "Mobile-first ux for BudgetCommand",
    ],
    challenges:
      "The main challenge was designing BudgetCommand to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "BudgetCommand delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: "https://demo.sekaportfolio.dev/budgetcommand",
    githubUrl: "https://github.com/sekashalom/budgetcommand",
    thumbnailUrl: "/projects/budgetcommand.svg",
    screenshots: [
      "/projects/budgetcommand-dashboard.svg",
      "/projects/budgetcommand-analytics.svg",
    ],
    isFeatured: false,
    order: 6,
    financialMetrics: {
      transactionsHandled: "$3.8M annual budget managed",
      uptime: "99.1% forecast service availability",
      performanceGain: "55% reporting productivity gain",
      usersServed: "14 departments onboarded",
    },
  },
  {
    title: "TradeVault \u2014 Commodity Trading Desk & Risk Management System",
    slug: "tradevault",
    tagline:
      "Real-time commodity price feeds, open position management, and Value-at-Risk computation.",
    description:
      "TradeVault \u2014 Commodity Trading Desk & Risk Management System is a production-grade fintech platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "FinTech",
    status: "In-Progress",
    completionPercentage: 65,
    startDate: "2023-08-10",
    completionDate: null,
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "WebSockets",
      "Redis",
      "Recharts",
      "Express",
      "Docker",
    ],
    features: [
      "Secure authentication for TradeVault",
      "Role-based access control for TradeVault",
      "Responsive dashboards for TradeVault",
      "Exportable pdf and excel reports for TradeVault",
      "Audit logs for TradeVault",
      "Email notifications for TradeVault",
      "Analytics charts for TradeVault",
      "Mobile-first ux for TradeVault",
    ],
    challenges:
      "The main challenge was designing TradeVault to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "TradeVault delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: "https://demo.sekaportfolio.dev/tradevault",
    githubUrl: "https://github.com/sekashalom/tradevault",
    thumbnailUrl: "/projects/tradevault.svg",
    screenshots: [
      "/projects/tradevault-dashboard.svg",
      "/projects/tradevault-analytics.svg",
    ],
    isFeatured: true,
    order: 7,
    financialMetrics: {
      transactionsHandled: "42 commodity instruments tracked",
      uptime: "Beta target 99.0%",
      performanceGain: "500ms live-feed latency",
      usersServed: "18 trader accounts",
    },
  },
  {
    title:
      "HRNexus \u2014 Unified Human Capital Management & Performance Platform",
    slug: "hrnexus",
    tagline:
      "From onboarding to performance reviews \u2014 a single platform for every HR workflow.",
    description:
      "HRNexus \u2014 Unified Human Capital Management & Performance Platform is a production-grade management platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "Management",
    status: "In-Progress",
    completionPercentage: 72,
    startDate: "2024-09-10",
    completionDate: null,
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "JWT",
      "Multer",
      "Nodemailer",
      "React Hook Form",
    ],
    features: [
      "Secure authentication for HRNexus",
      "Role-based access control for HRNexus",
      "Responsive dashboards for HRNexus",
      "Exportable pdf and excel reports for HRNexus",
      "Audit logs for HRNexus",
      "Email notifications for HRNexus",
      "Analytics charts for HRNexus",
      "Mobile-first ux for HRNexus",
    ],
    challenges:
      "The main challenge was designing HRNexus to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "HRNexus delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: "https://demo.sekaportfolio.dev/hrnexus",
    githubUrl: "https://github.com/sekashalom/hrnexus",
    thumbnailUrl: "/projects/hrnexus.svg",
    screenshots: [
      "/projects/hrnexus-dashboard.svg",
      "/projects/hrnexus-analytics.svg",
    ],
    isFeatured: false,
    order: 8,
    financialMetrics: {
      transactionsHandled: "280 employees managed",
      uptime: "99.2% pilot availability",
      performanceGain: "61% admin time reduction",
      usersServed: "3 SMEs testing",
    },
  },
  {
    title:
      "FraudNet AI \u2014 Machine-Learning Transaction Fraud Detection Engine",
    slug: "fraudnet-ai",
    tagline:
      "Behavioral anomaly detection with sub-50ms decision scoring on live payment streams.",
    description:
      "FraudNet AI \u2014 Machine-Learning Transaction Fraud Detection Engine is a production-grade fintech platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "FinTech",
    status: "In-Progress",
    completionPercentage: 48,
    startDate: "2024-10-10",
    completionDate: null,
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Python microservice",
      "Flask",
      "Redis pub/sub",
      "WebSockets",
      "Docker",
    ],
    features: [
      "Secure authentication for FraudNet AI",
      "Role-based access control for FraudNet AI",
      "Responsive dashboards for FraudNet AI",
      "Exportable pdf and excel reports for FraudNet AI",
      "Audit logs for FraudNet AI",
      "Email notifications for FraudNet AI",
      "Analytics charts for FraudNet AI",
      "Mobile-first ux for FraudNet AI",
    ],
    challenges:
      "The main challenge was designing FraudNet AI to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "FraudNet AI delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: "https://demo.sekaportfolio.dev/fraudnet-ai",
    githubUrl: "https://github.com/sekashalom/fraudnet-ai",
    thumbnailUrl: "/projects/fraudnet-ai.svg",
    screenshots: [
      "/projects/fraudnet-ai-dashboard.svg",
      "/projects/fraudnet-ai-analytics.svg",
    ],
    isFeatured: true,
    order: 9,
    financialMetrics: {
      transactionsHandled: "12,000+ transactions scored",
      uptime: "99.0% beta scoring target",
      performanceGain: "Sub-48ms scoring latency",
      usersServed: "91.2% test accuracy",
    },
  },
  {
    title:
      "BlockSettle \u2014 Blockchain-Based Trade Settlement & Smart Contract Platform",
    slug: "blocksettle",
    tagline:
      "Decentralized, immutable trade settlement using Ethereum smart contracts on L2.",
    description:
      "BlockSettle \u2014 Blockchain-Based Trade Settlement & Smart Contract Platform is a production-grade fintech platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "FinTech",
    status: "Pending",
    completionPercentage: 0,
    startDate: "2024-11-10",
    completionDate: null,
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Solidity",
      "Ethers.js",
      "Hardhat",
      "Polygon L2",
      "IPFS",
      "MetaMask",
    ],
    features: [
      "Secure authentication for BlockSettle",
      "Role-based access control for BlockSettle",
      "Responsive dashboards for BlockSettle",
      "Exportable pdf and excel reports for BlockSettle",
      "Audit logs for BlockSettle",
      "Email notifications for BlockSettle",
      "Analytics charts for BlockSettle",
      "Mobile-first ux for BlockSettle",
    ],
    challenges:
      "The main challenge was designing BlockSettle to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "BlockSettle delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: null,
    githubUrl: null,
    thumbnailUrl: "/projects/blocksettle.svg",
    screenshots: [
      "/projects/blocksettle-dashboard.svg",
      "/projects/blocksettle-analytics.svg",
    ],
    isFeatured: false,
    order: 10,
    financialMetrics: {
      transactionsHandled: "Projected $1M+ monthly settlement volume",
      uptime: "Launch target 99.5%",
      performanceGain: "T+2 reduced toward instant finality",
      usersServed: "Institutional trade desks",
    },
  },
  {
    title:
      "RegComply \u2014 Automated Regulatory Reporting & Central Bank Submission Platform",
    slug: "regcomply",
    tagline:
      "One-click generation of Basel III, IFRS 9, and Central Bank regulatory returns.",
    description:
      "RegComply \u2014 Automated Regulatory Reporting & Central Bank Submission Platform is a production-grade banking platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "Banking",
    status: "Pending",
    completionPercentage: 0,
    startDate: "2024-12-10",
    completionDate: null,
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "PDF-lib",
      "ExcelJS",
      "Axios",
      "Cron Jobs",
    ],
    features: [
      "Secure authentication for RegComply",
      "Role-based access control for RegComply",
      "Responsive dashboards for RegComply",
      "Exportable pdf and excel reports for RegComply",
      "Audit logs for RegComply",
      "Email notifications for RegComply",
      "Analytics charts for RegComply",
      "Mobile-first ux for RegComply",
    ],
    challenges:
      "The main challenge was designing RegComply to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "RegComply delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: null,
    githubUrl: null,
    thumbnailUrl: "/projects/regcomply.svg",
    screenshots: [
      "/projects/regcomply-dashboard.svg",
      "/projects/regcomply-analytics.svg",
    ],
    isFeatured: false,
    order: 11,
    financialMetrics: {
      transactionsHandled: "Target $50M\u2013$500M asset banks",
      uptime: "Production target 99.5%",
      performanceGain: "One-click report generation",
      usersServed: "CFO and compliance teams",
    },
  },
  {
    title:
      "InventoryEdge \u2014 Supply Chain Intelligence & Procurement Management System",
    slug: "inventoryedge",
    tagline:
      "AI-assisted demand forecasting and procurement automation for product-based businesses.",
    description:
      "InventoryEdge \u2014 Supply Chain Intelligence & Procurement Management System is a production-grade management platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "Management",
    status: "Pending",
    completionPercentage: 0,
    startDate: "2025-01-10",
    completionDate: null,
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Recharts",
      "Python microservice",
      "Cron Jobs",
      "Nodemailer",
    ],
    features: [
      "Secure authentication for InventoryEdge",
      "Role-based access control for InventoryEdge",
      "Responsive dashboards for InventoryEdge",
      "Exportable pdf and excel reports for InventoryEdge",
      "Audit logs for InventoryEdge",
      "Email notifications for InventoryEdge",
      "Analytics charts for InventoryEdge",
      "Mobile-first ux for InventoryEdge",
    ],
    challenges:
      "The main challenge was designing InventoryEdge to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "InventoryEdge delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: null,
    githubUrl: null,
    thumbnailUrl: "/projects/inventoryedge.svg",
    screenshots: [
      "/projects/inventoryedge-dashboard.svg",
      "/projects/inventoryedge-analytics.svg",
    ],
    isFeatured: false,
    order: 12,
    financialMetrics: {
      transactionsHandled: "Target 25% lower holding costs",
      uptime: "Production target 99.3%",
      performanceGain: "Automated procurement cycle",
      usersServed: "Retail and wholesale teams",
    },
  },
  {
    title:
      "WealthBridge \u2014 Robo-Advisory & Automated Wealth Management Platform",
    slug: "wealthbridge",
    tagline:
      "Algorithm-driven portfolio construction and rebalancing for retail investors across Africa.",
    description:
      "WealthBridge \u2014 Robo-Advisory & Automated Wealth Management Platform is a production-grade fintech platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "FinTech",
    status: "Pending",
    completionPercentage: 0,
    startDate: "2025-02-10",
    completionDate: null,
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Recharts",
      "Express",
      "Python microservice",
      "Stripe",
      "JWT",
    ],
    features: [
      "Secure authentication for WealthBridge",
      "Role-based access control for WealthBridge",
      "Responsive dashboards for WealthBridge",
      "Exportable pdf and excel reports for WealthBridge",
      "Audit logs for WealthBridge",
      "Email notifications for WealthBridge",
      "Analytics charts for WealthBridge",
      "Mobile-first ux for WealthBridge",
    ],
    challenges:
      "The main challenge was designing WealthBridge to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "WealthBridge delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: null,
    githubUrl: null,
    thumbnailUrl: "/projects/wealthbridge.svg",
    screenshots: [
      "/projects/wealthbridge-dashboard.svg",
      "/projects/wealthbridge-analytics.svg",
    ],
    isFeatured: false,
    order: 13,
    financialMetrics: {
      transactionsHandled: "Projected $500K AUM in 6 months",
      uptime: "Production target 99.5%",
      performanceGain: "Automated rebalancing",
      usersServed: "Retail investors across Africa",
    },
  },
  {
    title:
      "DataLens BI \u2014 Executive Business Intelligence & Real-Time KPI Command Center",
    slug: "datalens-bi",
    tagline:
      "Drag-and-drop BI dashboard builder connecting live business data to C-suite decision-making.",
    description:
      "DataLens BI \u2014 Executive Business Intelligence & Real-Time KPI Command Center is a production-grade analytics platform built to solve a real enterprise workflow with secure APIs, polished user experience, clean data models, and measurable business outcomes. The system uses a modular React frontend, Express services, MongoDB persistence, analytics dashboards, and deployment-ready infrastructure.",
    category: "Analytics",
    status: "Pending",
    completionPercentage: 0,
    startDate: "2025-03-10",
    completionDate: null,
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Recharts",
      "D3.js",
      "Express",
      "WebSockets",
      "JWT",
    ],
    features: [
      "Secure authentication for DataLens BI",
      "Role-based access control for DataLens BI",
      "Responsive dashboards for DataLens BI",
      "Exportable pdf and excel reports for DataLens BI",
      "Audit logs for DataLens BI",
      "Email notifications for DataLens BI",
      "Analytics charts for DataLens BI",
      "Mobile-first ux for DataLens BI",
    ],
    challenges:
      "The main challenge was designing DataLens BI to remain scalable, auditable, and simple for enterprise users while keeping performance high under financial workloads.",
    outcomes:
      "DataLens BI delivered measurable operational improvement and creates a strong portfolio proof point for FinTech and enterprise product teams.",
    liveUrl: null,
    githubUrl: null,
    thumbnailUrl: "/projects/datalens-bi.svg",
    screenshots: [
      "/projects/datalens-bi-dashboard.svg",
      "/projects/datalens-bi-analytics.svg",
    ],
    isFeatured: false,
    order: 14,
    financialMetrics: {
      transactionsHandled: "Target $2,500/month per client",
      uptime: "Production target 99.4%",
      performanceGain: "Real-time KPI refresh",
      usersServed: "C-suite teams",
    },
  },
];
(async () => {
  try {
    await connectDB();
    const existing = await Project.countDocuments();
    if (existing > 0) {
      logger.info(
        `Dropping existing projects collection with ${existing} documents.`,
      );
      await Project.collection.drop();
    }
    const inserted = await Project.insertMany(projects, { ordered: true });
    logger.info(
      `Seed completed successfully. Inserted ${inserted.length} projects.`,
    );
  } catch (e) {
    if (e.codeName === "NamespaceNotFound") {
      const inserted = await Project.insertMany(projects, { ordered: true });
      logger.info(
        `Seed completed successfully. Inserted ${inserted.length} projects.`,
      );
    } else {
      logger.error(`Seed failed: ${e.message}`);
      process.exitCode = 1;
    }
  } finally {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed.");
  }
})();
