// import { useState } from "react";
// import api from "../services/api";

// function Risk() {
//   const [form, setForm] = useState({
//     cropName: "",
//     location: "",
//     temperature: "",
//     rainfall: "",
//     humidity: ""
//   });

//   const [result, setResult] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const predict = async () => {
//     try {
//       const res = await api.post("/risk/predict", form);
//       setResult(res.data.riskLevel);
//     } catch (err) {
//       alert("Error connecting backend");
//     }
//   };

//   return (
//     <div className="form">
//       <h2>🌾 Risk Prediction</h2>

//       <input name="cropName" placeholder="Crop" onChange={handleChange} />
//       <input name="location" placeholder="Location" onChange={handleChange} />
//       <input name="temperature" placeholder="Temperature" onChange={handleChange} />
//       <input name="rainfall" placeholder="Rainfall" onChange={handleChange} />
//       <input name="humidity" placeholder="Humidity" onChange={handleChange} />

//       <button onClick={predict}>Predict</button>

//       <h3>{result}</h3>
//     </div>
//   );
// }

// export default Risk;
// import React from "react";
// import Navbar from "../components/Navbar";

// function Risk() {
//   return (
//     <div>
//       <Navbar />
//       <h2>Risk Page</h2>
//     </div>
//   );
// }

// export default Risk;
// import React, { useState } from "react";
// import Navbar from "../components/Navbar";

// function Risk() {

//   const [temperature, setTemperature] = useState("");
//   const [rainfall, setRainfall] = useState("");
//   const [risk, setRisk] = useState("");

//   const handlePredict = async () => {

//     const user = JSON.parse(localStorage.getItem("user"));
//     const email = user?.email;

//     const res = await fetch("http://localhost:8080/api/risk/predict", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ temperature, rainfall }),
//     });

//     const data = await res.json();
//     setRisk(data.riskLevel);

//     if (data.riskLevel === "HIGH") {
//       await fetch("http://localhost:8080/api/risk/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           subject: "High Crop Risk",
//           text: "Your crop is at HIGH risk. Take action immediately!",
//         }),
//       });

//       alert("📧 Email sent automatically!");
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: "20px" }}>
//         <h2>🌾 Risk Prediction</h2>

//         <input placeholder="Temperature" onChange={(e) => setTemperature(e.target.value)} />
//         <br /><br />

//         <input placeholder="Rainfall" onChange={(e) => setRainfall(e.target.value)} />
//         <br /><br />

//         <button onClick={handlePredict}>Predict</button>

//         {risk && <h3>⚠️ Risk: {risk}</h3>}
//       </div>
//     </div>
//   );
// }

// export default Risk;
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AlertTriangle, Droplets, ThermometerSun, Zap } from "lucide-react";
import { api } from "../lib/api";
import GlassCard from "../components/GlassCard";
import Spinner from "../components/Spinner";
import { useAuth } from "../auth/AuthContext";

function normalizeRiskLevel(value) {
  const raw = String(value || "").trim().toUpperCase();
  if (raw === "LOW") return "LOW";
  if (raw === "MEDIUM") return "MEDIUM";
  if (raw === "HIGH") return "HIGH";
  return raw || null;
}

function riskGradients(risk) {
  switch (risk) {
    case "LOW":
      return {
        container: "bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-white/5 border-emerald-300/25",
        text: "text-emerald-100",
        icon: "text-emerald-200",
        label: "Low risk detected",
      };
    case "MEDIUM":
      return {
        container: "bg-gradient-to-br from-amber-500/25 via-amber-400/10 to-white/5 border-amber-300/25",
        text: "text-amber-100",
        icon: "text-amber-200",
        label: "Moderate risk detected",
      };
    case "HIGH":
      return {
        container: "bg-gradient-to-br from-rose-500/25 via-rose-400/10 to-white/5 border-rose-300/25",
        text: "text-rose-100",
        icon: "text-rose-200",
        label: "High risk detected",
      };
    default:
      return {
        container: "bg-white/10 border-white/20",
        text: "text-white",
        icon: "text-white",
        label: "Risk detected",
      };
  }
}

export default function Risk() {
  const { user } = useAuth();
  const defaultEmail = user?.email || "";

  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [email, setEmail] = useState(defaultEmail);

  useEffect(() => {
    setEmail(defaultEmail);
  }, [defaultEmail]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const risk = useMemo(() => normalizeRiskLevel(result?.riskLevel ?? result), [result]);
  const gradients = useMemo(() => riskGradients(risk), [risk]);

  const handlePredict = async () => {
    const tempN = Number(temperature);
    const rainN = Number(rainfall);
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!Number.isFinite(tempN) || !Number.isFinite(rainN)) {
      toast.error("Temperature and rainfall must be valid numbers");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await api.post("/api/risk/predict", {
        temperature: tempN,
        rainfall: rainN,
        email,
      });

      const candidate =
        res?.data?.riskLevel ??
        res?.data?.data?.riskLevel ??
        res?.data?.result?.riskLevel ??
        res?.data?.result ??
        res?.data;

      const normalized = normalizeRiskLevel(candidate);

      const next = { riskLevel: normalized || candidate };
      setResult(next);

      toast.success(`Risk predicted: ${normalized || candidate}`);
      if ((normalized || candidate) === "HIGH") {
        toast("HIGH risk alert will be emailed automatically", { icon: <AlertTriangle size={16} /> });
      }
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Risk prediction failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="mb-6"
      >
        <GlassCard className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="text-sm text-slate-200/80">Risk analysis</div>
              <h1 className="text-2xl font-semibold text-white mt-1">⚠️ Risk Prediction</h1>
              <p className="text-sm text-slate-200/80 mt-1">
                Enter temperature + rainfall, and we’ll predict the crop risk level.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 border border-white/20 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-200/70">Smart Alerts</div>
              <div className="mt-2 text-sm text-slate-200/80 inline-flex items-center gap-2">
                <Zap size={16} />
                LOW/MEDIUM/HIGH insights for safer farming decisions
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-200/80">Temperature (°C)</span>
                <ThermometerSun size={16} className="text-emerald-200" />
              </div>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="mt-2 w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder:text-slate-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                placeholder="e.g., 28"
              />
            </label>

            <label className="block">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-200/80">Rainfall (mm)</span>
                <Droplets size={16} className="text-sky-200" />
              </div>
              <input
                type="number"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
                className="mt-2 w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder:text-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                placeholder="e.g., 120"
              />
            </label>

            <label className="block sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-200/80">Email</span>
                <AlertTriangle size={16} className="text-amber-200" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-2xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder:text-slate-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                placeholder="your email"
                autoComplete="email"
              />
            </label>
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl bg-rose-500/20 border border-rose-300/30 px-4 py-3 text-rose-100 text-sm">
              {error}
            </div>
          ) : null}

          <button
            type="button"
            onClick={handlePredict}
            disabled={loading}
            className="mt-5 w-full rounded-2xl bg-amber-500/25 border border-amber-300/30 px-4 py-3 text-white font-semibold hover:bg-amber-500/35 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner /> Predicting...
              </span>
            ) : (
              "Predict Risk"
            )}
          </button>

          <div className="mt-4 text-sm text-slate-200/80">
            Tip: use recent values to get the most reliable risk signals.
          </div>
        </GlassCard>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <GlassCard className="p-6">
              {!risk ? (
                <div className="h-full min-h-[240px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white font-semibold text-lg">Awaiting prediction</div>
                    <div className="text-slate-200/80 text-sm mt-2">
                      Fill the form and click <span className="text-amber-200 font-semibold">Predict Risk</span>.
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`rounded-2xl border p-5 ${gradients.container}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-200/70">
                        Risk Level
                      </div>
                      <div className={`mt-2 text-4xl font-bold ${gradients.text}`}>
                        {risk}
                      </div>
                      <div className="mt-2 text-sm text-slate-200/80">
                        {gradients.label}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                      <AlertTriangle size={22} className={gradients.icon} />
                    </div>
                  </div>

                  {risk === "HIGH" ? (
                    <div className="mt-4 rounded-2xl bg-rose-500/15 border border-rose-300/25 px-4 py-3 text-rose-100 text-sm">
                      📧 Email sent automatically if risk is HIGH
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl bg-white/5 border border-white/15 px-4 py-3 text-slate-200/80 text-sm">
                      Keep monitoring to stay ahead of changes.
                    </div>
                  )}
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}