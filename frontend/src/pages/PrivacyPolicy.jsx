import React, { useState } from "react";

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    content:
      "We may collect personal information such as your name, email address, and uploaded medical reports. This data is collected solely to deliver our service to you. We never collect more than what is necessary.",
  },
  {
    number: "02",
    title: "How We Use Your Data",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    content:
      "Your data is used exclusively to analyze your medical reports and return easy-to-understand results. We do not use your data for advertising, profiling, or any purpose beyond the core service you requested.",
  },
  {
    number: "03",
    title: "Data Protection",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    content:
      "We use industry-standard encryption and secure infrastructure to protect your information during transmission and storage. Medical reports are automatically deleted from our servers immediately after analysis is complete.",
  },
  {
    number: "04",
    title: "Third-Party Services",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    content:
      "We do not sell, rent, or share your personal data with third parties for commercial purposes. We may use trusted AI service providers solely to process report analysis — they are bound by strict confidentiality agreements.",
  },
  {
    number: "05",
    title: "Your Consent",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M5 13l4 4L19 7" />
      </svg>
    ),
    content:
      "By using our platform, you acknowledge and agree to this privacy policy. You may withdraw consent at any time by ceasing use of the service or by contacting us to request data deletion.",
  },
];

const PrivacyPolicy = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 py-16 px-6">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto leading-relaxed">
            At <span className="font-bold text-white">SehatSaathi</span>, your privacy is not an afterthought — it's built into everything we do.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 mt-12 space-y-4">
        {sections.map((s, i) => {
          const isOpen = active === i;
          return (
            <div
              key={i}
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen ? "border-blue-300 shadow-lg shadow-blue-50" : "border-gray-200 hover:border-blue-200 hover:shadow-md"
              }`}
            >
              <button
                onClick={() => setActive(isOpen ? null : i)}
                className="w-full flex items-center gap-5 px-7 py-6 text-left"
              >
                {/* Number */}
                <span className="text-xs font-black text-blue-200 tracking-widest shrink-0 w-6">
                  {s.number}
                </span>
                {/* Icon */}
                <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  isOpen ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-500"
                }`}>
                  {s.icon}
                </span>
                {/* Title */}
                <span className={`flex-1 font-bold text-lg transition-colors duration-200 ${
                  isOpen ? "text-blue-700" : "text-gray-900"
                }`}>
                  {s.title}
                </span>
                {/* Chevron */}
                <span className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : "text-gray-300"}`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="px-7 pb-7 text-gray-600 leading-relaxed text-[15px] pl-[88px]">
                  {s.content}
                </p>
              </div>
            </div>
          );
        })}

        {/* Footer note */}
        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-7 flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Have questions?</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              If you have any concerns about how we handle your data, you're welcome to reach out to us. We're committed to being transparent and responsive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;