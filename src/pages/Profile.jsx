import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import { api } from '../services/api';

// Rounded Hexagon Path for sticker badges
const HEXAGON_PATH = "M 45 9.4 Q 50 6, 55 9.4 L 86.5 31.1 Q 91 34, 91 39.7 L 91 60.3 Q 91 66, 86.5 68.9 L 55 90.6 Q 50 94, 45 90.6 L 13.5 68.9 Q 9 66, 9 60.3 L 9 39.7 Q 9 34, 13.5 31.1 Z";

const BuilderBadge = ({ value = 0 }) => {
  return (
    <div className="relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 active:scale-95">
      <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible select-none">
        <defs>
          <filter id="sticker-shadow-builder" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.16" />
          </filter>
          <clipPath id="builder-clip">
            <path d={HEXAGON_PATH} />
          </clipPath>
        </defs>
        
        {/* Outer White Border (Sticker Outline) with Drop Shadow */}
        <path
          d={HEXAGON_PATH}
          fill="white"
          stroke="white"
          strokeWidth="6"
          strokeLinejoin="round"
          filter="url(#sticker-shadow-builder)"
        />
        
        {/* Inner Content Clipped to Hexagon */}
        <g clipPath="url(#builder-clip)">
          {/* Base Background: Warm Taupe */}
          <rect width="100" height="100" fill="#a78f73" />
          
          {/* Inner Light Border */}
          <path
            d={HEXAGON_PATH}
            fill="none"
            stroke="#f5ede2"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          
          {/* Orange Ribbon with V-notch */}
          <path
            d="M 34 0 L 34 58 L 50 49 L 66 58 L 66 0 Z"
            fill="#e89a3e"
            stroke="#f9f2e7"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          
          {/* Number Value */}
          <text
            x="50"
            y="35"
            textAnchor="middle"
            fill="white"
            fontFamily="Proxima Nova, Outfit, Inter, sans-serif"
            fontSize="21"
            fontWeight="900"
          >
            {value}
          </text>
          
          {/* White Star at Bottom */}
          <polygon
            points="50,68 52.5,73.5 58.5,73.5 53.5,77.5 55.5,83 50,79.5 44.5,83 46.5,77.5 41.5,73.5 47.5,73.5"
            fill="white"
          />
        </g>
      </svg>
    </div>
  );
};

const ScripterBadge = ({ value = 0 }) => {
  return (
    <div className="relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 active:scale-95">
      <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible select-none">
        <defs>
          <filter id="sticker-shadow-scripter" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.16" />
          </filter>
          <clipPath id="scripter-clip">
            <path d={HEXAGON_PATH} />
          </clipPath>
        </defs>
        
        {/* Outer White Border (Sticker Outline) with Drop Shadow */}
        <path
          d={HEXAGON_PATH}
          fill="white"
          stroke="white"
          strokeWidth="6"
          strokeLinejoin="round"
          filter="url(#sticker-shadow-scripter)"
        />
        
        {/* Inner Content Clipped to Hexagon */}
        <g clipPath="url(#scripter-clip)">
          {/* Base Background: Emerald Green */}
          <rect width="100" height="100" fill="#0ba376" />
          
          {/* Inner Light Border */}
          <path
            d={HEXAGON_PATH}
            fill="none"
            stroke="#48cbb3"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          
          {/* Big White Number Value */}
          <text
            x="50"
            y="54"
            textAnchor="middle"
            fill="white"
            fontFamily="Proxima Nova, Outfit, Inter, sans-serif"
            fontSize="46"
            fontWeight="900"
          >
            {value}
          </text>
          
          {/* Three Semi-transparent Stars at Bottom */}
          <g opacity="0.45" fill="white">
            {/* Middle Star */}
            <polygon points="50,72 51.5,75.5 55,75.5 52,77.5 53,81 50,79 47,81 48,77.5 45,75.5 48.5,75.5" />
            {/* Left Star */}
            <polygon points="34,69 35.2,71.8 38,71.8 35.6,73.4 36.4,76.2 34,74.6 32.6,76.2 33.4,73.4 31,71.8 33.8,71.8" />
            {/* Right Star */}
            <polygon points="66,69 67.2,71.8 70,71.8 67.6,73.4 68.4,76.2 66,74.6 64.6,76.2 65.4,73.4 63,71.8 65.8,71.8" />
          </g>
        </g>
      </svg>
    </div>
  );
};

const OptimizerBadge = ({ value = "0" }) => {
  return (
    <div className="relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 active:scale-95">
      <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible select-none">
        <defs>
          <filter id="sticker-shadow-optimizer" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.16" />
          </filter>
          <clipPath id="optimizer-clip">
            <path d={HEXAGON_PATH} />
          </clipPath>
        </defs>
        
        {/* Outer White Border (Sticker Outline) with Drop Shadow */}
        <path
          d={HEXAGON_PATH}
          fill="white"
          stroke="white"
          strokeWidth="6"
          strokeLinejoin="round"
          filter="url(#sticker-shadow-optimizer)"
        />
        
        {/* Inner Content Clipped to Hexagon */}
        <g clipPath="url(#optimizer-clip)">
          {/* Base Background: Yellow/Gold */}
          <rect width="100" height="100" fill="#f5b025" />
          
          {/* Inner Light Border */}
          <path
            d={HEXAGON_PATH}
            fill="none"
            stroke="#ffde7a"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          
          {/* Green Top Header Block */}
          <rect x="0" y="0" width="100" height="32" fill="#059669" />
          
          {/* Value in Green Header */}
          <text
            x="50"
            y="22"
            textAnchor="middle"
            fill="white"
            fontFamily="Proxima Nova, Outfit, Inter, sans-serif"
            fontSize="15"
            fontWeight="900"
          >
            {value}
          </text>
          
          {/* Navy Blue Arch */}
          <circle cx="50" cy="65" r="23" fill="#0e3054" />
          
          {/* White Inner Circle */}
          <circle cx="50" cy="65" r="16" fill="white" />
          
          {/* Clock face & hands inside white circle */}
          <circle cx="50" cy="65" r="11" stroke="#0ba376" strokeWidth="2.2" fill="none" />
          <path
            d="M 50 59 L 50 65 L 56 65"
            stroke="#0ba376"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUserProfile()
      .then(data => {
        setUserProfile(data);
        setContributions(data.contributions || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load user profile:', err);
        setLoading(false);
      });
  }, []);

  const progressPercent = userProfile 
    ? (userProfile.karma / userProfile.nextTierKarma) * 100 
    : 0;

  return (
    <div className="bg-smoke text-on-surface h-screen overflow-hidden flex w-full">
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:ml-[280px] w-full max-w-[calc(100%-280px)] h-screen bg-smoke">
        <Header />

        {/* Page Content */}
        <main className="flex-grow overflow-y-auto px-8 py-8 hide-scrollbar flex flex-col">
          <div className="max-w-[1000px] mx-auto w-full flex flex-col gap-8">
            {loading ? (
              <div className="py-40 flex flex-col items-center justify-center text-muted-silver gap-3">
                <span className="material-symbols-outlined text-4xl animate-spin text-scarlett-red">progress_activity</span>
                <span className="font-body text-sm font-medium">Loading profile details...</span>
              </div>
            ) : (
              <>
                {/* Profile Info Header */}
                <Reveal delay={50} duration={700}>
                  <div className="bg-pure-white rounded-3xl p-8 border border-border-light flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-scarlett-red/5 rounded-full -mr-16 -mt-16"></div>
                
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-scarlett-red/20 shadow-sm hover:scale-105 transition-transform duration-300 shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={userProfile.avatar}
                    alt={userProfile.name}
                  />
                </div>

                <div className="flex-grow md:text-left relative z-10">
                  <h2 className="font-spec-title text-charcoal mb-2">{userProfile.name}</h2>
                  <p className="font-spec-lead text-secondary">{userProfile.role}</p>
                  <p className="font-spec-position text-muted-silver mt-1">{userProfile.email}</p>
                  <div className="inline-block bg-smoke border border-border-light text-charcoal font-spec-tagline px-4 py-1.5 rounded-full mt-4">
                    {userProfile.tier}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Karma Points Card */}
              <Reveal delay={100} duration={600} className="h-full">
                <div className="bg-pure-white rounded-3xl p-6 border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.04)] hover:border-scarlett-red/30 transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-spec-tagline text-muted-silver">Karma Points</h3>
                      <span className="material-symbols-outlined text-scarlett-red text-base">local_fire_department</span>
                    </div>
                    <p className="font-spec-number text-charcoal mb-2">{userProfile.karma} XP</p>
                    <p className="font-spec-position text-muted-silver">Next Tier: {userProfile.nextTierKarma} XP</p>
                  </div>
                  <div className="mt-6">
                    <div className="w-full bg-smoke rounded-full h-2 overflow-hidden border border-border-light">
                      <div
                        className="bg-scarlett-red h-full rounded-full shadow-[0_0_10px_rgba(238,65,55,0.3)]"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Hours Saved Card */}
              <Reveal delay={200} duration={600} className="h-full">
                <div className="bg-pure-white rounded-3xl p-6 border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.04)] hover:border-scarlett-red/30 transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-spec-tagline text-muted-silver">Total Hours Saved</h3>
                      <span className="material-symbols-outlined text-scarlett-red text-base">schedule</span>
                    </div>
                    <p className="font-spec-number text-charcoal mb-2">{userProfile.hoursSaved}h</p>
                    <p className="font-spec-position text-muted-silver">Estimated value: $7,400</p>
                  </div>
                </div>
              </Reveal>

              {/* Tools Shared Card */}
              <Reveal delay={300} duration={600} className="h-full">
                <div className="bg-pure-white rounded-3xl p-6 border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.04)] hover:border-scarlett-red/30 transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-spec-tagline text-muted-silver">Tools Shared</h3>
                      <span className="material-symbols-outlined text-scarlett-red text-base">extension</span>
                    </div>
                    <p className="font-spec-number text-charcoal mb-2">{userProfile.toolsShared}</p>
                    <p className="font-spec-position text-muted-silver">Top category: Coding</p>
                  </div>
                </div>
              </Reveal>

            </div>

            {/* Bottom Row: Badges & Recent Contributions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              
              {/* Badges Panel */}
              <Reveal delay={150} duration={600} className="h-full">
                <div className="bg-pure-white rounded-3xl p-8 border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full flex flex-col">
                  <h3 className="font-spec-h2 font-bold text-charcoal mb-6">Mastery Badges</h3>
                  <div className="flex flex-wrap items-center justify-around gap-6 py-4 flex-grow">
                    
                    {/* Builder Badge */}
                    <div className="relative flex flex-col items-center group">
                      <BuilderBadge value={userProfile.toolsShared} />
                      <span className="font-spec-tagline text-charcoal font-bold mt-4 tracking-wider">Builder</span>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-3 flex flex-col items-center pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-20">
                        <div className="bg-charcoal text-pure-white text-[11px] py-2 px-4 rounded-xl shadow-lg whitespace-nowrap text-center">
                          <p className="font-bold text-[#e89a3e] text-[9px] uppercase tracking-wider mb-0.5">Builder Badge</p>
                          <p className="opacity-95 font-medium font-sans">{userProfile.toolsShared} Shared Automation Tools</p>
                        </div>
                        <div className="w-2.5 h-2.5 bg-charcoal rotate-45 -mt-1.5"></div>
                      </div>
                    </div>

                    {/* Scripter Badge */}
                    <div className="relative flex flex-col items-center group">
                      <ScripterBadge value={contributions.length} />
                      <span className="font-spec-tagline text-charcoal font-bold mt-4 tracking-wider">Scripter</span>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-3 flex flex-col items-center pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-20">
                        <div className="bg-charcoal text-pure-white text-[11px] py-2 px-4 rounded-xl shadow-lg whitespace-nowrap text-center">
                          <p className="font-bold text-[#0ba376] text-[9px] uppercase tracking-wider mb-0.5">Scripter Badge</p>
                          <p className="opacity-95 font-medium font-sans">{contributions.length} Active Contributions</p>
                        </div>
                        <div className="w-2.5 h-2.5 bg-charcoal rotate-45 -mt-1.5"></div>
                      </div>
                    </div>

                    {/* Optimizer Badge */}
                    <div className="relative flex flex-col items-center group">
                      <OptimizerBadge value={`${userProfile.hoursSaved}h`} />
                      <span className="font-spec-tagline text-charcoal font-bold mt-4 tracking-wider">Optimizer</span>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-3 flex flex-col items-center pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-20">
                        <div className="bg-charcoal text-pure-white text-[11px] py-2 px-4 rounded-xl shadow-lg whitespace-nowrap text-center">
                          <p className="font-bold text-[#f5b025] text-[9px] uppercase tracking-wider mb-0.5">Optimizer Badge</p>
                          <p className="opacity-95 font-medium font-sans">{userProfile.hoursSaved}h Total Hours Saved</p>
                        </div>
                        <div className="w-2.5 h-2.5 bg-charcoal rotate-45 -mt-1.5"></div>
                      </div>
                    </div>

                  </div>
                </div>
              </Reveal>

              {/* Contributions Panel */}
              <Reveal delay={250} duration={600} className="h-full">
                <div className="bg-pure-white rounded-3xl p-6 border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full">
                  <h3 className="font-spec-h2 font-bold text-charcoal mb-6">Recent Contributions</h3>
                  <div className="space-y-4">
                    {contributions.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-border-light last:border-0 last:pb-0 hover:translate-x-1 transition-transform duration-200 cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-smoke flex items-center justify-center text-charcoal border border-border-light">
                          <span className="material-symbols-outlined text-base">{item.icon}</span>
                        </div>
                        <div className="flex-grow">
                          <p className="font-spec-h3 font-bold text-charcoal">{item.title}</p>
                          <p className="font-spec-position text-muted-silver mt-0.5">{item.time}</p>
                        </div>
                        <span className="text-scarlett-red font-spec-lead font-bold">{item.kp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </>
        )}
      </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
