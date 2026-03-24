import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportHeader from "../components/sections/Report/ReportHeader";
import FilePreview from "../components/sections/Report/FilePreview";
import AnalyzeAction from "../components/sections/Report/AnalyzeAction";
import Dropzone from "../components/sections/Report/Dropzone";
 
const Report = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
  };
 
  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
  };
 
  const handleAnalyze = async () => {
    if (!file) return;
 
    try {
      setLoading(true);
      setError(null);
 
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
        // Navigate to /response and pass the result via route state
        navigate("/response", { state: { result: data.data, fileName: file.name } });
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
 
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 transition-all duration-300">
          {/* Upload Section */}
          {!file ? (
            <Dropzone onFileSelect={handleFileSelect} />
          ) : (
            <FilePreview file={file} onRemove={handleRemoveFile} />
          )}
 
          {/* Analyze Button */}
          <AnalyzeAction file={file} onAnalyze={handleAnalyze} />
 
          {/* Loading Spinner */}
          {loading && (
            <div className="mt-6 flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-blue-600 font-medium">
                🔍 Analyzing your report... please wait
              </p>
            </div>
          )}
 
          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 border border-red-200 text-center">
              <p className="text-red-600 font-medium">⚠️ {error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Report;