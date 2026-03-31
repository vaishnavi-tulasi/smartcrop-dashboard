import React, { useState } from "react";
import GlassCard from "../components/GlassCard";
import { api } from "../lib/api";

function extractWeatherPayload(data) {
  // Backend may return `{ temperature, humidity }` or nested fields.
  const temperature =
    data?.temperature ??
    data?.main?.temp ??
    data?.main?.temperature ??
    data?.temp;
  const humidity = data?.humidity ?? data?.main?.humidity;
  return { temperature, humidity };
}

export default function WeatherPredictionSection() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await api.get("/api/weather", { params: { city } });
      const { temperature, humidity } = extractWeatherPayload(res.data);
      setWeather({ temperature, humidity });
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Failed to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">🌦 Weather Prediction</h3>
          <p className="text-sm text-slate-200/80 mt-1">
            Enter a city to fetch temperature and humidity.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm text-slate-200/80">City</span>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g., Pune"
            className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-white placeholder:text-slate-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          />
        </label>

        <button
          type="button"
          onClick={getWeather}
          disabled={loading || !city.trim()}
          className="w-full rounded-xl bg-emerald-500/25 border border-emerald-300/30 px-4 py-2 text-white font-medium hover:bg-emerald-500/35 transition-colors disabled:opacity-60"
        >
          {loading ? "Fetching..." : "Get Weather"}
        </button>

        {error ? (
          <div className="rounded-xl bg-rose-500/20 border border-rose-300/30 px-4 py-3 text-rose-100 text-sm">
            {error}
          </div>
        ) : null}

        {weather?.temperature != null && weather?.humidity != null ? (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl bg-white/10 border border-white/15 p-4">
              <div className="text-xs text-slate-200/75">Temperature</div>
              <div className="text-xl font-semibold text-white">
                {weather.temperature}°C
              </div>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/15 p-4">
              <div className="text-xs text-slate-200/75">Humidity</div>
              <div className="text-xl font-semibold text-white">{weather.humidity}%</div>
            </div>
          </div>
        ) : null}
      </div>
    </GlassCard>
  );
}

