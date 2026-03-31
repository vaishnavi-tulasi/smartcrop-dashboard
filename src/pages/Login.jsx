// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   // ✅ AUTO REDIRECT IF ALREADY LOGGED IN
//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     if (isLoggedIn) {
//       navigate("/");
//     }
//   }, []);

//   const handleLogin = () => {

//     if (email === "admin@gmail.com" && password === "1234") {

//       localStorage.setItem("isLoggedIn", "true"); // ✅ IMPORTANT

//       alert("Login Successful ✅");
//       navigate("/");

//     } else {
//       alert("Invalid Credentials ❌");
//     }
//   };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h2>🔐 Login Page</h2>

//       <input
//         type="email"
//         placeholder="Enter Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <br /><br />

//       <input
//         type="password"
//         placeholder="Enter Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br /><br />

//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Lock, Mail, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../auth/AuthContext";
import GlassCard from "../components/GlassCard";
import Spinner from "../components/Spinner";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    } catch (e) {
      const msg = e?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen smartcrop-app-bg flex">
      <div className="hidden lg:block w-1/2 p-10">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="h-full rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-sky-400/10 to-amber-200/10" />
          <div className="relative p-10 flex flex-col h-full">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-lime-300/10 border border-emerald-200/30 flex items-center justify-center">
                <Leaf size={20} className="text-emerald-100" />
              </div>
              <div>
                <div className="text-white font-semibold text-lg">SmartCrop</div>
                <div className="text-slate-200/80 text-sm">Crop Risk Prediction System</div>
              </div>
            </div>

            <div className="mt-10">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-white/90 text-sm">
                <Sparkles size={16} />
                Premium SaaS Analytics for farmers
              </div>

              <h1 className="mt-6 text-4xl font-semibold text-white leading-tight">
                See risk early.
                <br />
                Protect crops.
              </h1>
              <p className="mt-4 text-slate-200/80 max-w-md">
                SmartCrop combines weather signals, risk prediction, and disease detection to help you act with confidence.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3">
                <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                  <div className="text-white font-semibold">🌦 Weather Intelligence</div>
                  <div className="text-slate-200/80 text-sm mt-1">Temperature + humidity insights in seconds.</div>
                </div>
                <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                  <div className="text-white font-semibold">⚠️ Risk Analysis</div>
                  <div className="text-slate-200/80 text-sm mt-1">LOW, MEDIUM, HIGH predictions with smart alerts.</div>
                </div>
                <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
                  <div className="text-white font-semibold">🖼️ Disease Detection</div>
                  <div className="text-slate-200/80 text-sm mt-1">Upload images and get a disease result quickly.</div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-10 text-slate-200/70 text-sm">
              Secure by design. Glass UI for clear insights.
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-8">
            <div className="smartcrop-anim-fade-in-up">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-lime-300/10 border border-emerald-200/30 flex items-center justify-center">
                  <span className="text-xl">🌾</span>
                </div>
                <h1 className="text-2xl font-semibold text-white">SmartCrop</h1>
              </div>

              <p className="text-slate-200/80 text-sm mb-6 text-center">
                Sign in to access premium crop analytics.
              </p>

              <h2 className="text-xl font-semibold text-white mb-5">🔐 Login</h2>

              {error ? (
                <div className="mb-4 rounded-xl bg-rose-500/20 border border-rose-300/30 px-4 py-3 text-rose-100 text-sm">
                  {error}
                </div>
              ) : null}

              <div className="space-y-4">
                <label className="block">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-200/80">Email</span>
                  </div>
                  <div className="relative mt-2">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-200/60" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-white/10 border border-white/20 pl-9 pr-4 py-2 text-white placeholder:text-slate-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                      placeholder="name@example.com"
                      autoComplete="email"
                    />
                  </div>
                </label>

                <label className="block">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-200/80">Password</span>
                  </div>
                  <div className="relative mt-2">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-200/60" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl bg-white/10 border border-white/20 pl-9 pr-4 py-2 text-white placeholder:text-slate-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                      placeholder="Enter password"
                      autoComplete="current-password"
                    />
                  </div>
                </label>

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full rounded-xl bg-emerald-500/25 border border-emerald-300/30 px-4 py-2 text-white font-medium hover:bg-emerald-500/35 transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Spinner /> Signing in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>

                <p className="text-sm text-slate-200/80 text-center">
                  New user?{" "}
                  <Link to="/signup" className="text-emerald-200 hover:underline">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}