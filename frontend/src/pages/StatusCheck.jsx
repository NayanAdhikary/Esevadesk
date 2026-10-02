import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getStatusByReference } from '../api';

const STAGES = ['Pending', 'Processing', 'Completed'];

export default function StatusCheck() {
  const [searchParams] = useSearchParams();
  const [ref, setRef] = useState(searchParams.get('id') || '');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const idFromQuery = searchParams.get('id');
    if (idFromQuery) {
      setRef(idFromQuery);
      fetchStatus(idFromQuery.trim());
    }
  }, [searchParams]);

  const fetchStatus = async (referenceId) => {
    if (!referenceId) return;
    setLoading(true);
    setError('');
    setData(null);

    try {
      const result = await getStatusByReference(referenceId);
      setData(result);
    } catch (err) {
      setError('No application found with this reference ID. Please check the spelling or contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (e) => {
    e.preventDefault();
    fetchStatus(ref.trim());
  };

  // Helper for status badge styling
  const getBadgeClass = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('complete') || s.includes('approved') || s.includes('issued')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (s.includes('process') || s.includes('review') || s.includes('pending')) {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    return 'bg-red-50 text-red-800 border-red-200';
  };

  return (
    <div className="bg-[#f8f9ff] min-h-[80vh] py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header Breadcrumb & Title */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-[#00142f] font-semibold hover:underline mb-2">
            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
            Back to All Services
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00142f] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-[#89f5e7]">track_changes</span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#00142f] font-headline">
                Track Application Status
              </h1>
              <p className="text-xs text-gray-500">
                Official real-time status inquiry for Citizen, Banking &amp; License filings
              </p>
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400 text-xl">
                receipt
              </span>
              <input
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-[#00142f] focus:outline-none focus:ring-1 focus:ring-[#00142f]"
                placeholder="Enter Reference ID (e.g. ESV-2025-ABC123)"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00142f] hover:bg-[#a73a00] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <span>Checking...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">search</span>
                  <span>Check Status</span>
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-gray-400 mt-2.5">
            Reference IDs are issued immediately on submission and sent via SMS/Email (Format: ESV-XXXX-XXXX).
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-xs flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-red-600 text-xl">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Results Card */}
        {data && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8 animate-fadeIn">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Application Tracking Details
                </span>
                <h2 className="text-xl font-bold text-[#00142f]">
                  {data.serviceName}
                </h2>
                <div className="text-xs text-gray-500 mt-0.5">
                  Ref ID: <strong className="text-gray-900 font-mono">{data.referenceId || ref}</strong>
                </div>
              </div>

              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getBadgeClass(data.status)}`}>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  {data.status || 'In Progress'}
                </span>
              </div>
            </div>

            {/* Visual Stepper */}
            <div className="py-8 border-b border-gray-200">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                Processing Lifecycle
              </h3>

              <div className="grid grid-cols-3 gap-2 relative">
                {STAGES.map((stage, idx) => {
                  const currentIdx = STAGES.indexOf(data.status) !== -1 ? STAGES.indexOf(data.status) : 1;
                  const isDone = idx < currentIdx || (idx === currentIdx && stage === 'Completed');
                  const isCurrent = idx === currentIdx && stage !== 'Completed';

                  return (
                    <div key={idx} className="flex flex-col items-center text-center relative z-10">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                          isDone
                            ? 'bg-[#0d9488] text-white shadow-sm'
                            : isCurrent
                            ? 'bg-[#ea580c] text-white ring-4 ring-[#ffdbce]'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {isDone ? (
                          <span className="material-symbols-outlined text-base">check</span>
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span className={`text-xs font-semibold ${isDone || isCurrent ? 'text-[#00142f]' : 'text-gray-400'}`}>
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Applicant & Audit Metadata */}
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block mb-1">Applicant Name</span>
                <span className="font-semibold text-gray-800">{data.applicantName || 'Verified Citizen'}</span>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block mb-1">Date of Application</span>
                <span className="font-semibold text-gray-800">
                  {data.createdAt ? new Date(data.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Recent'}
                </span>
              </div>
            </div>

            {/* Status History Timeline */}
            {data.statusHistory && data.statusHistory.length > 0 && (
              <div className="pt-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Audit Activity Log
                </h4>
                <div className="space-y-3">
                  {data.statusHistory.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs border-l-2 border-gray-200 pl-3 py-1">
                      <div className="w-2 h-2 rounded-full bg-[#00142f] mt-1 -ml-[17px]"></div>
                      <div>
                        <strong className="text-gray-800 block">{h.status}</strong>
                        <span className="text-gray-400">
                          {new Date(h.date).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
