// import React, { useState } from "react";

// const ImageUpload = () => {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [message, setMessage] = useState("");

//   // 📸 Handle file selection
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];

//     if (!selectedFile) return;

//     setFile(selectedFile);
//     setPreview(URL.createObjectURL(selectedFile));
//   };

//   // 🚀 Upload to backend
//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select an image first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/risk/upload", // ✅ CORRECT URL
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Upload failed!");
//       }

//       const data = await response.text();
//       setMessage(data);

//     } catch (error) {
//       console.error(error);
//       setMessage("❌ Upload failed! Check backend.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📸 Upload Crop Image</h2>

//       {/* File input */}
//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       <br /><br />

//       {/* Upload button */}
//       <button onClick={handleUpload}>Upload</button>

//       {/* Preview */}
//       {preview && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Preview:</h3>
//           <img
//             src={preview}
//             alt="Preview"
//             style={{ width: "200px", borderRadius: "10px" }}
//           />
//         </div>
//       )}

//       {/* Response */}
//       {message && (
//         <p style={{ marginTop: "15px", color: "green" }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;
import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {

  const [file, setFile] = useState(null);
  const [cropName, setCropName] = useState("");
  const [disease, setDisease] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const handleUpload = async () => {

    if (!file || !cropName) {
      alert("Please select image and enter crop name");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cropName", cropName);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/disease/detect",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setDisease(response.data.diseaseName);
      setRecommendation(response.data.recommendation);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>🌾 Crop Disease Detection</h2>

      {/* FILE INPUT */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      {/* CROP INPUT */}
      <input
        type="text"
        placeholder="Enter crop name (rice/tomato)"
        value={cropName}
        onChange={(e) => setCropName(e.target.value)}
      />

      <br /><br />

      {/* BUTTON */}
      <button onClick={handleUpload}>
        Upload & Detect
      </button>

      <br /><br />

      {/* RESULT DISPLAY */}
      {disease && (
        <div>
          <h3>🌿 Disease: {disease}</h3>
          <p>💡 Recommendation: {recommendation}</p>
        </div>
      )}

    </div>
  );
}

export default ImageUpload;