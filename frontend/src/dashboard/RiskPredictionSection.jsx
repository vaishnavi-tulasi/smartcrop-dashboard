import React, { useState } from "react";
import GlassCard from "../components/GlassCard";
import { api } from "../lib/api";

function normalizeRiskLevel(value) {
  const raw = String(value || "").trim().toUpperCase();
  if (raw === "LOW") return "LOW";
  if (raw === "MEDIUM") return "MEDIUM";
  if (raw === "HIGH") return "HIGH";
  return raw || null;
}

function riskStyles(risk) {
  switch (risk) {
    case "LOW":
      return {
        badge: "bg-emerald-500/20 border-emerald-300/30 text-emerald-100",
        glow: "shadow-[0_0_0_1px_rgba(74,222,128,0.25)]",
      };
    case "MEDIUM":
      return {
        badge: "bg-amber-500/20 border-amber-300/30 text-amber-100",
        glow: "shadow-[0_0_0_1px_rgba(251,191,36,0.25)]",
      };
    case "HIGH":
      return {
        badge: "bg-rose-500/20 border-rose-300/30 text-rose-100",
        glow: "shadow-[0_0_0_1px_rgba(244,63,94,0.25)]",
      };
    default:
      return { badge: "bg-white/10 border-white/20 text-slate-100", glow: "" };
  }
}

export default function RiskPredictionSection({ email, onPredictionSuccess }) {
  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [riskLevel, setRiskLevel] = useState(null);

  const predictRisk = async () => {
    setLoading(true);
    setError("");
    setRiskLevel(null);
    try {
      const payload = {
        temperature: Number(temperature),
        rainfall: Number(rainfall),
        email,
      };

      const res = await api.post("/api/risk/predict", payload);

      const candidate =
        res?.data?.riskLevel ?? res?.data?.data?.riskLevel ?? res?.data?.result?.riskLevel;
      const normalized = normalizeRiskLevel(candidate);
      setRiskLevel(normalized || candidate || "UNKNOWN");

      if (normalized && onPredictionSuccess) onPredictionSuccess(normalized);
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Risk prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const styles = riskStyles(riskLevel);

  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">⚠️ Risk Prediction</h3>
          <p className="text-sm text-slate-200/80 mt-1">
            Temperature + rainfall analysis using your registered email.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-left">
            <span className="text-sm text-slate-200/80">Temperature (°C)</span>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder:text-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
              placeholder="e.g., 28"
            />
          </label>

          <label className="block text-left">
            <span className="text-sm text-slate-200/80">Rainfall (mm)</span>
            <input
              type="number"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder:text-slate-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/40"
              placeholder="e.g., 120"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={predictRisk}
          disabled={loading || !email || temperature === "" || rainfall === ""}
          className="w-full rounded-xl bg-amber-500/25 border border-amber-300/30 px-4 py-2 text-white font-medium hover:bg-amber-500/35 transition-colors disabled:opacity-60"
        >
          {loading ? "Predicting..." : "Predict Risk"}
        </button>

        {error ? (
          <div className="rounded-xl bg-rose-500/20 border border-rose-300/30 px-4 py-3 text-rose-100 text-sm">
            {error}
          </div>
        ) : null}

        {riskLevel ? (
          <div className={`rounded-2xl border px-4 py-3 ${styles.badge} ${styles.glow}`}>
            <div className="text-xs text-slate-100/80">Risk Level</div>
            <div className="text-2xl font-bold">{riskLevel}</div>
            {riskLevel === "HIGH" ? (
              <div className="mt-2 text-sm text-white/85">
                📧 Email sent automatically if risk is HIGH
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </GlassCard>
  );
}

