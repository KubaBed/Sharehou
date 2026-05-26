# Sharehouse - Backend Integration Guide

This guide is designed for the backend developer to understand the frontend structure, how to run it locally, and what API endpoints the frontend expects to connect to.

---

## 🚀 Local Setup & Development

The frontend is built using **React**, **Vite**, and **Tailwind CSS**.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   By default, `VITE_USE_MOCK_DATA` is set to `true`. This runs the application in offline mockup mode using static data defined in `src/services/api.js`.

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:5173`.

---

## 🔌 Connecting to your Backend

When you are ready to test against your backend API:

1. In your `.env.local` file, set:
   ```env
   VITE_USE_MOCK_DATA=false
   VITE_API_URL=/api
   ```
2. **Local Proxying:** The file `vite.config.js` is configured with a server proxy. By default, it proxies any request starting with `/api` to:
   `http://localhost:5000`
   If your backend is running on a different port (e.g., `8000`), update the proxy target in `vite.config.js`:
   ```javascript
   server: {
     proxy: {
       '/api': {
         target: 'http://localhost:8000', // Update to your backend port
         changeOrigin: true,
         secure: false,
       }
     }
   }
   ```
3. Restart the Vite dev server (`npm run dev`). Now, all API calls made by the frontend will hit your backend.

---

## 📑 API Contract & JSON Schemas

The frontend expects a RESTful API returning JSON responses. Below are the endpoints currently implemented in the frontend's API service layer (`src/services/api.js`).

### 1. Tools & Resources

#### `GET /api/tools`
Returns a list of all tools/resources shared.
* **Response Payload:** `Array<Tool>`
* **JSON Schema:**
```json
[
  {
    "id": "asana-qbr",
    "title": "Customer Success Onboarding Template",
    "subtitle": "QBR Asana Template",
    "description": "Streamline client kickoff with automated email sequences...",
    "category": "Templates",
    "topic": "HR",
    "hoursSaved": 85,
    "likes": 42,
    "author": "Sarah Chen",
    "authorTitle": "Senior Product Designer",
    "authorAvatar": "/avatars/sarah.png",
    "isFeatured": true
  }
]
```

#### `GET /api/tools/:id`
Returns detailed specs, key features, and installation instructions for a specific tool.
* **Response Payload:** `ToolDetail`
* **JSON Schema:**
```json
{
  "id": "asana-qbr",
  "title": "Customer Success Onboarding Template",
  "subtitle": "QBR Asana Template",
  "description": "Streamline client kickoff with automated email sequences...",
  "category": "Templates",
  "topic": "HR",
  "hoursSaved": 85,
  "likes": 42,
  "author": "Sarah Chen",
  "authorTitle": "Senior Product Designer",
  "authorAvatar": "/avatars/sarah.png",
  "isFeatured": true,
  "features": [
    "Standardized 24-step client onboarding flow",
    "Automatic due-date calculation based on kickoff date"
  ],
  "installation": [
    "Download the Asana CSV template file from this page.",
    "Go to your Asana workspace and select 'Create Project'..."
  ],
  "specs": {
    "platform": "Asana Premium / Enterprise",
    "author": "Sarah Chen",
    "lastUpdated": "May 2026",
    "license": "Internal Use (ShareHouse)"
  }
}
```

#### `POST /api/tools`
Creates a new tool submission.
* **Request Payload:**
```json
{
  "title": "Salesforce Opportunity Syncer",
  "subtitle": "Auto-sync Opportunities",
  "description": "Automatically schedules syncer scripts...",
  "category": "Scripts",
  "topic": "Sales",
  "hoursSaved": 15,
  "features": ["Feature A", "Feature B"],
  "installation": ["Step 1", "Step 2"],
  "platform": "Python / Salesforce API"
}
```
* **Response Payload:** `ToolDetail` (the created resource)

---

### 2. Prompt Database

#### `GET /api/prompts`
Returns all custom generative prompts.
* **Response Payload:** `Array<Prompt>`
* **JSON Schema:**
```json
[
  {
    "id": 1,
    "title": "Brand Voice Persona Injector",
    "category": "Marketing",
    "likes": 142,
    "text": "\"Act as a senior brand strategist. Analyze the following copy...\""
  }
]
```

#### `POST /api/prompts`
Creates a new prompt.
* **Request Payload:**
```json
{
  "title": "React Component Generator (Strict TS)",
  "category": "Coding",
  "text": "\"Generate a React functional component using TypeScript...\""
}
```
* **Response Payload:** `Prompt` (the created resource)

#### `POST /api/prompts/like/:id`
Increments the like count for a prompt.
* **Response Payload:**
```json
{
  "success": true,
  "likes": 143
}
```

---

### 3. AI Recipes

#### `GET /api/recipes`
Returns all ready-to-deploy AI recipes.
* **Response Payload:** `Array<Recipe>`
* **JSON Schema:**
```json
[
  {
    "id": "competitor-scraper",
    "title": "Competitor Intelligence Scraper",
    "description": "Automatically extracts pricing, feature updates...",
    "category": "Marketing",
    "likes": 185,
    "trending": true,
    "timeSaved": "12h / week"
  }
]
```

#### `POST /api/recipes`
Adds a new AI recipe.
* **Request Payload:**
```json
{
  "title": "SEO Blog Generator",
  "description": "Generates a full SEO-optimized article structure...",
  "category": "Marketing",
  "timeSaved": "8h / week"
}
```
* **Response Payload:** `Recipe` (the created resource)

#### `POST /api/recipes/like/:id`
Increments the like count for a recipe.
* **Response Payload:**
```json
{
  "success": true,
  "likes": 186
}
```

---

### 4. Leaderboard & Stats

#### `GET /api/leaderboard`
Returns top builders/contributors ranked by Karma XP.
* **Response Payload:** `Array<LeaderboardEntry>`
* **JSON Schema:**
```json
[
  {
    "rank": 1,
    "name": "Sarah J.",
    "title": "Senior Product Designer",
    "tier": "Platinum Tier",
    "karma": "2,450 XP",
    "hoursSaved": "480h",
    "toolsShared": 14,
    "avatar": "/avatars/sarah.png"
  }
]
```

---

### 5. User Profile

#### `GET /api/users/profile`
Returns the currently logged-in user's profile and stats, including their historical activity logs.
* **Response Payload:** `UserProfile`
* **JSON Schema:**
```json
{
  "name": "Alex Rivera",
  "email": "alex.r@sharehouse.inc",
  "role": "Platform Engineer",
  "tier": "Silver Tier",
  "karma": 1450,
  "nextTierKarma": 2000,
  "hoursSaved": 185,
  "toolsShared": 5,
  "avatar": "/avatars/alex.png",
  "contributions": [
    {
      "id": 1,
      "title": "Data Processing Pipeline",
      "time": "Added 2 days ago",
      "kp": "+50 KP",
      "icon": "code"
    }
  ]
}
```
