import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const words = ["AI Prompts", "AppsScripts", "Asana Templates", "Slack Bots", "Workflows"];

const DynamicHeroText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animClass, setAnimClass] = useState('animate-slide-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimClass('animate-slide-out');
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setAnimClass('animate-slide-in');
      }, 250); // duration of exit animation
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative overflow-hidden align-bottom h-[1.25em] text-scarlett-red font-semibold min-w-[240px] md:min-w-[320px] text-left">
      <span key={currentIndex} className={`${animClass} absolute left-0 bottom-0 block w-full`}>
        {words[currentIndex]}
      </span>
    </span>
  );
};

const Landing = () => {
  const navigate = useNavigate();

  const handleScrollToFeatures = (e) => {
    e.preventDefault();
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-smoke text-on-surface min-h-screen flex flex-col selection:bg-scarlett-red/10 selection:text-scarlett-red overflow-x-hidden">
      {/* Navigation Header */}
      <header className="flex justify-between items-center h-20 px-8 max-w-6xl mx-auto w-full bg-transparent border-b border-charcoal/5 sticky top-0 z-50 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <img
            alt="ShareHouse"
            className="h-12 object-contain"
            src="/logo-light-bg.png"
          />
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/login')}
            className="bg-charcoal hover:bg-scarlett-red text-pure-white px-4 py-2 rounded-lg font-spec-lead font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer hover:shadow-md"
          >
            Log In
          </button>
        </div>
      </header>

      {/* Section 1: Hero Header */}
      <section className="relative pt-20 pb-0 px-6 max-w-6xl mx-auto w-full flex flex-col items-center justify-center overflow-visible">
        <div className="relative w-full pt-12 pb-0 md:pt-16 md:pb-0 flex flex-col items-center justify-center gap-12 overflow-visible">
          
          {/* Centered Content */}
          <div className="w-full max-w-3xl text-center z-10 flex flex-col items-center">
            {/* Top announcement pill */}
            <Reveal delay={50} duration={600}>
              <div className="inline-flex items-center gap-2 bg-scarlett-red/5 border border-scarlett-red/10 px-4 py-1.5 rounded-full font-spec-tagline text-scarlett-red mb-6">
                <span className="w-1.5 h-1.5 bg-scarlett-red rounded-full animate-pulse"></span>
                Sharehouse V2 is Live
              </div>
            </Reveal>
 
            {/* Main Heading */}
            <Reveal delay={150} duration={700}>
              <h1 className="font-spec-title text-charcoal tracking-tight max-w-3xl mb-6 mx-auto leading-tight text-4xl md:text-5xl">
                Share your best <DynamicHeroText /> <br className="hidden sm:inline" />
                with the Hive Mind.
              </h1>
            </Reveal>
 
            {/* Subtitle */}
            <Reveal delay={250} duration={700}>
              <p className="font-spec-lead text-muted-silver max-w-xl mb-8 mx-auto text-base">
                Stop reinventing the wheel. Discover, share, and scale the internal tools that power our most efficient teams across the globe.
              </p>
            </Reveal>
 
            {/* Buttons */}
            <Reveal delay={350} duration={700} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 w-full">
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto bg-scarlett-red hover:bg-opacity-90 text-pure-white px-6 py-3 rounded-lg font-spec-lead font-semibold hover:scale-105 active:scale-95 transition-all shadow-md shadow-scarlett-red/10 cursor-pointer text-center"
              >
                Log In with RTB Account
              </button>
              <a
                href="#features"
                onClick={handleScrollToFeatures}
                className="w-full sm:w-auto border border-border-gray hover:border-charcoal hover:bg-smoke text-charcoal px-6 py-3 rounded-lg font-spec-lead font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-center"
              >
                Learn More
                <span className="material-symbols-outlined text-[10px] font-bold animate-bounce mt-0.5">arrow_downward</span>
              </a>
            </Reveal>
          </div>
 
          {/* Centered Visual Mockup Section - Height capped at 2/3 and faded out smoothly */}
          <Reveal delay={450} duration={800} className="w-full max-w-4xl mx-auto relative px-8 md:px-16 overflow-visible select-none z-10 mt-4">
            <div className="relative w-full h-[140px] sm:h-[180px] md:h-[220px] overflow-hidden px-4 pt-4">
              {/* Browser Mockup Window */}
              <div className="bg-pure-white rounded-t-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-charcoal/10 border-b-0 overflow-hidden ring-1 ring-charcoal/5 relative z-10">
                {/* Window bar */}
                <div className="bg-smoke px-4 py-3 border-b border-charcoal/5 flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  <div className="flex-grow max-w-xs mx-auto bg-pure-white border border-charcoal/5 rounded px-3 py-0.5 font-spec-boilerplate text-muted-silver text-center truncate">
                    sharehouse.rtbhouse.com/dashboard
                  </div>
                </div>
                
                {/* Dashboard Screenshot */}
                <img
                  src="/dashboard-screenshot.png"
                  alt="Sharehouse Dashboard"
                  className="w-full h-auto object-cover object-top"
                />
              </div>

              {/* Smooth Blur Fade Overlay to fade out bottom of section into next section */}
              <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-pure-white via-pure-white/95 to-transparent backdrop-blur-[2px] z-20 pointer-events-none"></div>
            </div>
          </Reveal>
 
        </div>
      </section>
 
      {/* Section 2: Bento Grid Features */}
      <section id="features" className="bg-pure-white relative z-30">
        <div className="max-w-6xl mx-auto px-6 pt-2 pb-28 w-full flex flex-col items-center">
          <Reveal delay={50} duration={600} className="text-center mb-16">
            <span className="font-spec-tagline text-scarlett-red block mb-3">// BUILT FOR RTB HOUSE</span>
            <h2 className="font-spec-title text-charcoal tracking-tight max-w-xl leading-tight">
              Everything you need to work smarter, not harder.
            </h2>
          </Reveal>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Tile 1: Duży (The Internal AppStore) */}
            <Reveal delay={100} duration={700} className="md:col-span-2 bg-smoke p-8 rounded-3xl border border-charcoal/10 hover:border-scarlett-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.04)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group overflow-hidden relative min-h-[360px]">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-scarlett-red/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
              <div className="flex flex-col md:flex-row items-start justify-between gap-8 w-full">
                <div className="flex-grow max-w-md">
                  <div className="w-10 h-10 bg-pure-white border border-charcoal/10 rounded-xl flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-scarlett-red text-base">public</span>
                  </div>
                  <h3 className="font-spec-h1 font-bold text-charcoal mb-3">
                    The Internal AppStore
                  </h3>
                  <p className="font-spec-body text-secondary leading-relaxed">
                    Break down the silos. Discover custom tools, dashboards, and scripts built by your colleagues across all global markets. If it saves time, it belongs here.
                  </p>
                </div>
                
                {/* Visual Node Graph on the Right */}
                <div className="relative w-full md:w-[280px] h-[160px] shrink-0 bg-pure-white/40 rounded-2xl border border-charcoal/5 flex items-center justify-center p-4">
                  {/* SVG connection lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 160">
                    <path d="M 50 80 L 140 80" stroke="#EE4137" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    <path d="M 140 80 L 220 40" stroke="#EE4137" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    <path d="M 140 80 L 220 120" stroke="#EE4137" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                  </svg>
                  {/* Center Node */}
                  <div className="absolute left-[128px] top-[68px] w-6 h-6 bg-scarlett-red rounded-full flex items-center justify-center shadow-lg shadow-scarlett-red/30 z-10 animate-pulse">
                    <span className="material-symbols-outlined text-pure-white text-[12px] font-bold">hub</span>
                  </div>
                  {/* Left Node */}
                  <div className="absolute left-[15px] top-[65px] bg-pure-white border border-charcoal/5 px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 z-10">
                    <span className="material-symbols-outlined text-[10px] text-blue-500">groups</span>
                    <span className="text-[9px] font-bold font-spec-name text-charcoal">Local Teams</span>
                  </div>
                  {/* Right Top Node */}
                  <div className="absolute right-[15px] top-[25px] bg-pure-white border border-charcoal/5 px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 z-10">
                    <span className="material-symbols-outlined text-[10px] text-green-500">language</span>
                    <span className="text-[9px] font-bold font-spec-name text-charcoal">Global Ops</span>
                  </div>
                  {/* Right Bottom Node */}
                  <div className="absolute right-[15px] top-[105px] bg-pure-white border border-charcoal/5 px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 z-10">
                    <span className="material-symbols-outlined text-[10px] text-purple-500">campaign</span>
                    <span className="text-[9px] font-bold font-spec-name text-charcoal">Marketing</span>
                  </div>
                </div>
              </div>
            </Reveal>
 
            {/* Tile 2: Mały (Works Where You Work) */}
            <Reveal delay={150} duration={700} className="bg-smoke p-8 rounded-3xl border border-charcoal/10 hover:border-scarlett-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.04)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group min-h-[360px]">
              <div>
                <div className="w-10 h-10 bg-pure-white border border-charcoal/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-scarlett-red text-base">settings_input_component</span>
                </div>
                <h3 className="font-spec-h1 font-bold text-charcoal mb-3">
                  Works Where You Work
                </h3>
                <p className="font-spec-body text-secondary leading-relaxed">
                  From Google Workspace to Slack and Asana. Share solutions for any platform.
                </p>
              </div>
 
              {/* Radial Connectors Graph */}
              <div className="relative h-[140px] w-full bg-pure-white/40 rounded-2xl border border-charcoal/5 flex items-center justify-center overflow-hidden mt-6">
                <div className="absolute w-24 h-24 rounded-full border border-dashed border-charcoal/15 animate-spin" style={{ animationDuration: '25s' }}></div>
                <div className="absolute w-10 h-10 bg-scarlett-red/10 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-scarlett-red text-base font-bold">settings_input_component</span>
                </div>
                {/* Outer badge nodes */}
                <div className="absolute left-[20px] top-[20px] w-8 h-8 bg-pure-white border border-charcoal/5 rounded-full flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-sm text-[#4A154B] font-bold">chat</span>
                </div>
                <div className="absolute right-[20px] top-[20px] w-8 h-8 bg-pure-white border border-charcoal/5 rounded-full flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-sm text-[#1F70C1] font-bold">cloud</span>
                </div>
                <div className="absolute left-[30px] bottom-[20px] w-8 h-8 bg-pure-white border border-charcoal/5 rounded-full flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-sm text-[#EE4137] font-bold">schedule</span>
                </div>
                <div className="absolute right-[30px] bottom-[20px] w-8 h-8 bg-pure-white border border-charcoal/5 rounded-full flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-sm text-green-600 font-bold">task_alt</span>
                </div>
              </div>
            </Reveal>
 
            {/* Tile 3: Średni (AI-Powered Auto-Docs) */}
            <Reveal delay={200} duration={700} className="bg-smoke p-8 rounded-3xl border border-charcoal/10 hover:border-scarlett-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.04)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group min-h-[300px]">
              <div>
                <div className="w-10 h-10 bg-pure-white border border-charcoal/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-scarlett-red text-base">auto_awesome</span>
                </div>
                <h3 className="font-spec-h1 font-bold text-charcoal mb-3">
                  AI-Powered Auto-Docs
                </h3>
                <p className="font-spec-body text-secondary leading-relaxed">
                  Sharing is effortless. Just drop your code or link, and our AI instantly generates clear, universally understandable documentation for everyone.
                </p>
              </div>
              
              {/* Interactive document generator illustration */}
              <div className="mt-6 bg-pure-white border border-charcoal/5 rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col gap-2 min-h-[120px]">
                <div className="flex justify-between items-center pb-2 border-b border-charcoal/5">
                  <span className="font-mono text-[8px] text-muted-silver">document_generator.py</span>
                  <span className="bg-green-50 text-green-600 font-spec-tagline px-1.5 py-0.5 rounded border border-green-100 flex items-center gap-0.5 scale-95">
                    <span className="material-symbols-outlined text-[9px] font-bold">check_circle</span>AI DOCS READY
                  </span>
                </div>
                <div className="flex gap-2 items-center mt-1">
                  <div className="flex-1 font-mono text-[7px] text-muted-silver text-left bg-smoke p-1.5 rounded border border-charcoal/5">
                    <p className="text-blue-600">def parse(data):</p>
                    <p className="pl-2 text-charcoal">return [x for x in data if x.error]</p>
                  </div>
                  <div className="w-[12px] shrink-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-scarlett-red text-xs animate-pulse">arrow_forward</span>
                  </div>
                  <div className="flex-1 font-spec-body text-[8px] text-secondary text-left bg-red-50/20 p-1.5 rounded border border-scarlett-red/10">
                    <p className="font-bold text-charcoal mb-0.5">Summary:</p>
                    <p className="leading-tight">Filters arrays to extract items with errors.</p>
                  </div>
                </div>
              </div>
            </Reveal>
 
            {/* Tile 4: Średni (Prompt Database) */}
            <Reveal delay={250} duration={700} className="bg-smoke p-8 rounded-3xl border border-charcoal/10 hover:border-scarlett-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.04)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group min-h-[300px]">
              <div>
                <div className="w-10 h-10 bg-pure-white border border-charcoal/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-scarlett-red text-base">psychology</span>
                </div>
                <h3 className="font-spec-h1 font-bold text-charcoal mb-3">
                  Prompt Database
                </h3>
                <p className="font-spec-body text-secondary leading-relaxed">
                  Master your AI workflow. Access a searchable, curated library of highly-tuned prompts for Claude, Gemini, and more, categorized by department.
                </p>
              </div>
 
              {/* Premium Input & Tags Layout */}
              <div className="mt-6 bg-pure-white border border-charcoal/5 rounded-2xl p-4 shadow-sm flex flex-col gap-3 min-h-[120px]">
                <div className="flex items-center gap-2 bg-smoke border border-charcoal/5 rounded-lg px-2 py-1 flex-grow">
                  <span className="material-symbols-outlined text-muted-silver text-xs">search</span>
                  <span className="text-[9px] text-muted-silver flex-grow text-left">Search prompt library...</span>
                  <span className="bg-charcoal/5 text-charcoal/60 font-mono text-[7px] px-1 py-0.5 rounded">Ctrl + K</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1 justify-start">
                  <span className="bg-purple-50 text-purple-600 border border-purple-100 font-spec-tagline px-2 py-0.5 rounded-full shadow-sm text-[7px] flex items-center gap-0.5">
                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>Claude
                  </span>
                  <span className="bg-blue-50 text-blue-600 border border-blue-100 font-spec-tagline px-2 py-0.5 rounded-full shadow-sm text-[7px] flex items-center gap-0.5">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>Gemini
                  </span>
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 font-spec-tagline px-2 py-0.5 rounded-full shadow-sm text-[7px] flex items-center gap-0.5">
                    <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>Marketing
                  </span>
                </div>
              </div>
            </Reveal>
 
            {/* Tile 5: Mały (Climb the Leaderboard) */}
            <Reveal delay={300} duration={700} className="bg-smoke p-8 rounded-3xl border border-charcoal/10 hover:border-scarlett-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.04)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group min-h-[300px]">
              <div>
                <div className="w-10 h-10 bg-pure-white border border-charcoal/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-scarlett-red text-base">workspace_premium</span>
                </div>
                <h3 className="font-spec-h1 font-bold text-charcoal mb-3">
                  Climb the Leaderboard
                </h3>
                <p className="font-spec-body text-secondary leading-relaxed">
                  Earn badges, collect upvotes, and get recognized company-wide for your efficiency hacks.
                </p>
              </div>
 
              {/* Leaderboard High-Fidelity List */}
              <div className="mt-6 flex flex-col gap-2 w-full bg-pure-white/40 rounded-2xl border border-charcoal/5 p-3">
                <div className="flex items-center justify-between bg-pure-white border border-charcoal/5 rounded-xl px-2.5 py-1 shadow-sm scale-[0.98]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center font-spec-position font-bold text-charcoal text-[8px]">1</div>
                    <img src="/avatars/sarah.png" className="w-5 h-5 rounded-full object-cover" alt="Sarah" />
                    <span className="text-[9px] font-bold font-spec-name text-charcoal">Sarah J.</span>
                  </div>
                  <span className="text-[8px] font-spec-tagline text-scarlett-red font-bold">2,450 XP</span>
                </div>
                <div className="flex items-center justify-between bg-pure-white border border-charcoal/5 rounded-xl px-2.5 py-1 shadow-sm scale-[0.98]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-spec-position font-bold text-charcoal text-[8px]">2</div>
                    <img src="/avatars/david.png" className="w-5 h-5 rounded-full object-cover" alt="David" />
                    <span className="text-[9px] font-bold font-spec-name text-charcoal">David M.</span>
                  </div>
                  <span className="text-[8px] font-spec-tagline text-muted-silver">1,920 XP</span>
                </div>
                <div className="flex items-center justify-between bg-pure-white border border-charcoal/5 rounded-xl px-2.5 py-1 shadow-sm scale-[0.98]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-amber-700 border border-amber-800 flex items-center justify-center font-spec-position font-bold text-pure-white text-[8px]">3</div>
                    <img src="/avatars/emily.png" className="w-5 h-5 rounded-full object-cover" alt="Emily" />
                    <span className="text-[9px] font-bold font-spec-name text-charcoal">Emily R.</span>
                  </div>
                  <span className="text-[8px] font-spec-tagline text-muted-silver">1,680 XP</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
 
      {/* Section 3: CTA Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full flex flex-col items-center justify-center overflow-visible">
        <Reveal delay={50} duration={700} className="w-full">
          <div className="w-full bg-gradient-to-br from-indigo-50/40 via-pure-white to-red-50/20 py-16 px-8 rounded-3xl border border-charcoal/10 relative overflow-hidden flex flex-col items-center text-center shadow-[0_15px_30px_rgba(0,0,0,0.02)]">
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_var(--color-scarlett-red)_0%,_transparent_60%)] filter blur-3xl z-0"></div>

            {/* Central icon/badge */}
            <div className="relative z-10 inline-flex items-center gap-1.5 bg-pure-white border border-charcoal/10 rounded-full px-3.5 py-1.5 text-[9px] font-spec-tagline text-charcoal shadow-sm mb-6 hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-[10px] text-amber-500 font-bold">diamond</span>
              Built for RTB House
            </div>

            {/* Floating circular badges */}
            <div className="absolute left-[12%] top-[25%] hidden md:flex w-10 h-10 bg-pure-white border border-charcoal/5 rounded-full items-center justify-center shadow-sm text-scarlett-red hover:scale-110 transition-transform duration-300 pointer-events-none">
              <span className="material-symbols-outlined text-sm font-bold">campaign</span>
            </div>
            <div className="absolute left-[6%] bottom-[25%] hidden md:flex w-10 h-10 bg-pure-white border border-charcoal/5 rounded-full items-center justify-center shadow-sm text-blue-500 hover:scale-110 transition-transform duration-300 pointer-events-none">
              <span className="material-symbols-outlined text-sm font-bold">code</span>
            </div>
            <div className="absolute right-[10%] top-[30%] hidden md:flex w-10 h-10 bg-pure-white border border-charcoal/5 rounded-full items-center justify-center shadow-sm text-[#4A154B] hover:scale-110 transition-transform duration-300 pointer-events-none">
              <span className="material-symbols-outlined text-sm font-bold">chat</span>
            </div>
            <div className="absolute right-[16%] bottom-[20%] hidden md:flex w-10 h-10 bg-pure-white border border-charcoal/5 rounded-full items-center justify-center shadow-sm text-green-600 hover:scale-110 transition-transform duration-300 pointer-events-none">
              <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
            </div>

            {/* Heading and Content */}
            <h2 className="relative z-10 font-spec-title text-charcoal font-bold tracking-tight mb-4 text-3xl md:text-4xl max-w-lg leading-tight">
              Ready to join the hive mind?
            </h2>
            <p className="relative z-10 font-spec-lead text-muted-silver max-w-md mb-8 text-sm">
              Discover, share, and scale the internal tools that power our most efficient teams across the globe.
            </p>

            {/* Action Button */}
            <button
              onClick={() => navigate('/login')}
              className="relative z-10 bg-scarlett-red hover:bg-opacity-90 text-pure-white px-8 py-3 rounded-lg font-spec-lead font-semibold hover:scale-105 active:scale-95 transition-all shadow-md shadow-scarlett-red/10 cursor-pointer text-center"
            >
              Log In with RTB Account
            </button>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="bg-smoke border-t border-charcoal/5 py-12 text-center font-spec-boilerplate text-muted-silver">
        <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Sharehouse. Internal Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-scarlett-red transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-scarlett-red transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-scarlett-red transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
