import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import { api } from '../services/api';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Marketing',
    text: '',
    hoursSaved: '5'
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [similarityWarning, setSimilarityWarning] = useState(null);
  
  // AI Copilot state
  const [aiInput, setAiInput] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  // Comparison Modal state
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [isSubmittingSuggestion, setIsSubmittingSuggestion] = useState(false);
  const [suggestionSuccess, setSuggestionSuccess] = useState(false);
  const [activePresetId, setActivePresetId] = useState(null);

  const existingTools = {
    'asana-qbr': {
      title: 'Customer Success Onboarding Template',
      category: 'Templates',
      hoursSaved: '85',
      description: 'Streamline client kickoff with automated email sequences and task tracking. This template creates a standardized project in Asana for every new client onboarding, assigning tasks, setting due dates dynamically, and triggering kickoff emails.',
      text: `# Asana CSV Template Structure\nTask Name,Assignee,Start Date,Due Date,Description\nKickoff Call,,Day 1,Day 1,Schedule client kickoff call\nSend Questionnaire,,Day 1,Day 3,Request account setup information`
    },
    'marketing-tracker': {
      title: 'Marketing Campaign Tracker',
      category: 'Templates',
      hoursSaved: '14',
      description: 'Centralize multi-channel campaign ROI and spend analysis in one view. This tool hooks up to your Google Ads, Facebook Ads, and LinkedIn Campaign Manager APIs to pull real-time spend and conversion metrics into a unified Google Sheet dashboard.',
      text: `// Google Apps Script API connector\nfunction syncCampaignData() {\n  const googleAdsData = fetchGoogleAdsMetrics();\n  const facebookAdsData = fetchFacebookAdsMetrics();\n  writeToSpreadsheet([googleAdsData, facebookAdsData]);\n}`
    }
  };

  const presets = [
    {
      id: 'jira',
      label: 'Jira Syncer',
      bullets: '- script to sync Jira tickets to Confluence page\n- run weekly via python\n- send webhook alerts to slack on error',
      output: {
        title: 'Jira to Confluence Dashboard Syncer',
        category: 'Coding',
        hoursSaved: '12',
        description: 'An automated script designed to sync Jira issue reports to active Confluence document tables weekly. Pipes webhook failure alerts directly into Slack.',
        text: `import requests\nimport json\n\n# Configure Jira & Confluence credentials\nJIRA_URL = "https://your-company.atlassian.net/rest/api/3/search"\nCONFLUENCE_URL = "https://your-company.atlassian.net/wiki/rest/api/content"\n\n# Perform sync logic...\nprint("Syncing tickets...")`
      }
    },
    {
      id: 'standup',
      label: 'Standup Bot',
      bullets: '- prompt for daily standup reminder\n- friendly and casual tone\n- asks for yesterday, today, and blockers',
      output: {
        title: 'Slack Daily Standup Bot Prompt',
        category: 'Copywriting',
        hoursSaved: '4',
        description: 'A structured system prompt designed for Slack bots to run a daily standup update, prompting team members for yesterday\'s progress, today\'s focus, and blockers in a friendly, engaging tone.',
        text: `System Prompt:\nYou are StandupBot, a friendly and supportive team assistant.\n\nEvery weekday morning at 9:00 AM, send the following message to the #engineering channel:\n"Good morning, team! 🚀 Time for our daily standup. Please reply in this thread with:\n1. What you worked on yesterday ✅\n2. What you are focusing on today 🎯\n3. Any blockers in your way 🛑"`
      }
    },
    {
      id: 'email',
      label: 'Outreach Email',
      bullets: '- template for sales follow up\n- cold email outreach\n- clear CTA for a 15-min call',
      output: {
        title: 'Cold Sales Outreach Follow-up',
        category: 'Marketing',
        hoursSaved: '6',
        description: 'A high-conversion cold outreach follow-up email template focusing on value delivery and a low-friction call-to-action for a 15-minute sync.',
        text: `Subject: Quick question re: [Pain Point] optimization\n\nHi [First Name],\n\nI wanted to follow up on my previous note. We recently helped [Similar Company] resolve [Pain Point], resulting in a [Percentage]% improvement in [Metric].\n\nWould you be open to a brief 15-minute call next Tuesday at 10 AM to see if we could achieve similar results for [Company]?\n\nBest regards,\n[Your Name]`
      }
    }
  ];

  const handleTitleChange = (val) => {
    setFormData({ ...formData, title: val });
    const lower = val.toLowerCase();
    if (lower.includes('onboard') || lower.includes('success')) {
      setSimilarityWarning({
        title: 'Customer Success Onboarding Template',
        id: 'asana-qbr',
        category: 'Templates',
        existing: existingTools['asana-qbr']
      });
    } else if (lower.includes('marketing') || lower.includes('tracker') || lower.includes('roi')) {
      setSimilarityWarning({
        title: 'Marketing Campaign Tracker',
        id: 'marketing-tracker',
        category: 'Templates',
        existing: existingTools['marketing-tracker']
      });
    } else {
      setSimilarityWarning(null);
    }
  };

  const handleSelectPreset = (preset) => {
    setAiInput(preset.bullets);
    setActivePresetId(preset.id);
  };

  const handleAiEnhance = () => {
    if (!aiInput.trim()) {
      alert('Please enter a few bullets or raw ideas in the Copilot box first.');
      return;
    }
    setIsEnhancing(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      // Find if input matches any of our presets
      const matchedPreset = presets.find(
        (p) => p.bullets.trim() === aiInput.trim() || aiInput.toLowerCase().includes(p.label.toLowerCase().split(' ')[0])
      );
      
      if (matchedPreset) {
        setFormData(matchedPreset.output);
      } else {
        // Fallback/Dynamic generator from custom user input
        setFormData({
          title: 'AI Optimized ' + (aiInput.split('\n')[0].replace(/[-*#]/g, '').trim() || 'Recipe'),
          category: 'System Design',
          hoursSaved: '8',
          description: `Automatically structured using ShareHouse AI:\n${aiInput.trim()}`,
          text: `// AI Auto-Generated Snippet based on notes:\n// ${aiInput.replace(/\n/g, '\n// ')}\n\nconsole.log("Custom automation script initialized.");`
        });
      }
      setIsEnhancing(false);
      setActivePresetId(null);
      setSimilarityWarning(null);
    }, 1500);
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.title || !formData.description || !formData.text) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Call API submit
    api.createTool(formData)
      .then(() => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/dashboard');
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to submit tool:', err);
        alert('Error creating recipe.');
      });
  };

  const handleSubmitSuggestion = () => {
    setIsSubmittingSuggestion(true);
    setTimeout(() => {
      setIsSubmittingSuggestion(false);
      setSuggestionSuccess(true);
      setTimeout(() => {
        setSuggestionSuccess(false);
        setShowComparisonModal(false);
        navigate('/dashboard');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-smoke text-on-surface h-screen overflow-hidden flex w-full">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:ml-[280px] w-full max-w-[calc(100%-280px)] h-screen bg-smoke">
        <Header />
        
        {/* Page Content */}
        <main className="flex-grow overflow-y-auto px-8 py-8 hide-scrollbar flex flex-col relative justify-center">
          <Reveal delay={50} duration={650} className="w-full max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
              
              {/* Left Column: Form */}
              <div className="flex-1 bg-pure-white p-8 rounded-2xl border border-border-light shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                {/* Page Header */}
                <div className="mb-8 border-b border-[#f0f0f0] pb-6">
                  <h2 className="font-headline text-2xl font-bold text-charcoal mb-2">Add New Recipe</h2>
                  <p className="font-body text-sm text-muted-silver">Share a new automation flow, template, or prompt with the ShareHouse community.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-label text-sm text-charcoal font-bold mb-2">Recipe Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Salesforce Opportunity Syncer (type 'onboarding' to test similarity detector)"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full bg-smoke p-4 border border-border-light rounded-xl focus:ring-2 focus:ring-scarlett-red focus:border-transparent font-body text-sm text-charcoal outline-none transition-all duration-300 hover:border-charcoal/20"
                    />
                    
                    {/* Similarity Warning Banner */}
                    {similarityWarning && (
                      <div className="bg-red-50/70 border border-scarlett-red/20 rounded-xl p-4 mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 animate-fade-in-up">
                        <div className="flex items-start gap-2.5">
                          <span className="material-symbols-outlined text-scarlett-red text-xl mt-0.5">warning</span>
                          <div>
                            <p className="font-headline text-xs font-bold text-charcoal">Similar Recipe Detected</p>
                            <p className="font-body text-xs text-secondary mt-0.5">
                              "{similarityWarning.title}" already exists in the {similarityWarning.category} library.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => navigate(`/tool/${similarityWarning.id}`)}
                            className="text-xs font-label font-bold text-charcoal bg-pure-white border border-border-gray hover:bg-smoke px-3 py-1.5 rounded-lg transition-all duration-200"
                          >
                            View Existing
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowComparisonModal(true)}
                            className="text-xs font-label font-bold text-pure-white bg-scarlett-red hover:bg-[#d8352b] px-3 py-1.5 rounded-lg transition-all duration-200 shadow-sm"
                          >
                            Suggest Edits
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-label text-sm text-charcoal font-bold mb-2">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-smoke p-4 border border-border-light rounded-xl focus:ring-2 focus:ring-scarlett-red focus:border-transparent font-body text-sm text-charcoal outline-none transition-all duration-300 hover:border-charcoal/20 cursor-pointer"
                      >
                        <option>Marketing</option>
                        <option>Coding</option>
                        <option>Copywriting</option>
                        <option>Data Analysis</option>
                        <option>System Design</option>
                        <option>Sales Ops</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-label text-sm text-charcoal font-bold mb-2">Est. Hours Saved / Week</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.hoursSaved}
                        onChange={(e) => setFormData({ ...formData, hoursSaved: e.target.value })}
                        className="w-full bg-smoke p-4 border border-border-light rounded-xl focus:ring-2 focus:ring-scarlett-red focus:border-transparent font-body text-sm text-charcoal outline-none transition-all duration-300 hover:border-charcoal/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-label text-sm text-charcoal font-bold mb-2">Short Description *</label>
                    <textarea
                      required
                      rows="3"
                      placeholder="Describe what this recipe does and how it saves time..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-smoke p-4 border border-border-light rounded-xl focus:ring-2 focus:ring-scarlett-red focus:border-transparent font-body text-sm text-charcoal outline-none transition-all duration-300 hover:border-charcoal/20"
                    />
                  </div>

                  <div>
                    <label className="block font-label text-sm text-charcoal font-bold mb-2">Prompt / Code Content *</label>
                    <textarea
                      required
                      rows="6"
                      placeholder="Paste the prompt guidelines or script code here..."
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      className="w-full bg-smoke p-4 border border-border-light rounded-xl focus:ring-2 focus:ring-scarlett-red focus:border-transparent font-body text-sm text-charcoal outline-none transition-all duration-300 hover:border-charcoal/20 font-mono leading-relaxed"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-[#f0f0f0] pt-6 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="bg-transparent border border-border-light hover:bg-smoke hover:border-charcoal/20 text-charcoal px-6 py-3 rounded-lg font-label text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-scarlett-red hover:bg-[#d8352b] text-pure-white px-8 py-3 rounded-lg font-label text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md hover:shadow-scarlett-red/10"
                    >
                      Share Recipe
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: AI Copilot Assistant */}
              <div className="w-full lg:w-[350px] shrink-0 bg-pure-white p-6 rounded-2xl border border-border-light shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-4 mb-6 border-b border-border-gray">
                    <span className="material-symbols-outlined text-scarlett-red filled-icon">bolt</span>
                    <h3 className="font-headline text-base font-bold text-charcoal uppercase tracking-wide">AI Copilot Assistant</h3>
                  </div>

                  <p className="font-body text-xs text-secondary leading-relaxed mb-6">
                    Don't want to fill in everything manually? Try one of our quick presets or type your own raw bullet points below to let the AI draft the title, category, description, and code automatically.
                  </p>

                  <div className="space-y-4">
                    {/* Preset Templates Selector */}
                    <div>
                      <span className="block font-label text-[11px] text-muted-silver font-bold uppercase tracking-wider mb-2">Try a Preset Draft:</span>
                      <div className="flex flex-wrap gap-2">
                        {presets.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleSelectPreset(preset)}
                            className={`text-[10px] font-label font-bold px-2.5 py-1.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                              activePresetId === preset.id
                                ? 'bg-scarlett-red text-pure-white border-scarlett-red shadow-sm'
                                : 'bg-smoke text-secondary border-border-light hover:bg-hover-gray hover:text-charcoal'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-label text-[11px] text-muted-silver font-bold uppercase tracking-wider mb-2">Raw Notes / Bullet Points</label>
                      <textarea
                        rows="6"
                        placeholder="e.g.,&#10;- script to sync jira to confluence&#10;- run once a week&#10;- send slack alerts on fail"
                        value={aiInput}
                        onChange={(e) => {
                          setAiInput(e.target.value);
                          setActivePresetId(null);
                        }}
                        className="w-full bg-smoke p-4 border border-border-light rounded-xl focus:ring-2 focus:ring-scarlett-red focus:border-transparent font-body text-xs text-charcoal outline-none transition-all duration-300 hover:border-charcoal/20"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAiEnhance}
                      disabled={isEnhancing}
                      className="w-full bg-charcoal hover:bg-charcoal/90 text-pure-white hover:text-scarlett-red py-3 rounded-lg text-xs font-semibold font-label transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isEnhancing ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-pure-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Generating Draft...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">auto_awesome</span>
                          <span>Optimize & Auto-Fill Form</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="border-t border-[#f0f0f0] pt-4 mt-8 bg-smoke/50 p-4 rounded-xl text-center">
                  <p className="text-[10px] text-muted-silver leading-relaxed">
                    Powered by ShareHouse AI Core.<br />
                    Tuned to company design guidelines.
                  </p>
                </div>
              </div>

            </div>
          </Reveal>

          {/* Success Overlay Notification */}
          {showSuccess && (
            <div className="fixed inset-0 flex items-center justify-center bg-pitch-black/50 z-50 animate-fade-in-scale">
              <div className="bg-pure-white p-8 rounded-xl shadow-soft-2 text-center max-w-sm w-full mx-4 border border-border-light">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-charcoal mb-2">Recipe Shared!</h3>
                <p className="font-body text-xs text-muted-silver">
                  Your recipe has been added to the database and shared with the team. Redirecting...
                </p>
              </div>
            </div>
          )}

          {/* Suggest Edits / Comparison Modal */}
          {showComparisonModal && similarityWarning && (
            <div className="fixed inset-0 bg-pitch-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in-scale">
              <div className="bg-pure-white rounded-2xl border border-border-light shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
                {/* Modal Header */}
                <div className="bg-smoke p-6 border-b border-border-light flex justify-between items-start">
                  <div>
                    <h3 className="font-headline text-lg font-bold text-charcoal flex items-center gap-2">
                      <span className="material-symbols-outlined text-scarlett-red">compare_arrows</span>
                      Similar Recipe Detected: Suggest Edits Instead?
                    </h3>
                    <p className="font-body text-xs text-muted-silver mt-1">
                      An existing recipe already covers this use case. Suggesting changes is preferred as it keeps the catalog clean and earns you <strong className="text-scarlett-red">25 Karma Points</strong>.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowComparisonModal(false)}
                    className="text-muted-silver hover:text-charcoal p-1 rounded-full hover:bg-smoke transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {/* Modal Body / Comparison */}
                <div className="flex-grow p-6 overflow-y-auto space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Left Box: Your Draft */}
                    <div className="bg-smoke/30 p-4 border border-border-light rounded-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-border-light pb-2">
                        <span className="font-label text-xs font-bold text-muted-silver uppercase tracking-wider">Your Draft</span>
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">New Draft</span>
                      </div>
                      <div>
                        <label className="text-[10px] font-label text-muted-silver font-bold uppercase block mb-1">Title</label>
                        <p className="font-headline text-sm font-bold text-charcoal">{formData.title || '(No Title)'}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-label text-muted-silver font-bold uppercase block mb-1">Category</label>
                        <p className="font-body text-xs text-secondary">{formData.category}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-label text-muted-silver font-bold uppercase block mb-1">Description</label>
                        <p className="font-body text-xs text-secondary leading-relaxed bg-pure-white p-3 rounded-lg border border-border-light max-h-[120px] overflow-y-auto">{formData.description || '(No Description)'}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-label text-muted-silver font-bold uppercase block mb-1">Prompt / Code Snippet</label>
                        <pre className="font-mono text-[10px] text-charcoal bg-pure-white p-3 rounded-lg border border-border-light max-h-[150px] overflow-y-auto leading-relaxed whitespace-pre-wrap">{formData.text || '(No Code)'}</pre>
                      </div>
                    </div>

                    {/* Right Box: Existing Tool */}
                    <div className="bg-smoke/30 p-4 border border-border-light rounded-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-border-light pb-2">
                        <span className="font-label text-xs font-bold text-muted-silver uppercase tracking-wider">Existing Recipe</span>
                        <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active Catalog</span>
                      </div>
                      <div>
                        <label className="text-[10px] font-label text-muted-silver font-bold uppercase block mb-1">Title</label>
                        <p className="font-headline text-sm font-bold text-charcoal">{similarityWarning.existing?.title || similarityWarning.title}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-label text-muted-silver font-bold uppercase block mb-1">Category</label>
                        <p className="font-body text-xs text-secondary">{similarityWarning.existing?.category || similarityWarning.category}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-label text-muted-silver font-bold uppercase block mb-1">Description</label>
                        <p className="font-body text-xs text-secondary leading-relaxed bg-pure-white p-3 rounded-lg border border-border-light max-h-[120px] overflow-y-auto">{similarityWarning.existing?.description || 'Streamlined workflow automation.'}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-label text-muted-silver font-bold uppercase block mb-1">Prompt / Code Snippet</label>
                        <pre className="font-mono text-[10px] text-charcoal bg-pure-white p-3 rounded-lg border border-border-light max-h-[150px] overflow-y-auto leading-relaxed whitespace-pre-wrap">{similarityWarning.existing?.text || '// Code structure'}</pre>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-smoke p-6 border-t border-border-light flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowComparisonModal(false);
                      handleSubmit({ preventDefault: () => {} });
                    }}
                    className="text-xs font-label font-bold text-muted-silver hover:text-charcoal bg-transparent hover:bg-smoke-dark px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                  >
                    Create New Recipe Anyway
                  </button>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowComparisonModal(false)}
                      className="text-xs font-label font-semibold text-charcoal bg-pure-white border border-border-light hover:bg-smoke px-4 py-2.5 rounded-lg transition-all cursor-pointer"
                    >
                      Keep Editing
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmitSuggestion}
                      disabled={isSubmittingSuggestion}
                      className="text-xs font-label font-bold text-pure-white bg-scarlett-red hover:bg-[#d8352b] disabled:opacity-50 px-6 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      {isSubmittingSuggestion ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-pure-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting Suggestion...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">handshake</span>
                          <span>Submit Suggestion (+25 Karma)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Suggestion Success Alert */}
              {suggestionSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-pitch-black/70 z-[60] animate-fade-in-scale">
                  <div className="bg-pure-white p-8 rounded-xl shadow-2xl text-center max-w-sm w-full mx-4 border border-border-light">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <span className="material-symbols-outlined text-3xl">emoji_events</span>
                    </div>
                    <h3 className="font-headline text-lg font-bold text-charcoal mb-2">Suggestion Submitted!</h3>
                    <p className="font-body text-xs text-charcoal mb-1">
                      You've successfully suggested improvements to:
                    </p>
                    <p className="font-body text-xs font-bold text-scarlett-red mb-3">
                      "{similarityWarning.title}"
                    </p>
                    <p className="font-label text-xs text-secondary bg-smoke p-2 rounded-lg border border-border-light inline-block font-semibold mb-4 text-green-700">
                      🏆 +25 Karma Points Awarded!
                    </p>
                    <p className="font-body text-[10px] text-muted-silver">
                      The tool owner has been notified to review your suggestion. Redirecting to dashboard...
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AddRecipe;
