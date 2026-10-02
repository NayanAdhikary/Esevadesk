import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [selectedLang, setSelectedLang] = useState('en');
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        setUser(null);
      }
    }
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
    }
  }, [location]);

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <>
      {/* Top Citizen Assistance Micro Bar */}
      <aside aria-label="Official Citizen Micro-Notification" className="bg-[#00142f] text-white py-1.5 px-4 text-xs font-medium border-b border-[#0f294a]">
        <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-blue-200">
              <span className="material-symbols-outlined text-[16px] text-[#89f5e7]">verified_user</span>
              Official Digital Gateway &amp; Service Facilitation
            </span>
            <span className="hidden md:inline text-gray-500">|</span>
            <span className="hidden md:inline text-gray-300 font-normal">
              256-bit Encrypted Service Gateway
            </span>
          </div>
          <div className="flex items-center gap-4 text-blue-100">
            <a className="hover:text-white flex items-center gap-1 transition-colors" href="tel:18001117382">
              <span className="material-symbols-outlined text-[15px]">phone_in_talk</span>
              Helpline: <strong className="font-bold tracking-wide text-white">1800-111-SEVA (7382)</strong>
            </a>
            <div className="h-3 w-px bg-gray-600"></div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">language</span>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer border-none py-0 pl-1 pr-3"
              >
                <option className="text-gray-900" value="en">English (National)</option>
                <option className="text-gray-900" value="hi">हिन्दी (Hindi)</option>
                <option className="text-gray-900" value="bn">বাংলা (Bengali)</option>
                <option className="text-gray-900" value="te">తెలుగు (Telugu)</option>
                <option className="text-gray-900" value="ta">தமிழ் (Tamil)</option>
                <option className="text-gray-900" value="mr">मराठी (Marathi)</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Top Header */}
      <header className="bg-white shadow-sm border-b border-outline-variant sticky top-0 z-40 transition-all">
        <div className="w-full px-4 sm:px-6 mx-auto flex items-center justify-between h-20 max-w-[1360px]">
          {/* Brand & Emblem */}
          <Link to="/" className="flex items-center gap-3.5 group text-left">
            <div className="w-12 h-12 rounded-xl bg-[#00142f] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-3xl text-[#fd651e]">account_balance</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl text-[#00142f] tracking-tight font-extrabold font-headline">
                  EsevaDesk
                </span>
                <span className="bg-[#ffdbce] text-[#a73a00] text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  Official Hub
                </span>
              </div>
              <p className="text-xs text-[#44474e] hidden sm:block">
                Citizen, Banking, License & Utility Facilitation
              </p>
            </div>
          </Link>

          {/* Navigation Links Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-semibold py-2 transition-colors ${
                  isActive ? 'text-[#a73a00] border-b-2 border-[#a73a00]' : 'text-[#44474e] hover:text-[#00142f]'
                }`
              }
            >
              All Services
            </NavLink>
            <NavLink
              to="/status"
              className={({ isActive }) =>
                `text-sm font-semibold py-2 transition-colors ${
                  isActive ? 'text-[#a73a00] border-b-2 border-[#a73a00]' : 'text-[#44474e] hover:text-[#00142f]'
                }`
              }
            >
              Track Status
            </NavLink>
            <a
              href="/#kiosk-locator"
              className="text-sm font-semibold text-[#44474e] hover:text-[#00142f] transition-colors py-2"
            >
              Kiosk Locator
            </a>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-semibold py-2 transition-colors ${
                  isActive ? 'text-[#a73a00] border-b-2 border-[#a73a00]' : 'text-[#44474e] hover:text-[#00142f]'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-semibold py-2 transition-colors ${
                  isActive ? 'text-[#a73a00] border-b-2 border-[#a73a00]' : 'text-[#44474e] hover:text-[#00142f]'
                }`
              }
            >
              Help &amp; Contact
            </NavLink>
          </nav>

          {/* Trailing Action Cluster */}
          <div className="flex items-center gap-2.5">
            {/* Quick action utility buttons */}
            <div className="hidden sm:flex items-center gap-1 text-[#44474e] mr-1">
              <Link
                to="/status"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                title="Track Application"
              >
                <span className="material-symbols-outlined text-[22px]">track_changes</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#fd651e] rounded-full animate-pulse"></span>
              </Link>
              <Link
                to="/contact"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="24/7 Citizen Support"
              >
                <span className="material-symbols-outlined text-[22px]">support_agent</span>
              </Link>
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="px-3.5 py-2 border border-outline-variant text-[#00142f] rounded-lg text-xs font-semibold hover:bg-gray-50 transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">account_circle</span>
                  <span>{user.name ? user.name.split(' ')[0] : 'My Account'}</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-2 border border-red-200 text-red-700 rounded-lg text-xs font-semibold hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center justify-center px-4 py-2 border border-outline-variant text-[#00142f] rounded-lg text-xs font-semibold hover:bg-gray-100 transition-all"
              >
                Citizen Sign In
              </Link>
            )}

            {/* Agent / Admin Portal Button */}
            <Link
              to={adminToken ? "/admin/dashboard" : "/admin/login"}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#00142f] text-white rounded-lg text-xs font-semibold shadow-sm hover:bg-[#0f294a] active:scale-[0.99] transition-all"
            >
              <span className="material-symbols-outlined text-[17px] text-[#89f5e7]">admin_panel_settings</span>
              <span className="hidden sm:inline">Kiosk Agent Login</span>
              <span className="sm:hidden">Agent</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-[#00142f] hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {open ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="lg:hidden bg-white border-b border-outline-variant px-4 py-4 space-y-3 shadow-lg animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#00142f] hover:bg-gray-50"
              >
                <span className="material-symbols-outlined text-lg text-[#00142f]">grid_view</span>
                All Services
              </Link>
              <Link
                to="/status"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#00142f] hover:bg-gray-50"
              >
                <span className="material-symbols-outlined text-lg text-[#a73a00]">track_changes</span>
                Track Application
              </Link>
              <a
                href="/#kiosk-locator"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#00142f] hover:bg-gray-50"
              >
                <span className="material-symbols-outlined text-lg text-teal-600">location_on</span>
                Find Nearest Kiosk
              </a>
              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#00142f] hover:bg-gray-50"
              >
                <span className="material-symbols-outlined text-lg text-blue-600">info</span>
                About EsevaDesk
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#00142f] hover:bg-gray-50"
              >
                <span className="material-symbols-outlined text-lg text-amber-600">support_agent</span>
                Grievance &amp; Contact
              </Link>
            </nav>

            <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="w-full text-center py-2.5 bg-blue-50 text-[#00142f] font-semibold text-sm rounded-lg"
                  >
                    My Citizen Dashboard
                  </Link>
                  <button
                    onClick={() => { setOpen(false); logout(); }}
                    className="w-full py-2 text-center text-red-600 text-sm font-semibold"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="text-center py-2 border border-outline-variant text-[#00142f] font-semibold text-sm rounded-lg"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="text-center py-2 bg-[#a73a00] text-white font-semibold text-sm rounded-lg"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
