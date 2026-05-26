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
  const [commentText, setCommentText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

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

  const handleDeploy = () => {
    if (tool.category === 'Prompts') {
      navigator.clipboard.writeText(tool.text || '');
      setToastMessage('Prompt copied to clipboard!');
      setTimeout(() => setToastMessage(''), 3000);
    }
    
    api.incrementUses(tool.id)
      .then(res => {
        if (res.success) {
          setTool(prev => ({ ...prev, uses: res.uses }));
          if (tool.category !== 'Prompts') {
            setToastMessage(`Successfully registered deploy for ${tool.title}!`);
            setTimeout(() => setToastMessage(''), 3000);
          }
        }
      })
      .catch(err => {
        console.error('Failed to increment uses:', err);
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    api.addComment(tool.id, commentText)
      .then(updatedComments => {
        setTool(prev => ({ ...prev, comments: updatedComments }));
        setCommentText('');
        setToastMessage('Comment posted successfully!');
        setTimeout(() => setToastMessage(''), 3000);
      })
      .catch(err => {
        console.error('Failed to post comment:', err);
      });
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
                <div className="mb-6 flex items-center gap-2 font-spec-tagline text-muted-silver">
                  <Link to="/dashboard" className="hover:text-scarlett-red">Explore</Link>
                  <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                  <span className="text-charcoal">{tool.subtitle}</span>
                </div>

                {/* Header info */}
                <Reveal delay={50} duration={600}>
                  <div className="bg-pure-white p-8 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                      <span className="bg-scarlett-red/10 text-scarlett-red px-3 py-1 rounded-full font-spec-tagline">
                        {tool.category}
                      </span>
                      <h2 className="font-spec-title text-charcoal mt-3 mb-2">{tool.title}</h2>
                      <p className="font-spec-lead text-secondary">{tool.subtitle} — Shared by {tool.author}</p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={handleCopyLink}
                        className={`px-4 py-2 rounded-lg font-spec-lead font-semibold border flex items-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 ${
                          copied
                            ? 'bg-green-100 border-green-300 text-green-700 font-bold'
                            : 'bg-pure-white border-border-light hover:bg-smoke text-charcoal hover:border-charcoal/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xs">
                          {copied ? 'check' : 'share'}
                        </span>
                        {copied ? 'Link Copied' : 'Share Link'}
                      </button>
                      <button 
                        onClick={handleDeploy}
                        className="bg-scarlett-red hover:bg-opacity-90 text-pure-white px-5 py-2 rounded-lg font-spec-lead font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-scarlett-red/10 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-xs">
                          {tool.category === 'Prompts' ? 'content_copy' : tool.category === 'Templates' ? 'download' : 'rocket_launch'}
                        </span>
                        {tool.category === 'Prompts' ? 'Copy Prompt' : tool.category === 'Templates' ? 'Download Template' : 'Deploy Recipe'}
                      </button>
                    </div>
                  </div>
                </Reveal>

                {/* Main Details Layout (2 columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column: Details & Comments */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* Overview Card */}
                    <Reveal delay={100} duration={600}>
                      <div className="bg-pure-white p-8 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <h3 className="font-spec-h2 font-bold text-charcoal mb-4 border-b border-[#f0f0f0] pb-2">Overview</h3>
                        <p className="font-spec-body text-secondary leading-relaxed mb-6">
                          {tool.description}
                        </p>

                        {tool.category === 'Prompts' && tool.text && (
                          <div className="mb-6">
                            <div className="flex justify-between items-center bg-charcoal text-pure-white px-4 py-2 rounded-t-xl font-spec-tagline font-bold">
                              <span>PROMPT TEMPLATE</span>
                              <button 
                                onClick={handleDeploy} 
                                className="flex items-center gap-1 hover:text-scarlett-red transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-xs">content_copy</span>
                                Copy Prompt
                              </button>
                            </div>
                            <pre className="bg-pitch-black text-muted-silver p-4 rounded-b-xl font-spec-body font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed border border-charcoal/20">
                              {tool.text}
                            </pre>
                          </div>
                        )}

                        <h3 className="font-spec-h2 font-bold text-charcoal mt-8 mb-4">Key Features</h3>
                        <ul className="space-y-3">
                          {tool.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5 font-spec-body text-secondary leading-relaxed hover:translate-x-1 transition-transform duration-200">
                              <span className="material-symbols-outlined text-scarlett-red text-xs mt-0.5">check</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>

                    {/* Installation Card */}
                    <Reveal delay={200} duration={600}>
                      <div className="bg-pure-white p-8 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <h3 className="font-spec-h2 font-bold text-charcoal mb-4 border-b border-[#f0f0f0] pb-2">Installation Steps</h3>
                        <ol className="space-y-4">
                          {tool.installation.map((step, i) => (
                            <li key={i} className="flex gap-4 items-start font-spec-body text-secondary leading-relaxed hover:translate-x-1 transition-transform duration-200">
                              <div className="w-6 h-6 rounded-full bg-scarlett-red/10 text-scarlett-red font-bold font-spec-lead flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </div>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </Reveal>

                    {/* Comments Section */}
                    <Reveal delay={300} duration={600}>
                      <div className="bg-pure-white p-8 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <h3 className="font-spec-h2 font-bold text-charcoal mb-6 border-b border-[#f0f0f0] pb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-muted-silver text-base">forum</span>
                          Comments ({tool.comments?.length || 0})
                        </h3>
                        
                        {/* Add Comment Form */}
                        <form onSubmit={handleCommentSubmit} className="mb-8">
                          <div className="flex gap-4 items-start">
                            <img className="w-9 h-9 rounded-full border border-border-gray object-cover shrink-0" src="/avatars/alex.png" alt="Current User" />
                            <div className="flex-grow">
                              <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Add a constructive comment..."
                                rows="3"
                                className="w-full bg-smoke border border-border-light rounded-xl p-3 font-spec-body focus:ring-2 focus:ring-scarlett-red focus:border-transparent outline-none resize-none transition-all duration-300 placeholder:text-muted-silver"
                                required
                              />
                              <div className="flex justify-end mt-2">
                                <button
                                  type="submit"
                                  className="bg-charcoal hover:bg-scarlett-red text-pure-white px-4 py-2 rounded-lg font-spec-lead font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                                >
                                  Post Comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        
                        {/* Comments List */}
                        <div className="space-y-6">
                          {!tool.comments || tool.comments.length === 0 ? (
                            <p className="font-spec-body text-muted-silver italic text-center py-6">No comments yet. Be the first to share your thoughts!</p>
                          ) : (
                            tool.comments.map((comment) => (
                              <div key={comment.id} className="flex gap-4 items-start border-b border-[#fcfcfc] pb-6 last:border-0 last:pb-0 hover:translate-x-0.5 transition-transform duration-200">
                                <img className="w-9 h-9 rounded-full border border-border-gray object-cover shrink-0" src={comment.avatar || '/avatars/alex.png'} alt={comment.author} />
                                <div className="flex-grow min-w-0">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <h4 className="font-spec-name font-bold text-charcoal">{comment.author}</h4>
                                    <span className="font-spec-tagline text-muted-silver">{comment.date}</span>
                                  </div>
                                  <p className="font-spec-body text-secondary leading-relaxed whitespace-pre-line">
                                    {comment.text}
                                  </p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </Reveal>

                  </div>

                  {/* Right Column: Sidebar Bento info */}
                  <div className="space-y-8">
                    
                    {/* Impact Metrics Card */}
                    <Reveal delay={150} duration={600}>
                      <div className="bg-pure-white p-6 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <h3 className="font-spec-h2 font-bold text-charcoal mb-4 border-b border-[#f0f0f0] pb-2">Impact Metrics</h3>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-smoke p-3 rounded-xl text-center hover:scale-105 transition-transform duration-200">
                            <p className="font-spec-number text-scarlett-red">{String(tool.hoursSaved).split(' ')[0]}</p>
                            <p className="font-spec-no-caption text-muted-silver mt-1">Est. Hours Saved</p>
                          </div>
                          <div className="bg-smoke p-3 rounded-xl text-center hover:scale-105 transition-transform duration-200">
                            <p className="font-spec-number text-charcoal">{tool.likes}</p>
                            <p className="font-spec-no-caption text-muted-silver mt-1">Total Likes</p>
                          </div>
                          <div className="bg-smoke p-3 rounded-xl text-center hover:scale-105 transition-transform duration-200">
                            <p className="font-spec-number text-charcoal">{tool.uses || 0}</p>
                            <p className="font-spec-no-caption text-muted-silver mt-1">Total Uses</p>
                          </div>
                        </div>
                      </div>
                    </Reveal>

                    {/* Technical Specs Card */}
                    <Reveal delay={250} duration={600}>
                      <div className="bg-pure-white p-6 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                        <h3 className="font-spec-h2 font-bold text-charcoal mb-4 border-b border-[#f0f0f0] pb-2">Technical Specs</h3>
                        <div className="space-y-3 font-spec-body">
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
                        <h4 className="font-spec-h2 font-bold text-charcoal">{tool.author}</h4>
                        <p className="font-spec-position text-muted-silver mt-1">{tool.authorTitle}</p>
                        <div className="border-t border-[#f0f0f0] pt-4 mt-4">
                          <Link to="/profile" className="text-scarlett-red font-spec-lead font-semibold hover:underline">
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
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-charcoal text-pure-white px-5 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2 border border-scarlett-red/20 font-spec-lead animate-fade-in-scale">
            <span className="material-symbols-outlined text-green-500 text-xs">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        )}
  </div>
</div>
  );
};

export default ToolDetail;
