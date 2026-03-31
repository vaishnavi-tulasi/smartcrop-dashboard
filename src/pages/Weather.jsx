// import React, { useState } from "react";

// const Weather = () => {
//   const [city, setCity] = useState("");
//   const [temperature, setTemperature] = useState("");
//   const [humidity, setHumidity] = useState("");

//   const fetchWeather = async () => {
//     try {
//       const res = await fetch(`http://localhost:8080/api/weather?city=${city}`);
//       const result = await res.json();

//       console.log("API RESPONSE:", result); // 🔥 DEBUG

//       // ✅ FIXED (handles backend structure)
//       setTemperature(result.main?.temp || result.temperature);
//       setHumidity(result.main?.humidity || result.humidity);

//     } catch (err) {
//       console.error(err);
//       alert("Error fetching weather ❌");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>🌦 Weather Prediction</h2>

//       <input
//         type="text"
//         placeholder="Enter City"
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={fetchWeather}>Get Weather</button>

//       <br /><br />

//       {temperature && humidity && (
//         <div>
//           <h3>Result</h3>
//           <p>Temperature: {temperature} °C</p>
//           <p>Humidity: {humidity} %</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;
// import React from "react";
// import Navbar from "../components/Navbar";

// function Weather() {
//   return (
//     <div>
//       <Navbar />
//       <h2>Weather Page</h2>
//     </div>
//   );
// }

// export default Weather;
// import React, { useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// function Weather() {

//   const [city, setCity] = useState("");
//   const [data, setData] = useState({});

//   const getWeather = async () => {
//     const res = await axios.get(`http://localhost:8080/api/weather/${city}`);
//     setData(res.data);
//   };

//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: "20px" }}>
//         <h2>🌦 Weather</h2>

//         <input placeholder="Enter city" onChange={(e) => setCity(e.target.value)} />
//         <br /><br />

//         <button onClick={getWeather}>Get Weather</button>

//         <h3>Temp: {data.temperature}</h3>
//         <h3>Humidity: {data.humidity}</h3>
//       </div>
//     </div>
//   );
// }

// export default Weather;
import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Cloud, CloudRain, Droplets, Search, Sun, Thermometer } from "lucide-react";
import { api } from "../lib/api";
import GlassCard from "../components/GlassCard";
import Spinner from "../components/Spinner";

function pickWeatherIcon(condition) {
  const txt = String(condition || "").toLowerCase();
  if (txt.includes("rain") || txt.includes("drizzle")) return CloudRain;
  if (txt.includes("cloud")) return Cloud;
  return Sun;
}

function extractCondition(data) {
  return (
    data?.condition ??
    data?.weather ??
    data?.description ??
    data?.main?.condition ??
    data?.main?.description ??
    ""
  );
}

export default function Weather() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const cleanCity = city.trim();
    if (!cleanCity) return;

    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await api.get("/api/weather", { params: { city: cleanCity } });
      const temperature = res?.data?.temperature ?? res?.data?.main?.temp ?? res?.data?.temp;
      const humidity = res?.data?.humidity ?? res?.data?.main?.humidity;
      const condition = extractCondition(res?.data);

      setWeather({
        temperature: temperature ?? null,
        humidity: humidity ?? null,
        condition: condition || "Clear",
      });
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Failed to fetch weather";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const ConditionIcon = pickWeatherIcon(weather?.condition);
  const conditionText = weather?.condition || "";

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="mb-6"
      >
        <GlassCard className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-sm text-slate-200/80">Weather intelligence</div>
              <h1 className="text-2xl font-semibold text-white mt-1">🌦 Weather Prediction</h1>
              <p className="text-sm text-slate-200/80 mt-1">
                Enter a city to get temperature, humidity, and condition signals.
              </p>
            </div>

            <div className="w-full md:max-w-md">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-200/60" />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Pune"
                  className="w-full rounded-2xl bg-white/10 border border-white/20 pl-9 pr-4 py-2.5 text-white placeholder:text-slate-300/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                />
              </div>
              <button
                type="button"
                onClick={getWeather}
                disabled={loading || !city.trim()}
                className="mt-3 w-full rounded-2xl bg-emerald-500/25 border border-emerald-300/30 px-4 py-2.5 text-white font-medium hover:bg-emerald-500/35 transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Spinner /> Getting...
                  </span>
                ) : (
                  "Get Weather"
                )}
              </button>
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl bg-rose-500/20 border border-rose-300/30 px-4 py-3 text-rose-100 text-sm">
              {error}
            </div>
          ) : null}
        </GlassCard>
      </motion.div>

      {weather ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <GlassCard className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-200/70">Temperature</div>
                <div className="mt-2 text-4xl font-semibold text-white">
                  {weather.temperature == null ? "—" : `${weather.temperature}°C`}
                </div>
                <div className="mt-1 text-sm text-slate-200/80">Thermal signal for growth</div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                <Thermometer size={20} className="text-emerald-200" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-200/70">Humidity</div>
                <div className="mt-2 text-4xl font-semibold text-white">
                  {weather.humidity == null ? "—" : `${weather.humidity}%`}
                </div>
                <div className="mt-1 text-sm text-slate-200/80">Moisture and disease risk factor</div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                <Droplets size={20} className="text-sky-200" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5 md:col-span-1">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-200/70">Condition</div>
                <div className="mt-2 text-2xl font-semibold text-white">{conditionText}</div>
                <div className="mt-1 text-sm text-slate-200/80">Operational weather guidance</div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                <ConditionIcon size={20} className="text-amber-200" />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="mt-4 text-slate-200/80 text-sm">
          Enter a city and click <span className="text-emerald-200 font-semibold">Get Weather</span>.
        </div>
      )}
    </div>
  );
}