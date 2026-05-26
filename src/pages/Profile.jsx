import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Reveal from '../components/Reveal';
import { api } from '../services/api';

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
                <div className="bg-pure-white rounded-3xl p-6 border border-border-light shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full">
                  <h3 className="font-spec-h2 font-bold text-charcoal mb-6">Mastery Badges</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col items-center p-4 bg-smoke rounded-2xl border border-border-light w-[100px] text-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer">
                      <span className="material-symbols-outlined text-yellow-500 text-2xl mb-2">military_tech</span>
                      <span className="font-spec-tagline text-charcoal font-bold">Builder</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-smoke rounded-2xl border border-border-light w-[100px] text-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer">
                      <span className="material-symbols-outlined text-blue-500 text-2xl mb-2">terminal</span>
                      <span className="font-spec-tagline text-charcoal font-bold">Scripter</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-smoke rounded-2xl border border-border-light w-[100px] text-center hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer">
                      <span className="material-symbols-outlined text-green-500 text-2xl mb-2">bolt</span>
                      <span className="font-spec-tagline text-charcoal font-bold">Optimizer</span>
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
