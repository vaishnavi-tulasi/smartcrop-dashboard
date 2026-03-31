import React, { useState } from "react";

const SendEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!email) {
      alert("Please enter email!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/risk/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          subject: "Crop Risk Result",
          text: "Your crop risk prediction is ready."
        }),
      });

      const data = await response.text();
      setMessage(data);

    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to send email");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📧 Send Email</h2>

      <div className="card">
        <label>Email:</label><br />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <button onClick={handleSend}>Send Email</button>

        {message && (
          <p style={{ marginTop: "10px", color: "green" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SendEmail;