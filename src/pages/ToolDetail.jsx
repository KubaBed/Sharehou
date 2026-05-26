import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import { api } from '../services/api';

const ToolDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getToolById(id)
      .then(data => {
        setTool(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(`Failed to load tool detail for ${id}:`, err);
        setLoading(false);
      });
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-smoke text-on-surface h-screen overflow-hidden flex w-full">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:ml-[280px] w-full max-w-[calc(100%-280px)] h-screen bg-smoke">
        <Header />
        
        {/* Page Content */}
        <main className="flex-grow overflow-y-auto px-8 py-8 hide-scrollbar flex flex-col">
          <div className="max-w-[1280px] mx-auto w-full">
            {loading ? (
              <div className="py-40 flex flex-col items-center justify-center text-muted-silver gap-3">
                <span className="material-symbols-outlined text-4xl animate-spin text-scarlett-red">progress_activity</span>
                <span className="font-body text-sm font-medium">Loading tool details...</span>
              </div>
            ) : (
              <>
                {/* Breadcrumbs */}
                <div className="mb-6 flex items-center gap-2 text-xs text-muted-silver font-semibold">
                  <Link to="/dashboard" className="hover:text-scarlett-red">Explore</Link>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  <span className="text-charcoal">{tool.subtitle}</span>
                </div>

            {/* Header info */}
            <Reveal delay={50} duration={600}>
              <div className="bg-pure-white p-8 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                  <span className="bg-scarlett-red/10 text-scarlett-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
                    {tool.category}
                  </span>
                  <h2 className="font-headline text-2xl font-bold text-charcoal mt-3 mb-2">{tool.title}</h2>
                  <p className="font-body text-sm text-secondary">{tool.subtitle} — Shared by {tool.author}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleCopyLink}
                    className={`px-5 py-2.5 rounded-lg font-label text-xs font-semibold border flex items-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 ${
                      copied
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : 'bg-pure-white border-border-light hover:bg-smoke text-charcoal hover:border-charcoal/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copied ? 'check' : 'share'}
                    </span>
                    {copied ? 'Link Copied' : 'Share Link'}
                  </button>
                  <button className="bg-scarlett-red hover:bg-[#d8352b] text-pure-white px-6 py-2.5 rounded-lg font-label text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-scarlett-red/10">
                    <span className="material-symbols-outlined text-sm">download</span>
                    Download Template
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Main Details Layout (2 columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Details */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Overview Card */}
                <Reveal delay={100} duration={600}>
                  <div className="bg-pure-white p-8 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <h3 className="font-headline text-lg font-bold text-charcoal mb-4 border-b border-[#f0f0f0] pb-2">Overview</h3>
                    <p className="font-body text-sm text-secondary leading-relaxed">
                      {tool.description}
                    </p>

                    <h3 className="font-headline text-base font-bold text-charcoal mt-8 mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {tool.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-secondary leading-relaxed hover:translate-x-1 transition-transform duration-200">
                          <span className="material-symbols-outlined text-scarlett-red text-sm mt-0.5">check</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                {/* Installation Card */}
                <Reveal delay={200} duration={600}>
                  <div className="bg-pure-white p-8 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <h3 className="font-headline text-lg font-bold text-charcoal mb-4 border-b border-[#f0f0f0] pb-2">Installation Steps</h3>
                    <ol className="space-y-4">
                      {tool.installation.map((step, i) => (
                        <li key={i} className="flex gap-4 items-start text-sm text-secondary leading-relaxed hover:translate-x-1 transition-transform duration-200">
                          <div className="w-6 h-6 rounded-full bg-scarlett-red/10 text-scarlett-red font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>

              </div>

              {/* Right Column: Sidebar Bento info */}
              <div className="space-y-8">
                
                {/* Impact Metrics Card */}
                <Reveal delay={150} duration={600}>
                  <div className="bg-pure-white p-6 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <h3 className="font-headline text-base font-bold text-charcoal mb-4 border-b border-[#f0f0f0] pb-2">Impact Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-smoke p-4 rounded-xl text-center hover:scale-105 transition-transform duration-200">
                        <p className="font-headline text-2xl font-bold text-scarlett-red">{tool.hoursSaved.split(' ')[0]}</p>
                        <p className="text-[10px] text-muted-silver font-semibold mt-1">Est. Hours Saved</p>
                      </div>
                      <div className="bg-smoke p-4 rounded-xl text-center hover:scale-105 transition-transform duration-200">
                        <p className="font-headline text-2xl font-bold text-charcoal">{tool.likes}</p>
                        <p className="text-[10px] text-muted-silver font-semibold mt-1">Total Likes</p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Technical Specs Card */}
                <Reveal delay={250} duration={600}>
                  <div className="bg-pure-white p-6 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <h3 className="font-headline text-base font-bold text-charcoal mb-4 border-b border-[#f0f0f0] pb-2">Technical Specs</h3>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between py-1 border-b border-[#f5f5f5]">
                        <span className="text-muted-silver">Platform:</span>
                        <span className="font-bold text-charcoal">{tool.specs.platform}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#f5f5f5]">
                        <span className="text-muted-silver">Creator:</span>
                        <span className="font-bold text-charcoal">{tool.specs.author}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#f5f5f5]">
                        <span className="text-muted-silver">Last Updated:</span>
                        <span className="font-bold text-charcoal">{tool.specs.lastUpdated}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-silver">License:</span>
                        <span className="font-bold text-charcoal">{tool.specs.license}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Creator Profile Summary */}
                <Reveal delay={350} duration={600}>
                  <div className="bg-pure-white p-6 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-center">
                    <img
                      className="w-16 h-16 rounded-full object-cover border border-border-light mx-auto mb-4 hover:scale-105 transition-transform duration-300"
                      src={tool.authorAvatar}
                      alt={tool.author}
                    />
                    <h4 className="font-headline text-base font-bold text-charcoal">{tool.author}</h4>
                    <p className="text-xs text-muted-silver mt-1">{tool.authorTitle}</p>
                    <div className="border-t border-[#f0f0f0] pt-4 mt-4">
                      <Link to="/profile" className="text-scarlett-red font-label text-sm font-semibold hover:underline">
                        View Creator Profile
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  </div>
</div>
  );
};

export default ToolDetail;
