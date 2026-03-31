// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Sidebar() {

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     navigate("/login");
//   };

//   return (
//     <div style={{
//       width: "220px",
//       height: "100vh",
//       backgroundColor: "#1b5e20",
//       color: "white",
//       padding: "20px",
//       position: "fixed",
//       top: 0,
//       left: 0
//     }}>
//       <h2>🌾 SmartCrop</h2>

//       <hr />

//       <p onClick={() => navigate("/")} style={{ cursor: "pointer" }}>🏠 Dashboard</p>
//       <p onClick={() => navigate("/risk")} style={{ cursor: "pointer" }}>⚠️ Risk</p>
//       <p onClick={() => navigate("/weather")} style={{ cursor: "pointer" }}>🌤 Weather</p>
//       <p onClick={() => navigate("/upload")} style={{ cursor: "pointer" }}>📁 Upload</p>

//       <hr />

//       <p 
//         onClick={handleLogout} 
//         style={{ cursor: "pointer", color: "red" }}
//       >
//         🚪 Logout
//       </p>
//     </div>
//   );
// }

// export default Sidebar;
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AlertTriangle, Cloud, LayoutDashboard, LogOut, Upload } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

function NavItem({ to, label, icon: Icon, active, onNavigate }) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={`group flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all ${
        active
          ? "bg-white/20 border-white/35 shadow-xl"
          : "bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/25"
      }`}
    >
      <span
        className={`h-10 w-10 rounded-2xl border flex items-center justify-center transition-all ${
          active ? "bg-emerald-500/20 border-emerald-300/25" : "bg-white/10 border-white/20"
        }`}
      >
        <Icon size={18} className={active ? "text-white" : "text-slate-100"} />
      </span>
      <span className="text-sm font-semibold text-white/95">{label}</span>
      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-white/75 text-xs">
        →
      </span>
    </Link>
  );
}

export default function Sidebar({ variant = "desktop", onNavigate }) {
  const location = useLocation();
  const { logout } = useAuth();

  const items = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/weather", label: "Weather", icon: Cloud },
    { to: "/risk", label: "Risk Analysis", icon: AlertTriangle },
    { to: "/upload", label: "Disease Detection", icon: Upload },
  ];

  const handleLogout = () => {
    logout();
    if (onNavigate) onNavigate();
    // Route redirection is handled by ProtectedRoute after logout.
    window.location.href = "/";
  };

  const className =
    variant === "desktop"
      ? "sticky top-24"
      : "w-full rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl";

  return (
    <aside className={className}>
      <div
        className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-4 ${
          variant === "desktop" ? "h-[calc(100vh-6rem)] flex flex-col" : ""
        }`}
      >
        <div className="px-2 py-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-lime-300/10 border border-emerald-200/30 flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <div className="text-white font-semibold">SmartCrop</div>
              <div className="text-xs text-slate-200/70">Risk Prediction System</div>
            </div>
          </div>
        </div>

        <nav className="mt-2 flex-1 space-y-2">
          {items.map((it) => (
            <NavItem
              key={it.to}
              to={it.to}
              label={it.label}
              icon={it.icon}
              active={location.pathname === it.to}
              onNavigate={onNavigate}
            />
          ))}
        </nav>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 bg-rose-500/15 border border-rose-300/30 hover:bg-rose-500/25 transition-colors"
          >
            <span className="h-10 w-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <LogOut size={18} className="text-rose-100" />
            </span>
            <span className="text-sm font-semibold text-rose-100">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
