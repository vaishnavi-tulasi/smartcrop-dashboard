// import React, { useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// function Upload() {

//   const [file, setFile] = useState(null);
//   const [cropName, setCropName] = useState("");
//   const [disease, setDisease] = useState("");
//   const [recommendation, setRecommendation] = useState("");

//   const handleUpload = async () => {

//     if (!file || !cropName) {
//       alert("Please select image and enter crop name");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("cropName", cropName);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/disease/detect",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setDisease(response.data.diseaseName);
//       setRecommendation(response.data.recommendation);

//     } catch (error) {
//       console.error(error);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: "20px" }}>
//         <h2>🌾 Crop Disease Detection</h2>

//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//         />

//         <br /><br />

//         <input
//           type="text"
//           placeholder="Enter crop name (rice/tomato)"
//           value={cropName}
//           onChange={(e) => setCropName(e.target.value)}
//         />

//         <br /><br />

//         <button onClick={handleUpload}>
//           Upload & Detect
//         </button>

//         <br /><br />

//         {disease && (
//           <div>
//             <h3>🌿 Disease: {disease}</h3>
//             <p>💡 Recommendation: {recommendation}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Upload;
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AlertCircle, Image as ImageIcon, UploadCloud } from "lucide-react";
import GlassCard from "../components/GlassCard";
import Spinner from "../components/Spinner";
import { api } from "../lib/api";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [disease, setDisease] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const extractDiseaseName = (data) => {
    if (!data) return null;
    if (typeof data === "string") return data;
    return (
      data?.diseaseName ??
      data?.disease ??
      data?.result?.diseaseName ??
      data?.result?.disease ??
      null
    );
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    setLoading(true);
    setError("");
    setDisease(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/api/risk/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const next = extractDiseaseName(res?.data);
      setDisease(next);
      toast.success("Disease detection completed");
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Upload failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const hasResult = useMemo(() => Boolean(disease), [disease]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="mb-6"
      >
        <GlassCard className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="text-sm text-slate-200/80">Disease detection</div>
              <h1 className="text-2xl font-semibold text-white mt-1">
                🖼️ Upload Crop Image
              </h1>
              <p className="text-sm text-slate-200/80 mt-1">
                Upload an image to detect the disease result from the backend.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 border border-white/20 px-4 py-3">
              <div className="text-xs uppercase tracking-wide text-slate-200/70">Premium Upload</div>
              <div className="mt-2 text-sm text-slate-200/80">
                Fast preview + instant result card.
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
              <UploadCloud size={20} className="text-emerald-200" />
            </div>
            <div className="flex-1">
              <div className="text-lg font-semibold text-white">Select an image</div>
              <div className="text-sm text-slate-200/80 mt-1">
                JPG/PNG images work best. Keep the crop area clear.
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label
              className="block w-full cursor-pointer"
              aria-label="Upload image"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div className="rounded-2xl border border-white/20 bg-white/10 hover:bg-white/15 transition-colors px-4 py-8 flex items-center justify-center gap-3">
                <ImageIcon size={18} className="text-slate-100" />
                <div className="text-white/90 font-semibold">
                  {file ? file.name : "Choose file"}
                </div>
              </div>
            </label>
          </div>

          {previewUrl ? (
            <div className="mt-5 rounded-2xl bg-white/10 border border-white/15 p-3 overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-h-72 object-contain rounded-xl"
              />
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-white/10 border border-white/15 p-5 text-center text-slate-200/80">
              No image selected.
            </div>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading || !file}
            className="mt-5 w-full rounded-2xl bg-emerald-500/25 border border-emerald-300/30 px-4 py-3 text-white font-semibold hover:bg-emerald-500/35 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner /> Detecting...
              </span>
            ) : (
              "Upload & Detect"
            )}
          </button>

          {error ? (
            <div className="mt-4 rounded-2xl bg-rose-500/20 border border-rose-300/30 px-4 py-3 text-rose-100 text-sm">
              {error}
            </div>
          ) : null}
        </GlassCard>

        <div>
          <GlassCard className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-slate-200/80">Detection result</div>
                <div className="text-xl font-semibold text-white mt-1">Disease</div>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                <AlertCircle size={20} className="text-amber-200" />
              </div>
            </div>

            <div className="mt-5">
              {!hasResult ? (
                <div className="min-h-[240px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white font-semibold text-lg">
                      Awaiting image
                    </div>
                    <div className="text-slate-200/80 text-sm mt-2">
                      Upload an image to see the disease result.
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.985, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4"
                >
                  <div className="text-xs uppercase tracking-wide text-slate-200/70">
                    Detected disease
                  </div>
                  <div className="mt-2 text-3xl font-bold text-white">
                    {disease}
                  </div>
                  <div className="mt-3 text-sm text-slate-200/80">
                    Keep monitoring your fields and verify symptoms visually for best outcomes.
                  </div>
                </motion.div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}