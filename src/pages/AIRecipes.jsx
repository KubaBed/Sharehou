import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Reveal from '../components/Reveal';

const AIRecipes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  const [recipesList, setRecipesList] = useState([
    {
      id: 'competitor-scraper',
      title: 'Competitor Intelligence Scraper',
      description: 'Automatically extracts pricing, feature updates, and sentiment from specified competitor URLs and synthesizes a weekly brief.',
      category: 'Marketing',
      likes: 185,
      trending: true,
      timeSaved: '12h / week'
    },
    {
      id: 'seo-blog',
      title: 'SEO Blog Generator',
      description: 'Takes a target keyword and generates a full SEO-optimized article structure and draft.',
      category: 'Marketing',
      likes: 124,
      trending: true,
      timeSaved: '8h / week'
    },
    {
      id: 'lead-qualification',
      title: 'Lead Qualification Bot',
      description: 'Scores incoming leads based on unstructured email data and routes to sales.',
      category: 'Sales Ops',
      likes: 92,
      trending: true,
      timeSaved: '6h / week'
    },
    {
      id: 'cold-outreach',
      title: 'Cold Outreach Sequencer',
      description: 'Generates personalized 3-step email sequences based on LinkedIn profiles.',
      category: 'Sales Ops',
      likes: 74,
      trending: false,
      timeSaved: '5h / week'
    },
    {
      id: 'i18n-localizer',
      title: 'I18n Content Localizer',
      description: 'Translates markdown files maintaining formatting and brand tone across 5 languages.',
      category: 'Data Engineering',
      likes: 110,
      trending: false,
      timeSaved: '10h / week'
    },
    {
      id: 'error-analyzer',
      title: 'Error Log Analyzer',
      description: 'Ingests Sentry logs to summarize root causes and suggest code fixes.',
      category: 'Data Engineering',
      likes: 156,
      trending: false,
      timeSaved: '15h / week'
    },
    {
      id: 'csv-cleanser',
      title: 'CSV Data Cleanser',
      description: 'Normalizes formatting, removes duplicates, and flags anomalies in tabular data.',
      category: 'Data Engineering',
      likes: 63,
      trending: false,
      timeSaved: '3h / week'
    }
  ]);

  const handleLike = (id) => {
    setRecipesList(prev =>
      prev.map(r => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const categories = ['All Categories', 'Marketing', 'Data Engineering', 'Sales Ops'];

  const filteredRecipes = recipesList.filter(r => 
    selectedCategory === 'All Categories' || r.category === selectedCategory
  );

  const featuredRecipe = recipesList.find(r => r.id === 'competitor-scraper');

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
              <h2 className="font-headline text-2xl font-bold text-charcoal mb-4">AI Recipes</h2>
              <p className="font-body text-base text-muted-silver max-w-3xl">
                Ready-to-deploy LLM architectures and automated workflows. Spin up containers, ingest data, and deploy in one click.
              </p>
            </div>

            {/* Trending Section */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-scarlett-red filled-icon">local_fire_department</span>
                <h3 className="font-headline text-lg font-bold text-on-surface">Trending Now</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Featured Large Card */}
                {featuredRecipe && (
                  <Reveal className="lg:col-span-2" delay={50} duration={700}>
                    <div className="bg-pure-white border border-border-light rounded-2xl p-8 flex flex-col justify-between hover:shadow-[0_12px_25px_rgba(230,0,0,0.05)] hover:border-scarlett-red/20 transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden group h-full">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-scarlett-red/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-110"></div>
                      <div className="relative">
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-scarlett-red/10 text-scarlett-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
                            {featuredRecipe.category}
                          </span>
                          <span className="text-xs text-muted-silver flex items-center gap-1 font-semibold">
                            <span className="material-symbols-outlined text-sm">schedule</span>
                            Saves {featuredRecipe.timeSaved}
                          </span>
                        </div>
                        <h4 className="font-headline text-xl font-bold text-charcoal mb-4 group-hover:text-scarlett-red transition-colors">
                          {featuredRecipe.title}
                        </h4>
                        <p className="font-body text-sm text-secondary leading-relaxed mb-6 max-w-xl">
                          {featuredRecipe.description}
                        </p>
                      </div>
                      <div className="border-t border-border-light pt-6 mt-6 flex justify-between items-center relative">
                        <button
                          onClick={() => handleLike(featuredRecipe.id)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-smoke hover:bg-border-light transition-colors text-xs text-charcoal border border-border-light hover:scale-105 active:scale-95 duration-200"
                        >
                          <span className="material-symbols-outlined text-sm">thumb_up</span>
                          <span>{featuredRecipe.likes}</span>
                        </button>
                        <button className="bg-scarlett-red hover:bg-[#d8352b] text-pure-white px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-scarlett-red/15">
                          Deploy Recipe
                        </button>
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Secondary Trending Card */}
                <Reveal delay={200} duration={700}>
                  <div className="bg-gradient-to-br from-charcoal to-pitch-black text-pure-white p-8 rounded-2xl flex flex-col justify-between hover:shadow-lg hover:shadow-charcoal/10 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 ease-out h-full">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-pure-white/20 text-pure-white text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-widest">
                          Quick Launch
                        </span>
                      </div>
                      <h4 className="font-headline text-lg font-bold mb-3">Custom Deployment</h4>
                      <p className="font-body text-xs text-pure-white/70 leading-relaxed mb-6">
                        Have a custom workflow in mind? Initialize an empty agent shell and connect it to your corporate tools in minutes.
                      </p>
                    </div>
                    <button className="w-full bg-pure-white text-charcoal hover:bg-[#f0edec] py-3 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md">
                      Start Blank Project
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* All Recipes Grid Section */}
            <div className="mb-8 flex items-center justify-between">
              <h3 className="font-headline text-lg font-bold text-on-surface">All Recipes</h3>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-pure-white border border-border-light rounded-lg py-2 pl-4 pr-10 font-label text-sm focus:ring-2 focus:ring-scarlett-red focus:border-transparent cursor-pointer outline-none transition-all duration-300 hover:border-charcoal/20"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredRecipes.map((recipe, index) => (
                <Reveal key={recipe.id} delay={index * 100} duration={600}>
                  <div
                    className="bg-pure-white p-6 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(230,0,0,0.05)] hover:border-scarlett-red/20 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 ease-out flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold text-scarlett-red uppercase tracking-widest">
                          {recipe.category}
                        </span>
                        <span className="text-[11px] text-muted-silver flex items-center gap-0.5 font-semibold">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          {recipe.timeSaved}
                        </span>
                      </div>
                      <h4 className="font-headline text-base font-bold text-charcoal mb-2 hover:text-scarlett-red transition-colors cursor-pointer">
                        {recipe.title}
                      </h4>
                      <p className="font-body text-xs text-secondary leading-relaxed mb-6 line-clamp-3">
                        {recipe.description}
                      </p>
                    </div>
                    <div className="border-t border-[#f0f0f0] pt-4 mt-auto flex justify-between items-center">
                      <button
                        onClick={() => handleLike(recipe.id)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-smoke hover:bg-border-light transition-colors text-xs text-charcoal border border-border-light hover:scale-105 active:scale-95 duration-200"
                      >
                        <span className="material-symbols-outlined text-xs">thumb_up</span>
                        <span>{recipe.likes}</span>
                      </button>
                      <button className="bg-transparent border border-border-light hover:border-scarlett-red hover:text-scarlett-red text-charcoal px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-sm">
                        Deploy
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIRecipes;
