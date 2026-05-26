/**
 * Sharehouse API Service
 * Handles data fetching and manipulation. 
 * Supports offline mock data mode (default) and live backend API integration.
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const API_BASE = import.meta.env.VITE_API_URL || '/api';

if (USE_MOCK) {
  console.log('%c[Sharehouse API] Using local mock data. Set VITE_USE_MOCK_DATA=false in .env to connect to live backend.', 'color: #ea4335; font-weight: bold;');
} else {
  console.log(`%c[Sharehouse API] Connecting to live backend at: ${API_BASE}`, 'color: #0f9d58; font-weight: bold;');
}

// Helper to simulate network latency for a more realistic UX during development
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

// --- Mock Data ---

let mockTools = [
  {
    id: 'asana-qbr',
    title: 'Customer Success Onboarding Template',
    subtitle: 'QBR Asana Template',
    description: 'Streamline client kickoff with automated email sequences and task tracking. This template creates a standardized project in Asana for every new client onboarding, assigning tasks, setting due dates dynamically, and triggering kickoff emails.',
    category: 'Templates',
    topic: 'HR',
    hoursSaved: 85,
    likes: 42,
    uses: 124,
    author: 'Sarah Chen',
    authorTitle: 'Senior Product Designer',
    authorAvatar: '/avatars/sarah.png',
    isFeatured: true,
    features: [
      'Standardized 24-step client onboarding flow',
      'Automatic due-date calculation based on kickoff date',
      'Dynamic stakeholder assignments',
      'Built-in templates for kickoff, mid-point review, and handoff emails'
    ],
    installation: [
      'Download the Asana CSV template file from this page.',
      'Go to your Asana workspace and select "Create Project" -> "Import CSV".',
      'Upload the downloaded template file.',
      'Map the headers (Task Name, Assignee, Start Date, Due Date, Description) to Asana fields.',
      'Use the kickoff script in the prompts section to automate kickoff communication.'
    ],
    specs: {
      platform: 'Asana Premium / Enterprise',
      author: 'Sarah Chen',
      lastUpdated: 'May 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `Task Name,Assignee,Start Date,Due Date,Description\nKickoff Call,,Day 1,Day 1,Schedule client kickoff call\nSend Questionnaire,,Day 1,Day 3,Request account setup information`,
    comments: [
      { id: 1, author: 'Alex Rivera', avatar: '/avatars/alex.png', text: 'This saved our team 10 hours last week! Highly recommend.', date: '3 days ago' },
      { id: 2, author: 'David M.', avatar: '/avatars/david.png', text: 'Works perfectly on Asana Enterprise. Very helpful template.', date: '1 day ago' }
    ]
  },
  {
    id: 'marketing-tracker',
    title: 'Marketing Campaign Tracker',
    subtitle: 'Multi-Channel ROI Dashboard',
    description: 'Centralize multi-channel campaign ROI and spend analysis in one view. This tool hooks up to your Google Ads, Facebook Ads, and LinkedIn Campaign Manager APIs to pull real-time spend and conversion metrics into a unified Google Sheet dashboard.',
    category: 'Templates',
    topic: 'Marketing',
    hoursSaved: 14,
    likes: 128,
    uses: 489,
    author: 'Marcus Aurelius',
    authorTitle: 'Growth Marketing Manager',
    authorAvatar: '/avatars/marcus.png',
    isFeatured: false,
    popular: true,
    features: [
      'Multi-channel API integration connectors',
      'Daily automated dashboard sync',
      'ROI and CAC visual charts',
      'Budget alert notifications'
    ],
    installation: [
      'Open the Google Sheets template and make a copy.',
      'Navigate to Extensions -> Apps Script.',
      'Paste the sheet sync script from this repository.',
      'Fill in your Google Ads, Facebook, and LinkedIn Developer tokens in the Settings tab.',
      'Set a daily trigger in Apps Script to run the update function at 6:00 AM.'
    ],
    specs: {
      platform: 'Google Sheets / Google Apps Script',
      author: 'Marcus Aurelius',
      lastUpdated: 'April 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `// Google Apps Script API connector\nfunction syncCampaignData() {\n  const googleAdsData = fetchGoogleAdsMetrics();\n  const facebookAdsData = fetchFacebookAdsMetrics();\n  writeToSpreadsheet([googleAdsData, facebookAdsData]);\n}`,
    comments: [
      { id: 1, author: 'Sarah Chen', avatar: '/avatars/sarah.png', text: 'Any plans to add TikTok ads connector? We need it for our latest campaigns.', date: '4 days ago' },
      { id: 2, author: 'Marcus Aurelius', avatar: '/avatars/marcus.png', text: '@Sarah, yes! Writing the script today. Will update the package tomorrow.', date: '2 days ago' }
    ]
  },
  {
    id: 'it-inventory',
    title: 'IT Asset Inventory',
    subtitle: 'Automated Hardware Tracker',
    description: 'Automated hardware tracking script with real-time depreciation alerts. It scans your local subnet or syncs with Jamf/Intune profiles to compile a clean IT asset list, calculating current device value and alerting when replacements are due.',
    category: 'Scripts',
    topic: 'IT',
    hoursSaved: 120,
    likes: 31,
    uses: 95,
    author: 'Alex Rivera',
    authorTitle: 'Platform Engineer',
    authorAvatar: '/avatars/alex.png',
    isFeatured: false,
    features: [
      'Automatic network device discovery',
      'Jamf and Intune API synchronization',
      'Hardware depreciation cost calculator',
      'Low disk space and battery wear warnings'
    ],
    installation: [
      'Clone this repository locally.',
      'Install dependencies with python -m pip install -r requirements.txt.',
      'Set your MDM credentials in config.json.',
      'Run python inventory_sync.py to initiate the scan.'
    ],
    specs: {
      platform: 'Python / Jamf API / Intune API',
      author: 'Alex Rivera',
      lastUpdated: 'March 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `# Python Asset Sync Script\nimport requests\n\ndef sync_devices():\n    print("Scanning Jamf API...")\n    # Sync logic here`,
    comments: []
  },
  {
    id: 'finance-forecasting',
    title: 'Financial Forecasting Script',
    subtitle: 'Monte Carlo Projection Engine',
    description: 'Python script for projecting quarterly revenue with Monte Carlo simulation. Utilizes historical sales and cost data to generate 10,000 future scenarios, presenting likelihood percentages for hitting targets.',
    category: 'Scripts',
    topic: 'Finance',
    hoursSaved: 45,
    likes: 19,
    uses: 62,
    author: 'Sarah Chen',
    authorTitle: 'Senior Product Designer',
    authorAvatar: '/avatars/sarah.png',
    isFeatured: false,
    features: [
      'Monte Carlo simulations (10,000 iterations)',
      'Custom revenue and cost growth bounds',
      'Exports clean Excel graphs and reports',
      'Historical seasonal adjustment'
    ],
    installation: [
      'Install Python 3.10+ and pandas/numpy libraries.',
      'Put your historical data into input_sales.csv.',
      'Run python forecast.py --target 1250000.',
      'Open generated_report.pdf to view findings.'
    ],
    specs: {
      platform: 'Python / Pandas / NumPy',
      author: 'Sarah Chen',
      lastUpdated: 'February 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `# Monte Carlo simulation forecast\nimport numpy as np\nimport pandas as pd\n\ndef run_simulation(data, target):\n    # Simulate quarterly paths\n    pass`,
    comments: []
  },
  {
    id: 'competitor-scraper',
    title: 'Competitor Intelligence Scraper',
    subtitle: 'Weekly Brief Generator',
    description: 'Automatically extracts pricing, feature updates, and sentiment from specified competitor URLs and synthesizes a weekly brief.',
    category: 'Marketing',
    topic: 'Marketing',
    hoursSaved: 12,
    likes: 185,
    uses: 342,
    author: 'Emily R.',
    authorTitle: 'Operations Director',
    authorAvatar: '/avatars/emily.png',
    isFeatured: false,
    trending: true,
    features: [
      'Dynamic URL list monitoring',
      'HTML content delta parsing',
      'Weekly summaries delivered directly to Slack'
    ],
    installation: [
      'Clone repository and install requirements.',
      'Enter target URLs into target_urls.txt.',
      'Run python scraper.py to check for changes.'
    ],
    specs: {
      platform: 'Python / Beautiful Soup / Slack API',
      author: 'Emily R.',
      lastUpdated: 'April 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `import requests\nfrom bs4 import BeautifulSoup\n\ndef check_delta(url):\n    res = requests.get(url)\n    soup = BeautifulSoup(res.text, "html.parser")\n    # Delta logic...`,
    comments: [
      { id: 1, author: 'David M.', avatar: '/avatars/david.png', text: 'This is brilliant, saves us hours of scrolling through pricing tables.', date: '5 days ago' }
    ]
  },
  {
    id: 'seo-blog',
    title: 'SEO Blog Generator',
    subtitle: 'Keyword-Driven Writer',
    description: 'Takes a target keyword and generates a full SEO-optimized article structure and draft.',
    category: 'Marketing',
    topic: 'Marketing',
    hoursSaved: 8,
    likes: 124,
    uses: 215,
    author: 'Marcus Aurelius',
    authorTitle: 'Growth Marketing Manager',
    authorAvatar: '/avatars/marcus.png',
    isFeatured: false,
    trending: true,
    features: [
      'LSI keyword research mapping',
      'Optimal heading layout generation',
      'Rough drafting with structured internal linking'
    ],
    installation: [
      'Configure OpenAI API key in .env file.',
      'Run python writer.py --keyword "marketing automation".'
    ],
    specs: {
      platform: 'Python / OpenAI API',
      author: 'Marcus Aurelius',
      lastUpdated: 'April 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `// GPT-4 system prompt for SEO writing\nconst SYSTEM_PROMPT = "You are an expert SEO copywriter. Write a comprehensive blog post about...";`,
    comments: []
  },
  {
    id: 'lead-qualification',
    title: 'Lead Qualification Bot',
    subtitle: 'Unstructured Email Classifier',
    description: 'Scores incoming leads based on unstructured email data and routes to sales.',
    category: 'Sales Ops',
    topic: 'Operations',
    hoursSaved: 6,
    likes: 92,
    uses: 178,
    author: 'Emily R.',
    authorTitle: 'Operations Director',
    authorAvatar: '/avatars/emily.png',
    isFeatured: false,
    trending: true,
    features: [
      'Email semantic parsing',
      'Lead budget and timeline extraction',
      'Salesforce lead creation and assignment rules'
    ],
    installation: [
      'Configure email inbox listener.',
      'Deploy the script to serverless Cloudflare Workers.'
    ],
    specs: {
      platform: 'JavaScript / Cloudflare Workers / OpenAI API',
      author: 'Emily R.',
      lastUpdated: 'March 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `// Cloudflare Workers Event Listener\naddEventListener('fetch', event => {\n  event.respondWith(handleRequest(event.request))\n})`,
    comments: []
  },
  {
    id: 'cold-outreach',
    title: 'Cold Outreach Sequencer',
    subtitle: 'LinkedIn-Based Email Composer',
    description: 'Generates personalized 3-step email sequences based on LinkedIn profiles.',
    category: 'Sales Ops',
    topic: 'Sales',
    hoursSaved: 5,
    likes: 74,
    uses: 121,
    author: 'Marcus Aurelius',
    authorTitle: 'Growth Marketing Manager',
    authorAvatar: '/avatars/marcus.png',
    isFeatured: false,
    features: [
      'Scrapes profile highlights (current role, tenure)',
      'Drafts personalized ice-breaker hook',
      '3-step email cadence builder'
    ],
    installation: [
      'Provide your LinkedIn cookies in settings.json.',
      'Run python sequencer.py --profile-url [url].'
    ],
    specs: {
      platform: 'Python / Playwright / GPT-3.5 API',
      author: 'Marcus Aurelius',
      lastUpdated: 'March 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `# Sequencer logic\ndef make_sequence(profile_details):\n    # personal followups\n    pass`,
    comments: []
  },
  {
    id: 'i18n-localizer',
    title: 'I18n Content Localizer',
    subtitle: 'Markdown Formatted Translator',
    description: 'Translates markdown files maintaining formatting and brand tone across 5 languages.',
    category: 'Data Engineering',
    topic: 'IT',
    hoursSaved: 10,
    likes: 110,
    uses: 189,
    author: 'Alex Rivera',
    authorTitle: 'Platform Engineer',
    authorAvatar: '/avatars/alex.png',
    isFeatured: false,
    features: [
      'Markdown AST parsing (prevents code block translation)',
      'Consistent translation glossary matching',
      'Translates into PL, DE, FR, ES, and IT'
    ],
    installation: [
      'Put target markdown files in /docs/input.',
      'Run node translate.js.'
    ],
    specs: {
      platform: 'Node.js / Markdown-it / Deepl API',
      author: 'Alex Rivera',
      lastUpdated: 'February 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `const remark = require('remark');\nconst translate = async (mdText) => {\n  // Parse AST and translate text nodes only\n};`,
    comments: []
  },
  {
    id: 'error-analyzer',
    title: 'Error Log Analyzer',
    subtitle: 'Sentry Log Parser',
    description: 'Ingests Sentry logs to summarize root causes and suggest code fixes.',
    category: 'Data Engineering',
    topic: 'IT',
    hoursSaved: 9,
    likes: 156,
    uses: 267,
    author: 'Alex Rivera',
    authorTitle: 'Platform Engineer',
    authorAvatar: '/avatars/alex.png',
    isFeatured: false,
    features: [
      'Sentry webhook payload parsing',
      'Stack trace extract analysis',
      'Auto-generates draft git PR to fix the crash'
    ],
    installation: [
      'Add this script endpoint URL to your Sentry Webhooks.',
      'Configure git workspace permissions.'
    ],
    specs: {
      platform: 'Python / Flask / GitHub API',
      author: 'Alex Rivera',
      lastUpdated: 'January 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `# Ingest logs webhook\n@app.route('/sentry-hook', methods=['POST'])\ndef analyze():\n    trace = request.json['event']['exception']['values'][0]\n    # Fix suggestion...`,
    comments: []
  },
  {
    id: 'csv-cleanser',
    title: 'CSV Data Cleanser',
    subtitle: 'Tabular Data Normalizer',
    description: 'Normalizes formatting, removes duplicates, and flags anomalies in tabular data.',
    category: 'Data Engineering',
    topic: 'IT',
    hoursSaved: 3,
    likes: 63,
    uses: 84,
    author: 'Alex Rivera',
    authorTitle: 'Platform Engineer',
    authorAvatar: '/avatars/alex.png',
    isFeatured: false,
    features: [
      'Removes duplicates and trailing whitespaces',
      'Phone/Email validation and formatting normalization',
      'Flags data row outliers and type mismatches'
    ],
    installation: [
      'Run python cleanse.py data.csv output.csv'
    ],
    specs: {
      platform: 'Python / Pandas',
      author: 'Alex Rivera',
      lastUpdated: 'January 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `import pandas as pd\n\ndef cleanse(file):\n    df = pd.read_csv(file)\n    df.drop_duplicates(inplace=True)\n    return df`,
    comments: []
  },
  {
    id: 'prompt-brand-voice',
    title: 'Brand Voice Persona Injector',
    subtitle: 'Branding Persona Prompt',
    description: 'Curated generative instruction to inject corporate brand voice persona. Rewrite standard text copy to strictly adhere to corporate brand tone.',
    category: 'Prompts',
    topic: 'Marketing',
    hoursSaved: 2,
    likes: 142,
    uses: 312,
    author: 'Sarah Chen',
    authorTitle: 'Senior Product Designer',
    authorAvatar: '/avatars/sarah.png',
    isFeatured: false,
    features: [
      'High contrast corporate branding guidelines',
      'Flat, clear structural output instructions',
      'Elimination of common AI conversational fluff patterns'
    ],
    installation: [
      'Copy the prompt text below.',
      'Paste into your system instruction block in ChatGPT, Claude, or Copilot.'
    ],
    specs: {
      platform: 'System Prompt / AI Client',
      author: 'Sarah Chen',
      lastUpdated: 'May 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `"Act as a senior brand strategist. Analyze the following copy and rewrite it strictly adhering to the 'Surgical Precision' brand voice guidelines. Ensure high contrast terminology, flat structural delivery, and eliminate any conversational fluff..."`,
    comments: [
      { id: 1, author: 'Emily R.', avatar: '/avatars/emily.png', text: 'This prompt works wonders with Claude 3.5 Sonnet. Best rewrite tool we have.', date: '6 days ago' }
    ]
  },
  {
    id: 'prompt-react-comp',
    title: 'React Component Generator (Strict TS)',
    subtitle: 'Strict TypeScript Code Architect',
    description: 'Generates robust React functional components using TypeScript, enforcing modular structures, clean code guidelines, and Tailwind styles.',
    category: 'Prompts',
    topic: 'IT',
    hoursSaved: 4,
    likes: 389,
    uses: 941,
    author: 'David M.',
    authorTitle: 'Senior Frontend Developer',
    authorAvatar: '/avatars/david.png',
    isFeatured: false,
    features: [
      'Strict typing enforcement',
      'Tailwind CSS layout design tokens',
      'Clean code modular layout checklist'
    ],
    installation: [
      'Copy the prompt and paste it into your editor agent settings or AI client block.'
    ],
    specs: {
      platform: 'System Prompt / Developer AI Client',
      author: 'David M.',
      lastUpdated: 'May 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `"Generate a React functional component using TypeScript. Enforce strict typing. Component must be highly modular, include JSDoc comments, use Tailwind CSS for styling, and strictly adhere to clean code principles..."`,
    comments: []
  },
  {
    id: 'prompt-cold-email',
    title: 'B2B Cold Email Sequence Generator',
    subtitle: 'CTO Targeting Cadence',
    description: 'Generates high-response 3-part cold email sequences targeting Chief Technology Officers (CTOs). Tone is kept assertive, high-value, and personalized.',
    category: 'Prompts',
    topic: 'Sales',
    hoursSaved: 1,
    likes: 87,
    uses: 156,
    author: 'Marcus Aurelius',
    authorTitle: 'Growth Marketing Manager',
    authorAvatar: '/avatars/marcus.png',
    isFeatured: false,
    features: [
      'Assertive value-delivery layouts',
      'High personal target hook lines',
      'Frictionless call-to-actions for 15-minute syncs'
    ],
    installation: [
      'Copy the prompt text below, fill in your company parameters, and feed it to an LLM.'
    ],
    specs: {
      platform: 'Sales Campaign System Prompt',
      author: 'Marcus Aurelius',
      lastUpdated: 'May 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `"Draft a 3-part B2B cold email sequence targeting CTOs. Tone must be assertive, high value, and highly personalized..."`,
    comments: []
  },
  {
    id: 'prompt-sql-opt',
    title: 'SQL Query Optimizer Prompt',
    subtitle: 'Database Tuning Advisor',
    description: 'Generates optimized SQL scripts and detailed suggestions regarding join order, index scanning, and latency reduction based on PostgreSQL trace dumps.',
    category: 'Prompts',
    topic: 'IT',
    hoursSaved: 3,
    likes: 215,
    uses: 420,
    author: 'Alex Rivera',
    authorTitle: 'Platform Engineer',
    authorAvatar: '/avatars/alex.png',
    isFeatured: false,
    features: [
      'Explain trace bottleneck scans analysis',
      'Optimal database index key suggestions',
      'Calculates plan complexity improvements'
    ],
    installation: [
      'Copy the system prompt block and input your target PostgreSQL query schema.'
    ],
    specs: {
      platform: 'PostgreSQL Database System Prompt',
      author: 'Alex Rivera',
      lastUpdated: 'April 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `"Review the following PostgreSQL query. Identify bottlenecks related to JOINs and scan operations. Provide optimized alternative with explain plan documentation..."`,
    comments: []
  },
  {
    id: 'prompt-microservices',
    title: 'Microservices Architecture Planner',
    subtitle: 'Platform Architect System Prompt',
    description: 'System instruction that acts as an enterprise architect to plan container orchestration, service discovery, database layouts, and event buses.',
    category: 'Prompts',
    topic: 'IT',
    hoursSaved: 8,
    likes: 198,
    uses: 310,
    author: 'Alex Rivera',
    authorTitle: 'Platform Engineer',
    authorAvatar: '/avatars/alex.png',
    isFeatured: false,
    features: [
      'Pipes message queue routing configurations',
      'Detailed database replication strategy design',
      'Container scheduling load-balance specifications'
    ],
    installation: [
      'Supply this architect prompt to a high-capacity chat LLM.'
    ],
    specs: {
      platform: 'System Architect Prompt',
      author: 'Alex Rivera',
      lastUpdated: 'March 2026',
      license: 'Internal Use (ShareHouse)'
    },
    text: `"Design a scalable microservices architecture for a high-volume ad-tech platform. Detail container orchestration, service discovery, database pattern, and event bus routing..."`,
    comments: []
  }
];

let mockLeaderboard = [
  {
    rank: 1,
    name: 'Sarah J.',
    title: 'Senior Product Designer',
    tier: 'Platinum Tier',
    karma: '2,450 XP',
    hoursSaved: '480h',
    toolsShared: 14,
    avatar: '/avatars/sarah.png'
  },
  {
    rank: 2,
    name: 'David M.',
    title: 'Senior Frontend Developer',
    tier: 'Gold Tier',
    karma: '1,920 XP',
    hoursSaved: '320h',
    toolsShared: 9,
    avatar: '/avatars/david.png'
  },
  {
    rank: 3,
    name: 'Emily R.',
    title: 'Operations Director',
    tier: 'Gold Tier',
    karma: '1,680 XP',
    hoursSaved: '290h',
    toolsShared: 8,
    avatar: '/avatars/emily.png'
  },
  {
    rank: 4,
    name: 'Alex Rivera',
    title: 'Platform Engineer',
    tier: 'Silver Tier',
    karma: '1,450 XP',
    hoursSaved: '185h',
    toolsShared: 5,
    avatar: '/avatars/alex.png'
  },
  {
    rank: 5,
    name: 'Marcus Aurelius',
    title: 'Growth Marketing Manager',
    tier: 'Silver Tier',
    karma: '1,120 XP',
    hoursSaved: '140h',
    toolsShared: 4,
    avatar: '/avatars/marcus.png'
  }
];

let mockUserProfile = {
  name: 'Alex Rivera',
  email: 'alex.r@sharehouse.inc',
  role: 'Platform Engineer',
  tier: 'Silver Tier',
  karma: 1450,
  nextTierKarma: 2000,
  hoursSaved: 185,
  toolsShared: 5,
  avatar: '/avatars/alex.png'
};

let mockContributions = [
  {
    id: 1,
    title: 'Data Processing Pipeline',
    time: 'Added 2 days ago',
    kp: '+50 KP',
    icon: 'code'
  },
  {
    id: 2,
    title: 'Customer Support Prompt',
    time: 'Added 5 days ago',
    kp: '+35 KP',
    icon: 'chat'
  },
  {
    id: 3,
    title: 'SEO Analysis Template',
    time: 'Added 1 week ago',
    kp: '+45 KP',
    icon: 'analytics'
  }
];

// --- API Service Methods ---

export const api = {
  // --- Tools & Recipes API ---
  async getTools() {
    if (USE_MOCK) {
      await delay();
      return [...mockTools];
    }
    const res = await fetch(`${API_BASE}/tools`);
    if (!res.ok) throw new Error('Failed to fetch tools');
    return res.json();
  },

  async getToolById(id) {
    if (USE_MOCK) {
      await delay();
      const tool = mockTools.find(t => t.id === id || String(t.id) === String(id));
      return tool || mockTools[0];
    }
    const res = await fetch(`${API_BASE}/tools/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch tool with ID: ${id}`);
    return res.json();
  },

  async createTool(toolData) {
    if (USE_MOCK) {
      await delay(500);
      const newTool = {
        id: toolData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: toolData.title,
        subtitle: toolData.subtitle || toolData.title,
        description: toolData.description,
        category: toolData.category || 'Templates',
        topic: toolData.topic || 'General',
        hoursSaved: parseInt(toolData.hoursSaved) || 0,
        likes: 0,
        uses: 0,
        author: mockUserProfile.name,
        authorTitle: mockUserProfile.role,
        authorAvatar: mockUserProfile.avatar,
        isFeatured: false,
        features: toolData.features || [],
        installation: toolData.installation || [],
        specs: {
          platform: toolData.platform || 'General',
          author: mockUserProfile.name,
          lastUpdated: 'Just Now',
          license: 'Internal Use (ShareHouse)'
        },
        text: toolData.text || '',
        comments: []
      };
      mockTools = [newTool, ...mockTools];
      // Increment user stats in mock profile
      mockUserProfile.toolsShared += 1;
      mockUserProfile.karma += 100;
      mockContributions = [
        {
          id: Date.now(),
          title: newTool.title,
          time: 'Added just now',
          kp: '+100 KP',
          icon: newTool.category === 'Scripts' ? 'code' : 'analytics'
        },
        ...mockContributions
      ];
      return newTool;
    }

    const res = await fetch(`${API_BASE}/tools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toolData)
    });
    if (!res.ok) throw new Error('Failed to create tool');
    return res.json();
  },

  async likeTool(id) {
    if (USE_MOCK) {
      await delay(50);
      let updatedLikes = 0;
      mockTools = mockTools.map(t => {
        if (t.id === id || String(t.id) === String(id)) {
          updatedLikes = t.likes + 1;
          return { ...t, likes: updatedLikes };
        }
        return t;
      });
      return { success: true, likes: updatedLikes };
    }

    const res = await fetch(`${API_BASE}/tools/like/${id}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to like tool');
    return res.json();
  },

  async incrementUses(id) {
    if (USE_MOCK) {
      await delay(100);
      let updatedUses = 0;
      mockTools = mockTools.map(t => {
        if (t.id === id || String(t.id) === String(id)) {
          updatedUses = t.uses + 1;
          return { ...t, uses: updatedUses };
        }
        return t;
      });
      return { success: true, uses: updatedUses };
    }

    const res = await fetch(`${API_BASE}/tools/deploy/${id}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to increment uses');
    return res.json();
  },

  async addComment(id, text) {
    if (USE_MOCK) {
      await delay(150);
      let updatedComments = [];
      const newComment = {
        id: Date.now(),
        author: mockUserProfile.name,
        avatar: mockUserProfile.avatar,
        text: text,
        date: 'Just now'
      };
      mockTools = mockTools.map(t => {
        if (t.id === id || String(t.id) === String(id)) {
          updatedComments = [...(t.comments || []), newComment];
          return { ...t, comments: updatedComments };
        }
        return t;
      });
      return updatedComments;
    }

    const res = await fetch(`${API_BASE}/tools/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('Failed to add comment');
    return res.json();
  },

  // --- Prompts API (Compatible with old endpoints, though now consolidated) ---
  async getPrompts() {
    // Return unified items that belong to the Prompts category
    const tools = await this.getTools();
    return tools.filter(t => t.category === 'Prompts');
  },

  async createPrompt(promptData) {
    return this.createTool({
      ...promptData,
      category: 'Prompts'
    });
  },

  async likePrompt(id) {
    return this.likeTool(id);
  },

  // --- AI Recipes API ---
  async getRecipes() {
    // In our consolidated model, recipes are just everything in mockTools
    return this.getTools();
  },

  async createRecipe(recipeData) {
    return this.createTool(recipeData);
  },

  async likeRecipe(id) {
    return this.likeTool(id);
  },

  // --- Leaderboard API ---
  async getLeaderboard() {
    if (USE_MOCK) {
      await delay();
      return [...mockLeaderboard];
    }
    const res = await fetch(`${API_BASE}/leaderboard`);
    if (!res.ok) throw new Error('Failed to fetch leaderboard');
    return res.json();
  },

  // --- User Profile API ---
  async getUserProfile() {
    if (USE_MOCK) {
      await delay();
      return {
        ...mockUserProfile,
        contributions: [...mockContributions]
      };
    }
    const res = await fetch(`${API_BASE}/users/profile`);
    if (!res.ok) throw new Error('Failed to fetch user profile');
    return res.json();
  }
};
