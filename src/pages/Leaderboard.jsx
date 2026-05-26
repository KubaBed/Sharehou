import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import { api } from '../services/api';

const Leaderboard = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard()
      .then(data => {
        setContributors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load leaderboard:', err);
        setLoading(false);
      });
  }, []);

  const topThree = contributors.slice(0, 3);
  const remaining = contributors.slice(3);

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
              <h2 className="font-headline text-2xl font-bold text-charcoal mb-4">Global Leaderboard</h2>
              <p className="font-body text-base text-muted-silver max-w-3xl">
                Recognizing the leading builders at ShareHouse. Share tools, save collective time, and earn Karma points to rank up.
              </p>
            </div>

            {loading ? (
              <div className="py-40 flex flex-col items-center justify-center text-muted-silver gap-3">
                <span className="material-symbols-outlined text-4xl animate-spin text-scarlett-red">progress_activity</span>
                <span className="font-body text-sm font-medium">Loading global rankings...</span>
              </div>
            ) : (
              <>
                {/* Top Contributors Podium Section */}
                <div className="mb-12">
                  <h3 className="font-headline text-lg font-bold text-on-surface mb-6">Top Contributors</h3>
                  
                  <div className="bg-pure-white rounded-3xl border border-border-light p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)] relative overflow-hidden">
                    {/* Ambient pink/crimson/purple mesh blur accent inside the card */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-tr from-rose-500/10 via-purple-500/5 to-transparent rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-bl from-[#e60000]/10 via-pink-500/5 to-transparent rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20"></div>
                    
                    <div className="relative flex flex-row items-end justify-center gap-2 sm:gap-6 max-w-4xl mx-auto pt-10 pb-4">
                  
                  {/* Rank 2 (Left) */}
                  <Reveal delay={100} duration={600} className="w-1/3 flex flex-col items-center">
                    <div className="flex flex-col items-center w-full group">
                      <div className="relative mb-4 flex flex-col items-center w-full">
                        <div className="relative shrink-0">
                          <img
                            src={contributors[1].avatar}
                            alt={contributors[1].name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 sm:border-4 border-slate-300 shadow-md group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-slate-300 text-charcoal text-[9px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full border border-pure-white shadow-sm">
                            #2
                          </span>
                        </div>
                        <h4 className="font-headline font-bold text-charcoal mt-3 sm:mt-6 text-xs sm:text-base text-center truncate w-full px-1">{contributors[1].name}</h4>
                        <p className="font-body text-[9px] sm:text-xs text-muted-silver mt-0.5 text-center truncate w-full px-1">{contributors[1].title}</p>
                        
                        <div className="hidden sm:inline-block bg-smoke text-charcoal font-label text-[10px] px-2.5 py-0.5 rounded-full border border-border-light mt-3">
                          {contributors[1].tier}
                        </div>
                      </div>
                      
                      {/* Pillar */}
                      <div className="w-full h-24 sm:h-36 bg-gradient-to-t from-slate-100 via-slate-50 to-pure-white border border-slate-200 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex flex-col justify-end items-center pb-3 sm:pb-6 transition-all duration-300 group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] group-hover:border-slate-300">
                        <div className="flex flex-col items-center text-center px-2 sm:px-4 w-full">
                          <span className="font-headline font-black text-2xl sm:text-4xl text-slate-300/40 select-none mb-1 sm:mb-4">2</span>
                          <div className="hidden sm:flex w-full border-t border-[#f0f0f0] pt-3 justify-around text-[10px]">
                            <div>
                              <p className="font-bold text-charcoal">{contributors[1].karma}</p>
                              <p className="text-muted-silver">Karma</p>
                            </div>
                            <div className="border-l border-[#f0f0f0] h-6"></div>
                            <div>
                              <p className="font-bold text-charcoal">{contributors[1].hoursSaved}</p>
                              <p className="text-muted-silver">Saved</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  {/* Rank 1 (Center) */}
                  <Reveal delay={0} duration={700} className="w-1/3 flex flex-col items-center z-10">
                    <div className="flex flex-col items-center w-full group relative -translate-y-2 sm:-translate-y-4">
                      {/* Premium Crown Icon */}
                      <div className="absolute -top-7 sm:-top-10 animate-bounce duration-1000">
                        <span className="material-symbols-outlined text-2xl sm:text-4xl text-amber-500 filled-icon drop-shadow-sm">
                          workspace_premium
                        </span>
                      </div>
                      
                      <div className="relative mb-4 flex flex-col items-center w-full">
                        <div className="relative shrink-0">
                          <img
                            src={contributors[0].avatar}
                            alt={contributors[0].name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 sm:border-4 border-amber-400 shadow-lg group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-amber-400 text-charcoal text-[9px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 rounded-full border border-pure-white shadow-md">
                            #1
                          </span>
                        </div>
                        <h4 className="font-headline font-bold text-charcoal mt-3 sm:mt-6 text-sm sm:text-lg text-center truncate w-full px-1">{contributors[0].name}</h4>
                        <p className="font-body text-[9px] sm:text-xs text-muted-silver mt-0.5 text-center truncate w-full px-1">{contributors[0].title}</p>
                        
                        <div className="hidden sm:inline-block bg-amber-50 text-amber-800 font-label text-[10px] px-2.5 py-0.5 rounded-full border border-amber-200 mt-3 font-semibold">
                          {contributors[0].tier}
                        </div>
                      </div>
                      
                      {/* Pillar */}
                      <div className="w-full h-32 sm:h-48 bg-gradient-to-t from-amber-50/50 via-amber-50/10 to-pure-white border-2 border-amber-400/40 rounded-2xl shadow-[0_8px_30px_rgba(245,158,11,0.06)] flex flex-col justify-end items-center pb-3 sm:pb-6 transition-all duration-300 group-hover:shadow-[0_15px_35px_rgba(245,158,11,0.12)] group-hover:border-amber-400/60 group-hover:scale-[1.01]">
                        <div className="flex flex-col items-center text-center px-2 sm:px-4 w-full">
                          <span className="font-headline font-black text-3xl sm:text-5xl text-amber-400/30 select-none mb-1 sm:mb-4">1</span>
                          <div className="hidden sm:flex w-full border-t border-amber-200/50 pt-3 justify-around text-[10px]">
                            <div>
                              <p className="font-bold text-charcoal">{contributors[0].karma}</p>
                              <p className="text-muted-silver">Karma</p>
                            </div>
                            <div className="border-l border-amber-200/50 h-6"></div>
                            <div>
                              <p className="font-bold text-charcoal">{contributors[0].hoursSaved}</p>
                              <p className="text-muted-silver">Saved</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                  {/* Rank 3 (Right) */}
                  <Reveal delay={200} duration={600} className="w-1/3 flex flex-col items-center">
                    <div className="flex flex-col items-center w-full group">
                      <div className="relative mb-4 flex flex-col items-center w-full">
                        <div className="relative shrink-0">
                          <img
                            src={contributors[2].avatar}
                            alt={contributors[2].name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 sm:border-4 border-amber-600/40 shadow-md group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-amber-700 text-pure-white text-[9px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full border border-pure-white shadow-sm">
                            #3
                          </span>
                        </div>
                        <h4 className="font-headline font-bold text-charcoal mt-3 sm:mt-6 text-xs sm:text-base text-center truncate w-full px-1">{contributors[2].name}</h4>
                        <p className="font-body text-[9px] sm:text-xs text-muted-silver mt-0.5 text-center truncate w-full px-1">{contributors[2].title}</p>
                        
                        <div className="hidden sm:inline-block bg-smoke text-charcoal font-label text-[10px] px-2.5 py-0.5 rounded-full border border-border-light mt-3">
                          {contributors[2].tier}
                        </div>
                      </div>
                      
                      {/* Pillar */}
                      <div className="w-full h-18 sm:h-28 bg-gradient-to-t from-amber-700/10 via-amber-50/5 to-pure-white border border-amber-700/20 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.01)] flex flex-col justify-end items-center pb-3 sm:pb-6 transition-all duration-300 group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)] group-hover:border-amber-700/30">
                        <div className="flex flex-col items-center text-center px-2 sm:px-4 w-full">
                          <span className="font-headline font-black text-xl sm:text-3xl text-amber-700/20 select-none mb-1 sm:mb-3">3</span>
                          <div className="hidden sm:flex w-full border-t border-[#f0f0f0] pt-3 justify-around text-[10px]">
                            <div>
                              <p className="font-bold text-charcoal">{contributors[2].karma}</p>
                              <p className="text-muted-silver">Karma</p>
                            </div>
                            <div className="border-l border-[#f0f0f0] h-6"></div>
                            <div>
                              <p className="font-bold text-charcoal">{contributors[2].hoursSaved}</p>
                              <p className="text-muted-silver">Saved</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>

                </div>
              </div>
            </div>

            {/* Global Rankings Table */}
            <Reveal delay={300} duration={700}>
              <div className="bg-pure-white border border-border-light rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden mb-12">
                <div className="px-6 py-4 border-b border-border-light">
                  <h4 className="font-headline text-base font-bold text-charcoal">All-Time Rankings</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-smoke font-label text-xs text-muted-silver border-b border-border-light">
                        <th className="px-6 py-3 font-semibold">Rank</th>
                        <th className="px-6 py-3 font-semibold">Contributor</th>
                        <th className="px-6 py-3 font-semibold">Tier</th>
                        <th className="px-6 py-3 font-semibold text-right">Tools Shared</th>
                        <th className="px-6 py-3 font-semibold text-right">Time Saved</th>
                        <th className="px-6 py-3 font-semibold text-right">Karma XP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contributors.map((user) => (
                        <tr key={user.name} className="hover:bg-smoke/30 transition-colors border-b border-border-light last:border-0">
                          <td className="px-6 py-4 font-headline font-bold text-charcoal text-sm">
                            #{user.rank}
                          </td>
                          <td className="px-6 py-4 flex items-center gap-3">
                            <img className="w-10 h-10 rounded-full object-cover" src={user.avatar} alt={`${user.name} avatar`} />
                            <div>
                              <p className="font-headline text-sm font-bold text-charcoal">{user.name}</p>
                              <p className="font-body text-xs text-muted-silver mt-0.5">{user.title}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-label text-xs text-secondary bg-smoke border border-border-light px-2.5 py-1 rounded-full">
                              {user.tier}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-body text-sm text-charcoal text-right">
                            {user.toolsShared}
                          </td>
                          <td className="px-6 py-4 font-body text-sm text-charcoal text-right font-semibold">
                            {user.hoursSaved}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="font-headline font-bold text-scarlett-red text-sm">
                              {user.karma}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </>
        )}
      </div>
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
