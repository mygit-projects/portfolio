import type { PortfolioContent } from "./types";

export const portfolioData: PortfolioContent = {
  site: {
    title: "Muhammad Faizan — Web Design & Digital Solutions Specialist",
    description:
      "Muhammad Faizan is a Dubai-based Web Design & Digital Solutions Specialist and AI-assisted vibe coder with 15+ years of experience across the UAE and Pakistan.",
    ogTitle: "Muhammad Faizan — Web Design & Digital Solutions Specialist",
    ogDescription:
      "Web Design & Digital Solutions Specialist | AI-Assisted Vibe Coder & Digital Marketer with 15+ years experience in UAE and Pakistan.",
    locale: "en_AE",
    keywords: [
      "Muhammad Faizan",
      "Web Designer Dubai",
      "Digital Solutions Specialist",
      "Technical SEO",
      "AI Vibe Coding",
      "Next.js",
      "Tour booking platforms",
      "UAE web designer",
    ],
    ga4MeasurementId: "",
    headerHtml: "",
    footerHtml: "",
  },

  personalInfo: {
    name: "Muhammad Faizan",
    initials: "MF",
    title: "Web Design & Digital Solutions Specialist",
    headlinePrefix: "Web Designer &",
    headlineAccent: "Digital Solutions Specialist",
    navbarSubtitle: "Web Designer & Vibe Coder",
    cvModalTitle: "Web Design & Digital Marketing Specialist",
    cvModalSubtitle: "Web Design | AI-Assisted Vibe Coding | Digital Marketing",
    tagline: "AI-Assisted Vibe Coder & Digital Marketer",
    email: "mail.faizan@yahoo.com",
    phone: "+971 58 283 8248",
    whatsapp: "+971582838248",
    location: "Dubai, United Arab Emirates",
    locationShort: "Dubai, UAE",
    dob: "15-04-1988",
    drivingLicense: "UAE (Dubai) Driving License: Yes",
    drivingLicenseShort: "Valid",
    bio: "Web Design and Digital Solutions Specialist who combines advanced frontend design, e-commerce management, and AI-assisted vibe coding to build, structure, and optimize high-performing digital applications. Brings 15+ years of total experience across the UAE and Pakistan, specializing in responsive website design, UI/UX optimization, technical SEO, and integrated digital ecosystems.",
    footerBio:
      "Designing digital experiences and conversion-focused web architectures that inspire, engage, and deliver measurable growth across UAE and international markets.",
    yearsExperience: "15+",
    projectsCompleted: "120+",
    conversionGrowth: "30–35%",
    seoGrowth: "40–50%",
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
    profileImageAlt: "Muhammad Faizan - Web Designer & Digital Solutions Specialist",
    greetingBadgeLocation: "Dubai, UAE",
    greetingBadgeText: "Hello, I'm",
    socialLinks: {
      whatsapp: "https://wa.me/971582838248",
      email: "mailto:mail.faizan@yahoo.com",
      linkedin: "https://www.linkedin.com",
      github: "https://github.com",
    },
  },

  navigation: [
    { name: "HOME", href: "#home", id: "home" },
    { name: "SERVICES", href: "#services", id: "services" },
    { name: "PROJECTS", href: "#projects", id: "projects" },
    { name: "SKILLS", href: "#skills", id: "skills" },
    { name: "PROCESS", href: "#process", id: "process" },
    { name: "EXPERIENCE", href: "#experience", id: "experience" },
    { name: "EDUCATION", href: "#education", id: "education" },
    { name: "CONTACT", href: "#contact", id: "contact" },
  ],

  ctas: {
    viewWork: "VIEW MY WORK",
    downloadCv: "DOWNLOAD CV",
    whatsappChat: "Chat on WhatsApp",
    resume: "RESUME",
    letsTalk: "LET'S TALK",
    startProject: "START A PROJECT",
    inquireService: "Inquire Service",
    directInquiry: "Direct Inquiry",
  },

  hero: {
    stats: [
      {
        id: "years",
        value: "15+",
        label: "Years Experience",
        shortLabel: "Industry Track Record",
        category: "Career",
        description: "Across UAE & Pakistan markets",
        detailTitle: "15+ Years Track Record:",
        detailBody:
          "Cross-industry expertise across tourism, e-commerce, hospitality, and corporate platforms in Dubai (UAE) and Pakistan.",
        icon: "Award",
        accentClass: "text-purple-600 group-hover:text-purple-600 hover:border-purple-300",
      },
      {
        id: "cro",
        value: "30–35%",
        label: "Lead Conversion Lift",
        shortLabel: "Conversion Lift",
        category: "CRO",
        description: "From targeted UI & landing funnels",
        detailTitle: "30–35% Conversion Lift:",
        detailBody:
          "Achieved through intuitive checkout flows, rapid load speeds (<1s), and frictionless mobile booking UX.",
        icon: "TrendingUp",
        accentClass: "text-indigo-600 group-hover:text-indigo-600 hover:border-indigo-300",
      },
      {
        id: "seo",
        value: "40–50%",
        label: "Organic Traffic Growth",
        shortLabel: "SEO Growth",
        category: "Traffic",
        description: "Via Technical & Content SEO",
        detailTitle: "40–50% Organic Growth:",
        detailBody:
          "Driven by technical SEO audits, Schema.org entity graphs, Core Web Vitals optimization, and targeted Meta/Google Ads.",
        icon: "Zap",
        accentClass: "text-emerald-800 group-hover:text-emerald-800 hover:border-emerald-300",
      },
    ],
    hangingCards: {
      vibeEngine: "LIVE VIBE ENGINE",
      coreWebVitals: "CORE WEB VITALS",
      stack: "STACK",
    },
    vibePresets: [
      {
        id: "booking",
        title: "Hotel Booking API",
        tool: "Cursor AI",
        tag: "Next.js 15",
        prompt: "Integrate IOL hotel XML/JSON search engine with real-time rate cache...",
        codeSnippet: "const { rooms, liveRates } = await fetchHotelRates(destId, { pax: 2 });",
        resultMetric: "Real-Time Sync • 0.3s",
      },
      {
        id: "balloon",
        title: "Balloon Portal",
        tool: "Lovable.dev",
        tag: "React + Laravel",
        prompt: "Build high-converting ticket calendar with multi-tier passenger pricing...",
        codeSnippet: "<BookingEngine slots={activeFlights} instantCheckout={true} />",
        resultMetric: "+35% Booking Lift",
      },
      {
        id: "seo",
        title: "SEO Lead Funnel",
        tool: "Google AI Studio",
        tag: "Core Web Vitals",
        prompt: "Optimize LCP under 0.6s with automated Schema.org markup & meta indexing...",
        codeSnippet: "<SchemaOrg type=\"TravelAgency\" geoCoordinates={[25.2048, 55.2708]} />",
        resultMetric: "100% Mobile Score",
      },
    ],
    stackItems: [
      { name: "Cursor AI", category: "AI Coding", highlight: "Specification & Vibe Code", color: "bg-purple-100 text-purple-800" },
      { name: "React 19", category: "Frontend", highlight: "Dynamic UI & Componentry", color: "bg-cyan-100 text-cyan-800" },
      { name: "Lovable.dev", category: "Rapid Prototype", highlight: "Instant Production UI", color: "bg-pink-100 text-pink-800" },
      { name: "Laravel / PHP", category: "Backend Engine", highlight: "Custom Booking APIs", color: "bg-red-100 text-red-800" },
      { name: "Technical SEO", category: "Search Visibility", highlight: "Schema & Core Web Vitals", color: "bg-emerald-100 text-emerald-800" },
    ],
    speedDial: {
      pagespeedLabel: "PageSpeed",
      pagespeedScore: 99,
      lcp: "0.4s",
      croLift: "+35%",
      croCaption: "Booking Funnel",
      vitalsLabel: "Core Web Vitals Pass",
      vitalsValue: "100%",
      seoLabel: "Technical SEO Indexed",
      seoValue: "Top 3",
    },
  },

  services: [
    {
      id: "web-design",
      number: "01",
      icon: "Layout",
      title: "Web Design & Frontend UI/UX",
      shortDesc: "Clean, modern, and conversion-focused responsive website designs and user journeys.",
      description:
        "Crafting modern, accessible, and high-converting frontend experiences. Translating user behavior data into intuitive interfaces that maximize engagement, improve retention, and lower bounce rates.",
      features: [
        "Responsive & Mobile-First Web Architecture",
        "Conversion-Optimized Landing Page Design",
        "Figma Prototyping & Design Systems",
        "E-Commerce Store Usability Audits",
      ],
      color: "from-purple-500/10 to-indigo-500/10",
      accent: "#5B3DE0",
    },
    {
      id: "vibe-coding",
      number: "02",
      icon: "Sparkles",
      title: "AI-Assisted Vibe Coding & Prototyping",
      shortDesc: "Rapid prototyping and codebase generation using modern AI workflows and tools.",
      description:
        "Leveraging state-of-the-art AI tooling (Cursor AI, Lovable.dev, Google AI Studio, Spec Markdown) to accelerate feature delivery from days to hours with robust TypeScript and React codebases.",
      features: [
        "Cursor AI & Lovable.dev Accelerated Delivery",
        "AI Prompt Engineering & Spec Authoring",
        "Fast Full-Stack Prototype Turnaround",
        "Clean, Maintainable Component Structure",
      ],
      color: "from-blue-500/10 to-purple-500/10",
      accent: "#6366F1",
    },
    {
      id: "seo-cro",
      number: "03",
      icon: "TrendingUp",
      title: "Technical SEO & CRO Optimization",
      shortDesc: "Comprehensive SEO architecture, SERP visibility, speed audits, and organic scaling.",
      description:
        "Spearheading on-page, off-page, and technical SEO optimizations that drive high organic search visibility. Conducting Core Web Vitals audits and structured schema integrations for sustained traffic growth.",
      features: [
        "Technical SEO & Schema Markup Architecture",
        "Core Web Vitals & PageSpeed Maximization",
        "Keyword Research & Search Intent Mapping",
        "40–50% Organic Traffic Scaling Proven",
      ],
      color: "from-emerald-500/10 to-teal-500/10",
      accent: "#10B981",
    },
    {
      id: "digital-marketing",
      number: "04",
      icon: "Target",
      title: "Digital Marketing & Paid Ad Funnels",
      shortDesc: "Targeted Google & Meta ad campaigns, lead gen funnels, and CAC reduction.",
      description:
        "Executing data-driven PPC, Google Ads, and Meta (Facebook & Instagram) advertising funnels tailored to UAE and international markets, driving qualified inquiries while cutting customer acquisition costs.",
      features: [
        "Google Ads Search & Performance Max Funnels",
        "Meta Ads (Facebook & Instagram) Retargeting",
        "Lower Customer Acquisition Costs (CAC by 20%)",
        "Multi-Touch Attribution & KPI Monitoring",
      ],
      color: "from-amber-500/10 to-purple-500/10",
      accent: "#F59E0B",
    },
  ],

  estimatorOptions: [
    { id: "web-ui", name: "Responsive Web Design & Modern UI/UX", category: "Design", days: 4, badge: "Popular" },
    { id: "vibe-code", name: "AI-Assisted Vibe Coding & Full-Stack Prototyping", category: "Rapid Dev", days: 3, badge: "10x Speed" },
    { id: "booking-api", name: "Custom Booking Engine / Hotel IOL API Sync", category: "Backend Engine", days: 5, badge: "Complex" },
    { id: "tech-seo", name: "Technical SEO Audit & Core Web Vitals Optimization", category: "Growth", days: 2, badge: "High ROI" },
    { id: "paid-ads", name: "Meta & Google Ads Conversion Funnel Architecture", category: "Marketing", days: 3, badge: "Lead Gen" },
    { id: "speed-boost", name: "Ultra-Fast Sub-Second PageSpeed Hardening", category: "Performance", days: 2, badge: "99/100 LCP" },
  ],
  estimatorDefaults: ["web-ui", "vibe-code", "tech-seo"],

  projects: [
    {
      id: "ngktours",
      title: "Ngktours.com",
      category: "Tour & Booking Platforms",
      subtitle: "React-Based Tour Booking Engine & IOL Hotel API Integration",
      description:
        "High-performance international tour booking portal engineered with a React-based booking management frontend and seamless live IOL Hotel API synchronization.",
      fullCaseStudy: {
        client: "NGK Tours & Travel Group",
        role: "Lead Frontend Engineer & Digital Solutions Specialist",
        timeline: "6 Months Development & Live Integration",
        challenge:
          "The legacy booking flow suffered from slow API response times, drop-offs during date selections, and inconsistent mobile checkout experiences.",
        solution:
          "Built a responsive, state-driven React booking pipeline with real-time room availability via IOL Hotel API, optimized booking checkout steps, and fast client-side caching.",
        keyAchievements: [
          "Integrated real-time live availability querying with IOL Hotel API",
          "Reduced mobile booking drop-off rate by 32%",
          "Achieved <1.8s page load times across global search queries",
          "Implemented comprehensive multilingual & multi-currency filters",
        ],
        architecture: ["React", "TypeScript", "REST APIs", "Tailwind CSS", "Hotel IOL API", "State Management"],
      },
      metrics: [
        { label: "Conversion Lift", value: "+34%" },
        { label: "API Latency", value: "<350ms" },
        { label: "Mobile Traffic", value: "68%" },
      ],
      tags: ["React", "Hotel IOL API", "Booking Engine", "UI/UX", "Tailwind"],
      liveUrl: "https://ngktours.com",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      badge: "Featured Enterprise",
      previewGradient: "from-purple-900/90 via-indigo-950/90 to-slate-900/95",
    },
    {
      id: "sindbadballoons",
      title: "Sindbadballoons.ae",
      category: "Tour & Booking Platforms",
      subtitle: "Hot Air Balloon Booking Portal + Laravel Booking Engine",
      description:
        "Premier Dubai adventure experience website with custom flight scheduling, dynamic weather advisory integration, and a bespoke Laravel-powered management backend.",
      fullCaseStudy: {
        client: "Sindbad Balloons Dubai",
        role: "Web Designer & Digital Strategist",
        timeline: "Ongoing Optimization & Web Architecture",
        challenge:
          "High seasonal demand required an ultra-intuitive booking flow capable of handling sunrise slot limits, VIP ticket tiers, and instantaneous payment confirmations.",
        solution:
          "Redesigned landing funnels, structured clear tier comparisons, streamlined the mobile ticket reservation process, and harmonized SEO for top Dubai adventure keywords.",
        keyAchievements: [
          "Ranked top 3 in UAE search for competitive hot air balloon keywords",
          "Increased organic search inquiries by +45% in first 90 days",
          "Reduced customer onboarding friction to under 60 seconds",
          "Integrated multi-channel WhatsApp and direct booking triggers",
        ],
        architecture: ["Laravel", "PHP", "Responsive UI", "Technical SEO", "Payment Gateways", "Conversion CRO"],
      },
      metrics: [
        { label: "Organic Reach", value: "+48%" },
        { label: "Direct Inquiries", value: "3.2x" },
        { label: "User Satisfaction", value: "98%" },
      ],
      tags: ["Laravel", "PHP", "Booking System", "Technical SEO", "Dubai Tourism"],
      liveUrl: "https://sindbadballoons.ae",
      image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=80",
      badge: "High Growth",
      previewGradient: "from-blue-900/90 via-sky-950/90 to-slate-900/95",
    },
    {
      id: "ozonespring",
      title: "Ozonespring.ae",
      category: "Corporate Portals",
      subtitle: "Corporate Brand Presence & Responsive Web Architecture",
      description:
        "Modern corporate website and brand showcase delivering sleek typography, responsive grid layouts, and enterprise-grade product catalog presentation.",
      fullCaseStudy: {
        client: "Ozone Spring Mineral Water & Bottling",
        role: "Web Designer & UI Architect",
        timeline: "Complete Brand & Web Revamp",
        challenge:
          "Corporate distributors needed easy access to product specifications, distribution certificates, and quick B2B inquiry channels.",
        solution:
          "Engineered a clean, minimalist corporate layout emphasizing purity, quality standards, instant quotation generators, and mobile-friendly spec sheets.",
        keyAchievements: [
          "Doubled B2B inbound quote submissions within 60 days of relaunch",
          "Passed 100/100 Core Web Vitals on desktop and mobile",
          "Streamlined enterprise catalog navigation across 30+ product lines",
          "Created modular design components for rapid internal page updates",
        ],
        architecture: ["WordPress / Custom UI", "JavaScript", "Responsive Design", "SEO Architecture", "B2B Funnels"],
      },
      metrics: [
        { label: "B2B Quotes", value: "+60%" },
        { label: "PageSpeed Score", value: "99/100" },
        { label: "Bounce Rate", value: "-28%" },
      ],
      tags: ["Corporate Web", "UI/UX", "Performance", "B2B Lead Gen", "Responsive"],
      liveUrl: "https://ozonespring.ae",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80",
      badge: "Enterprise Branding",
      previewGradient: "from-teal-950/90 via-slate-900/90 to-indigo-950/95",
    },
  ],
  projectCategories: ["All", "Tour & Booking Platforms", "Corporate Portals"],

  skills: {
    progressMeters: [
      { name: "UI/UX & Responsive Layouts", level: 95, category: "Design" },
      { name: "AI Prompting & Vibe Coding (Cursor/Lovable)", level: 98, category: "AI & Rapid Dev" },
      { name: "Technical SEO & SERP Optimization", level: 95, category: "SEO" },
      { name: "Frontend Development (React, Next.js, HTML/CSS)", level: 90, category: "Engineering" },
      { name: "Digital Marketing & Paid Funnels (Google/Meta)", level: 92, category: "Marketing" },
      { name: "E-Commerce & WordPress Management", level: 94, category: "Platforms" },
    ],
    tools: [
      { name: "Cursor AI", category: "AI & Vibe Coding", icon: "Bot", color: "text-purple-600 bg-purple-50 border-purple-200", usage: "Spec-driven development & fast full-stack refactoring", impact: "10x Speed" },
      { name: "Lovable.dev", category: "AI & Vibe Coding", icon: "Sparkles", color: "text-pink-600 bg-pink-50 border-pink-200", usage: "Rapid MVP scaffolding & component prototyping", impact: "Instant Prototype" },
      { name: "Google AI Studio", category: "AI & Vibe Coding", icon: "Cpu", color: "text-blue-600 bg-blue-50 border-blue-200", usage: "Prompt engineering & Gemini model integration", impact: "Smart AI Logic" },
      { name: "React", category: "Frontend", icon: "Code2", color: "text-cyan-600 bg-cyan-50 border-cyan-200", usage: "Modular interactive SPAs & booking state engines", impact: "Production Rigor" },
      { name: "Next.js", category: "Frontend", icon: "Globe", color: "text-slate-800 bg-slate-100 border-slate-300", usage: "Server-side rendering & technical SEO architecture", impact: "Sub-second LCP" },
      { name: "TypeScript", category: "Frontend", icon: "Code2", color: "text-blue-600 bg-blue-50 border-blue-200", usage: "Strict type safety & maintainable code contracts", impact: "Zero Runtime Bugs" },
      { name: "Tailwind CSS", category: "Frontend", icon: "Palette", color: "text-teal-600 bg-teal-50 border-teal-200", usage: "Design token systems & mobile-first layouts", impact: "Lightweight CSS" },
      { name: "Figma", category: "Design & UI/UX", icon: "Layers", color: "text-rose-600 bg-rose-50 border-rose-200", usage: "High-fidelity wireframing & interactive micro-systems", impact: "Pixel-Perfect" },
      { name: "WordPress", category: "Backend & CMS", icon: "Globe", color: "text-sky-700 bg-sky-50 border-sky-200", usage: "Custom themes, WooCommerce, and corporate portals", impact: "Enterprise Scale" },
      { name: "PHP / Laravel", category: "Backend & CMS", icon: "Server", color: "text-red-600 bg-red-50 border-red-200", usage: "Custom APIs, payment webhooks & booking controllers", impact: "Secure Backend" },
      { name: "Google Ads", category: "Marketing", icon: "Target", color: "text-amber-600 bg-amber-50 border-amber-200", usage: "Search, Performance Max & high-intent PPC funnels", impact: "+35% Conv. Rate" },
      { name: "Meta Ads", category: "Marketing", icon: "Share2", color: "text-indigo-600 bg-indigo-50 border-indigo-200", usage: "Retargeting campaigns & lead generation funnels", impact: "-20% CAC" },
    ],
    toolCategories: ["All", "AI & Vibe Coding", "Frontend", "Design & UI/UX", "Backend & CMS", "Marketing"],
    specializedTags: [
      "Specification Markdown Authoring",
      "Core Web Vitals Max (99/100)",
      "E-Commerce CRO & Checkout Funnels",
      "Technical SEO & Schema Markup",
      "Meta & Google Ads Management",
      "Rapid Vibe Coding Prototypes",
      "Hotel IOL API Synchronization",
    ],
  },

  processSteps: [
    {
      step: "01",
      title: "Discover",
      tagline: "Research & Search Intent Mapping",
      desc: "Deep-dive analysis of business objectives, customer persona demographics, competitor benchmarks, and conversion baseline KPIs.",
      icon: "Compass",
      color: "from-purple-500 to-indigo-600",
      accentBg: "bg-purple-500/10 text-[#5B3DE0]",
      borderColor: "border-purple-300 shadow-purple-500/20",
      deliverables: [
        "Conversion Baseline & KPI Audit",
        "Target Audience & Search Intent Mapping",
        "Competitor Benchmark Matrix",
        "Scope of Work & Strategy Deck",
      ],
      toolsUsed: ["Google Analytics 4", "Ahrefs / SEMrush", "Clarity Heatmaps", "FigJam"],
      duration: "1–2 Days",
      keyMetric: "Zero Assumption Baseline",
      codeOrArtifact: "// Audit Spec: Identify 3 high-intent conversion bottlenecks and mobile friction points",
    },
    {
      step: "02",
      title: "Plan",
      tagline: "Architecture & Spec Authoring",
      desc: "User flow orchestration, sitemap structuring, technical stack selection, and AI specification markdown authoring.",
      icon: "FileCode2",
      color: "from-blue-500 to-cyan-600",
      accentBg: "bg-blue-500/10 text-blue-600",
      borderColor: "border-blue-300 shadow-blue-500/20",
      deliverables: [
        "Interactive User Journey Flows",
        "Markdown Specification Documents",
        "Component Tree & Schema Schemas",
        "Low-Fidelity Wireframes",
      ],
      toolsUsed: ["Cursor AI Spec Docs", "Figma Wireframes", "Notion", "Mermaid.js"],
      duration: "2–3 Days",
      keyMetric: "100% Technical Alignment",
      codeOrArtifact: "# Spec: /booking-flow -> React 19 + IOL Hotel API integration + Redis Cache Layer",
    },
    {
      step: "03",
      title: "Design",
      tagline: "High-Contrast UI & Design Systems",
      desc: "Crafting modern, accessible, high-contrast UI systems with fluid mobile adaptability, subtle micro-interactions, and visual hierarchy.",
      icon: "Palette",
      color: "from-pink-500 to-rose-600",
      accentBg: "bg-pink-500/10 text-pink-600",
      borderColor: "border-pink-300 shadow-pink-500/20",
      deliverables: [
        "Pixel-Perfect High-Fidelity UI",
        "Design Token System & Color Palette",
        "Responsive Mobile-First Breakpoints",
        "Interactive Micro-Animations",
      ],
      toolsUsed: ["Figma", "Tailwind CSS", "Motion / Framer", "Lucide Icons"],
      duration: "3–5 Days",
      keyMetric: "WCAG AA Compliant & <16px Spacing Math",
      codeOrArtifact: 'export const theme = { brand: "#5B3DE0", surface: "#F8F9FD", radius: "1.5rem" };',
    },
    {
      step: "04",
      title: "Develop & Vibe Code",
      tagline: "AI-Assisted Full-Stack Engineering",
      desc: "High-velocity development combining modern frameworks with AI prompt engineering (Cursor, Lovable, AI Studio) and clean, scalable code.",
      icon: "Bot",
      color: "from-violet-600 to-purple-700",
      accentBg: "bg-violet-500/10 text-violet-700",
      borderColor: "border-violet-300 shadow-violet-500/20",
      deliverables: [
        "Clean Modular React / Next.js / Laravel Code",
        "API Integrations & Booking Engines",
        "Automated Test Coverage & Linting",
        "State Management & Performance Optimization",
      ],
      toolsUsed: ["Cursor AI", "Lovable.dev", "Google AI Studio", "Next.js / Vite", "Tailwind CSS"],
      duration: "4–8 Days",
      keyMetric: "10x Speed with Production Code Rigor",
      codeOrArtifact: "const { slots, rates } = await bookingEngine.syncRealTimeSlots({ instantCheckout: true });",
    },
    {
      step: "05",
      title: "Launch & Optimize",
      tagline: "Speed Audits, SEO & CRO Scaling",
      desc: "Rigorous cross-device testing, Core Web Vitals optimization (<0.6s LCP), Schema.org indexing, and continuous conversion tuning.",
      icon: "Rocket",
      color: "from-emerald-500 to-teal-600",
      accentBg: "bg-emerald-500/10 text-emerald-800",
      borderColor: "border-emerald-300 shadow-emerald-500/20",
      deliverables: [
        "100/100 Google PageSpeed Optimization",
        "JSON-LD Schema & Search Console Setup",
        "Conversion Tracking & Event Pixels",
        "Post-Launch Growth & CRO Monitoring",
      ],
      toolsUsed: ["Lighthouse", "Google Search Console", "Meta Pixel", "Cloudflare CDN"],
      duration: "Ongoing",
      keyMetric: "30–35% CRO Lift & Top 3 SERP",
      codeOrArtifact: '<Schema.Org type="TravelAgency" rating={4.9} reviewCount={1240} instantBooking={true} />',
    },
  ],

  experience: [
    {
      id: "rfb",
      title: "Web Designer & Digital Solutions Specialist",
      company: "Royal Falcon Balloons",
      location: "Dubai, UAE",
      period: "May 2024 — Present",
      badge: "Current Role",
      summary:
        "Spearheading the digital ecosystem, web platforms, and growth engineering for one of UAE's premier balloon excursion operators.",
      highlights: [
        "Digital Ecosystem & Web Architecture: Designed, managed, and optimized the complete digital and web ecosystem, ensuring consistent company branding and robust performance across all portals.",
        "UI/UX & Conversion Optimization: Optimized customer user journeys and landing page layouts, contributing to a high 30–35% lead conversion rate from targeted campaigns.",
        "SEO & Traffic Scaling: Spearheaded technical and content SEO optimizations that successfully increased organic website traffic by 40–50%.",
        "Platform Maintenance: Handled continuous website updates, speed optimization, and security maintenance to deliver seamless user experiences.",
      ],
      metrics: ["30–35% Conversion Rate", "+40–50% Organic Traffic", "99.9% Uptime"],
      skillsUsed: ["Web Architecture", "UI/UX Optimization", "Technical SEO", "Speed Audits", "Conversion Funnels"],
    },
    {
      id: "mewmew",
      title: "Web Designer & E-Commerce Executive",
      company: "MewMew Tech",
      location: "Dubai, UAE",
      period: "Jun 2022 — Apr 2024",
      summary: "Led frontend e-commerce design, digital portal collateral, and multi-channel acquisition funnels.",
      highlights: [
        "Web Design & E-Commerce Management: Designed and managed company and client e-commerce platforms, conducting regular day-to-day usability testing, traffic monitoring, and UI improvements that boosted online store conversion rates by 25%.",
        "Digital Portal Content & Collateral: Created conversion-focused UI content for web portals alongside promotional digital assets that increased campaign click-through rates (CTR) by 30%.",
        "SEO & Performance Marketing: Executed structured SEO strategies and managed targeted paid campaigns, growing organic traffic by 35% while lowering customer acquisition costs (CAC) by 20%.",
      ],
      metrics: ["+25% Store Conversions", "+30% Campaign CTR", "-20% Customer Acq. Cost"],
      skillsUsed: ["E-Commerce UI", "Conversion Rate Optimization", "Paid Advertising", "SEO Strategy", "Analytics"],
    },
    {
      id: "technozone",
      title: "Digital Marketing Executive & Web Lead",
      company: "Technozone",
      location: "Karachi, Pakistan",
      period: "Jan 2018 — Feb 2022",
      summary: "Led web infrastructure health, search engine visibility, and cross-functional technical delivery teams.",
      highlights: [
        "Website & SEO Optimization: Monitored web architecture health, optimized keywords and SERP performance, and managed online visibility for security product web assets.",
        "Project & Technical Leadership: Translated web-generated inquiries into structured project pipelines while managing cross-functional technical teams to ensure on-time delivery.",
      ],
      metrics: ["Top SERP Rankings", "On-Time Project Delivery", "Multi-Product Architecture"],
      skillsUsed: ["SERP Optimization", "Team Leadership", "Web Architecture", "Keyword Strategy"],
    },
    {
      id: "aureate",
      title: "Social Media & Web Content Specialist",
      company: "Aureate Hotel Apartment LLC",
      location: "Dubai, UAE",
      period: "Sep 2013 — Jan 2018",
      summary: "Managed hospitality web portals, guest booking touchpoints, and digital content operations.",
      highlights: [
        "Web & Content Operations: Planned and executed web updates, blogs, and digital campaigns aligned with corporate growth objectives.",
        "Operational & Compliance Support: Managed digital infrastructure workflows, backend reporting portals, and administrative documentation.",
      ],
      metrics: ["5-Year Track Record", "Hospitality Booking Growth", "Brand Digital Consistency"],
      skillsUsed: ["Web Content Strategy", "Digital Workflows", "Reporting Systems", "Hospitality Marketing"],
    },
    {
      id: "kwsb",
      title: "Personal Assistant to Executive Engineer",
      company: "KW&SB",
      location: "Karachi, Pakistan",
      period: "Aug 2007 — Aug 2013",
      summary: "Managed back-office documentation, records for 100+ employees, and department budgeting and correspondence.",
      highlights: [
        "Managed back-office documentation, maintained records for 100+ employees, and handled department budgeting and office correspondence.",
      ],
      metrics: ["100+ Employee Management", "Budget Administration", "Operational Records"],
      skillsUsed: ["Operational Administration", "Budget Tracking", "Documentation Management"],
    },
  ],

  careerSidebar: {
    heading: "Career Trajectory",
    period: "2007 to Present",
    blurb:
      "Extensive experience managing enterprise platforms, cross-border marketing funnels, and high-conversion booking interfaces for major UAE operators.",
    stats: [
      { label: "Total Experience", value: "15+ Years", valueClass: "text-[#5B3DE0]" },
      { label: "Dubai Market Tenacity", value: "2022 — Present", valueClass: "text-emerald-800" },
      { label: "Average CRO Increase", value: "+30% to +45%", valueClass: "text-slate-900" },
    ],
  },

  education: [
    {
      id: "btech",
      degree: "Bachelor’s in Technology (B-Tech)",
      institution: "Newport Institute of Technology",
      field: "Telecommunication Engineering",
      location: "Karachi, Pakistan",
      badge: "4-Year Degree",
      categoryLabel: "Higher Education",
      description:
        "Comprehensive curriculum covering data communications, digital signal systems, computational network architecture, and electronic infrastructure engineering.",
      modules: ["Network Protocols", "System Architecture", "Digital Communication", "Computational Logic"],
      modulesLabel: "Core Foundations",
      statusLabel: "Verified Degree",
      icon: "GraduationCap",
      accent: "purple",
    },
    {
      id: "cit",
      degree: "Diploma In Information Technology (CIT)",
      institution: "Govt. College of Technology",
      field: "Computer Information Technology & Systems",
      location: "Karachi, Pakistan",
      badge: "Govt. Diploma",
      categoryLabel: "Technical Diploma",
      description:
        "Hands-on technical diploma emphasizing software programming foundations, database design, computer hardware diagnostics, and web scripting languages.",
      modules: ["Computer Information Systems", "Database Architecture", "Software Scripting", "IT Infrastructure"],
      modulesLabel: "Core Foundations",
      statusLabel: "Certified Diploma",
      icon: "Cpu",
      accent: "indigo",
    },
    {
      id: "hsc",
      degree: "High School Certificate",
      institution: "Alfalah School",
      field: "General Science & Mathematics",
      location: "Karachi, Pakistan",
      badge: "Secondary Certificate",
      categoryLabel: "Secondary Education",
      description:
        "Secondary educational foundation with rigorous training in analytical mathematics, physical sciences, logical deduction, and scientific reasoning.",
      modules: ["Advanced Mathematics", "Physics & Sciences", "Analytical Reasoning", "Communication"],
      modulesLabel: "Academic Disciplines",
      statusLabel: "Completed",
      icon: "BookOpen",
      accent: "slate",
    },
  ],

  certifications: [
    {
      title: "The Fundamentals of Digital Marketing",
      issuer: "Google Digital Garage",
      date: "Apr 2020",
      skills: ["SEO", "Google Analytics", "SEM & Display Advertising", "E-Commerce"],
      badge: "Google Verified",
      description:
        "Accredited by the Interactive Advertising Bureau Europe and The Open University. Comprehensive mastery of search engine optimization (SEO), Google Search Console, SEM advertising, and digital analytics.",
      competencies: [
        "Search Engine Optimization (SEO)",
        "Google Analytics & Tag Manager",
        "Search Engine Marketing (SEM)",
        "E-Commerce Conversion Optimization",
      ],
      issuerShort: "Google Skillshop",
      accent: "amber",
    },
    {
      title: "Digital Marketing Fundamentals & Funnels",
      issuer: "IIDE (Indian Institute of Digital Education)",
      date: "May 2022",
      skills: ["Digital Marketing Strategy", "Performance Campaigns", "Funnel Architecture"],
      badge: "IIDE Specialist",
      description:
        "Rigorous industry-grade certification focusing on customer acquisition cost (CAC) reduction, multi-channel retargeting funnels across Meta & Google Ads, and full-funnel CRO tracking.",
      competencies: [
        "Performance Funnel Architecture",
        "Meta & Google Ads Campaign Strategy",
        "Multi-Touch Conversion Attribution",
        "Lead Generation & Landing Page CRO",
      ],
      issuerShort: "IIDE India",
      accent: "purple",
    },
  ],

  languages: [
    {
      language: "English",
      proficiency: "Professional Working Proficiency",
      description:
        "Fluent in international client correspondence, technical documentation, architectural specifications, and client discovery calls.",
    },
    {
      language: "Hindi",
      proficiency: "Fluent / Conversational",
      description:
        "Full professional conversational fluency across Indian, subcontinent, and UAE corporate client engagements.",
    },
    {
      language: "Urdu",
      proficiency: "Native / Bilingual",
      description:
        "Native bilingual fluency with complete command over verbal, written, and regional corporate communication.",
    },
  ],

  testimonials: [
    {
      quote:
        "Muhammad Faizan is a fantastic designer and solutions specialist who truly understands our brand and target audience. The new web architecture exceeded our expectations and boosted our qualified inquiries by 35%.",
      author: "James Carter",
      role: "CEO & Managing Director, Nexora Agency",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      company: "Dubai, UAE",
      rating: 5,
    },
    {
      quote:
        "His combination of rapid AI-assisted development and deep technical SEO knowledge is unmatched. He launched our hot air balloon booking engine on time with immediate top Google search rankings.",
      author: "Tariq Al-Mansoor",
      role: "Operations Lead, Adventure Experiences UAE",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      company: "Sindbad Balloons",
      rating: 5,
    },
    {
      quote:
        "Faizan's attention to detail across e-commerce user journeys lowered our customer acquisition costs by 20% while increasing store checkout completion rates by 25%.",
      author: "Sarah Jenkins",
      role: "E-Commerce Strategy Director",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      company: "MewMew Tech Partner",
      rating: 5,
    },
  ],

  faqs: [
    {
      id: "who-is-muhammad-faizan",
      question: "Who is Muhammad Faizan?",
      answer:
        "Muhammad Faizan is a Dubai-based Web Design and Digital Solutions Specialist and AI-assisted vibe coder with 15+ years of experience across the UAE and Pakistan. He builds conversion-focused websites, booking engines, and technical SEO architectures for UAE and international clients.",
    },
    {
      id: "what-services-dubai",
      question: "What web design and digital services does Muhammad Faizan offer in Dubai?",
      answer:
        "Services include responsive web design and frontend UI/UX, AI-assisted vibe coding and rapid prototyping, technical SEO and CRO, and digital marketing funnels for Google and Meta ads. Delivery is available for full-time, contract, and freelance work in Dubai, UAE.",
    },
    {
      id: "featured-projects",
      question: "Which projects has Muhammad Faizan shipped?",
      answer:
        "Featured case studies include Ngktours.com (React tour booking engine with live IOL hotel API), Sindbadballoons.ae (hot air balloon booking portal on Laravel), and Ozonespring.ae (corporate brand and responsive web architecture).",
    },
    {
      id: "years-experience",
      question: "How many years of experience does Muhammad Faizan have?",
      answer:
        "Muhammad Faizan has 15+ years of documented industry track record across Dubai, UAE and international portals in web architecture, UI/UX optimization, e-commerce, and growth engineering.",
    },
    {
      id: "how-to-hire",
      question: "How can I hire Muhammad Faizan for a web or SEO project?",
      answer:
        "Use the contact form on this site, WhatsApp +971 58 283 8248, or email mail.faizan@yahoo.com. Typical inquiries include tour booking platforms, AI vibe-coding MVPs, corporate brand revamps, and full-time or contract roles in Dubai.",
    },
  ],

  contact: {
    section: {
      badge: "LET'S WORK TOGETHER",
      heading: "Have a Project in Mind?",
      description:
        "Available for high-impact full-time roles, freelance contracts, and rapid web prototyping across Dubai, UAE and international clients.",
    },
    availability: "Available Now",
    dubaiTimeLabel: "Dubai Local Time (GST)",
    defaultSubject: "Project Inquiry / Job Opportunity",
    presets: [
      { label: "Tour Booking Platform", text: "Hi Muhammad, I need a tour/hotel booking engine similar to Ngktours or Sindbad Balloons." },
      { label: "AI Vibe Coding MVP", text: "Hi Muhammad, I want to build a rapid MVP using Cursor AI and modern React." },
      { label: "Corporate Brand Revamp", text: "Hi Muhammad, we are looking for a complete revamp of our corporate website and SEO architecture." },
      { label: "Full-Time / Contract Role", text: "Hi Muhammad, we are interested in discussing a web designer/developer opportunity in Dubai." },
    ],
    formNamePlaceholder: "e.g. Tariq Al Mansoori",
    formEmailPlaceholder: "e.g. client@company.ae",
    formMessagePlaceholder: "Describe your project goals, timelines, or role details...",
    responseSla: "Response guaranteed in < 24h",
  },

  drivingCard: {
    title: "Valid UAE Driving License",
    badge: "Verified & Active",
    description:
      "Full mobility across Dubai, Abu Dhabi, Sharjah & all Northern Emirates with personal transport for client meetings and on-site delivery.",
    highway: "E11 Sheikh Zayed Highway",
    transit: "All Emirates Transit",
    footerLeft: "Immediate On-Site Availability",
    footerRight: "Dubai & UAE Wide",
  },

  sections: {
    services: {
      badge: "CORE CAPABILITIES & SOLUTIONS",
      heading: "What I Do",
      description:
        "Translating complex business requirements into high-performing, conversion-oriented digital ecosystems with 15+ years of verified industry expertise.",
    },
    projects: {
      badge: "FEATURED WORK & CASE STUDIES",
      heading: "Selected Projects",
      description:
        "High-impact booking engines, excursion portals, and corporate architectures built for UAE and global clients.",
    },
    skills: {
      badge: "TECHNICAL PROFICIENCY & STACK",
      heading: "Tools & Technical Arsenal",
      description:
        "Bridging cutting-edge AI prompt engineering with 15+ years of production-grade frontend architecture, CMS development, and growth marketing.",
    },
    process: {
      badge: "MY 5-STEP METHODOLOGY",
      heading: "A Structured, High-Impact Process",
      description:
        "Combining rapid AI prototyping with production-grade full-stack architecture, conversion-focused UI/UX, and technical SEO rigor.",
    },
    experience: {
      badge: "CAREER TIMELINE & PROVEN RESULTS",
      heading: "Work Experience",
      description:
        "15+ years of documented track record across Dubai, UAE and international portals in web architecture, UI/UX optimization, and growth engineering.",
    },
    education: {
      badge: "ACADEMIC FOUNDATIONS & CREDENTIALS",
      heading: "Education & Certifications",
      description:
        "Formal engineering degree, specialized technical information technology diplomas, and verified industry credentials from Google and IIDE.",
    },
    faqs: {
      badge: "ANSWERS FOR SEARCH AND AI",
      heading: "Frequently Asked Questions",
      description:
        "Direct answers about Muhammad Faizan's role, Dubai-based services, featured projects, and 15+ years of delivery experience.",
    },
  },

  cvCompetencies: [
    {
      title: "Web Design & Development:",
      body: "Responsive Website Design, WordPress, Frontend Design, E-Commerce Management, UI/UX Optimization, Codebase Generation.",
      tone: "neutral",
    },
    {
      title: "AI-Assisted Development & Vibe Coding:",
      body: "AI Prompt Engineering, Rapid Prototyping, Cursor AI, Lovable.dev, Google AI Studio, Specification Markdown Authoring.",
      tone: "accent",
    },
    {
      title: "SEO & Analytics:",
      body: "Technical SEO, On-Page/Off-Page SEO, Performance Optimization, Search Engine Visibility, KPI Monitoring.",
      tone: "neutral",
    },
    {
      title: "Digital Solutions & Marketing:",
      body: "Google Ads, Meta Ads (Facebook & Instagram), Lead Generation Funnels, Digital Ecosystem Management.",
      tone: "neutral",
    },
  ],

  footer: {
    newsletterHeading: "Stay Connected",
    newsletterCopy:
      "Receive updates on web trends, AI vibe coding prototypes, and conversion optimization insights.",
    copyrightSuffix: "All rights reserved.",
    designedWith: "for high-performance digital experiences.",
  },
};
