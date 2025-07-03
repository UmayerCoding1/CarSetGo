import React from 'react';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const AbminDesboardNavbar = () => {
  return (
    <nav className="w-full bg-gradient-to-br from-[#0f172a] via-[#164e63] to-[#06b6d4] shadow-xl border-b border-cyan-900 px-4 py-2 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-2">
          <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-cyan-700 flex items-center justify-center shadow-lg">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
          </span>
          <span className="text-xl font-extrabold tracking-tight text-cyan-100 drop-shadow">Admin Dashboard</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        {/* Admin Info */}
        <div className="flex items-center gap-2 bg-gradient-to-tr from-cyan-100 to-cyan-300 px-3 py-1 rounded-lg shadow">
          <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-cyan-700 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white">A</span>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-cyan-900">Admin</div>
            <div className="text-xs text-cyan-700">admin@carsetgo.com</div>
          </div>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-800 text-white font-semibold hover:from-cyan-700 hover:to-cyan-900 transition-colors text-sm shadow-lg border border-cyan-900"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Back Home</span>
        </Link>
      </div>
    </nav>
  );
};

export default AbminDesboardNavbar;