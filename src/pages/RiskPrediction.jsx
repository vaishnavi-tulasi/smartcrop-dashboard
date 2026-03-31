import React, { useState } from "react";
import axios from "axios";

function RiskPrediction() {

  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [email, setEmail] = useState(""); // ✅ NEW
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/risk/predict",
        {
          temperature,
          rainfall,
          email // ✅ SEND EMAIL
        }
      );

      setResult(response.data.data);

    } catch (error) {
      console.error(error);
      alert("Prediction failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌾 Crop Risk Prediction</h2>

      <input
        type="number"
        placeholder="Enter Temperature"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Enter Rainfall"
        value={rainfall}
        onChange={(e) => setRainfall(e.target.value)}
      />
      <br /><br />

      {/* ✅ ADD EMAIL INPUT HERE */}
      <input
        type="email"
        placeholder="Enter Farmer Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <button onClick={handlePredict}>Predict Risk</button>

      <br /><br />

      {result && (
        <div>
          <h3>Risk Level: {result.riskLevel}</h3>
        </div>
      )}
    </div>
  );
}

export default RiskPrediction;
