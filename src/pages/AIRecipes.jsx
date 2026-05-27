import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import { api } from '../services/api';

const LikeSVGAnimation = () => (
  <div className="w-full h-full flex items-center justify-center">
    <span
      className="material-symbols-outlined filled-icon animate-heart-pop"
      style={{ fontSize: '48px', color: '#f04916' }}
    >
      favorite
    </span>
  </div>
);

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

class PixelCanvasElement extends HTMLElement {
  static css = `
    :host {
      display: grid;
      inline-size: 100%;
      block-size: 100%;
      overflow: hidden;
    }
  `;

  get colors() {
    return this.dataset.colors?.split(",") || ["#f8fafc", "#f1f5f9", "#cbd5e1"];
  }

  get gap() {
    const value = this.dataset.gap || 5;
    const min = 4;
    const max = 50;
    if (value <= min) return min;
    if (value >= max) return max;
    return parseInt(value);
  }

  get speed() {
    const value = this.dataset.speed || 35;
    const min = 0;
    const max = 100;
    const throttle = 0.001;
    if (value <= min || this.reducedMotion) return min;
    if (value >= max) return max * throttle;
    return parseInt(value) * throttle;
  }

  get noFocus() {
    return this.hasAttribute("data-no-focus");
  }

  connectedCallback() {
    const canvas = document.createElement("canvas");
    this._parent = this.parentNode;
    this.shadowroot = this.attachShadow({ mode: "open" });

    const styleEl = document.createElement("style");
    styleEl.textContent = PixelCanvasElement.css;
    this.shadowroot.append(styleEl);
    this.shadowroot.append(canvas);

    this.canvas = this.shadowroot.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.timeInterval = 1000 / 60;
    this.timePrevious = performance.now();
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.init();
    this.resizeObserver = new ResizeObserver(() => this.init());
    this.resizeObserver.observe(this);

    this._parent.addEventListener("mouseenter", this);
    this._parent.addEventListener("mouseleave", this);
    if (!this.noFocus) {
      this._parent.addEventListener("focusin", this);
      this._parent.addEventListener("focusout", this);
    }
  }

  disconnectedCallback() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this._parent) {
      this._parent.removeEventListener("mouseenter", this);
      this._parent.removeEventListener("mouseleave", this);
      if (!this.noFocus) {
        this._parent.removeEventListener("focusin", this);
        this._parent.removeEventListener("focusout", this);
      }
    }
    delete this._parent;
  }

  handleEvent(event) {
    this[`on${event.type}`](event);
  }

  onmouseenter() {
    this.handleAnimation("appear");
  }

  onmouseleave() {
    this.handleAnimation("disappear");
  }

  onfocusin(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    this.handleAnimation("appear");
  }

  onfocusout(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    this.handleAnimation("disappear");
  }

  handleAnimation(name) {
    cancelAnimationFrame(this.animation);
    this.animation = this.animate(name);
  }

  init() {
    const rect = this.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    this.pixels = [];
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.createPixels();
  }

  getDistanceToCanvasCenter(x, y) {
    const dx = x - this.canvas.width / 2;
    const dy = y - this.canvas.height / 2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  createPixels() {
    for (let x = 0; x < this.canvas.width; x += this.gap) {
      for (let y = 0; y < this.canvas.height; y += this.gap) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const delay = this.reducedMotion ? 0 : this.getDistanceToCanvasCenter(x, y);
        this.pixels.push(new Pixel(this.canvas, this.ctx, x, y, color, this.speed, delay));
      }
    }
  }

  animate(fnName) {
    this.animation = requestAnimationFrame(() => this.animate(fnName));
    const timeNow = performance.now();
    const timePassed = timeNow - this.timePrevious;
    if (timePassed < this.timeInterval) return;
    this.timePrevious = timeNow - (timePassed % this.timeInterval);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.pixels.length; i++) {
      this.pixels[i][fnName]();
    }
    if (this.pixels.every((pixel) => pixel.isIdle)) {
      cancelAnimationFrame(this.animation);
    }
  }
}

const PixelCanvas = React.forwardRef(
  ({ gap, speed, colors, variant, noFocus, style, ...props }, ref) => {
    React.useEffect(() => {
      if (typeof window !== "undefined") {
        if (!customElements.get("pixel-canvas")) {
          customElements.define("pixel-canvas", PixelCanvasElement);
        }
      }
    }, []);

    return (
      <pixel-canvas
        ref={ref}
        data-gap={gap}
        data-speed={speed}
        data-colors={colors?.join(",")}
        data-variant={variant}
        {...(noFocus && { "data-no-focus": "" })}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          opacity: 0.15, // Subtle shimmer that ensures text remains readable
          ...style
        }}
        {...props}
      />
    );
  }
);
PixelCanvas.displayName = "PixelCanvas";

const AIRecipes = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [recipesList, setRecipesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeAnimations, setLikeAnimations] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [likedRecipes, setLikedRecipes] = useState(new Set());

  useEffect(() => {
    api.getRecipes()
      .then(data => {
        setRecipesList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load recipes:', err);
        setLoading(false);
      });
  }, []);

  const spawnLikeAnimation = (e) => {
    if (!e) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const animId = Date.now() + Math.random();
    setLikeAnimations(prev => [...prev, { id: animId, x, y }]);
    setTimeout(() => {
      setLikeAnimations(prev => prev.filter(anim => anim.id !== animId));
    }, 1000);
  };

  const handleLike = (id, e) => {
    if (e) {
      e.stopPropagation();
    }
    spawnLikeAnimation(e);
    if (likedRecipes.has(id)) return;
    api.likeRecipe(id)
      .then(res => {
        if (res.success) {
          setRecipesList(prev =>
            prev.map(r => (r.id === id ? { ...r, likes: res.likes } : r))
          );
          setLikedRecipes(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
          });
        }
      })
      .catch(err => console.error('Failed to like recipe:', err));
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopyRecipeText = (recipe, e) => {
    if (e) e.stopPropagation();
    const textToCopy = recipe.text || `${recipe.title}\n\n${recipe.description}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(err => {
        console.warn('Clipboard write failed, using fallback:', err);
        fallbackCopyText(textToCopy);
      });
    } else {
      fallbackCopyText(textToCopy);
    }

    setToastMessage('Recipe copied to clipboard!');
    setTimeout(() => setToastMessage(''), 3000);
    
    api.incrementUses(recipe.id)
      .then(res => {
        if (res.success) {
          setRecipesList(prev => prev.map(r => r.id === recipe.id ? { ...r, uses: res.uses } : r));
        }
      })
      .catch(err => console.error('Failed to increment uses:', err));
  };

  const categories = ['All Categories', 'Prompts', 'Templates', 'Scripts', 'Marketing', 'Data Engineering', 'Sales Ops'];

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
              <h2 className="font-spec-title text-charcoal mb-4">AI Recipes</h2>
              <p className="font-spec-lead text-muted-silver max-w-3xl">
                Ready-to-use LLM architectures and automated workflows. Copy prompts, templates, and scripts in one click.
              </p>
            </div>

            {loading ? (
              <div className="py-40 flex flex-col items-center justify-center text-muted-silver gap-3">
                <span className="material-symbols-outlined text-4xl animate-spin text-scarlett-red">progress_activity</span>
                <span className="font-spec-body font-medium">Loading AI recipes...</span>
              </div>
            ) : (
              <>
                {/* Trending Section */}
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-scarlett-red filled-icon text-base">local_fire_department</span>
                    <h3 className="font-spec-h2 font-bold text-on-surface">Trending Now</h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Featured Large Card */}
                    {featuredRecipe && (
                      <Reveal className="lg:col-span-2" delay={50} duration={700}>
                        <div 
                          onClick={() => navigate(`/tool/${featuredRecipe.id}`)}
                          className="bg-pure-white border border-border-light rounded-2xl p-8 flex flex-col justify-between hover:shadow-[0_12px_25px_rgba(230,0,0,0.05)] hover:border-scarlett-red/20 transition-all duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99] relative overflow-hidden group h-full cursor-pointer"
                        >
                          <PixelCanvas colors={['#EE4137', '#fca5a5', '#fee2e2', '#0a0f1d']} />
                          <div className="absolute top-0 right-0 w-64 h-64 bg-scarlett-red/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-110"></div>
                          <div className="relative">
                            <div className="flex justify-between items-start mb-4">
                              <span className="bg-scarlett-red/10 text-scarlett-red px-3 py-1 rounded-full font-spec-tagline">
                                {featuredRecipe.category}
                              </span>
                              <span className="font-spec-tagline text-muted-silver flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">schedule</span>
                                Saves {featuredRecipe.hoursSaved}h
                              </span>
                            </div>
                            <h4 className="font-spec-h1 font-bold text-charcoal mb-4 group-hover:text-scarlett-red transition-colors">
                              {featuredRecipe.title}
                            </h4>
                            <p className="font-spec-body text-secondary leading-relaxed mb-6 max-w-xl">
                              {featuredRecipe.description}
                            </p>
                          </div>
                          <div className="border-t border-border-light pt-6 mt-6 flex justify-between items-center relative">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => handleLike(featuredRecipe.id, e)}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all font-spec-lead border active:scale-95 duration-200 cursor-pointer animate-fade-in-scale ${
                                  likedRecipes.has(featuredRecipe.id)
                                    ? 'bg-scarlett-red/10 border-scarlett-red/30 text-scarlett-red'
                                    : 'bg-smoke border-border-light text-charcoal hover:bg-scarlett-red/10 hover:text-scarlett-red hover:border-scarlett-red/20'
                                }`}
                              >
                                <span className={`material-symbols-outlined text-xs transition-colors duration-200 ${likedRecipes.has(featuredRecipe.id) ? 'text-scarlett-red filled-icon' : ''}`}>favorite</span>
                                <span>{featuredRecipe.likes}</span>
                              </button>
                              <span className="font-spec-tagline text-muted-silver">{featuredRecipe.uses || 0} Uses</span>
                            </div>
                            <button 
                              onClick={(e) => handleCopyRecipeText(featuredRecipe, e)}
                              className="bg-scarlett-red hover:bg-opacity-90 text-pure-white px-5 py-2 rounded-lg font-spec-lead font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md hover:shadow-scarlett-red/15"
                            >
                              Copy to clipboard
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
                            <span className="bg-pure-white/20 text-pure-white px-2 py-0.5 rounded font-spec-tagline">
                              Quick Launch
                            </span>
                          </div>
                          <h4 className="font-spec-h2 font-bold mb-3">Custom Recipe</h4>
                          <p className="font-spec-body text-pure-white/70 leading-relaxed mb-6">
                            Have a custom workflow in mind? Initialize an empty agent shell and connect it to your corporate tools in minutes.
                          </p>
                        </div>
                        <button className="w-full bg-pure-white text-charcoal hover:bg-[#f0edec] py-3 rounded-lg font-spec-lead font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md">
                          Start Blank Project
                        </button>
                      </div>
                    </Reveal>
                  </div>
                </div>

                {/* All Recipes Grid Section */}
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="font-spec-h2 font-bold text-on-surface">All Recipes</h3>
                  <div className="flex gap-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-pure-white border border-border-light rounded-lg py-2 pl-4 pr-10 font-spec-lead focus:ring-2 focus:ring-scarlett-red focus:border-transparent cursor-pointer outline-none transition-all duration-300 hover:border-charcoal/20"
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
                        onClick={() => navigate(`/tool/${recipe.id}`)}
                        className="bg-pure-white p-6 rounded-2xl border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(230,0,0,0.05)] hover:border-scarlett-red/20 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 ease-out flex flex-col justify-between h-full cursor-pointer group relative overflow-hidden"
                      >
                        <PixelCanvas colors={['#EE4137', '#fca5a5', '#fee2e2', '#0a0f1d']} />
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <span className="font-spec-tagline text-scarlett-red">
                              {recipe.category}
                            </span>
                            <span className="font-spec-tagline text-muted-silver flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[10px]">schedule</span>
                              Saves {recipe.hoursSaved}h
                            </span>
                          </div>
                          <h4 className="font-spec-h2 font-bold text-charcoal mb-2 group-hover:text-scarlett-red transition-colors">
                            {recipe.title}
                          </h4>
                          <p className="font-spec-body text-secondary leading-relaxed mb-6 line-clamp-3">
                            {recipe.description}
                          </p>
                        </div>
                        <div className="border-t border-[#f0f0f0] pt-4 mt-auto flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <button
                               onClick={(e) => handleLike(recipe.id, e)}
                               className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all font-spec-lead border active:scale-95 duration-200 cursor-pointer ${
                                 likedRecipes.has(recipe.id)
                                   ? 'bg-scarlett-red/10 border-scarlett-red/30 text-scarlett-red'
                                   : 'bg-smoke border-border-light text-charcoal hover:bg-scarlett-red/10 hover:text-scarlett-red hover:border-scarlett-red/20'
                               }`}
                             >
                               <span className={`material-symbols-outlined text-xs transition-colors duration-200 ${likedRecipes.has(recipe.id) ? 'text-scarlett-red filled-icon' : ''}`}>favorite</span>
                               <span>{recipe.likes}</span>
                             </button>
                            <span className="font-spec-tagline text-muted-silver">{recipe.uses || 0} Uses</span>
                          </div>
                          <button 
                            onClick={(e) => handleCopyRecipeText(recipe, e)}
                            className="bg-transparent border border-border-light hover:border-scarlett-red hover:text-scarlett-red text-charcoal px-4 py-1.5 rounded-lg font-spec-lead font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-sm"
                          >
                            Copy to clipboard
                          </button>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Global Floating Like Animations */}
      {createPortal(
        likeAnimations.map(anim => (
          <div
            key={anim.id}
            className="animate-heart-float"
            style={{
              position: 'fixed',
              left: anim.x - 32,
              top: anim.y - 32,
              pointerEvents: 'none',
              zIndex: 99999,
              width: '64px',
              height: '64px'
            }}
          >
            <LikeSVGAnimation />
          </div>
        )),
        document.body
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-charcoal text-pure-white px-5 py-3 rounded-xl shadow-xl z-50 flex items-center gap-2 border border-scarlett-red/20 font-spec-lead animate-fade-in-scale">
          <span className="material-symbols-outlined text-green-500 text-xs">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default AIRecipes;
