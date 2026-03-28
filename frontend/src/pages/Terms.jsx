import React from "react";

const terms = [
  {
    number: "01",
    title: "Usage & Purpose",
    color: "from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    lightText: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    content:
      "SehatSaathi is designed strictly for educational and informational purposes. The AI-generated insights are intended to help you understand your medical reports — they are not a substitute for professional medical advice, diagnosis, or treatment. Always consult a licensed medical professional for any health-related decisions.",
  },
  {
    number: "02",
    title: "User Responsibility",
    color: "from-emerald-500 to-teal-500",
    lightBg: "bg-emerald-50",
    lightText: "text-emerald-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    content:
      "You are solely responsible for the accuracy and authenticity of any documents or data you upload. By using the platform, you confirm that you are the rightful owner of the uploaded reports or have obtained proper consent from the individual whose data is being shared.",
  },
  {
    number: "03",
    title: "Limitation of Liability",
    color: "from-amber-500 to-orange-500",
    lightBg: "bg-amber-50",
    lightText: "text-amber-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    content:
      "SehatSaathi and its team shall not be held liable for any medical, financial, or personal decisions made based on the AI-generated content. Results are provided as-is for informational purposes only. We make no guarantees regarding the completeness or accuracy of the analysis.",
  },
  {
    number: "04",
    title: "Changes to Terms",
    color: "from-indigo-500 to-purple-500",
    lightBg: "bg-indigo-50",
    lightText: "text-indigo-600",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    content:
      "We reserve the right to update or modify these Terms of Service at any time without prior notice. Continued use of the platform after any such changes constitutes your acceptance of the new terms. We encourage you to review this page periodically.",
  },
];

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 py-16 px-6">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Accent blob */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-white/10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
            Please read these terms carefully before using{" "}
            <span className="text-white font-bold">SehatSaathi</span>. By continuing, you agree to be bound by them.
          </p>
          <p className="text-slate-500 text-sm mt-4">Last updated: June 2025</p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-3xl mx-auto px-6 mt-12 space-y-5">
        {terms.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <div className="flex items-start gap-5 p-7">
              {/* Gradient icon */}
              <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${t.color} shadow-md group-hover:-translate-y-0.5 transition-transform duration-300`}>
                {t.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-black tracking-widest ${t.lightText}`}>
                    {t.number}
                  </span>
                  <h2 className="text-lg font-bold text-gray-900">{t.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px]">{t.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Agreement banner */}
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold text-lg mb-2">You're all set</p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
              By using SehatSaathi, you confirm that you have read and agreed to these terms. Thank you for trusting us with your health journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;