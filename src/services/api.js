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
    }
  },
  {
    id: 'marketing-tracker',
    title: 'Marketing Campaign Tracker',
    subtitle: 'Multi-Channel ROI Dashboard',
    description: 'Centralize multi-channel campaign ROI and spend analysis in one view. This tool hooks up to your Google Ads, Facebook Ads, and LinkedIn Campaign Manager APIs to pull real-time spend and conversion metrics into a unified Google Sheet dashboard.',
    category: 'Templates',
    topic: 'Marketing',
    hoursSaved: 14, // represented in list as '14h / week', detail page maps to '14h / week' or similar
    likes: 128,
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
    }
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
    }
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
    }
  }
];

let mockPrompts = [
  {
    id: 1,
    title: 'Brand Voice Persona Injector',
    category: 'Marketing',
    likes: 142,
    text: `"Act as a senior brand strategist. Analyze the following copy and rewrite it strictly adhering to the 'Surgical Precision' brand voice guidelines. Ensure high contrast terminology, flat structural delivery, and eliminate any conversational fluff..."`
  },
  {
    id: 2,
    title: 'React Component Generator (Strict TS)',
    category: 'Coding',
    likes: 389,
    text: `"Generate a React functional component using TypeScript. Enforce strict typing. Component must be highly modular, include JSDoc comments, use Tailwind CSS for styling, and strictly adhere to clean code principles..."`
  },
  {
    id: 3,
    title: 'B2B Cold Email Sequence',
    category: 'Copywriting',
    likes: 87,
    text: `"Draft a 3-part B2B cold email sequence targeting CTOs. Tone must be assertive, high value, and highly personalized..."`
  },
  {
    id: 4,
    title: 'SQL Query Optimizer',
    category: 'Data Analysis',
    likes: 215,
    text: `"Review the following PostgreSQL query. Identify bottlenecks related to JOINs and scan operations. Provide optimized alternative with explain plan documentation..."`
  },
  {
    id: 5,
    title: 'Microservices Architecture Plan',
    category: 'System Design',
    likes: 198,
    text: `"Design a scalable microservices architecture for a high-volume ad-tech platform. Detail container orchestration, service discovery, database pattern, and event bus routing..."`
  }
];

let mockRecipes = [
  {
    id: 'competitor-scraper',
    title: 'Competitor Intelligence Scraper',
    description: 'Automatically extracts pricing, feature updates, and sentiment from specified competitor URLs and synthesizes a weekly brief.',
    category: 'Marketing',
    likes: 185,
    trending: true,
    timeSaved: '12h / week'
  },
  {
    id: 'seo-blog',
    title: 'SEO Blog Generator',
    description: 'Takes a target keyword and generates a full SEO-optimized article structure and draft.',
    category: 'Marketing',
    likes: 124,
    trending: true,
    timeSaved: '8h / week'
  },
  {
    id: 'lead-qualification',
    title: 'Lead Qualification Bot',
    description: 'Scores incoming leads based on unstructured email data and routes to sales.',
    category: 'Sales Ops',
    likes: 92,
    trending: true,
    timeSaved: '6h / week'
  },
  {
    id: 'cold-outreach',
    title: 'Cold Outreach Sequencer',
    description: 'Generates personalized 3-step email sequences based on LinkedIn profiles.',
    category: 'Sales Ops',
    likes: 74,
    trending: false,
    timeSaved: '5h / week'
  },
  {
    id: 'i18n-localizer',
    title: 'I18n Content Localizer',
    description: 'Translates markdown files maintaining formatting and brand tone across 5 languages.',
    category: 'Data Engineering',
    likes: 110,
    trending: false,
    timeSaved: '10h / week'
  },
  {
    id: 'error-analyzer',
    title: 'Error Log Analyzer',
    description: 'Ingests Sentry logs to summarize root causes and suggest code fixes.',
    category: 'Data Engineering',
    likes: 156,
    trending: false,
    timeSaved: '9h / week'
  },
  {
    id: 'csv-cleanser',
    title: 'CSV Data Cleanser',
    description: 'Normalizes formatting, removes duplicates, and flags anomalies in tabular data.',
    category: 'Data Engineering',
    likes: 63,
    trending: false,
    timeSaved: '3h / week'
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
  // --- Tools API ---
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
      const tool = mockTools.find(t => t.id === id);
      return tool || mockTools[0]; // fallback to first
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
        }
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

  // --- Prompts API ---
  async getPrompts() {
    if (USE_MOCK) {
      await delay();
      return [...mockPrompts];
    }
    const res = await fetch(`${API_BASE}/prompts`);
    if (!res.ok) throw new Error('Failed to fetch prompts');
    return res.json();
  },

  async createPrompt(promptData) {
    if (USE_MOCK) {
      await delay(400);
      const newPrompt = {
        id: mockPrompts.length + 1,
        title: promptData.title,
        category: promptData.category || 'General',
        likes: 0,
        text: promptData.text
      };
      mockPrompts = [newPrompt, ...mockPrompts];
      // Increment user stats in mock profile
      mockUserProfile.karma += 50;
      mockContributions = [
        {
          id: Date.now(),
          title: newPrompt.title,
          time: 'Added just now',
          kp: '+50 KP',
          icon: 'chat'
        },
        ...mockContributions
      ];
      return newPrompt;
    }

    const res = await fetch(`${API_BASE}/prompts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promptData)
    });
    if (!res.ok) throw new Error('Failed to create prompt');
    return res.json();
  },

  async likePrompt(id) {
    if (USE_MOCK) {
      await delay(50);
      mockPrompts = mockPrompts.map(p => 
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      );
      return true;
    }

    const res = await fetch(`${API_BASE}/prompts/like/${id}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to like prompt');
    return res.json();
  },

  // --- AI Recipes API ---
  async getRecipes() {
    if (USE_MOCK) {
      await delay();
      return [...mockRecipes];
    }
    const res = await fetch(`${API_BASE}/recipes`);
    if (!res.ok) throw new Error('Failed to fetch recipes');
    return res.json();
  },

  async createRecipe(recipeData) {
    if (USE_MOCK) {
      await delay(500);
      const newRecipe = {
        id: recipeData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: recipeData.title,
        description: recipeData.description,
        category: recipeData.category || 'General',
        likes: 0,
        trending: false,
        timeSaved: recipeData.timeSaved || '0h / week'
      };
      mockRecipes = [newRecipe, ...mockRecipes];
      mockUserProfile.karma += 80;
      mockContributions = [
        {
          id: Date.now(),
          title: newRecipe.title,
          time: 'Added just now',
          kp: '+80 KP',
          icon: 'apps'
        },
        ...mockContributions
      ];
      return newRecipe;
    }

    const res = await fetch(`${API_BASE}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData)
    });
    if (!res.ok) throw new Error('Failed to create recipe');
    return res.json();
  },

  async likeRecipe(id) {
    if (USE_MOCK) {
      await delay(50);
      mockRecipes = mockRecipes.map(r => 
        r.id === id ? { ...r, likes: r.likes + 1 } : r
      );
      return true;
    }

    const res = await fetch(`${API_BASE}/recipes/like/${id}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to like recipe');
    return res.json();
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
