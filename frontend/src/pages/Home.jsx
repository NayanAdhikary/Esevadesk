import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../api';
import ServiceCard from '../components/ServiceCard';

const FALLBACK_SERVICES = [
  { _id: '1', name: 'Aadhaar Services', icon: '🆔', category: 'Identity', items: ['Address Update', 'DOB Update', 'PVC Card Order', 'Biometric Lock'], price: '₹50 onwards', description: 'UIDAI official citizen updates, mobile linking, address corrections & smart card delivery.', processingTime: '24–48 hours' },
  { _id: '2', name: 'PAN Card Suite', icon: '📄', category: 'Identity', items: ['New PAN Application', 'Lost PAN Reprint', 'PAN-Aadhaar Link'], price: '₹107 onwards', description: 'NSDL / UTIITSL authorized e-PAN generation and physical doorstep delivery.', processingTime: '2 Hours (e-PAN)' },
  { _id: '3', name: 'Voter ID Services', icon: '🗳️', category: 'Identity', items: ['New Voter Form 6', 'e-EPIC Download', 'Correction Form 8'], price: 'Free / ₹50 assisted', description: 'Election Commission of India electoral roll enrollments, corrections and digital cards.', processingTime: '3–7 days' },
  { _id: '4', name: 'Passport & Visa Assist', icon: '🛂', category: 'Travel', items: ['Fresh Passport', 'Tatkal Booking', 'PSK Slot Allotment'], price: '₹1,500 service fee', description: 'Passport Seva Kendra slot appointment, document scrutiny and visa processing.', processingTime: 'Instant Slot' },
  { _id: '5', name: 'PF / EPFO Withdrawal', icon: '🏦', category: 'Finance', items: ['Claim Form 19/10C/31', 'Passbook Download', 'UAN KYC'], price: '₹300 onwards', description: 'Provident fund settlement, advance claim, pension withdrawal and employer transfer.', processingTime: '3–7 days' },
  { _id: '6', name: 'AePS & Cash Withdrawal', icon: '🏧', category: 'Banking', items: ['Aadhaar Cash Out', 'Mini Statement', 'Balance Inquiry'], price: 'Zero Fee', description: 'Micro-ATM fingerprint cash withdrawal and instant domestic money remittances.', processingTime: 'Instant' },
  { _id: '7', name: 'Electricity Bill Payment', icon: '⚡', category: 'Bills', items: ['Instant Receipt', 'All State Discoms', 'Zero Surcharge'], price: 'Instant Clearance', description: 'Pay electricity bills across all states with instant BBPS authenticated receipts.', processingTime: 'Real-time' },
  { _id: '8', name: 'Property Tax & Khajna', icon: '🏛️', category: 'Bills', items: ['Municipal Tax', 'Land Revenue Khajna', 'Mutation Status'], price: '₹40 fee', description: 'Online urban municipal property tax and rural land revenue payment facilitation.', processingTime: 'Same Day' },
  { _id: '9', name: 'Trade & Shop License', icon: '📝', category: 'Documents', items: ['New Application', 'Renewal', 'Municipal NOC'], price: '₹400 onwards', description: 'Business registration, shop establishment act filing, and municipal trade clearance.', processingTime: '3–5 days' },
  { _id: '10', name: 'PVC Smart Card Printing', icon: '💳', category: 'Identity', items: ['Aadhaar PVC', 'Voter Card', 'Ayushman Card'], price: '₹50 delivery incl.', description: 'Waterproof high-durability micro-printed PVC smart card dispatched to your door.', processingTime: '48 Hours' },
  { _id: '11', name: 'All Utility & Water Bills', icon: '🧾', category: 'Bills', items: ['Water Tax', 'Piped Gas', 'LPG Cylinder', 'Fastag'], price: 'Zero Fee', description: 'Centralized Bharat BillPay portal for water, gas, broadband and Fastag top-ups.', processingTime: 'Instant' },
  { _id: '12', name: 'Life & Health Insurance', icon: '🛡️', category: 'Finance', items: ['LIC Premium Pay', 'Ayushman PM-JAY', 'Vehicle Policy'], price: 'Instant Pay', description: 'LIC premium collection, PM-JAY health card generation, and motor insurance renewal.', processingTime: 'Instant' },
  { _id: '13', name: 'DTDC & Speed Post Courier', icon: '📦', category: 'Documents', items: ['Document Dispatch', 'Parcel Booking', 'Live Tracking'], price: '₹60 onwards', description: 'Domestic and international parcel dispatch with pickup from nearest Kendra.', processingTime: 'Same Day' },
  { _id: '14', name: 'Passport Size Photo Studio', icon: '📸', category: 'Documents', items: ['AI Compliance Check', '32 Prints Sheet', 'White Background'], price: '₹80 sheet', description: 'Instant passport photo generation conforming to MEA, Visa, and SSC specifications.', processingTime: 'Instant' }
];

const CATEGORIES = [
  { id: 'all', name: 'All Services', icon: 'apps' },
  { id: 'Identity', name: 'Identity & Civil', icon: 'badge' },
  { id: 'Banking', name: 'Banking & AePS', icon: 'account_balance' },
  { id: 'Bills', name: 'Utility & Bills', icon: 'receipt_long' },
  { id: 'Finance', name: 'Finance & EPFO', icon: 'savings' },
  { id: 'Documents', name: 'Licensing & Docs', icon: 'storefront' },
  { id: 'Travel', name: 'Travel & Transport', icon: 'local_shipping' }
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [trackRef, setTrackRef] = useState('');
  const [kioskPin, setKioskPin] = useState('');
  const [kioskResult, setKioskResult] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getServices()
      .then(data => {
        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(FALLBACK_SERVICES);
        }
      })
      .catch(err => {
        console.warn('Backend unavailable, using catalog defaults:', err);
        setServices(FALLBACK_SERVICES);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackRef.trim()) return;
    navigate(`/status?id=${encodeURIComponent(trackRef.trim())}`);
  };

  const handleKioskSearch = (e) => {
    e.preventDefault();
    if (!kioskPin.trim()) return;
    setKioskResult(`Showing 4 active service centers near PIN code ${kioskPin.trim()}: Central EsevaDesk, District Center, Block Kendra, and Support Counter.`);
  };

  const activeServices = services.length > 0 ? services : FALLBACK_SERVICES;

  const filtered = activeServices.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(search.toLowerCase())) ||
      (s.items && s.items.some(item => item.toLowerCase().includes(search.toLowerCase())));

    if (selectedCat === 'all') return matchesSearch;
    return matchesSearch && s.category === selectedCat;
  });

  return (
    <div className="bg-[#f8f9ff] text-[#0b1c30]">
      {/* Hero & Global Omni-Search Section */}
      <section className="bg-gradient-to-b from-[#eff4ff] via-[#f8f9ff] to-[#f8f9ff] pt-10 pb-14 border-b border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Content & Omni-Search */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dce9ff] text-[#001b3b] rounded-full w-max text-xs font-semibold mb-4 border border-[#b0c8f1]">
                <span className="w-2 h-2 rounded-full bg-[#a73a00] animate-ping"></span>
                One-Stop National Gateway for Citizen, Banking, License &amp; Utility Delivery
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#00142f] tracking-tight leading-tight mb-4 font-headline">
                Digital, Banking &amp; Civic Services at Your Doorstep
              </h1>

              <p className="text-base sm:text-lg text-[#44474e] max-w-2xl mb-8 leading-relaxed">
                Access 60+ authorized public services, AePS cash operations, tax payments, and business licensing through high-security direct digital channels or verified agents.
              </p>

              {/* Omni-Search Bar */}
              <div className="bg-white p-2.5 rounded-xl shadow-lg border-2 border-gray-200 focus-within:border-[#00142f] transition-all max-w-3xl">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex items-center flex-1 px-3 py-1">
                    <span className="material-symbols-outlined text-gray-400 text-2xl mr-3">search</span>
                    <input
                      className="w-full border-none focus:outline-none focus:ring-0 text-[#0b1c30] placeholder:text-gray-400 text-sm sm:text-base p-0 bg-transparent font-sans"
                      id="globalSearchInput"
                      placeholder="Search services (e.g., Aadhaar update, PAN apply, Electricity bill, PF, Trade license)..."
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                      <button
                        onClick={() => setSearch('')}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        title="Clear search"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('services-matrix');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-[#00142f] hover:bg-[#a73a00] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Search Services</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Quick Tag Recommendations */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-gray-500 font-medium">Popular:</span>
                {[
                  'Aadhaar Update',
                  'PAN Card',
                  'Electricity Bill',
                  'Trade License',
                  'PF Withdrawal',
                  'Khajna Tax',
                  'PVC Smart Card'
                ].map((term, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearch(term);
                      setSelectedCat('all');
                      const el = document.getElementById('services-matrix');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-white border border-gray-200 hover:border-gray-400 text-[#44474e] hover:text-[#00142f] px-2.5 py-1 rounded-full text-xs transition-colors shadow-2xs"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Hero Trust & SLA Card */}
            <div className="lg:col-span-4">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e5eeff] rounded-full filter blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#00142f] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-[#89f5e7]">verified</span>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#00142f]">Guaranteed SLA &amp; Direct APIs</h2>
                    <span className="text-xs text-gray-500">Citizen Charter Compliant</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-xs text-gray-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      e-PAN Card Generation
                    </span>
                    <span className="text-xs font-bold text-[#00142f] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">
                      ~2 Hours
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-xs text-gray-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Aadhaar Address Update
                    </span>
                    <span className="text-xs font-bold text-[#00142f] bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
                      24–48 Hours
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-xs text-gray-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      Discom Electricity Pay
                    </span>
                    <span className="text-xs font-bold text-[#00142f] bg-amber-50 text-amber-800 px-2 py-0.5 rounded">
                      Instant Receipt
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      PVC Smart Card Courier
                    </span>
                    <span className="text-xs font-bold text-[#00142f] bg-purple-50 text-purple-800 px-2 py-0.5 rounded">
                      Speed Post
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    256-bit TLS Security
                  </span>
                  <span>Direct Gateways</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rapid Track & Quick Services Strip (4 Hero Action Cards) */}
      <section className="py-8 bg-white border-b border-gray-200" id="track-section">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {/* Card 1: Track Status */}
            <div className="bg-[#f8f9ff] p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between hover:border-gray-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e5eeff] text-[#00142f] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">track_changes</span>
                  </div>
                  <span className="text-xs font-bold text-[#28a094] bg-[#e5eeff] px-2 py-0.5 rounded">
                    Live Lookup
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#00142f] mb-1">Track Application Status</h3>
                <p className="text-xs text-[#44474e] mb-3">
                  Check real-time processing stage of PAN, Voter, License, or Certificate.
                </p>
              </div>
              <form onSubmit={handleTrackSubmit} className="mt-2 flex gap-2">
                <input
                  className="w-full text-xs border border-gray-300 rounded-lg px-2.5 py-1.5 focus:border-[#00142f] focus:outline-none"
                  placeholder="Ack / Token / Ref No."
                  type="text"
                  value={trackRef}
                  onChange={(e) => setTrackRef(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-[#00142f] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#a73a00] transition-colors"
                >
                  Track
                </button>
              </form>
            </div>

            {/* Card 2: Order PVC Smart Card */}
            <div className="bg-[#f8f9ff] p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between hover:border-gray-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#ffdbce] text-[#a73a00] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">badge</span>
                  </div>
                  <span className="text-xs font-bold text-[#a73a00] bg-[#ffdbce] px-2 py-0.5 rounded">
                    Speed Post
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#00142f] mb-1">Order PVC Smart Card</h3>
                <p className="text-xs text-[#44474e] mb-2">
                  High-durability micro-printed Aadhaar, Voter, or Ayushman PVC card delivered home.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearch('PVC');
                  const el = document.getElementById('services-matrix');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-2 text-xs text-[#a73a00] font-bold inline-flex items-center gap-1 hover:underline text-left"
              >
                Apply PVC Card Print
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Card 3: Instant Bill Payment */}
            <div className="bg-[#f8f9ff] p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between hover:border-gray-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#e5eeff] text-[#00142f] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">receipt_long</span>
                  </div>
                  <span className="text-xs font-bold text-[#00142f] bg-[#e5eeff] px-2 py-0.5 rounded">
                    Zero Surcharge
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#00142f] mb-1">Instant Bill Payment</h3>
                <p className="text-xs text-[#44474e] mb-2">
                  Electricity, Municipal Khajna, WiFi, Gas and Water instant clearance &amp; GST receipt.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCat('Bills');
                  setSearch('');
                  const el = document.getElementById('services-matrix');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-2 text-xs text-[#00142f] font-bold inline-flex items-center gap-1 hover:underline text-left"
              >
                Pay Discom / Municipal Bill
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Card 4: Book Doorstep Kiosk Agent */}
            <div className="bg-[#f8f9ff] p-5 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between hover:border-gray-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#dce9ff] text-[#00142f] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">handshake</span>
                  </div>
                  <span className="text-xs font-bold bg-[#ffdbce] text-[#a73a00] px-2 py-0.5 rounded">
                    Assisted
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#00142f] mb-1">Book Doorstep Kiosk Agent</h3>
                <p className="text-xs text-[#44474e] mb-2">
                  Certified executive visits home for document pickup and biometric capture.
                </p>
              </div>
              <button
                onClick={() => navigate('/contact')}
                className="mt-2 w-full py-1.5 px-3 bg-[#a73a00] text-white rounded-lg text-xs font-semibold hover:bg-[#802a00] transition-colors text-center shadow-xs"
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workstation Layout: SideNav + Categorized Services Matrix */}
      {/* Main Workstation Layout: Category Tree & Services Grid */}
      <main className="max-w-[1360px] w-full mx-auto px-4 sm:px-6 py-10" id="services-matrix">
        {selectedCat === 'all' && !search ? (
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00142f] mb-3 font-headline">
                Browse Service Categories
              </h2>
              <p className="text-sm text-[#44474e]">
                Select a category below to explore all related digital services and applications.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => {
                const catServices = activeServices.filter(s => s.category === cat.id);
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-[#00142f] transition-all cursor-pointer group flex flex-col items-center text-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#e5eeff] rounded-bl-full filter blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-16 h-16 rounded-full bg-[#eff4ff] text-[#00142f] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#00142f] mb-2 relative z-10">{cat.name}</h3>
                    <p className="text-xs text-gray-500 mb-5 relative z-10">{catServices.length} Services Available</p>
                    <div className="mt-auto text-[#a73a00] text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                      View Services <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {selectedCat !== 'all' && !search && (
              <button
                onClick={() => setSelectedCat('all')}
                className="mb-2 flex items-center gap-2 text-[#44474e] hover:text-[#00142f] font-semibold transition-colors bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm w-max hover:bg-gray-50"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Back to Categories
              </button>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 gap-2">
              <div>
                <h2 className="text-xl font-bold text-[#00142f] flex items-center gap-2">
                  <span>{search ? 'Search Results' : CATEGORIES.find(c => c.id === selectedCat)?.name}</span>
                  <span className="text-xs bg-[#e5eeff] text-[#00142f] font-semibold px-2 py-0.5 rounded-full">
                    {filtered.length} Services
                  </span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Direct authorized integration for secure processing
                </p>
              </div>

              {search && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>Filter: "{search}"</span>
                  <button
                    onClick={() => setSearch('')}
                    className="text-[#a73a00] hover:underline font-bold"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 animate-pulse">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200 shadow-xs">
                <span className="material-symbols-outlined text-5xl text-gray-300 mb-3">search_off</span>
                <h3 className="text-lg font-bold text-[#00142f] mb-1">No services found</h3>
                <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
                  We could not find any service matching "{search}". Try searching for PAN, Aadhaar, Bill, License, or view all categories.
                </p>
                <button
                  onClick={() => { setSearch(''); setSelectedCat('all'); }}
                  className="px-4 py-2 bg-[#00142f] text-white text-xs font-semibold rounded-lg hover:bg-[#a73a00] transition-colors"
                >
                  View All Services
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map(service => (
                  <ServiceCard key={service._id || service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* How It Works Section (3 High-Clarity Progressive Steps) */}
      <section className="bg-[#eff4ff] py-16 border-t border-gray-200">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00142f] mb-2 font-headline">
              How EsevaDesk Operates
            </h2>
            <p className="text-sm text-[#44474e]">
              Simple, transparent, and legally binding citizen delivery designed for high reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-xl bg-[#00142f] text-white text-xl font-bold flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-[#00142f] mb-2">Choose Service &amp; Provide Details</h3>
              <p className="text-xs text-[#44474e] leading-relaxed">
                Select online application or schedule an authorized Kiosk agent visit for assisted documentation and biometric capture at home.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-xl bg-[#a73a00] text-white text-xl font-bold flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-[#00142f] mb-2">Verified Gateway Processing</h3>
              <p className="text-xs text-[#44474e] leading-relaxed">
                Data is submitted through direct UIDAI, NSDL, Parivahan or Discom APIs protected under 256-bit institutional data encryption.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative">
              <div className="w-12 h-12 rounded-xl bg-[#002f2a] text-[#89f5e7] text-xl font-bold flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-[#00142f] mb-2">Instant Ack &amp; Fast Dispatch</h3>
              <p className="text-xs text-[#44474e] leading-relaxed">
                Receive digital certificates with QR validation immediately. Physical PVC cards and official licenses are dispatched via India Post / DTDC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Citizen Assurance & Security Accreditations */}
      <section className="bg-white py-10 border-t border-gray-200" id="kiosk-locator">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-around gap-6 text-[#44474e]">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-[#00142f]">security</span>
              <div>
                <div className="text-sm font-bold text-[#00142f]">ISO 27001 Certified</div>
                <div className="text-xs text-gray-500">Enterprise Data Security</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-[#a73a00]">assured_workload</span>
              <div>
                <div className="text-sm font-bold text-[#00142f]">RBI &amp; NPCI Compliant</div>
                <div className="text-xs text-gray-500">Direct Banking Standards</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-teal-700">verified</span>
              <div>
                <div className="text-sm font-bold text-[#00142f]">Authorized Service Center Partner</div>
                <div className="text-xs text-gray-500">Common Service Center Network</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-[#00142f]">support_agent</span>
              <div>
                <div className="text-sm font-bold text-[#00142f]">24x7 Grievance Support</div>
                <div className="text-xs text-gray-500">Toll Free 1800-111-SEVA</div>
              </div>
            </div>
          </div>

          {/* Kiosk Locator Finder Box */}
          <div className="mt-10 p-6 bg-[#f8f9ff] rounded-2xl border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-[#00142f] flex items-center gap-2">
                  <span className="material-symbols-outlined text-teal-700">location_on</span>
                  Find Your Nearest Service Center
                </h3>
                <p className="text-xs text-[#44474e]">
                  Enter your Postal PIN code or District to locate verified service centers for authentication and document handoff.
                </p>
              </div>

              <form onSubmit={handleKioskSearch} className="flex gap-2 max-w-md w-full">
                <input
                  className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 focus:border-[#00142f] focus:outline-none bg-white"
                  placeholder="Enter 6-digit Postal PIN (e.g. 700001)"
                  type="text"
                  maxLength={6}
                  value={kioskPin}
                  onChange={(e) => setKioskPin(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-[#00142f] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#a73a00] transition-colors whitespace-nowrap"
                >
                  Locate Kendra
                </button>
              </form>
            </div>

            {kioskResult && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs leading-relaxed flex items-start gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                <span>{kioskResult}</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
