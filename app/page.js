"use client";
import React from "react";
import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [updatedResume, setUpdatedResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText, jobDescription }),
    });

    const data = await res.json();
    setUpdatedResume(data.resume);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">
        AI Resume & Cover Letter Generator
      </h1>

      <textarea
        placeholder="Paste your resume here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        className="w-full max-w-2xl p-3 rounded-lg mb-4 bg-gray-800"
        rows={8}
      />

      <textarea
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full max-w-2xl p-3 rounded-lg mb-4 bg-gray-800"
        rows={6}
      />

      <button
        // disabled={loading && !resumeText && !jobDescription}
        // disabled={loading || !resumeText || !jobDescription}
        disabled={loading || !resumeText || !jobDescription}
        onClick={handleGenerate}
        className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500"
      >
        {loading ? "Generating..." : "Generate Cover Letter"}
      </button>

      {updatedResume && (
        <div className="mt-6 w-full max-w-2xl bg-gray-800 p-4 rounded-lg whitespace-pre-wrap">
          <h2 className="font-bold mb-2">Generated Cover Letter:</h2>
          <p>{updatedResume}</p>
        </div>
      )}
    </div>
  );
}
