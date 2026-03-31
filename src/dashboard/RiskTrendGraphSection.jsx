import React, { useMemo } from "react";
import GlassCard from "../components/GlassCard";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function normalizeRisk(level) {
  const raw = String(level || "").trim().toUpperCase();
  if (raw === "LOW") return "LOW";
  if (raw === "MEDIUM") return "MEDIUM";
  if (raw === "HIGH") return "HIGH";
  return raw || "UNKNOWN";
}

function riskToNumber(risk) {
  switch (risk) {
    case "LOW":
      return 1;
    case "MEDIUM":
      return 2;
    case "HIGH":
      return 3;
    default:
      return 0;
  }
}

function riskColor(risk) {
  switch (risk) {
    case "LOW":
      return "#34d399"; // emerald-400
    case "MEDIUM":
      return "#fbbf24"; // amber-400
    case "HIGH":
      return "#fb7185"; // rose-400
    default:
      return "#cbd5e1";
  }
}

function extractHistoryItem(item, fallbackIndex) {
  const temperature = item?.temperature ?? item?.temp ?? item?.Temperature ?? null;
  const rainfall = item?.rainfall ?? item?.rain ?? item?.Rainfall ?? null;
  const riskRaw = item?.riskLevel ?? item?.risk ?? item?.RiskLevel ?? item?.Risk ?? null;
  const risk = normalizeRisk(riskRaw);
  const riskNum = riskToNumber(risk);

  const timeCandidate = item?.date ?? item?.createdAt ?? item?.timestamp ?? item?.time;
  const timeLabel = timeCandidate
    ? new Date(timeCandidate).toLocaleString()
    : `Entry ${fallbackIndex + 1}`;

  return { temperature, rainfall, risk, riskNum, timeLabel };
}

export default function RiskTrendGraphSection({ items = [] }) {
  const chartData = useMemo(() => {
    return (items || []).map((item, idx) => {
      const extracted = extractHistoryItem(item, idx);
      return {
        x: idx + 1,
        label: extracted.timeLabel,
        risk: extracted.risk,
        riskNum: extracted.riskNum,
        temperature: extracted.temperature,
        rainfall: extracted.rainfall,
      };
    });
  }, [items]);

  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">📈 Risk Trend Graph</h3>
          <p className="text-sm text-slate-200/80 mt-1">
            Visualize how crop risk changes across predictions.
          </p>
        </div>
        <div className="text-xs px-3 py-1 rounded-xl bg-white/10 border border-white/20 text-slate-100 font-medium">
          Recharts
        </div>
      </div>

      <div className="mt-5 h-80">
        {chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <XAxis
                dataKey="x"
                tick={{ fill: "rgba(226,232,240,0.85)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                label={{ value: "Prediction #", position: "insideBottom", fill: "rgba(226,232,240,0.75)" }}
              />
              <YAxis
                domain={[0, 3]}
                ticks={[1, 2, 3]}
                tick={{ fill: "rgba(226,232,240,0.85)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                tickFormatter={(v) => (v === 1 ? "LOW" : v === 2 ? "MEDIUM" : v === 3 ? "HIGH" : "")}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.8)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 12,
                  color: "white",
                }}
                labelStyle={{ color: "white" }}
                formatter={(value, name, props) => {
                  if (name === "riskNum") return [props?.payload?.risk, "Risk"];
                  return [value, name];
                }}
                labelFormatter={(label) => `Prediction #${label}`}
              />
              <Line
                type="monotone"
                dataKey="riskNum"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth={2}
                dot={(props) => {
                  const risk = props.payload?.risk;
                  const fill = riskColor(risk);
                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={5}
                      fill={fill}
                      stroke="rgba(255,255,255,0.55)"
                      strokeWidth={2}
                    />
                  );
                }}
                activeDot={(props) => {
                  const risk = props.payload?.risk;
                  const fill = riskColor(risk);
                  return (
                    <circle
                      cx={props.cx}
                      cy={props.cy}
                      r={7}
                      fill={fill}
                      stroke="rgba(255,255,255,0.75)"
                      strokeWidth={2}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center rounded-xl bg-white/10 border border-white/15 text-slate-200/80">
            No history data yet. Predict risk to see the trend graph.
          </div>
        )}
      </div>
    </GlassCard>
  );
}

