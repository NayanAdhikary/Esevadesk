import { useState } from 'react';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import { sendContact } from '../api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendContact(form);
      toast.success('Message sent! An officer will reply within 24 hours.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error('Failed to dispatch enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9ff] min-h-[85vh] py-12 px-4 sm:px-6">
      <SEO title="Contact Us" description="Get in touch with EsevaDesk support — 24x7 helpline and grievance redressal." />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-[#a73a00] uppercase tracking-wider bg-[#ffdbce] px-2.5 py-0.5 rounded">
            24x7 Citizen Support Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#00142f] mt-2 font-headline">
            Citizen Grievance &amp; Contact Desk
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Submit inquiries, dispute application statuses, or request priority support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Helplines */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-2xl">call</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-normal">Toll-Free Grievance Helpline</span>
                  <strong className="text-base text-[#00142f]">1800-111-SEVA (7382)</strong>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Operating 24 hours a day, 7 days a week for nationwide assistance in 6 official languages.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#a73a00] flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-normal">Official Support Inbox</span>
                  <strong className="text-sm text-[#00142f]">support@esevadesk.com</strong>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Average reply turnaround: &lt; 24 business hours with ticket assignment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-2xl">location_city</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block font-normal">Central Clearing Center</span>
                  <strong className="text-xs text-[#00142f]">EsevaDesk Operations Complex</strong>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                EsevaDesk Support Center, Sector V, Salt Lake, Kolkata 700091.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-bold text-[#00142f] mb-1">Send Official Message / Grievance</h2>
            <p className="text-xs text-gray-400 mb-6">Fill the form below and an officer will review your ticket.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Citizen Name *</label>
                  <input
                    placeholder="Your legal name"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Mobile Number (Optional)</label>
                <input
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description of Issue / Enquiry *</label>
                <textarea
                  rows="4"
                  placeholder="Please provide reference ID if related to an existing application..."
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#00142f] hover:bg-[#a73a00] text-white rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50"
              >
                {loading ? 'Submitting Grievance...' : 'Submit Message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
