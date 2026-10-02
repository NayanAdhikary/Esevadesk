import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLogin } from '../api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await adminLogin(email, password);
      localStorage.setItem('adminToken', token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Operator authentication failed. Invalid agent credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9ff] min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-md p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#00142f] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <span className="material-symbols-outlined text-3xl text-[#89f5e7]">admin_panel_settings</span>
          </div>
          <span className="text-[11px] font-bold text-[#00142f] uppercase tracking-wider bg-[#dce9ff] px-2.5 py-0.5 rounded">
            Restricted Operator Console
          </span>
          <h1 className="text-2xl font-extrabold text-[#00142f] mt-2 font-headline">
            Service Center Agent Login
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Access officer dashboard, review citizen applications, and verify payments.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Operator ID / Email</label>
            <input
              type="email"
              placeholder="agent@esevadesk.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Security Token / Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#00142f] hover:bg-[#0f294a] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">verified_user</span>
            <span>{loading ? 'Authenticating Operator...' : 'Open Agent Console'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
          Citizen user?{' '}
          <Link to="/login" className="text-[#a73a00] font-bold hover:underline">
            Switch to Citizen Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
