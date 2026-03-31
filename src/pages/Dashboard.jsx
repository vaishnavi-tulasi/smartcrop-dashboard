// import Card from "../components/Card";

// function Dashboard() {
//   return (
//     <div>
//       <h1>Dashboard</h1>

//       <div className="grid">
//         <Card title="Total Predictions" value="10" />
//         <Card title="High Risk" value="3" />
//         <Card title="Medium Risk" value="4" />
//         <Card title="Low Risk" value="3" />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import React from "react";
// import Navbar from "../components/Navbar";

// function Dashboard() {
//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: "20px" }}>
//         <h2>Welcome Farmer 🌾</h2>
//         <p>This is your SmartCrop Dashboard</p>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  AlertTriangle,
  BarChart3,
  Droplets,
  ThermometerSun,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import GlassCard from "../components/GlassCard";
import Spinner from "../components/Spinner";
import { useAuth } from "../auth/AuthContext";

function extractHistoryList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.result)) return data.result;
  if (Array.isArray(data?.history)) return data.history;
  return [];
}

function normalizeRisk(level) {
  const raw = String(level || "").trim().toUpperCase();
  if (raw === "LOW") return "LOW";
  if (raw === "MEDIUM") return "MEDIUM";
  if (raw === "HIGH") return "HIGH";
  return "UNKNOWN";
}

function toFiniteNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function Dashboard() {
  const { user } = useAuth();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/api/risk/all");
      setHistory(extractHistoryList(res.data));
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Failed to fetch history";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const analytics = useMemo(() => {
    let tempSum = 0;
    let rainSum = 0;
    let tempCount = 0;
    let rainCount = 0;

    let low = 0;
    let medium = 0;
    let high = 0;

    for (const item of history) {
      const temperature = toFiniteNumber(item?.temperature ?? item?.temp ?? item?.Temperature ?? item?.t);
      const rainfall = toFiniteNumber(item?.rainfall ?? item?.rain ?? item?.Rainfall ?? item?.r);
      if (temperature != null) {
        tempSum += temperature;
        tempCount += 1;
      }
      if (rainfall != null) {
        rainSum += rainfall;
        rainCount += 1;
      }

      const risk = normalizeRisk(item?.riskLevel ?? item?.risk ?? item?.RiskLevel ?? item?.Risk);
      if (risk === "LOW") low += 1;
      else if (risk === "MEDIUM") medium += 1;
      else if (risk === "HIGH") high += 1;
    }

    const avgTemperature = tempCount ? tempSum / tempCount : null;
    const avgRainfall = rainCount ? rainSum / rainCount : null;
    const total = history.length;

    const pct = (n) => (total ? Math.round((n / total) * 100) : 0);

    return {
      total,
      avgTemperature,
      avgRainfall,
      dist: { low, medium, high },
      pct: { low: pct(low), medium: pct(medium), high: pct(high) },
    };
  }, [history]);

  const lineChartData = useMemo(() => {
    return history.map((item, idx) => {
      const temperature = toFiniteNumber(item?.temperature ?? item?.temp ?? item?.Temperature ?? item?.t) ?? 0;
      const rainfall = toFiniteNumber(item?.rainfall ?? item?.rain ?? item?.Rainfall ?? item?.r) ?? 0;
      return {
        x: idx + 1,
        temperature,
        rainfall,
      };
    });
  }, [history]);

  const barChartData = useMemo(() => {
    return [
      { risk: "LOW", value: analytics.dist.low },
      { risk: "MEDIUM", value: analytics.dist.medium },
      { risk: "HIGH", value: analytics.dist.high },
    ];
  }, [analytics.dist.high, analytics.dist.low, analytics.dist.medium]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <GlassCard className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-4 py-2">
                <span className="text-lg">🌾</span>
                <span className="text-sm font-semibold text-white">Welcome to SmartCrop Dashboard</span>
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white leading-tight">
                Premium analytics for your crops
              </h2>
              <p className="mt-2 text-slate-200/80">
                {user?.name ? `Hi ${user.name}, ` : ""}track weather signals, risk patterns, and prediction history.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/20 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-200/70">Total Predictions</div>
              <div className="mt-2 text-4xl font-semibold text-white">{analytics.total}</div>
              <div className="mt-2 text-sm text-slate-200/80 inline-flex items-center gap-2">
                <TrendingUp size={16} /> From saved activity
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {error ? (
        <div className="mt-6 rounded-2xl bg-rose-500/20 border border-rose-300/30 px-5 py-4 text-rose-100">
          {error}
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <GlassCard className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-200/70">Avg Temperature</div>
              <div className="mt-2 text-3xl font-semibold text-white">
                {analytics.avgTemperature == null ? "—" : `${analytics.avgTemperature.toFixed(1)}°C`}
              </div>
              <div className="mt-1 text-sm text-slate-200/80">Across all predictions</div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
              <ThermometerSun className="text-emerald-200" size={20} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-200/70">Avg Rainfall</div>
              <div className="mt-2 text-3xl font-semibold text-white">
                {analytics.avgRainfall == null ? "—" : `${analytics.avgRainfall.toFixed(1)} mm`}
              </div>
              <div className="mt-1 text-sm text-slate-200/80">Across all predictions</div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
              <Droplets className="text-sky-200" size={20} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-200/70">Risk Level Summary</div>
              <div className="mt-2 text-xl font-semibold text-white">
                {analytics.total ? (
                  <>
                    <span className="text-emerald-200">{analytics.dist.low} Low</span>{" "}
                    <span className="text-amber-200">{analytics.dist.medium} Medium</span>{" "}
                    <span className="text-rose-200">{analytics.dist.high} High</span>
                  </>
                ) : (
                  "—"
                )}
              </div>
              <div className="mt-2 text-sm text-slate-200/80">
                {analytics.total ? (
                  <>
                    HIGH <span className="text-rose-200 font-semibold">{analytics.pct.high}%</span>
                  </>
                ) : (
                  "No activity yet."
                )}
              </div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
              <AlertTriangle className="text-rose-200" size={20} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-200/70">Predictions</div>
              <div className="mt-2 text-3xl font-semibold text-white">{analytics.total}</div>
              <div className="mt-1 text-sm text-slate-200/80">
                Keep generating to improve trend visibility
              </div>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
              <BarChart3 className="text-emerald-200" size={20} />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Temperature vs Rainfall</h3>
              <p className="text-sm text-slate-200/80 mt-1">Line chart across prediction history</p>
            </div>
          </div>

          <div className="mt-5 h-72">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : analytics.total ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                  <XAxis
                    dataKey="x"
                    tick={{ fill: "rgba(226,232,240,0.85)", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                    label={{ value: "Prediction #", position: "insideBottom", fill: "rgba(226,232,240,0.75)" }}
                  />
                  <YAxis
                    tick={{ fill: "rgba(226,232,240,0.85)", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.85)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 14,
                      color: "white",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    name="Temperature (°C)"
                    stroke="rgba(52,211,153,0.95)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="rainfall"
                    name="Rainfall (mm)"
                    stroke="rgba(56,189,248,0.95)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center rounded-xl bg-white/10 border border-white/15 text-slate-200/80">
                No predictions yet. Go to <Link className="text-emerald-200 hover:underline" to="/risk">Risk Analysis</Link> to generate history.
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Risk Distribution</h3>
              <p className="text-sm text-slate-200/80 mt-1">Bar chart by risk level</p>
            </div>
          </div>

          <div className="mt-5 h-72">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <Spinner />
              </div>
            ) : analytics.total ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                  <XAxis
                    dataKey="risk"
                    tick={{ fill: "rgba(226,232,240,0.85)", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                  />
                  <YAxis
                    tick={{ fill: "rgba(226,232,240,0.85)", fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.85)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: 14,
                      color: "white",
                    }}
                  />
                  <Bar dataKey="value" radius={[12, 12, 8, 8]}>
                    {barChartData.map((entry) => {
                      const fill =
                        entry.risk === "LOW"
                          ? "rgba(52,211,153,0.9)"
                          : entry.risk === "MEDIUM"
                            ? "rgba(251,191,36,0.92)"
                            : "rgba(251,113,133,0.92)";
                      return <Cell key={entry.risk} fill={fill} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center rounded-xl bg-white/10 border border-white/15 text-slate-200/80">
                No distribution yet.
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6">
        <GlassCard className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Activity / History</h3>
              <p className="text-sm text-slate-200/80 mt-1">Previous predictions (temperature, rainfall, risk)</p>
            </div>
            <button
              type="button"
              onClick={refresh}
              className="rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/15 transition-colors"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <div className="mt-5 overflow-x-auto">
            {loading ? (
              <div className="h-40 flex items-center justify-center">
                <Spinner />
              </div>
            ) : history.length ? (
              <table className="w-full text-left border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="text-xs uppercase tracking-wide text-slate-200/70 py-3 px-3 bg-white/5 border-t border-b border-white/15 rounded-tl-2xl">
                      Temperature
                    </th>
                    <th className="text-xs uppercase tracking-wide text-slate-200/70 py-3 px-3 bg-white/5 border-t border-b border-white/15">
                      Rainfall
                    </th>
                    <th className="text-xs uppercase tracking-wide text-slate-200/70 py-3 px-3 bg-white/5 border-t border-b border-white/15 rounded-tr-2xl">
                      Risk Level
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice().reverse().map((item, idx) => {
                    const temperature = toFiniteNumber(
                      item?.temperature ?? item?.temp ?? item?.Temperature ?? item?.t
                    );
                    const rainfall = toFiniteNumber(
                      item?.rainfall ?? item?.rain ?? item?.Rainfall ?? item?.r
                    );
                    const risk = normalizeRisk(item?.riskLevel ?? item?.risk ?? item?.RiskLevel ?? item?.Risk);

                    const badge =
                      risk === "LOW"
                        ? "bg-emerald-500/15 border-emerald-300/30 text-emerald-100"
                        : risk === "MEDIUM"
                          ? "bg-amber-500/15 border-amber-300/30 text-amber-100"
                          : risk === "HIGH"
                            ? "bg-rose-500/15 border-rose-300/30 text-rose-100"
                            : "bg-white/10 border-white/20 text-slate-100";

                    return (
                      <tr
                        key={`${idx}-${temperature}-${rainfall}-${risk}`}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-3 border-b border-white/10 text-sm text-white/90">
                          {temperature == null ? "—" : `${temperature}°C`}
                        </td>
                        <td className="py-3 px-3 border-b border-white/10 text-sm text-white/90">
                          {rainfall == null ? "—" : `${rainfall} mm`}
                        </td>
                        <td className="py-3 px-3 border-b border-white/10 text-sm">
                          <span className={`inline-flex items-center rounded-2xl px-4 py-2 border ${badge}`}>
                            {risk}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-slate-200/80">
                <div className="text-lg font-semibold text-white">No predictions yet</div>
                <div className="text-sm mt-1">
                  Run your first risk analysis from{" "}
                  <Link className="text-emerald-200 hover:underline" to="/risk">
                    Risk Analysis
                  </Link>
                  .
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}