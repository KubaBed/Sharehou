import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import { api } from '../services/api';

const Prompts = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);
  const [promptsList, setPromptsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPrompts()
      .then(data => {
        setPromptsList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch prompts:', err);
        setLoading(false);
      });
  }, []);

  const handleLike = (id) => {
    api.likePrompt(id)
      .then(() => {
        setPromptsList(prev =>
          prev.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
        );
      })
      .catch(err => console.error('Failed to like prompt:', err));
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ['All', 'Marketing', 'Coding', 'Copywriting', 'Data Analysis', 'System Design'];

  const filteredPrompts = promptsList.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.text.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-smoke text-on-surface h-screen overflow-hidden flex w-full">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:ml-[280px] w-full max-w-[calc(100%-280px)] h-screen bg-smoke">
        <Header />
        
        {/* Page Content */}
        <main className="flex-grow overflow-y-auto px-8 py-8 hide-scrollbar flex flex-col">
          <div className="max-w-[1280px] mx-auto w-full">
            {/* Page Header */}
            <div className="mb-12">
              <h2 className="font-headline text-2xl font-bold text-[#1c1b1b] mb-4">Prompt Database</h2>
              <p className="font-body text-base text-[#555555] max-w-3xl">
                Curated generative instructions optimized for precise outputs. Discover, upvote, and implement high-performance prompts across your workflows.
              </p>
            </div>

            {/* Custom Search bar locally */}
            <div className="mb-8 max-w-xl">
              <div className="relative flex items-center w-full h-12 bg-white border border-[#d6d6d6] focus-within:border-scarlett-red transition-all duration-300 group rounded-xl hover:shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                <span className="material-symbols-outlined absolute left-4 text-[#888888] group-focus-within:text-scarlett-red">search</span>
                <input
                  className="w-full h-full bg-transparent pl-12 pr-4 font-body text-sm text-[#1c1b1b] placeholder:text-[#888888] outline-none border-none ring-0 focus:ring-0"
                  placeholder="Search prompts database..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                />
              </div>
            </div>

            {/* Categories / Tags */}
            <div className="flex flex-wrap gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 font-label text-sm border transition-all duration-300 rounded-lg hover:scale-105 active:scale-95 ${
                    selectedCategory === cat
                      ? 'bg-charcoal text-white border-charcoal shadow-md shadow-charcoal/10'
                      : 'bg-white text-charcoal border-[#d6d6d6] hover:border-scarlett-red hover:text-scarlett-red'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-muted-silver gap-3">
                  <span className="material-symbols-outlined text-4xl animate-spin text-scarlett-red">progress_activity</span>
                  <span className="font-body text-sm font-medium">Loading prompts database...</span>
                </div>
              ) : filteredPrompts.length === 0 ? (
                <div className="col-span-full py-20 text-center text-muted-silver font-body text-sm">
                  No prompts found matching your search.
                </div>
              ) : (
                filteredPrompts.map((prompt, index) => (
                  <Reveal key={prompt.id} delay={index * 100} duration={600}>
                    <article
                      className="bg-white border border-[#d6d6d6] p-6 rounded-2xl flex flex-col hover:border-scarlett-red/40 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(230,0,0,0.05)] hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 ease-out h-full group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold text-scarlett-red uppercase tracking-widest">
                          {prompt.category}
                        </span>
                        <button
                          onClick={() => handleLike(prompt.id)}
                          className="flex items-center gap-1 text-[#555555] hover:text-scarlett-red transition-colors hover:scale-110 active:scale-90 duration-200"
                        >
                          <span className="material-symbols-outlined text-sm">thumb_up</span>
                          <span className="font-label text-sm font-bold">{prompt.likes}</span>
                        </button>
                      </div>

                      <h3 className="font-headline text-base text-[#1c1b1b] font-bold mb-3 leading-tight group-hover:text-scarlett-red transition-colors">
                        {prompt.title}
                      </h3>

                      <div className="bg-[#f7f7f7] p-4 border-l-2 border-scarlett-red mb-6 flex-1 rounded-r-xl">
                        <p className="font-body text-sm text-[#555555] line-clamp-4 font-mono leading-relaxed">
                          {prompt.text}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f0f0f0]">
                        <span className="text-xs text-muted-silver font-semibold font-body">Alex Rivera</span>
                        <button
                          onClick={() => handleCopy(prompt.text, prompt.id)}
                          className={`font-label text-xs flex items-center gap-1 py-1.5 px-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                            copiedId === prompt.id
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-smoke hover:bg-border-light text-[#1c1b1b]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {copiedId === prompt.id ? 'check' : 'content_copy'}
                          </span>
                          {copiedId === prompt.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </article>
                  </Reveal>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Prompts;
