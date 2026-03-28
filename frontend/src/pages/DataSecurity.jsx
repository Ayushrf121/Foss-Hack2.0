import React from "react";

const pillars = [
  {
    number: "01",
    title: "End-to-End Encryption",
    description:
      "Every file you upload is encrypted in transit using TLS 1.3 and at rest using AES-256 — the same standard used by banks and healthcare providers worldwide. Your data is unreadable to anyone without authorised access.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    stat: "AES-256",
    statLabel: "Encryption Standard",
  },
  {
    number: "02",
    title: "Zero Retention Policy",
    description:
      "Medical reports are never permanently stored on our servers. Once the AI analysis is complete, your file is immediately and permanently deleted. We retain only the anonymised result you see on screen.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    stat: "0s",
    statLabel: "File Retention Time",
  },
  {
    number: "03",
    title: "Strict Access Control",
    description:
      "Only verified, authorised AI systems can interact with your data during analysis. No human employee has access to your uploaded medical reports. Our infrastructure follows the principle of least privilege.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    stat: "0",
    statLabel: "Human Eyes on Your Data",
  },
  {
    number: "04",
    title: "Full User Control",
    description:
      "You are always in control. You can request complete deletion of your account and all associated data at any time. We provide full transparency into what data we hold and how it is used upon request.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    stat: "100%",
    statLabel: "Your Data, Your Control",
  },
];

const trustBadges = [
  { label: "Encrypted in Transit", icon: "🔒" },
  { label: "No Data Selling", icon: "🚫" },
  { label: "Instant Deletion", icon: "⚡" },
  { label: "GDPR Aligned", icon: "✅" },
];

const DataSecurity = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 py-16 px-6">
        {/* Hexagon-like dots pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, white 1.5px, transparent 1.5px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Security
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Data Security
          </h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto leading-relaxed">
            Your medical data is deeply personal. We built our security architecture from the ground up to protect it at every step.
          </p>
        </div>

        {/* Trust badges row */}
        <div className="relative max-w-3xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {trustBadges.map((b, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-center"
            >
              <span className="text-xl">{b.icon}</span>
              <p className="text-white text-xs font-semibold mt-1">{b.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pillars */}
      <div className="max-w-3xl mx-auto px-6 mt-12 space-y-5">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-200 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all duration-300 overflow-hidden group"
          >
            <div className="p-7">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  {p.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black tracking-widest text-emerald-300">{p.number}</span>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-200">
                      {p.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-[15px]">{p.description}</p>
                </div>

                {/* Stat badge */}
                <div className="shrink-0 text-right hidden md:block">
                  <p className="text-2xl font-black text-emerald-600">{p.stat}</p>
                  <p className="text-xs text-gray-400 leading-tight max-w-[90px]">{p.statLabel}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Bottom commitment card */}
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-8">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg mb-1">Our Commitment to You</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                We treat your medical data with the same care you would. Security is not a feature we added — it's the foundation we built on. If you ever have questions or concerns about your data, we're always here to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSecurity;