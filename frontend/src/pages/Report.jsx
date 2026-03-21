import React, { useState } from "react";
import ReportHeader from "../components/sections/Report/ReportHeader";
import FilePreview from "../components/sections/Report/FilePreview";
import AnalyzeAction from "../components/sections/Report/AnalyzeAction";
import Dropzone from "../components/sections/Report/Dropzone";

const Report = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  //  File select
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResult(null); // reset old result
    setError(null);
  };

  //  Remove file
  const handleRemoveFile = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  // Analyze API call
  const handleAnalyze = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:4000/report/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Server error");
      }

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.message);
      }

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <ReportHeader />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          
          {/* Upload Section */}
          {!file ? (
            <Dropzone onFileSelect={handleFileSelect} />
          ) : (
            <FilePreview file={file} onRemove={handleRemoveFile} />
          )}

          {/* Analyze Button */}
          <AnalyzeAction file={file} onAnalyze={handleAnalyze} />

          {/* Loading */}
          {loading && (
            <div className="mt-6 text-center">
              <p className="text-blue-600 font-medium animate-pulse">
                🔍 Analyzing your report... please wait
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-center">
              <p className="text-red-600 font-medium">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-6 p-5 border rounded-xl bg-green-50 border-green-200">
              <h3 className="font-bold text-lg mb-3 text-green-700">
                🧾 Analysis Result
              </h3>

              <div className="text-gray-800 whitespace-pre-line leading-relaxed max-h-96 overflow-y-auto">
                {result}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Report;