import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

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
            className="h-7 object-contain"
            src="/logo-light-bg.png"
          />
        </Link>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/login')}
            className="bg-charcoal hover:bg-scarlett-red text-pure-white px-5 py-2 rounded-lg font-label text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer hover:shadow-md"
          >
            Log In
          </button>
        </div>
      </header>

      {/* Section 1: Hero Header */}
      <section className="relative flex flex-col items-center justify-center pt-20 pb-32 px-6 text-center max-w-6xl mx-auto w-full min-h-[85vh]">
        {/* Top announcement pill */}
        <Reveal delay={50} duration={600}>
          <div className="inline-flex items-center gap-2 bg-scarlett-red/5 border border-scarlett-red/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-scarlett-red uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 bg-scarlett-red rounded-full animate-pulse"></span>
            Sharehouse V2 is Live
          </div>
        </Reveal>

        {/* Main Heading */}
        <Reveal delay={150} duration={700}>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-extrabold text-charcoal tracking-tight max-w-4xl leading-[1.1] mb-6">
            Your internal marketplace<br />
            for everyday efficiency.
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={250} duration={700}>
          <p className="font-body text-base md:text-lg text-muted-silver max-w-2xl leading-relaxed mb-8">
            Stop reinventing the wheel. Discover, share, and scale the internal tools that power our most efficient teams across the globe.
          </p>
        </Reveal>

        {/* Buttons */}
        <Reveal delay={350} duration={700} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={() => navigate('/login')}
            className="bg-scarlett-red hover:bg-[#d8352b] text-pure-white px-8 py-3.5 rounded-lg font-label text-sm font-semibold hover:scale-105 active:scale-95 transition-all shadow-md shadow-scarlett-red/10 cursor-pointer"
          >
            Log In with RTB Account
          </button>
          <a
            href="#features"
            onClick={handleScrollToFeatures}
            className="border border-border-gray hover:border-charcoal hover:bg-smoke text-charcoal px-8 py-3.5 rounded-lg font-label text-sm font-semibold hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            Learn More
            <span className="material-symbols-outlined text-sm font-bold animate-bounce mt-0.5">arrow_downward</span>
          </a>
        </Reveal>

        {/* Visual Mockup Section overlaying Scene 5 */}
        <Reveal delay={450} duration={800} className="w-full relative max-w-4xl mx-auto mt-6">
          {/* Static Background WebP Gradient Grid */}
          <div 
            className="absolute top-1/2 left-1/2 w-[240%] h-[240%] pointer-events-none z-0 overflow-visible flex items-center justify-center opacity-85"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <img
              src="/hero-gradient-pattern.webp"
              alt="Decorative background grid"
              className="w-full h-full object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>


          {/* Browser Mockup Window */}
          <div className="relative bg-pure-white rounded-2xl border border-charcoal/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden z-10 select-none transform hover:scale-[1.01] transition-transform duration-300">
            {/* Window bar */}
            <div className="bg-smoke px-4 py-3 border-b border-charcoal/5 flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
              <div className="flex-grow max-w-xs mx-auto bg-pure-white border border-charcoal/5 rounded px-3 py-0.5 text-[10px] text-muted-silver text-center truncate">
                sharehouse.rtbhouse.com/dashboard
              </div>
            </div>
            
            {/* Dashboard Screenshot */}
            <div className="w-full overflow-hidden">
              <img
                src="/dashboard-screenshot.png"
                alt="Sharehouse Dashboard"
                className="w-full h-auto object-cover block"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Section 2: Bento Grid Features */}
      <section id="features" className="bg-pure-white border-t border-charcoal/5">
        <div className="max-w-6xl mx-auto px-6 py-28 w-full flex flex-col items-center">
          <Reveal delay={50} duration={600} className="text-center mb-16">
            <span className="text-xs font-bold text-scarlett-red uppercase tracking-widest block mb-3">// BUILT FOR RTB HOUSE</span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-charcoal tracking-tight max-w-xl leading-tight">
              Everything you need to work smarter, not harder.
            </h2>
          </Reveal>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Tile 1: Duży (The Internal AppStore) */}
            <Reveal delay={100} duration={700} className="md:col-span-2 bg-smoke p-8 rounded-3xl border border-charcoal/10 hover:border-scarlett-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.04)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group overflow-hidden relative min-h-[340px]">
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-scarlett-red/5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
              <div>
                <div className="w-10 h-10 bg-pure-white border border-charcoal/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-scarlett-red">public</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-charcoal mb-3">
                  The Internal AppStore <span className="inline-block hover:animate-spin">🌍</span>
                </h3>
                <p className="font-body text-sm text-secondary leading-relaxed max-w-xl">
                  Break down the silos. Discover custom tools, dashboards, and scripts built by your colleagues across all global markets. If it saves time, it belongs here.
                </p>
              </div>
              
              {/* Mini cards floating */}
              <div className="mt-8 flex gap-4 overflow-hidden relative w-full opacity-90">
                <div className="bg-pure-white border border-charcoal/5 px-4 py-3 rounded-xl flex items-center gap-3 shrink-0 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="material-symbols-outlined text-xs bg-red-50 text-scarlett-red p-1 rounded">dashboard</span>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-charcoal">QBR Tracker</p>
                    <p className="text-[8px] text-muted-silver">Marketing</p>
                  </div>
                </div>
                <div className="bg-pure-white border border-charcoal/5 px-4 py-3 rounded-xl flex items-center gap-3 shrink-0 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="material-symbols-outlined text-xs bg-red-50 text-scarlett-red p-1 rounded">code</span>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-charcoal">Log Parser</p>
                    <p className="text-[8px] text-muted-silver">IT Platform</p>
                  </div>
                </div>
                <div className="bg-pure-white border border-charcoal/5 px-4 py-3 rounded-xl flex items-center gap-3 shrink-0 shadow-sm transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                  <span className="material-symbols-outlined text-xs bg-red-50 text-scarlett-red p-1 rounded">chat_bubble</span>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-charcoal">B2B emailer</p>
                    <p className="text-[8px] text-muted-silver">Sales Ops</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Tile 4: Mały (Works Where You Work) */}
            <Reveal delay={150} duration={700} className="bg-smoke p-8 rounded-3xl border border-charcoal/10 hover:border-scarlett-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.04)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group min-h-[340px]">
              <div>
                <div className="w-10 h-10 bg-pure-white border border-charcoal/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-scarlett-red">settings_input_component</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-charcoal mb-3">
                  Works Where You Work 🛠️
                </h3>
                <p className="font-body text-xs text-secondary leading-relaxed">
                  From Google Workspace to Slack and Asana. Share solutions for any platform.
                </p>
              </div>

              {/* Platform icon badges layout */}
              <div className="mt-8 flex flex-wrap gap-2">
                {['Slack', 'Asana', 'Google', 'Jira', 'Teams'].map((p) => (
                  <span key={p} className="bg-pure-white border border-charcoal/5 text-charcoal text-[10px] font-bold font-label px-3 py-1 rounded-lg shadow-sm">
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Tile 2: Średni (AI-Powered Auto-Docs) */}
            <Reveal delay={200} duration={700} className="bg-smoke p-8 rounded-3xl border border-charcoal/10 hover:border-scarlett-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.04)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group min-h-[300px]">
              <div>
                <div className="w-10 h-10 bg-pure-white border border-charcoal/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-scarlett-red">auto_awesome</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-charcoal mb-3">
                  AI-Powered Auto-Docs 🤖
                </h3>
                <p className="font-body text-xs text-secondary leading-relaxed">
                  Sharing is effortless. Just drop your code or link, and our AI instantly generates clear, universally understandable documentation for everyone.
                </p>
              </div>
              
              {/* Code document preview mock */}
              <div className="mt-6 bg-pure-white border border-charcoal/5 rounded-xl p-3 shadow-sm font-mono text-[9px] text-muted-silver text-left overflow-hidden max-h-[70px] relative">
                <span className="absolute right-2 top-2 bg-green-50 text-green-600 text-[8px] font-bold font-label px-1.5 py-0.5 rounded border border-green-100 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[9px] font-bold">check</span>Doc Ready
                </span>
                <p className="text-charcoal font-semibold">// Autogenerated by Sharehouse</p>
                <p className="mt-1">const parseLogs = (data) =&gt; &#123;</p>
                <p className="pl-2">return data.filter(log =&gt; log.error);</p>
                <p>&#125;;</p>
              </div>
            </Reveal>

            {/* Tile 3: Średni (Prompt Database) */}
            <Reveal delay={250} duration={700} className="bg-smoke p-8 rounded-3xl border border-charcoal/10 hover:border-scarlett-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.04)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group min-h-[300px]">
              <div>
                <div className="w-10 h-10 bg-pure-white border border-charcoal/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-scarlett-red">psychology</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-charcoal mb-3">
                  Prompt Database ✨
                </h3>
                <p className="font-body text-xs text-secondary leading-relaxed">
                  Master your AI workflow. Access a searchable, curated library of highly-tuned prompts for Claude, Gemini, and more, categorized by department.
                </p>
              </div>

              {/* Tag badges */}
              <div className="mt-6 flex flex-wrap gap-1.5 justify-start">
                <span className="bg-pure-white border border-charcoal/5 text-purple-600 text-[9px] font-bold font-label px-2.5 py-0.5 rounded-full shadow-sm">#Claude</span>
                <span className="bg-pure-white border border-charcoal/5 text-blue-600 text-[9px] font-bold font-label px-2.5 py-0.5 rounded-full shadow-sm">#Gemini</span>
                <span className="bg-pure-white border border-charcoal/5 text-charcoal text-[9px] font-bold font-label px-2.5 py-0.5 rounded-full shadow-sm">#Marketing</span>
              </div>
            </Reveal>

            {/* Tile 5: Mały (Climb the Leaderboard) */}
            <Reveal delay={300} duration={700} className="bg-smoke p-8 rounded-3xl border border-charcoal/10 hover:border-scarlett-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_30px_rgba(230,0,0,0.04)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group min-h-[300px]">
              <div>
                <div className="w-10 h-10 bg-pure-white border border-charcoal/10 rounded-xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-scarlett-red">workspace_premium</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-charcoal mb-3">
                  Climb the Leaderboard 🏆
                </h3>
                <p className="font-body text-xs text-secondary leading-relaxed">
                  Earn badges, collect upvotes, and get recognized company-wide for your efficiency hacks.
                </p>
              </div>

              {/* Podium visual mock */}
              <div className="mt-6 flex justify-around items-end h-16 border-b border-charcoal/5 pb-1">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[10px] font-bold mb-1 shadow-sm">#2</div>
                  <div className="w-9 h-6 bg-slate-300 rounded-t-lg shadow-inner"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-[10px] font-bold mb-1 shadow-sm">#1</div>
                  <div className="w-9 h-10 bg-amber-500 rounded-t-lg shadow-inner"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-amber-600 border border-amber-700 flex items-center justify-center text-[10px] font-bold mb-1 text-pure-white shadow-sm">#3</div>
                  <div className="w-9 h-4 bg-amber-700 rounded-t-lg shadow-inner"></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-smoke border-t border-charcoal/5 py-12 text-center text-xs text-muted-silver">
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
