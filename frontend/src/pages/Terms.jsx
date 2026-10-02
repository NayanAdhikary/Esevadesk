import SEO from '../components/SEO';

export default function Terms() {
  return (
    <div className="bg-[#f8f9ff] min-h-[80vh] py-12 px-4 sm:px-6">
      <SEO title="Terms of Service" description="Terms of service and guidelines for EsevaDesk." />
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <span className="text-[11px] font-bold text-[#00142f] uppercase tracking-wider bg-[#dce9ff] px-2.5 py-0.5 rounded">
            Citizen Charter
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00142f] mt-2 font-headline">
            Terms of Service &amp; Citizen Facilitation Charter
          </h1>
          <p className="text-xs text-gray-400 mt-1">Last updated: {new Date().toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
        </div>

        <div className="prose text-xs sm:text-sm text-gray-600 space-y-4 leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">1. Acceptance of Terms</h2>
            <p>
              By accessing EsevaDesk services, you agree to comply with all applicable terms and relevant verification protocols.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">2. Facilitation &amp; Statutory Role</h2>
            <p>
              EsevaDesk acts as a facilitation intermediary for various digital services. Final approvals remain under the exclusive jurisdiction of the respective authorities.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">3. Accuracy of Information</h2>
            <p>
              Citizens are responsible for providing authentic documents and truthful declarations. Submission of counterfeit documents or misrepresentation of identity may result in statutory application cancellation without refund.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">4. Service Level Agreements (SLA)</h2>
            <p>
              Turnaround timelines (e.g. 24–48 hours for Aadhaar updates, instant receipts for utility payments) reflect standard processing under normal departmental server availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
