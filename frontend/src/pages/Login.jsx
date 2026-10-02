import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userLogin } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token, user } = await userLogin(email, password);
      localStorage.setItem('userToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9ff] min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-md p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#00142f] text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
            <span className="material-symbols-outlined text-3xl text-[#89f5e7]">lock</span>
          </div>
          <span className="text-[11px] font-bold text-[#a73a00] uppercase tracking-wider bg-[#ffdbce] px-2.5 py-0.5 rounded">
            Citizen Authentication
          </span>
          <h1 className="text-2xl font-extrabold text-[#00142f] mt-2 font-headline">
            Sign In to EsevaDesk
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Access your applications, tracking history, and service receipts.
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
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
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
            className="w-full py-3 bg-[#00142f] hover:bg-[#a73a00] text-white rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In as Citizen →'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500 space-y-2">
          <p>
            Don't have a citizen profile?{' '}
            <Link to="/signup" className="text-[#a73a00] font-bold hover:underline">
              Create an Account
            </Link>
          </p>
          <p>
            Are you a Service Center Agent?{' '}
            <Link to="/admin/login" className="text-[#00142f] font-bold hover:underline">
              Kiosk Operator Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
