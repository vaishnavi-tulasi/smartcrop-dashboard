import React from "react";

export default function GlassCard({ children, className = "" }) {
  return (
    <section
      className={`backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-xl shadow-glass transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/25 hover:border-white/40 ${
        className || ""
      } smartcrop-anim-fade-in-up`}
    >
      {children}
    </section>
  );
}

