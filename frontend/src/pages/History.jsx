import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const History = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = useSelector((store) => store.token.token) || localStorage.getItem("token");
  const isLogged = Boolean(token);

  useEffect(() => {
    if (!isLogged) {
      setLoading(false);
      return;
    }
    fetchHistory();
  }, [isLogged]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:4000/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setEntries(data.data);
      } else {
        setError(data.message || "Failed to load history.");
      }
    } catch {
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:4000/history/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setEntries((prev) => prev.filter((e) => e._id !== id));
        if (expandedId === id) setExpandedId(null);
      }
    } catch {
      // fail silently
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ── Not logged in ──────────────────────────────────────────────────────────
  if (!isLogged) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Login Required</h2>
          <p className="text-gray-500 mb-8">
            Please sign in to view your report history.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105 active:scale-95"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-blue-600 font-medium">Loading your history...</p>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Report History</h1>
          <p className="mt-2 text-gray-500">
            {entries.length > 0
              ? `You have ${entries.length} saved report${entries.length > 1 ? "s" : ""}.`
              : "No reports analyzed yet."}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-center">
            <p className="text-red-600 font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Empty state */}
        {entries.length === 0 && !error && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No history yet</h3>
            <p className="text-gray-500 mb-8">
              Analyze a medical report and it will appear here for future reference.
            </p>
            <button
              onClick={() => navigate("/report")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105 active:scale-95"
            >
              Analyze a Report
            </button>
          </div>
        )}

        {/* History cards */}
        <div className="space-y-4">
          {entries.map((entry) => {
            const isExpanded = expandedId === entry._id;
            const isDeleting = deletingId === entry._id;

            return (
              <div
                key={entry._id}
                className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 ${
                  isExpanded ? "border-blue-300 shadow-md" : "border-gray-200 hover:border-blue-200 hover:shadow-md"
                }`}
              >
                {/* Card header */}
                <div className="flex items-center justify-between px-6 py-5">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : entry._id)}
                    className="flex items-center gap-4 flex-1 text-left"
                  >
                    {/* File icon */}
                    <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>

                    {/* Name + date */}
                    <div className="overflow-hidden">
                      <p className="font-semibold text-gray-900 truncate max-w-[180px] md:max-w-xs">
                        {entry.fileName}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.createdAt)}</p>
                    </div>

                    {/* Chevron */}
                    <span
                      className={`ml-2 shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180 text-blue-500" : "text-gray-400"}`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(entry._id)}
                    disabled={isDeleting}
                    className="ml-4 flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    title="Remove from history"
                  >
                    {isDeleting ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>

                {/* Expanded result */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 border-t border-gray-100 pt-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg">🧾</span>
                      <h3 className="font-bold text-gray-800">Report Analysis</h3>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700 bg-gray-50 rounded-xl p-5">
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {entry.result}
                      </ReactMarkdown>
                    </div>

                    {/* View full response button */}
                    <button
                      onClick={() =>
                        navigate("/response", {
                          state: { result: entry.result, fileName: entry.fileName },
                        })
                      }
                      className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                    >
                      View full response
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Analyze another CTA */}
        {entries.length > 0 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/report")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all transform hover:scale-105 active:scale-95"
            >
              Analyze Another Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;