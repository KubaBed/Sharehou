import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import { api } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Newest');
  const [topic, setTopic] = useState('All');
  const [tools, setTools] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Counters state for Bento Grid
  const [karma, setKarma] = useState(0);
  const [toolsShared, setToolsShared] = useState(0);
  const [hoursSaved, setHoursSaved] = useState(0);

  useEffect(() => {
    // Load tools from API
    api.getTools()
      .then(data => {
        setTools(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load tools:', err);
        setLoading(false);
      });

    // Load leaderboard from API
    api.getLeaderboard()
      .then(data => {
        setLeaderboard(data.slice(0, 3));
      })
      .catch(err => {
        console.error('Failed to load leaderboard:', err);
      });

    // Basic count-up animation for stats
    const karmaTimer = setInterval(() => {
      setKarma(prev => (prev < 4500 ? prev + 150 : 4500));
    }, 20);
    const toolsTimer = setInterval(() => {
      setToolsShared(prev => (prev < 143 ? prev + 5 : 143));
    }, 20);
    const hoursTimer = setInterval(() => {
      setHoursSaved(prev => (prev < 12500 ? prev + 400 : 12500));
    }, 20);

    return () => {
      clearInterval(karmaTimer);
      clearInterval(toolsTimer);
      clearInterval(hoursTimer);
    };
  }, []);

  const handleLike = (id, e) => {
    if (e) {
      e.stopPropagation(); // Stop navigation to details page
    }
    api.likeTool(id)
      .then(res => {
        if (res.success) {
          setTools(prev => prev.map(t => t.id === id ? { ...t, likes: res.likes } : t));
        }
      })
      .catch(err => console.error('Failed to like tool:', err));
  };

  // Top 5 Popular items - derived dynamically from loaded tools (sorted by likes)
  const popularTools = [...tools]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5)
    .map((t, idx) => ({
      id: t.id,
      rank: idx + 1,
      title: t.title,
      category: t.category,
      likes: t.likes,
      author: t.author
    }));

  return (
    <div className="bg-smoke text-on-surface h-screen overflow-hidden flex w-full">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:ml-[280px] w-full max-w-[calc(100%-280px)] h-screen bg-smoke">
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-8 py-8 hide-scrollbar flex flex-col gap-8">
          
          {/* Header Banner - Editorial Brutalism Stance */}
          <div className="relative border-b border-charcoal/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="font-spec-tagline text-scarlett-red block mb-2">// SHAREHOUSE PLATFORM</span>
              <h2 className="font-spec-title text-charcoal tracking-tight">Explore Tools</h2>
              <p className="font-spec-lead text-muted-silver mt-2 max-w-2xl">
                A surgical index of custom templates, automations, and prompts engineered by the RTB House team to accelerate daily productivity.
              </p>
            </div>
            
            {/* Quick Actions / Filters */}
            <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-1 hide-scrollbar">
              {['Newest', 'Top Rated', 'Gems'].map((f, i) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 font-label text-xs font-bold border rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                    filter === f
                      ? 'bg-charcoal text-pure-white border-charcoal shadow-md shadow-charcoal/10'
                      : 'bg-pure-white text-charcoal border-border-gray hover:bg-smoke hover:border-charcoal/30'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Topics Selector - Fixed Crop Bug by adding py-3 instead of pb-2 */}
          <div className="flex items-center gap-2 overflow-x-auto py-3 border-b border-charcoal/5 hide-scrollbar">
            <span className="text-muted-silver font-spec-tagline mr-4 shrink-0">Filter by topic:</span>
            {['All', 'IT', 'Marketing', 'Finance', 'Operations', 'Sales', 'HR'].map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className={`px-4 py-2 font-spec-lead font-bold rounded-lg border transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 ${
                  topic === t
                    ? 'bg-scarlett-red text-pure-white border-scarlett-red font-semibold shadow-md shadow-scarlett-red/10'
                    : 'bg-pure-white text-muted-silver border-border-gray hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Two-Column Layout: Discovery Feed on Left, Popular Sidebar on Right */}
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
            
            {/* Left Column: Discovery Feed (Asymmetric Bento Grid) */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {loading ? (
                <div className="md:col-span-2 py-20 flex flex-col items-center justify-center text-muted-silver gap-3">
                  <span className="material-symbols-outlined text-4xl animate-spin text-scarlett-red">progress_activity</span>
                  <span className="font-body text-sm font-medium">Loading tools index...</span>
                </div>
              ) : (
                <>
                  {/* Large Featured Card (Spans 2 Columns) */}
                  {tools.filter(t => (topic === 'All' || t.topic === topic) && t.isFeatured).map(tool => (
                <Reveal key={tool.id} className="md:col-span-2" delay={50} duration={700}>
                  <div
                    onClick={() => navigate(`/tool/${tool.id}`)}
                    className="bg-pure-white p-8 rounded-2xl border border-charcoal/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(230,0,0,0.06)] hover:border-scarlett-red/40 transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-scarlett-red/5 to-transparent pointer-events-none"></div>
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="font-spec-tagline text-scarlett-red border-b-2 border-scarlett-red pb-1">
                          Featured {tool.category}
                        </span>
                        <span className="bg-smoke border border-border-gray text-charcoal px-2 py-0.5 font-spec-tagline rounded-md">
                          Saves {tool.hoursSaved}h
                        </span>
                      </div>
                      <h3 className="font-spec-h1 font-bold text-charcoal mb-4 group-hover:text-scarlett-red transition-colors leading-tight">
                        {tool.title}
                      </h3>
                      <p className="font-spec-body text-secondary leading-relaxed mb-8 max-w-xl">
                        {tool.description}
                      </p>
                    </div>
                    <div className="border-t border-border-gray pt-6 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img className="w-8 h-8 rounded-full border border-border-gray object-cover" src={tool.authorAvatar} alt={tool.author} />
                        <span className="font-spec-name text-charcoal">{tool.author}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-spec-tagline text-muted-silver">{tool.uses || 0} Uses</span>
                        <button 
                          onClick={(e) => handleLike(tool.id, e)}
                          className="flex items-center gap-1.5 bg-smoke hover:bg-scarlett-red/10 border border-border-gray px-3 py-1.5 rounded-lg text-charcoal hover:text-scarlett-red transition-all font-spec-lead font-bold select-none active:scale-95 cursor-pointer"
                          title="Upvote tool"
                        >
                          <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                          <span>{tool.likes}</span>
                        </button>
                        <button className="text-scarlett-red font-spec-lead font-bold flex items-center gap-1">
                          View Details
                          <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Standard/Secondary Cards */}
              {tools.filter(t => (topic === 'All' || t.topic === topic) && !t.isFeatured).map((tool, index) => (
                <Reveal key={tool.id} delay={100 + index * 100} duration={600}>
                  <div
                    onClick={() => navigate(`/tool/${tool.id}`)}
                    className="bg-pure-white p-6 rounded-2xl border border-charcoal/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(230,0,0,0.05)] hover:border-scarlett-red/40 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="font-spec-tagline text-muted-silver border border-border-gray px-2 py-0.5 rounded">
                          {tool.category}
                        </span>
                        {tool.popular && (
                          <span className="bg-red-50 text-scarlett-red border border-red-100 px-2 py-0.5 font-spec-tagline flex items-center gap-1 rounded-md">
                            <span className="material-symbols-outlined text-xs filled-icon">local_fire_department</span>
                            POPULAR
                          </span>
                        )}
                      </div>
                      <h4 className="font-spec-h2 font-bold text-charcoal mb-3 group-hover:text-scarlett-red transition-colors leading-snug">
                        {tool.title}
                      </h4>
                      <p className="font-spec-body text-secondary leading-relaxed mb-6">
                        {tool.description}
                      </p>
                    </div>
                    <div className="border-t border-border-gray pt-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img className="w-6 h-6 rounded-full border border-border-gray object-cover" src={tool.authorAvatar} alt={tool.author} />
                        <span className="font-spec-name text-charcoal">{tool.author}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-spec-tagline text-muted-silver">{tool.uses || 0} Uses</span>
                        <button
                          onClick={(e) => handleLike(tool.id, e)}
                          className="flex items-center gap-1 bg-smoke hover:bg-scarlett-red/10 border border-border-gray px-2 py-1 rounded text-charcoal hover:text-scarlett-red transition-all font-bold font-spec-tagline select-none active:scale-95 cursor-pointer"
                          title="Upvote tool"
                        >
                          <span className="material-symbols-outlined text-[12px]">thumb_up</span>
                          <span>{tool.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </>
          )}
        </div>

            {/* Right Column Sidebar Widgets (Top 5 Popular & Mini Leaderboard) */}
            <div className="w-full lg:w-[350px] shrink-0 flex flex-col gap-8">
              
              {/* Top 5 Popular Sidebar Widget */}
              <Reveal className="w-full" delay={250} duration={700}>
                <div className="bg-pure-white border border-charcoal/10 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300">
                  <div className="flex items-center gap-2 pb-4 mb-6 border-b border-border-gray">
                    <span className="material-symbols-outlined text-scarlett-red filled-icon text-base">star</span>
                    <h3 className="font-spec-h2 font-bold text-charcoal uppercase">Top 5 Popular</h3>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {popularTools.map((tool) => (
                      <div
                        key={tool.rank}
                        onClick={() => navigate(`/tool/${tool.id}`)}
                        className="flex gap-4 items-start pb-4 border-b border-border-light last:border-0 last:pb-0 group cursor-pointer transition-all duration-200 hover:translate-x-1"
                      >
                        {/* Rank box */}
                        <div className="w-6 h-6 bg-charcoal text-pure-white font-spec-lead font-bold flex items-center justify-center shrink-0 rounded group-hover:bg-scarlett-red transition-colors">
                          {tool.rank}
                        </div>
                        
                        {/* Tool details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-spec-h3 font-bold text-charcoal truncate group-hover:text-scarlett-red transition-colors">
                            {tool.title}
                          </h4>
                          <div className="flex justify-between items-center mt-1">
                            <span className="font-spec-tagline text-muted-silver">{tool.category}</span>
                            <span className="font-spec-position text-secondary">by {tool.author}</span>
                          </div>
                        </div>
                        
                        {/* Likes badge */}
                        <button
                          onClick={(e) => handleLike(tool.id, e)}
                          className="flex items-center gap-0.5 font-spec-lead text-muted-silver hover:text-scarlett-red hover:scale-110 active:scale-95 transition-all shrink-0 font-bold bg-smoke px-2 py-1 rounded border border-border-light cursor-pointer select-none"
                          title="Upvote tool"
                        >
                          <span className="material-symbols-outlined text-xs">thumb_up</span>
                          <span>{tool.likes}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Mini Leaderboard Sidebar Widget */}
              <Reveal className="w-full" delay={300} duration={700}>
                <div className="bg-pure-white border border-charcoal/10 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300">
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-border-gray">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-scarlett-red filled-icon text-base">leaderboard</span>
                      <h3 className="font-spec-h2 font-bold text-charcoal uppercase">Leaderboard</h3>
                    </div>
                    <Link to="/leaderboard" className="font-spec-lead text-scarlett-red font-bold hover:underline flex items-center gap-0.5">
                      View All
                      <span className="material-symbols-outlined text-[10px] font-bold">arrow_forward</span>
                    </Link>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {leaderboard.map((user, idx) => (
                      <div
                        key={user.name}
                        onClick={() => navigate('/leaderboard')}
                        className="flex gap-3 items-center pb-4 border-b border-border-light last:border-0 last:pb-0 group cursor-pointer transition-all duration-200 hover:translate-x-1"
                      >
                        {/* Rank badge */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-spec-lead font-bold shrink-0 ${
                          idx === 0 ? 'bg-amber-400 text-charcoal' :
                          idx === 1 ? 'bg-slate-300 text-charcoal' :
                          'bg-amber-700 text-pure-white'
                        }`}>
                          #{idx + 1}
                        </div>
                        
                        {/* Avatar */}
                        <img className="w-8 h-8 rounded-full border border-border-gray object-cover shrink-0" src={user.avatar} alt={user.name} />
                        
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-spec-h3 font-bold text-charcoal truncate group-hover:text-scarlett-red transition-colors">
                            {user.name}
                          </h4>
                          <p className="font-spec-position text-muted-silver truncate">{user.title}</p>
                        </div>
                        
                        {/* XP */}
                        <div className="font-spec-lead font-bold text-scarlett-red shrink-0">
                          {user.karma}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              
            </div>

          </div>

          {/* Platform Performance & Analytics (Bento Grid Style) */}
          <div className="border-t border-charcoal/10 pt-10 mt-6">
            <span className="font-spec-tagline text-scarlett-red block mb-2">// METRICS BOARD</span>
            <h3 className="font-spec-title text-charcoal mb-8">Platform Performance</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Bento Stat 1: Karma */}
              <Reveal className="h-full" delay={100} duration={600}>
                <div className="bg-pure-white p-6 rounded-2xl border border-charcoal/10 flex flex-col justify-between h-full relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.04)] hover:border-scarlett-red/30 transition-all duration-300 ease-out hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-spec-tagline text-muted-silver">Total Karma Points</p>
                      <p className="font-spec-number text-charcoal mt-2">{karma.toLocaleString()} XP</p>
                    </div>
                    <span className="material-symbols-outlined text-scarlett-red text-base">local_fire_department</span>
                  </div>
                  {/* SVG Sparkline Sparking Dynamic Data */}
                  <div className="h-12 w-full mt-4">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path
                        d="M0,25 L15,22 L30,28 L45,18 L60,20 L75,10 L90,15 L100,5"
                        fill="none"
                        stroke="#EE4137"
                        strokeWidth="2"
                      />
                      <path
                        d="M0,25 L15,22 L30,28 L45,18 L60,20 L75,10 L90,15 L100,5 L100,30 L0,30 Z"
                        fill="url(#gradient-red)"
                        opacity="0.1"
                      />
                      <defs>
                        <linearGradient id="gradient-red" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#EE4137" />
                          <stop offset="100%" stopColor="#EE4137" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex justify-between items-center font-spec-position text-muted-silver border-t border-border-gray pt-3 mt-4">
                    <span>+12% vs last month</span>
                    <span>Live sync</span>
                  </div>
                </div>
              </Reveal>

              {/* Bento Stat 2: Tools Shared */}
              <Reveal className="h-full" delay={200} duration={600}>
                <div className="bg-pure-white p-6 rounded-2xl border border-charcoal/10 flex flex-col justify-between h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.04)] hover:border-scarlett-red/30 transition-all duration-300 ease-out hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-spec-tagline text-muted-silver">Shared Automation Modules</p>
                      <p className="font-spec-number text-charcoal mt-2">{toolsShared}</p>
                    </div>
                    <span className="material-symbols-outlined text-charcoal text-base">handyman</span>
                  </div>
                  {/* SVG Sparkline */}
                  <div className="h-12 w-full mt-4">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path
                        d="M0,28 L20,24 L40,26 L60,18 L80,12 L100,8"
                        fill="none"
                        stroke="#0a0f1d"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between items-center font-spec-position text-muted-silver border-t border-border-gray pt-3 mt-4">
                    <span>Steady growth curve</span>
                    <span>Updated daily</span>
                  </div>
                </div>
              </Reveal>

              {/* Bento Stat 3: Hours Saved */}
              <Reveal className="h-full" delay={300} duration={600}>
                <div className="bg-pure-white p-6 rounded-2xl border border-charcoal/10 flex flex-col justify-between h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.04)] hover:border-scarlett-red/30 transition-all duration-300 ease-out hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-spec-tagline text-muted-silver">Collective Hours Saved</p>
                      <p className="font-spec-number text-charcoal mt-2">{hoursSaved.toLocaleString()}h</p>
                    </div>
                    <span className="material-symbols-outlined text-scarlett-red text-base">schedule</span>
                  </div>
                  {/* SVG Sparkline */}
                  <div className="h-12 w-full mt-4">
                    <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path
                        d="M0,26 L10,24 L25,27 L40,20 L55,22 L70,12 L85,8 L100,3"
                        fill="none"
                        stroke="#EE4137"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between items-center font-spec-position text-muted-silver border-t border-border-gray pt-3 mt-4">
                    <span>Saves approx. 32h per developer</span>
                    <span>Est. quarterly value: $450k</span>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
