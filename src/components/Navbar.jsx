import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const userName = user?.name || user?.email || "Farmer";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-6xl px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl shadow-glass px-4 py-3 flex items-center justify-between smartcrop-anim-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400/30 to-lime-300/10 border border-emerald-200/30 flex items-center justify-center">
            <span className="text-xl">🌾</span>
          </div>
          <div className="leading-tight">
            <div className="text-white font-semibold tracking-wide">SmartCrop</div>
            <div className="text-slate-200/80 text-xs">Crop Risk Prediction</div>
          </div>
        </div>

        <nav className="hidden sm:flex items-center gap-5">
          <Link
            to="/dashboard"
            className="text-slate-100/90 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <div className="text-xs text-slate-200/80">Logged in as</div>
            <div className="text-sm text-white font-medium">{userName}</div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl px-3 py-2 text-sm font-medium bg-rose-500/20 border border-rose-300/30 hover:bg-rose-500/30 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}