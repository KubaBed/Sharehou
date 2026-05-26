import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import { api } from '../services/api';

const LikeSVGAnimation = () => (
  <div 
    className="w-full h-full"
    dangerouslySetInnerHTML={{
      __html: `
        <svg fill="none" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:100%;">
          <g transform="matrix(1,0,0,1,250,250)" visibility="hidden" id="pop">
            <animate repeatCount="indefinite" begin="0.133s" calcMode="discrete" fill="freeze" dur="1.001s" values="visible; visible" keyTimes="0; 1" attributeName="visibility" />
            <g id="Shape 1"><path stroke-linejoin="round" stroke-linecap="round" stroke-width="6" stroke-opacity="1" stroke="#f04916" fill="#ff0000" fill-opacity="1" d="M0,-1L0,-86" /></g>
          </g>
          <g opacity="0" id="heart">
            <animate repeatCount="indefinite" attributeName="opacity" dur="0.433767100433769s" begin="0s" calcMode="spline" values="0; 1" keyTimes="0; 1" keySplines="0.493 -0.017 0.121 1.068" fill="freeze" />
            <g transform="translate(250.069,253.81)">
              <g transform="scale(0.25,0.25)">
                <animateTransform repeatCount="indefinite" type="scale" attributeName="transform" dur="0.434s" begin="0s" calcMode="spline" values="0.25 0.25; 1 1" keyTimes="0; 1" keySplines="0.56 0 0.07 1" fill="freeze" />
                <g transform="translate(-44.5,-37)">
                  <g id="Group 1" transform="matrix(1,0,0,1,44.431,37.19)">
                    <path fill="#f04916" fill-opacity="1" d="M43.784,-15.108C43.784,-15.131,43.788,-15.156,43.788,-15.185C43.788,-16.144,43.69,-16.996,43.55,-17.804C41.939,-28.247,31.454,-36.324,20.33,-36.324C10.994,-36.324,3.044,-30.629,-0.104,-22.63C-3.677,-30.629,-12.557,-36.324,-21.894,-36.324C-33.63,-36.324,-43.182,-27.337,-43.735,-16.061C-43.749,-15.763,-43.788,-15.495,-43.788,-15.185C-43.788,-15.16,-43.785,-15.135,-43.785,-15.111C-43.785,-15.088,-43.788,-15.061,-43.788,-15.034C-43.788,-12.529,-43.32,-10.135,-42.503,-7.908C-35.318,13.734,0,36.324,0,36.324C0,36.324,40.04,10.71,43.519,-12.094C43.678,-13.061,43.788,-14.034,43.788,-15.034C43.788,-15.061,43.784,-15.083,43.784,-15.108Z" />
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g visibility="hidden" id="drop shape">
            <animate repeatCount="indefinite" begin="0.033s" calcMode="discrete" fill="freeze" dur="0.968s" values="visible; visible" keyTimes="0; 1" attributeName="visibility" />
            <g transform="translate(250,250)">
              <g transform="scale(0,0)">
                <animateTransform repeatCount="indefinite" type="scale" attributeName="transform" dur="0.2s" begin="0.033s" calcMode="spline" values="0 0; 0.9 0.9; 0.7 0.7" keyTimes="0; 0.833; 1" keySplines="0.167 0.167 0.298 1; 0 0 1 1" fill="freeze" />
                <g transform="translate(0,0)">
                  <g id="Ellipse 1" transform="matrix(1,0,0,1,0,-2)">
                    <ellipse ry="111.801" rx="111.801" cy="0" cx="0" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="50" stroke-opacity="1" stroke="#ff2f0f">
                      <animate repeatCount="indefinite" attributeName="stroke-width" dur="0.16683350152588713s" begin="0.03336669867431323s" calcMode="spline" values="50; 0" keyTimes="0; 1" keySplines="0.167 0.167 0.298 0.993" fill="freeze" />
                    </ellipse>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
      `
    }}
  />
);

// NumberTicker component
const NumberTicker = ({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}) => {
  const [value, setValue] = useState(start);
  const startTimeRef = useRef(null);

  useEffect(() => {
    let frame;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const progress = timestamp - startTimeRef.current;
      const percent = Math.min(progress / (duration * 1000), 1);

      // ease-out cubic function: f(t) = 1 - (1 - t)^3
      const easeOutPercent = 1 - Math.pow(1 - percent, 3);
      const currentValue = start + easeOutPercent * (end - start);

      setValue(currentValue);

      if (percent < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [end, start, duration]);

  const formattedValue = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

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
          ...style
        }}
        {...props}
      />
    );
  }
);
PixelCanvas.displayName = "PixelCanvas";

const Dashboard = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Newest');
  const [topic, setTopic] = useState('All');
  const [tools, setTools] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeAnimations, setLikeAnimations] = useState([]);
  
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
      e.stopPropagation(); // Stop navigation to details page
    }
    spawnLikeAnimation(e);
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
          
          {/* Platform Performance Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
            {/* Stat 1: Karma */}
            <Reveal className="h-full" delay={100} duration={600}>
              <div className="bg-pure-white p-5 rounded-2xl border border-charcoal/10 flex flex-col justify-between h-full relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.04)] hover:border-scarlett-red/30 transition-all duration-300 ease-out hover:-translate-y-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-spec-tagline text-muted-silver">Total Karma Points</p>
                    <p className="font-spec-number text-charcoal mt-1 text-2xl font-bold">
                      <NumberTicker end={4500} suffix=" XP" />
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-scarlett-red text-base">local_fire_department</span>
                </div>
                <div className="flex justify-between items-center font-spec-position text-[10px] text-muted-silver border-t border-border-gray pt-2 mt-3">
                  <span>+12% vs last month</span>
                  <span>Live sync</span>
                </div>
              </div>
            </Reveal>

            {/* Stat 2: Tools Shared */}
            <Reveal className="h-full" delay={200} duration={600}>
              <div className="bg-pure-white p-5 rounded-2xl border border-charcoal/10 flex flex-col justify-between h-full relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.04)] hover:border-scarlett-red/30 transition-all duration-300 ease-out hover:-translate-y-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-spec-tagline text-muted-silver">Shared Automation Modules</p>
                    <p className="font-spec-number text-charcoal mt-1 text-2xl font-bold">
                      <NumberTicker end={143} />
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-charcoal text-base">handyman</span>
                </div>
                {/* SVG Line/Area Chart showing a rising curve */}
                <div className="h-8 w-full mt-2">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path
                      d="M0,28 L20,24 L40,26 L60,18 L80,12 L100,6"
                      fill="none"
                      stroke="#EE4137"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,28 L20,24 L40,26 L60,18 L80,12 L100,6 L100,30 L0,30 Z"
                      fill="url(#gradient-red-modules)"
                      opacity="0.1"
                    />
                    <defs>
                      <linearGradient id="gradient-red-modules" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EE4137" />
                        <stop offset="100%" stopColor="#EE4137" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="flex justify-between items-center font-spec-position text-[10px] text-muted-silver border-t border-border-gray pt-2 mt-3">
                  <span>Steady growth curve</span>
                  <span>Updated daily</span>
                </div>
              </div>
            </Reveal>

            {/* Stat 3: Hours Saved */}
            <Reveal className="h-full" delay={300} duration={600}>
              <div className="bg-pure-white p-5 rounded-2xl border border-charcoal/10 flex flex-col justify-between h-full relative overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.04)] hover:border-scarlett-red/30 transition-all duration-300 ease-out hover:-translate-y-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-spec-tagline text-muted-silver">Collective Hours Saved</p>
                    <p className="font-spec-number text-charcoal mt-1 text-2xl font-bold">
                      <NumberTicker end={12500} suffix="h" />
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-scarlett-red text-base">schedule</span>
                </div>
                {/* SVG Bar Chart with growing bars */}
                <div className="h-8 w-full mt-2">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <rect x="2" y="20" width="8" height="10" rx="1" fill="#EE4137" opacity="0.6" />
                    <rect x="14" y="16" width="8" height="14" rx="1" fill="#EE4137" opacity="0.7" />
                    <rect x="26" y="18" width="8" height="12" rx="1" fill="#EE4137" opacity="0.65" />
                    <rect x="38" y="12" width="8" height="18" rx="1" fill="#EE4137" opacity="0.8" />
                    <rect x="50" y="14" width="8" height="16" rx="1" fill="#EE4137" opacity="0.75" />
                    <rect x="62" y="8" width="8" height="22" rx="1" fill="#EE4137" opacity="0.9" />
                    <rect x="74" y="4" width="8" height="26" rx="1" fill="#EE4137" opacity="0.95" />
                    <rect x="86" y="1" width="8" height="29" rx="1" fill="#EE4137" opacity="1" />
                  </svg>
                </div>
                <div className="flex justify-between items-center font-spec-position text-[10px] text-muted-silver border-t border-border-gray pt-2 mt-3">
                  <span>Saves approx. 32h per developer</span>
                  <span>Est. quarterly value: $450k</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Header Banner - Editorial Brutalism Stance */}
          <div className="relative border-b border-charcoal/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 shrink-0">
            <div>
              <span className="font-spec-tagline text-scarlett-red block mb-2">// SHAREHOUSE PLATFORM</span>
              <h2 className="font-spec-title text-charcoal tracking-tight">Explore Tools</h2>
              <p className="font-spec-lead text-muted-silver mt-2 max-w-2xl">
                A surgical index of custom templates, automations, and prompts engineered by the RTB House team to accelerate daily productivity.
              </p>
            </div>
            
            {/* Quick Actions / Filters */}
            <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto py-3.5 shrink-0 hide-scrollbar">
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

          {/* Topics Selector - Fixed Crop Bug by adding py-3.5 shrink-0 instead of pb-2 */}
          <div className="flex items-center gap-2 overflow-x-auto py-3.5 shrink-0 border-b border-charcoal/5 hide-scrollbar">
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
                    <PixelCanvas colors={['#EE4137', '#fca5a5', '#fee2e2', '#0a0f1d']} />
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
                    className="bg-pure-white p-6 rounded-2xl border border-charcoal/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(230,0,0,0.05)] hover:border-scarlett-red/40 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between h-full group relative overflow-hidden"
                  >
                    <PixelCanvas colors={['#EE4137', '#fca5a5', '#fee2e2', '#0a0f1d']} />
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



        </main>
      </div>
      
      {/* Global Floating Like Animations */}
      {likeAnimations.map(anim => (
        <div
          key={anim.id}
          style={{
            position: 'fixed',
            left: anim.x,
            top: anim.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
            width: '120px',
            height: '120px'
          }}
        >
          <LikeSVGAnimation />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
