import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('sidebar-collapsed', isCollapsed);
    localStorage.setItem('sidebar-collapsed', isCollapsed);
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  const navItems = [
    {
      name: 'Explore',
      path: '/dashboard',
      icon: 'explore',
    },
    {
      name: 'AI Recipes',
      path: '/recipes',
      icon: 'apps',
    },
    {
      name: 'Leaderboard',
      path: '/leaderboard',
      icon: 'leaderboard',
    },
    {
      name: 'My Contributions',
      path: '/profile',
      icon: 'reorder',
    },
  ];

  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-screen sidebar-container bg-menu-black py-6 border-r border-pitch-black z-20 text-menu-gray">
      {/* Sidebar Collapse Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute right-[-14px] top-6 w-7 h-7 bg-primary text-pure-white rounded-full flex items-center justify-center border border-pitch-black hover:bg-red-700 transition-all duration-300 hover:scale-110 z-30 cursor-pointer shadow-md select-none"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        <span className="material-symbols-outlined text-[16px] font-bold">
          {isCollapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>

      <div className={`px-5 mb-8 transition-all duration-300 ${isCollapsed ? 'flex justify-center px-2' : ''}`}>
        {isCollapsed ? (
          <Link
            to="/"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-pure-white font-spec-h1 font-bold select-none animate-fade-in-scale cursor-pointer"
            title="Go to Landing Page"
          >
            S
          </Link>
        ) : (
          <Link to="/" className="animate-fade-in-scale block cursor-pointer" title="Go to Landing Page">
            <img
              alt="ShareHouse"
              className="h-[64px] object-contain"
              src="/logo-dark-bg.png"
            />
            <p className="font-spec-tagline text-muted-silver mt-2 block">// Internal Marketplace</p>
          </Link>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  title={isCollapsed ? item.name : ''}
                  className={`flex items-center transition-all duration-300 transform ${
                    isCollapsed ? 'justify-center py-3 px-2' : 'gap-3 py-3 px-5'
                  } ${
                    isActive
                      ? 'text-pure-white font-semibold border-l-4 border-scarlett-red bg-inverse-surface scale-[0.98] hover:scale-100'
                      : 'text-menu-gray hover:bg-inverse-surface hover:text-pure-white hover:scale-105 border-l-4 border-transparent'
                  }`}
                >
                  <span className={`material-symbols-outlined text-base ${isActive ? 'filled-icon' : ''}`}>
                    {item.icon}
                  </span>
                  <span className={`font-spec-lead font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden ${
                    isCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100'
                  }`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto">
        <ul className="space-y-2 mb-6">
          <li>
            <Link
              to="#"
              title={isCollapsed ? "Settings" : ""}
              className={`flex items-center transition-all duration-300 transform ${
                isCollapsed ? 'justify-center py-3 px-2' : 'gap-3 py-3 px-5'
              } text-menu-gray hover:bg-inverse-surface hover:text-pure-white hover:scale-105 border-l-4 border-transparent`}
            >
              <span className="material-symbols-outlined text-base">settings</span>
              <span className={`font-spec-lead transition-all duration-300 whitespace-nowrap overflow-hidden ${
                isCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100'
              }`}>
                Settings
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              title={isCollapsed ? "Help" : ""}
              className={`flex items-center transition-all duration-300 transform ${
                isCollapsed ? 'justify-center py-3 px-2' : 'gap-3 py-3 px-5'
              } text-menu-gray hover:bg-inverse-surface hover:text-pure-white hover:scale-105 border-l-4 border-transparent`}
            >
              <span className="material-symbols-outlined text-base">help_outline</span>
              <span className={`font-spec-lead transition-all duration-300 whitespace-nowrap overflow-hidden ${
                isCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100'
              }`}>
                Help
              </span>
            </Link>
          </li>
        </ul>

        <div 
          title={isCollapsed ? "Alex Rivera (alex.r@sharehouse.inc)" : ""}
          className={`px-5 border-t border-pitch-black pt-6 flex items-center transition-all duration-300 cursor-pointer hover:opacity-80 ${
            isCollapsed ? 'justify-center px-2' : 'gap-3'
          }`}
        >
          <img
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover shrink-0"
            src="/avatars/alex.png"
          />
          <div className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
            isCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100'
          }`}>
            <p className="font-spec-name text-pure-white">Alex Rivera</p>
            <p className="font-spec-position text-muted-silver">alex.r@sharehouse.inc</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

