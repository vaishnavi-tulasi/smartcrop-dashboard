import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAuth } from "../auth/AuthContext";

export default function SaaSLayout({ children }) {
  const location = useLocation();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userName = useMemo(() => {
    return user?.name || user?.email || "Farmer";
  }, [user?.name, user?.email]);

  return (
    <div className="smartcrop-app-bg min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-4">
        <Topbar userName={userName} onToggleSidebar={() => setSidebarOpen(true)} />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
        <div className="flex gap-5">
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <Sidebar variant="desktop" />
          </div>

          <AnimatePresence>
            {sidebarOpen ? (
              <motion.div
                key="mobile-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden fixed inset-0 bg-black/40 z-50"
                onClick={() => setSidebarOpen(false)}
              />
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {sidebarOpen ? (
              <motion.div
                key="mobile-sidebar"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="lg:hidden fixed top-24 left-4 right-4 z-50"
              >
                <Sidebar variant="mobile" onNavigate={() => setSidebarOpen(false)} />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

