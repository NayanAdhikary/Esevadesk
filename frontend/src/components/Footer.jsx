import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#00142f] text-white w-full border-t border-gray-700 select-none mt-auto">
      <div className="w-full py-12 px-4 sm:px-6 mx-auto flex flex-col items-center justify-between max-w-[1360px]">
        {/* Top Brand Row inside Footer */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between pb-8 mb-8 border-b border-gray-800 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white text-[#00142f] flex items-center justify-center font-bold shadow-md">
              <span className="material-symbols-outlined text-2xl text-[#fd651e]">account_balance</span>
            </div>
            <div>
              <span className="text-xl text-white tracking-tight font-extrabold font-headline">
                EsevaDesk
              </span>
              <p className="text-xs text-blue-200">
                Citizen & Enterprise Facilitation Infrastructure
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-blue-200">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#89f5e7] animate-pulse"></span>
              Live Gateway Active
            </span>
            <span className="text-gray-600">•</span>
            <span>SSL 256-bit TLS v1.3</span>
            <span className="text-gray-600">•</span>
            <span className="text-white font-medium">Services Hub</span>
          </div>
        </div>

        {/* Navigation & Compliance Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8 text-xs font-medium">
          <Link to="/privacy" className="text-gray-300 hover:text-white hover:underline transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-gray-300 hover:text-white hover:underline transition-colors">
            Citizen Charter &amp; Terms
          </Link>
          <Link to="/refund" className="text-gray-300 hover:text-white hover:underline transition-colors">
            Refund &amp; Fee Policy
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white hover:underline transition-colors">
            About Portal
          </Link>
          <Link to="/contact" className="text-[#ffb599] underline hover:text-white transition-colors">
            Grievance Redressal (1800-111-SEVA)
          </Link>
          <a href="/#kiosk-locator" className="text-gray-300 hover:text-white hover:underline transition-colors">
            Find Nearest Kiosk
          </a>
        </div>

        {/* Copyright Text */}
        <p className="text-xs text-gray-400 text-center max-w-3xl leading-relaxed">
          © {new Date().getFullYear()} EsevaDesk. All rights reserved. Direct integration with various digital platforms.
        </p>
      </div>
    </footer>
  );
}
