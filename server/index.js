import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Mock Data
let tools = [
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
  }
];

const profile = {
  name: 'Alex Rivera',
  email: 'alex.r@sharehouse.inc',
  role: 'Platform Engineer',
  tier: 'Silver Tier',
  karma: 1450,
  nextTierKarma: 2000,
  hoursSaved: 185,
  toolsShared: 5,
  avatar: '/avatars/alex.png',
  contributions: [
    {
      id: 1,
      title: 'Data Processing Pipeline',
      time: 'Added 2 days ago',
      kp: '+50 KP',
      icon: 'code'
    }
  ]
};

const leaderboard = [
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
  }
];

// API Routes
app.get('/api/tools', (req, res) => {
  res.json(tools);
});

app.get('/api/tools/:id', (req, res) => {
  const tool = tools.find(t => t.id === req.params.id || String(t.id) === String(req.params.id));
  if (tool) {
    res.json(tool);
  } else {
    res.status(404).json({ error: 'Tool not found' });
  }
});

app.post('/api/tools', (req, res) => {
  const toolData = req.body;
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
    author: profile.name,
    authorTitle: profile.role,
    authorAvatar: profile.avatar,
    isFeatured: false,
    features: toolData.features || [],
    installation: toolData.installation || [],
    specs: {
      platform: toolData.platform || 'General',
      author: profile.name,
      lastUpdated: 'Just Now',
      license: 'Internal Use (ShareHouse)'
    },
    text: toolData.text || '',
    comments: []
  };
  tools.push(newTool);
  res.status(201).json(newTool);
});

app.post('/api/tools/like/:id', (req, res) => {
  const tool = tools.find(t => t.id === req.params.id || String(t.id) === String(req.params.id));
  if (tool) {
    tool.likes += 1;
    res.json({ success: true, likes: tool.likes });
  } else {
    res.status(404).json({ error: 'Tool not found' });
  }
});

app.post('/api/tools/deploy/:id', (req, res) => {
  const tool = tools.find(t => t.id === req.params.id || String(t.id) === String(req.params.id));
  if (tool) {
    tool.uses = (tool.uses || 0) + 1;
    res.json({ success: true, uses: tool.uses });
  } else {
    res.status(404).json({ error: 'Tool not found' });
  }
});

app.post('/api/tools/:id/comments', (req, res) => {
  const tool = tools.find(t => t.id === req.params.id || String(t.id) === String(req.params.id));
  if (tool) {
    const newComment = {
      id: Date.now(),
      author: profile.name,
      avatar: profile.avatar,
      text: req.body.text,
      date: 'Just now'
    };
    tool.comments = tool.comments || [];
    tool.comments.push(newComment);
    res.json(tool.comments);
  } else {
    res.status(404).json({ error: 'Tool not found' });
  }
});

app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

app.get('/api/users/profile', (req, res) => {
  res.json(profile);
});

// Confluence Integration Route Placeholder
app.get('/api/confluence/issues', async (req, res) => {
  try {
    const confluenceMockData = {
      connected: true,
      space: 'SHAREHOUSE',
      pageTitle: 'ShareHouse Marketplace Issues Log',
      issues: [
        { id: 'CONF-101', title: 'Fix Dashboard count-up glitch', status: 'In Progress', priority: 'High', reporter: 'Alex Rivera' },
        { id: 'CONF-102', title: 'Add search indexing to prompt database', status: 'To Do', priority: 'Medium', reporter: 'Sarah Chen' },
        { id: 'CONF-103', title: 'Verify Google authentication scope', status: 'Done', priority: 'Low', reporter: 'David M.' }
      ]
    };
    res.json(confluenceMockData);
  } catch (error) {
    console.error('Confluence API integration error:', error);
    res.status(500).json({ error: 'Failed to fetch issues from Confluence' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
