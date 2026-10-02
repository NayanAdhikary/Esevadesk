import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getApplications, updateStatus } from '../api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) return navigate('/admin/login');
    getApplications(token)
      .then(setApps)
      .catch(() => navigate('/admin/login'))
      .finally(() => setLoading(false));
  }, [token, navigate]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(token, id, status);
      setApps(apps.map(a => a._id === id ? { ...a, status } : a));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handlePayment = async (id, paymentStatus) => {
    try {
      await fetch(`${API_URL}/admin/applications/${id}/payment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ paymentStatus })
      });
      setApps(apps.map(a => a._id === id ? { ...a, paymentStatus } : a));
    } catch (err) {
      alert('Failed to update payment status');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const filteredApps = apps.filter(app => {
    if (filter === 'all') return true;
    return (app.status || '').toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="bg-[#f8f9ff] min-h-[90vh] py-8 px-4 sm:px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header bar */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00142f] text-white flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-2xl text-[#89f5e7]">admin_panel_settings</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-[#00142f] font-headline">
                  Agent Operator Console
                </span>
                <span className="bg-[#dce9ff] text-[#001b3b] text-[10px] font-bold px-2 py-0.5 rounded">
                  Operator Active
                </span>
              </div>
              <p className="text-xs text-gray-500">Citizen Application Review & Dispatch Clearinghouse</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-3.5 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Public Site
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs text-gray-400 block mb-1">Total Received</span>
            <span className="text-2xl font-bold text-[#00142f]">{apps.length}</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs text-gray-400 block mb-1">Pending Review</span>
            <span className="text-2xl font-bold text-amber-600">
              {apps.filter(a => (a.status || '').toLowerCase() === 'pending').length}
            </span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs text-gray-400 block mb-1">In Processing</span>
            <span className="text-2xl font-bold text-blue-600">
              {apps.filter(a => (a.status || '').toLowerCase().includes('process')).length}
            </span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
            <span className="text-xs text-gray-400 block mb-1">Dispatched / Done</span>
            <span className="text-2xl font-bold text-emerald-600">
              {apps.filter(a => (a.status || '').toLowerCase().includes('complet')).length}
            </span>
          </div>
        </div>

        {/* Main Applications Table Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-gray-200 gap-3">
            <div>
              <h2 className="text-base font-bold text-[#00142f]">All Citizen Submissions</h2>
              <p className="text-xs text-gray-400">Review documents, approve payments, and update lifecycle statuses</p>
            </div>

            {/* Quick status tabs */}
            <div className="flex items-center gap-1.5 text-xs">
              {['all', 'pending', 'in-progress', 'completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors capitalize ${
                    filter === f
                      ? 'bg-[#00142f] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-gray-400">Fetching applications...</div>
          ) : filteredApps.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">No applications under this filter.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="pb-3 pl-2">Ref ID</th>
                    <th className="pb-3">Service</th>
                    <th className="pb-3">Applicant Name</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Status Update</th>
                    <th className="pb-3">Payment</th>
                    <th className="pb-3 pr-2 text-right">Payment Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredApps.map(app => (
                    <tr key={app._id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 pl-2 font-mono font-bold text-[#00142f]">
                        <Link to={`/status?id=${encodeURIComponent(app.referenceId)}`} className="hover:underline">
                          {app.referenceId}
                        </Link>
                      </td>
                      <td className="py-3 font-semibold text-gray-800">{app.serviceName}</td>
                      <td className="py-3 text-gray-700">{app.fullName}</td>
                      <td className="py-3 text-gray-500 font-mono text-[11px]">{app.phone}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          (app.status || '').toLowerCase().includes('complet')
                            ? 'bg-emerald-50 text-emerald-800'
                            : (app.status || '').toLowerCase().includes('process')
                            ? 'bg-blue-50 text-blue-800'
                            : 'bg-amber-50 text-amber-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <select
                          value={app.status}
                          onChange={e => handleStatusChange(app._id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-3">
                        <span className={`font-semibold ${
                          app.paymentStatus === 'completed' || app.paymentStatus === 'paid' ? 'text-emerald-700' : 'text-amber-700'
                        }`}>
                          {app.paymentStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 pr-2 text-right">
                        {app.paymentStatus !== 'completed' && app.paymentStatus !== 'paid' ? (
                          <button
                            onClick={() => handlePayment(app._id, 'completed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold"
                          >
                            Mark Paid
                          </button>
                        ) : (
                          <span className="text-emerald-700 text-[11px] font-bold">Verified ✓</span>
                        )}
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
