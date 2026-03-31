import React from "react";
import { Bell, Menu, Search } from "lucide-react";

export default function Topbar({ userName, onToggleSidebar }) {
  const initial = userName?.trim()?.[0]?.toUpperCase?.() || "U";

  return (
    <div className="sticky top-4 z-40 mx-auto w-full max-w-6xl px-4 pt-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-xl px-4 py-3 flex items-center justify-between smartcrop-anim-fade-in-up">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden rounded-xl p-2 bg-white/10 border border-white/20 hover:bg-white/15 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={18} className="text-white" />
          </button>

          <div className="hidden sm:block">
            <div className="text-xs text-slate-200/80">Workspace</div>
            <div className="text-sm text-white font-semibold">SmartCrop</div>
          </div>
        </div>

        <div className="flex-1 px-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-200/70" />
            <input
              type="text"
              placeholder="Search predictions, cities, risks..."
              className="w-full rounded-2xl bg-white/10 border border-white/20 pl-9 pr-3 py-2 text-white placeholder:text-slate-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-xl p-2 bg-white/10 border border-white/20 hover:bg-white/15 transition-colors"
          >
            <Bell size={18} className="text-white" />
          </button>

          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-lime-300/10 border border-emerald-200/30 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">{initial}</span>
            </div>
            <div className="hidden md:block text-right leading-tight">
              <div className="text-xs text-slate-200/80">Hi</div>
              <div className="text-sm text-white font-semibold">{userName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

