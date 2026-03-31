import React from "react";
import GlassCard from "../components/GlassCard";

function normalizeRisk(level) {
  const raw = String(level || "").trim().toUpperCase();
  if (raw === "LOW") return "LOW";
  if (raw === "MEDIUM") return "MEDIUM";
  if (raw === "HIGH") return "HIGH";
  return raw || "UNKNOWN";
}

function riskBadgeClass(risk) {
  switch (risk) {
    case "LOW":
      return "bg-emerald-500/15 border-emerald-300/30 text-emerald-100";
    case "MEDIUM":
      return "bg-amber-500/15 border-amber-300/30 text-amber-100";
    case "HIGH":
      return "bg-rose-500/15 border-rose-300/30 text-rose-100";
    default:
      return "bg-white/10 border-white/20 text-slate-100";
  }
}

export default function FarmerHistorySection({ items = [], loading = false }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">📜 Farmer History</h3>
          <p className="text-sm text-slate-200/80 mt-1">
            Recent risk predictions saved in the system.
          </p>
        </div>
      </div>

      <div className="mt-5">
        {loading ? (
          <div className="text-slate-200/80 text-sm">Loading history...</div>
        ) : items?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="text-xs uppercase tracking-wide text-slate-200/70 py-3 px-3 bg-white/5 border-t border-b border-white/15">
                    Temperature
                  </th>
                  <th className="text-xs uppercase tracking-wide text-slate-200/70 py-3 px-3 bg-white/5 border-t border-b border-white/15">
                    Rainfall
                  </th>
                  <th className="text-xs uppercase tracking-wide text-slate-200/70 py-3 px-3 bg-white/5 border-t border-b border-white/15">
                    Risk Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const temperature =
                    item?.temperature ?? item?.temp ?? item?.t ?? item?.Temperature;
                  const rainfall =
                    item?.rainfall ?? item?.rain ?? item?.r ?? item?.Rainfall;
                  const riskRaw =
                    item?.riskLevel ?? item?.risk ?? item?.RiskLevel ?? item?.Risk;
                  const risk = normalizeRisk(riskRaw);

                  return (
                    <tr key={idx}>
                      <td className="py-3 px-3 border-b border-white/10 text-sm text-white/90">
                        {temperature ?? "-"}
                      </td>
                      <td className="py-3 px-3 border-b border-white/10 text-sm text-white/90">
                        {rainfall ?? "-"}
                      </td>
                      <td className="py-3 px-3 border-b border-white/10 text-sm">
                        <span
                          className={`inline-flex items-center rounded-xl px-3 py-1 border ${riskBadgeClass(
                            risk
                          )}`}
                        >
                          {risk}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-slate-200/80 text-sm">
            No history available yet.
          </div>
        )}
      </div>
    </GlassCard>
  );
}

