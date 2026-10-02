import SEO from '../components/SEO';

export default function Refund() {
  return (
    <div className="bg-[#f8f9ff] min-h-[80vh] py-12 px-4 sm:px-6">
      <SEO title="Fee & Refund Policy" description="Fee structure, payment terms and refund policy for EsevaDesk." />
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <span className="text-[11px] font-bold text-[#a73a00] uppercase tracking-wider bg-[#ffdbce] px-2.5 py-0.5 rounded">
            Financial Terms
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00142f] mt-2 font-headline">
            Fee &amp; Refund Policy
          </h1>
          <p className="text-xs text-gray-400 mt-1">Last updated: {new Date().toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
        </div>

        <div className="prose text-xs sm:text-sm text-gray-600 space-y-4 leading-relaxed">
          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">1. Transparent Fee Breakdown</h2>
            <p>
              All service listings display the combined total of mandatory statutory fees (charged by UIDAI, NSDL, or state revenue boards) and nominal Kendra facilitation charges. There are zero hidden surcharges or surprise billing.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">2. Eligibility for Refund</h2>
            <p>
              Refunds are automatically issued if a transaction is debited but fails to generate an acknowledgement receipt within 2 hours, or if our facilitation team fails to initiate the filing within the committed SLA timeframe.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">3. Non-Refundable Scenarios</h2>
            <p>
              Statutory fees remitted to third-party authorities cannot be refunded once an official token has been registered, or if an application is rejected due to invalid documents provided by the applicant.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-[#00142f] mb-1">4. Refund Timeline</h2>
            <p>
              Approved refunds are credited directly back to the original payment source (UPI account or bank account) within 3–5 business working days. For disputes, contact billing@esevadesk.com or call 1800-ESEVADESK.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
