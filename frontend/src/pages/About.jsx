import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-[#f8f9ff] min-h-[80vh] py-12 px-4 sm:px-6">
      <SEO title="About Portal - EsevaDesk" description="About EsevaDesk Digital Services Portal." />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dce9ff] text-[#001b3b] rounded-full text-xs font-semibold mb-3">
            <span className="material-symbols-outlined text-[16px] text-teal-700">verified</span>
            Institutional Public Digital Infrastructure
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00142f] font-headline mb-3">
            About EsevaDesk
          </h1>
          <p className="text-sm text-[#44474e] leading-relaxed">
            Empowering users across urban and rural centers with direct, assisted, and encrypted access to essential digital and banking services.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">account_balance</span>
              </div>
              <h2 className="text-xl font-bold text-[#00142f]">Our Mandate &amp; Mission</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              EsevaDesk operates as a unified public digital facilitation portal. We eliminate complex procedures, dense documentation confusion, and long queues by offering straightforward assisted digital applications for PAN generation, voter IDs, passport slots, and real-time utility clearances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#a73a00] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">handshake</span>
                </div>
                <h3 className="text-base font-bold text-[#00142f]">Assisted Kiosk Network</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                For citizens lacking high-speed internet or digital literacy, our certified Village Level Entrepreneurs (VLEs) and doorstep kiosk executives provide verified biometric capture and document collection at nominal standard rates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">security</span>
                </div>
                <h3 className="text-base font-bold text-[#00142f]">Security &amp; Data Privacy</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                All submissions are encrypted under 256-bit TLS v1.3 protocols adhering to RBI, NPCI, and MeitY information security standards. Citizen data is strictly channeled to authorized departmental endpoints with immutable audit logging.
              </p>
            </div>
          </div>

          {/* Quick numbers */}
          <div className="bg-[#00142f] text-white p-8 rounded-2xl shadow-md text-center grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <span className="text-3xl font-extrabold text-[#89f5e7] block font-headline">60+</span>
              <span className="text-xs text-blue-200 mt-1 block">Unified Civic Services</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-[#ffb599] block font-headline">99.8%</span>
              <span className="text-xs text-blue-200 mt-1 block">Application Accuracy</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-[#89f5e7] block font-headline">24/7</span>
              <span className="text-xs text-blue-200 mt-1 block">Real-time Tracking</span>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-[#ffb599] block font-headline">100%</span>
              <span className="text-xs text-blue-200 mt-1 block">Encrypted Gateway</span>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00142f] hover:bg-[#a73a00] text-white rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <span>Explore All Services</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
