import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Response = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, fileName } = location.state || {};

  // If someone lands here directly without data, send them back
  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6 flex flex-col items-center justify-center">
        <p className="text-gray-600 text-lg mb-6">No analysis result found.</p>
        <button
          onClick={() => navigate("/report")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all active:scale-95"
        >
          ← Go Back to Upload
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/report")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Analyze another report
          </button>

          <h1 className="text-3xl font-bold text-gray-900">Analysis Result</h1>
          {fileName && (
            <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {fileName}
            </p>
          )}
        </div>

        {/* Result Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <span className="text-2xl">🧾</span>
            <h2 className="text-xl font-bold text-gray-800">Your Report Explained</h2>
          </div>

          <div className="prose prose-sm max-w-none text-gray-800">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {result}
            </ReactMarkdown>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Want to analyze another report?</p>
          <button
            onClick={() => navigate("/report")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all transform hover:scale-105 active:scale-95"
          >
            Upload New Report
          </button>
        </div>

      </div>
    </div>
  );
};

export default Response;