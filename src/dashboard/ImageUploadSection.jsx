import React, { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import { api } from "../lib/api";

export default function ImageUploadSection() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const uploadImage = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult("");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/api/risk/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = res.data;
      const text =
        typeof data === "string"
          ? data
          : data?.diseaseName ??
            data?.disease ??
            data?.result ??
            data?.message ??
            JSON.stringify(data, null, 2);

      setResult(String(text));
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">🖼️ Image Upload (Disease Detection)</h3>
          <p className="text-sm text-slate-200/80 mt-1">
            Upload a crop image to get disease result from the backend.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="text-sm text-slate-200/80">Select image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-white file:mr-3 file:rounded-xl file:border file:border-white/25 file:bg-white/10 file:px-3 file:py-1 file:text-slate-100 hover:file:bg-white/15"
          />
        </label>

        {previewUrl ? (
          <div className="rounded-2xl bg-white/10 border border-white/15 p-3 overflow-hidden">
            <img
              src={previewUrl}
              alt="Uploaded preview"
              className="w-full max-h-64 object-contain rounded-xl"
            />
          </div>
        ) : null}

        <button
          type="button"
          onClick={uploadImage}
          disabled={loading || !file}
          className="w-full rounded-xl bg-emerald-500/25 border border-emerald-300/30 px-4 py-2 text-white font-medium hover:bg-emerald-500/35 transition-colors disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {error ? (
          <div className="rounded-xl bg-rose-500/20 border border-rose-300/30 px-4 py-3 text-rose-100 text-sm">
            {error}
          </div>
        ) : null}

        {result ? (
          <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
            <div className="text-xs text-slate-100/80">Disease Result</div>
            <div className="text-sm text-white/90 whitespace-pre-wrap">{result}</div>
          </div>
        ) : null}
      </div>
    </GlassCard>
  );
}

