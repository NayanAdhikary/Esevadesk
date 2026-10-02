import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyApplications } from '../api';

export default function UserDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('userToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!token) return navigate('/login');
    getMyApplications(token)
      .then(setApps)
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('complete') || s.includes('approved')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (s.includes('progress') || s.includes('review')) {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    return 'bg-blue-50 text-blue-800 border-blue-200';
  };

  return (
    <div className="bg-[#f8f9ff] min-h-[85vh] py-10 px-4 sm:px-6">
      <div className="max-w-[1360px] mx-auto">
        {/* Top Citizen Welcome Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00142f] text-white flex items-center justify-center font-bold text-xl">
              <span className="material-symbols-outlined text-2xl text-[#89f5e7]">person</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Citizen Portal Profile
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#00142f] font-headline">
                Welcome, {user.fullName || user.name || 'Citizen'}
              </h1>
              <p className="text-xs text-gray-500">{user.email} • Verified Account</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 bg-[#00142f] text-white rounded-lg text-xs font-semibold hover:bg-[#a73a00] transition-colors"
            >
              + Apply for New Service
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid & List */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-200">
            <div>
              <h2 className="text-base font-bold text-[#00142f]">My Submitted Applications</h2>
              <p className="text-xs text-gray-400">Track all ongoing and fulfilled service requests</p>
            </div>
            <span className="text-xs font-bold text-[#00142f] bg-[#e5eeff] px-2.5 py-1 rounded-full">
              {apps.length} Total
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-gray-400">Loading your applications...</div>
          ) : apps.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-2">folder_open</span>
              <h3 className="text-base font-bold text-[#00142f]">No Applications Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mb-4">
                You haven't submitted any service applications yet. Browse the official catalog to apply online.
              </p>
              <Link
                to="/"
                className="px-4 py-2 bg-[#00142f] text-white rounded-lg text-xs font-semibold hover:bg-[#a73a00] transition-colors"
              >
                Browse Services Directory
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="pb-3 pl-2">Acknowledgement ID</th>
                    <th className="pb-3">Service Name</th>
                    <th className="pb-3">Submission Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Payment</th>
                    <th className="pb-3 pr-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {apps.map(a => (
                    <tr key={a._id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 pl-2 font-mono font-bold text-[#00142f]">
                        {a.referenceId}
                      </td>
                      <td className="py-3.5 font-medium text-gray-800">
                        {a.serviceName}
                      </td>
                      <td className="py-3.5 text-gray-500">
                        {new Date(a.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${getStatusBadge(a.status)}`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className={`text-[11px] font-semibold ${
                          a.paymentStatus === 'completed' || a.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'
                        }`}>
                          {a.paymentStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="py-3.5 pr-2 text-right">
                        <Link
                          to={`/status?id=${encodeURIComponent(a.referenceId)}`}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-[#00142f] hover:text-white rounded text-[11px] font-semibold transition-colors"
                        >
                          View Status
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
