import React from "react";
import SehatSathi from '../../assets/SehatSathi.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <a
              href="/"
            >
              <img src={SehatSathi} alt="" className="w-24 filter contrast-[120%] brightness-[105%] h-24" />

            </a>
            <p className="text-gray-500 leading-relaxed max-w-sm mt-4">
              Demystifying medical terminology. We empower you to understand
              your health data securely, instantly, and in your own language.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">
              Product
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/report"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Analyze Report
                </a>
              </li>
              <li>
                <a
                  href="/history"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  My History
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-6 uppercase tracking-wider text-sm">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/privacy"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/dataSecurity"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Data Security
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {currentYear} SehatSathi. All rights reserved.</p>

          <p className="mt-4 md:mt-0">
            Designed for educational purposes, not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
