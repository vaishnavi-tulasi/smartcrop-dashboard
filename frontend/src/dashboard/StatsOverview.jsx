import React, { useMemo } from "react";
import GlassCard from "../components/GlassCard";

function normalizeRisk(level) {
  const raw = String(level || "").trim().toUpperCase();
  if (raw === "LOW") return "LOW";
  if (raw === "MEDIUM") return "MEDIUM";
  if (raw === "HIGH") return "HIGH";
  return "UNKNOWN";
}

function StatCard({ title, value, hint, accentClass }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-200/70">{title}</div>
          <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
          {hint ? <div className="mt-1 text-sm text-slate-200/75">{hint}</div> : null}
        </div>
        <div className={`h-10 w-10 rounded-2xl border bg-white/10 flex items-center justify-center ${accentClass}`}>
          <span className="text-lg">•</span>
        </div>
      </div>
    </GlassCard>
  );
}

export default function StatsOverview({ history = [] }) {
  const stats = useMemo(() => {
    const total = history.length;
    let low = 0;
    let medium = 0;
    let high = 0;

    for (const item of history) {
      const riskRaw = item?.riskLevel ?? item?.risk ?? item?.RiskLevel ?? item?.Risk;
      const risk = normalizeRisk(riskRaw);
      if (risk === "LOW") low += 1;
      else if (risk === "MEDIUM") medium += 1;
      else if (risk === "HIGH") high += 1;
    }

    const last = history[history.length - 1];
    const lastRisk = normalizeRisk(last?.riskLevel ?? last?.risk ?? last?.RiskLevel ?? last?.Risk);

    return { total, low, medium, high, lastRisk };
  }, [history]);

  const lastRiskChip =
    stats.lastRisk === "HIGH"
      ? "bg-rose-500/20 border-rose-300/30 text-rose-100"
      : stats.lastRisk === "MEDIUM"
        ? "bg-amber-500/20 border-amber-300/30 text-amber-100"
        : stats.lastRisk === "LOW"
          ? "bg-emerald-500/20 border-emerald-300/30 text-emerald-100"
          : "bg-white/10 border-white/20 text-slate-100";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <StatCard
        title="Total Predictions"
        value={stats.total}
        hint="All-time (from history)"
        accentClass="border-emerald-300/25 text-emerald-100"
      />
      <StatCard
        title="Low Risk"
        value={stats.low}
        hint="Safe conditions"
        accentClass="border-emerald-300/25 text-emerald-100"
      />
      <StatCard
        title="Medium Risk"
        value={stats.medium}
        hint="Monitor closely"
        accentClass="border-amber-300/25 text-amber-100"
      />
      <GlassCard className="p-5">
        <div className="text-xs uppercase tracking-wide text-slate-200/70">Latest Risk</div>
        <div className="mt-3">
          <span className={`inline-flex items-center rounded-2xl px-4 py-2 border ${lastRiskChip}`}>
            <span className="text-sm font-semibold">{stats.lastRisk}</span>
          </span>
        </div>
        <div className="mt-3 text-sm text-slate-200/75">Most recent prediction outcome</div>
      </GlassCard>
    </div>
  );
}

