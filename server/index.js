import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Mock Data
const tools = [
  {
    id: 'asana-qbr',
    title: 'Customer Success Onboarding Template',
    subtitle: 'QBR Asana Template',
    description: 'Streamline client kickoff with automated email sequences and task tracking.',
    category: 'Templates',
    topic: 'HR',
    hoursSaved: '85h / onboarding',
    likes: 42,
    author: 'Sarah Chen'
  },
  {
    id: 'marketing-tracker',
    title: 'Marketing Campaign Tracker',
    subtitle: 'Multi-Channel ROI Dashboard',
    description: 'Centralize multi-channel campaign ROI and spend analysis in one view.',
    category: 'Templates',
    topic: 'Marketing',
    hoursSaved: '14h / week',
    likes: 128,
    author: 'Marcus Aurelius'
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
  toolsShared: 5
};

// API Routes
app.get('/api/tools', (req, res) => {
  res.json(tools);
});

app.get('/api/tools/:id', (req, res) => {
  const tool = tools.find(t => t.id === req.params.id);
  if (tool) {
    res.json(tool);
  } else {
    res.status(404).json({ error: 'Tool not found' });
  }
});

app.get('/api/profile', (req, res) => {
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
