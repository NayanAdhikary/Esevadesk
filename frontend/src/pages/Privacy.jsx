import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <div className="bg-[#f8f9ff] min-h-[80vh] py-12 px-4 sm:px-6">
      <SEO title="Privacy & Security Policy" description="Data protection standards, 256-bit encryption and privacy charter for EsevaDesk." />
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
            Legal Compliance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00142f] mt-2 font-headline">
            Citizen Privacy &amp; Data Security Policy
          </h1>
          <p className="text-xs text-gray-400 mt-1">Last updated: {new Date().toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
        </div>

        <div className="prose text-xs sm:text-sm text-gray-600 space-y-4 leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">1. Information Collection &amp; Scope</h2>
            <p>
              EsevaDesk collects user information strictly necessary for the fulfillment of applications. Data collected includes demographic identifiers, mobile contact details, proof of identity, and proof of address.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">2. 256-bit TLS Data Encryption</h2>
            <p>
              All data transmitted through our web interfaces and mobile agent channels is secured with 256-bit TLS v1.3 encryption. Uploaded documents are stored in access-restricted, AES-256 encrypted vaults and automatically scheduled for retention purge following statutory application closure.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">3. Strict Prohibition of Commercial Disclosures</h2>
            <p>
              We do not sell, rent, monetize, or disclose citizen records to commercial third-party advertisers. Information is solely shared with authorized statutory departments (UIDAI, NSDL, ECI, State Electricity Boards) for direct processing as mandated by law.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">4. Citizen Data Rights &amp; Grievances</h2>
            <p>
              Citizens retain the right to inspect their application audit records, dispute mismatched submissions, and request cancellation of non-dispatched requests through our toll-free helpline 1800-ESEVADESK or by emailing privacy@esevadesk.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
