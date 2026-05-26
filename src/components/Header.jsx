import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center h-20 px-8 w-full bg-pure-white sticky top-0 z-10 border-b border-border-light">
      <div className="flex-1 max-w-2xl">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-4 text-muted-silver">search</span>
          <input
            className="w-full pl-12 pr-4 py-3 bg-smoke border border-border-light rounded focus:ring-2 focus:ring-scarlett-red focus:border-transparent font-spec-lead text-charcoal placeholder-muted-silver transition-all outline-none hover:shadow-soft-1"
            placeholder="Ask the Hive Mind... (e.g., 'Asana template for QBR')"
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6 ml-6">
        <button className="text-muted-silver hover:text-scarlett-red transition-all duration-300 hover:scale-110 relative">
          <span className="material-symbols-outlined text-base">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-scarlett-red rounded-full"></span>
        </button>
        <Link
          to="/add-recipe"
          className="bg-scarlett-red hover:bg-opacity-90 text-pure-white px-5 py-2 rounded font-spec-lead font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-soft-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-xs">add</span>
          Add New Recipe
        </Link>
      </div>
    </header>
  );
};

export default Header;
