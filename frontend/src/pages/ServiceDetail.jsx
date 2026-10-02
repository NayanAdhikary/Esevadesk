import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceById, uploadPaymentProof } from '../api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', notes: '' });
  const [files, setFiles] = useState([]);
  const [step, setStep] = useState('form'); // form | payment | done
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [referenceId, setReferenceId] = useState('');
  const [utr, setUtr] = useState('');
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getServiceById(id)
      .then(setService)
      .catch(err => {
        console.error(err);
        setError('Failed to load service details. Backend may be unreachable.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append('serviceId', id);
    formData.append('fullName', form.fullName);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('notes', form.notes);
    files.forEach(file => formData.append('documents', file));

    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/services/applications`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setReferenceId(data.referenceId);
        setPaymentInfo(data.paymentInfo);
        setStep('payment');
      } else {
        alert('Submission failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Submission failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitPayment = async e => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData();
    fd.append('utrNumber', utr);
    fd.append('proof', proof);
    try {
      await uploadPaymentProof(referenceId, fd);
      setStep('done');
    } catch (err) {
      alert('Failed to upload payment proof. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#f8f9ff] min-h-[70vh] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00142f] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs text-gray-500 font-medium">Loading service specifications...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="bg-[#f8f9ff] min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center max-w-md shadow-sm">
          <span className="material-symbols-outlined text-4xl text-red-500 mb-2">error</span>
          <h2 className="text-lg font-bold text-[#00142f]">Service Unavailable</h2>
          <p className="text-xs text-gray-500 mt-2 mb-4">{error || 'Requested service could not be found.'}</p>
          <Link to="/" className="px-4 py-2 bg-[#00142f] text-white text-xs font-semibold rounded-lg hover:bg-[#a73a00]">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9ff] min-h-[80vh] py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[#00142f] font-semibold hover:underline mb-6">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to All Services Directory</span>
        </Link>

        {/* Service Header Hero Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-3xl shadow-xs shrink-0">
                {service.icon && !service.icon.startsWith('http') && service.icon.length <= 3 ? (
                  <span>{service.icon}</span>
                ) : (
                  <span className="material-symbols-outlined text-3xl">verified</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[11px] font-bold rounded uppercase tracking-wider">
                    {service.category || 'Official Gateway'}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Direct Gateway API
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00142f] font-headline">
                  {service.name}
                </h1>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-gray-200 sm:pl-6">
              <span className="text-xs text-gray-400 block mb-0.5">Service Fee</span>
              <span className="text-2xl font-black text-[#00142f]">
                {service.price || `₹${service.amount || 150}`}
              </span>
            </div>
          </div>

          <p className="text-sm text-[#44474e] mt-4 leading-relaxed">
            {service.description || 'Assisted electronic filing, validation, processing and citizen dispatch.'}
          </p>

          {/* Quick Specifications Strip */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100 text-xs">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="material-symbols-outlined text-xl text-[#0d9488]">schedule</span>
              <div>
                <span className="text-gray-400 block text-[11px]">Turnaround Time</span>
                <strong className="text-gray-800">{service.processingTime || '24–48 Hours'}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="material-symbols-outlined text-xl text-[#ea580c]">security</span>
              <div>
                <span className="text-gray-400 block text-[11px]">Security Grade</span>
                <strong className="text-gray-800">256-bit Encrypted</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="material-symbols-outlined text-xl text-blue-700">support_agent</span>
              <div>
                <span className="text-gray-400 block text-[11px]">Helpline Support</span>
                <strong className="text-gray-800">1800-111-SEVA</strong>
              </div>
            </div>
          </div>

          {/* Covered Items */}
          {service.items && service.items.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                Included Workflows &amp; Facilitations:
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.items.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-xs text-gray-700 rounded-lg shadow-2xs">
                    <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Share */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">Share this service with citizens:</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Apply for ${service.name} easily via EsevaDesk: ${window.location.href}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>Share via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Multi-Step Application Container */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8">
          {/* Form Step Indicator */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00142f] text-white flex items-center justify-center text-xs font-bold">
                {step === 'form' ? '1' : step === 'payment' ? '2' : '✓'}
              </div>
              <div>
                <h2 className="text-base font-bold text-[#00142f]">
                  {step === 'form' && 'Citizen Application Form'}
                  {step === 'payment' && 'Fee Remittance & Verification'}
                  {step === 'done' && 'Filing Receipt Issued'}
                </h2>
                <span className="text-xs text-gray-400">Step {step === 'form' ? '1 of 2' : step === 'payment' ? '2 of 2' : 'Completed'}</span>
              </div>
            </div>

            <span className="text-xs bg-[#e5eeff] text-[#00142f] px-2.5 py-1 rounded font-semibold">
              Authorized Kendra Portal
            </span>
          </div>

          {/* Step 1: Citizen Details Form */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Full Name (As per Aadhaar / Official ID) *
                  </label>
                  <input
                    name="fullName"
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
                    placeholder="Enter full legal name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Mobile Number (For SMS Status Updates) *
                  </label>
                  <input
                    name="phone"
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Email Address (For Acknowledgement Receipt) *
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Application Requirements &amp; Specific Details (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
                  placeholder="Mention exact corrections needed (e.g., Change address to 123 MG Road, DOB correction to 15/08/1990, etc.)..."
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Attach Supporting Documents (ID, Proof of Address, Bills)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-[#00142f] transition-colors cursor-pointer bg-gray-50">
                  <input
                    type="file"
                    multiple
                    onChange={e => setFiles([...e.target.files])}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#00142f] file:text-white hover:file:bg-[#a73a00]"
                  />
                  <p className="text-[11px] text-gray-400 mt-2">
                    PDF, JPG, PNG up to 10MB each. Multiple attachments allowed.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Proceeding generates your unique Token and Payment invoice.
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-[#00142f] hover:bg-[#a73a00] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Submitting Application...' : 'Continue to Payment →'}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment Verification */}
          {step === 'payment' && paymentInfo && (
            <div className="space-y-6">
              <div className="bg-[#eff4ff] p-5 rounded-xl border border-[#cbdbf5]">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#00142f]">Application Initiated Successfully</h3>
                  <span className="text-xs font-mono font-bold bg-white text-[#00142f] px-2.5 py-1 rounded border border-gray-200">
                    Ref: {referenceId}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-4">
                  Please scan the QR code or transfer to the official bank account below. Enter the UTR / Transaction number to confirm clearance.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-lg border border-gray-200 text-xs">
                  <div>
                    <span className="text-gray-400 block mb-0.5">Payable Amount</span>
                    <strong className="text-lg text-[#00142f]">₹{paymentInfo.amount}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-0.5">Official UPI ID</span>
                    <strong className="text-sm text-emerald-800 font-mono">{paymentInfo.upiId || 'eseva@upi'}</strong>
                  </div>
                  {paymentInfo.bankName && (
                    <div className="sm:col-span-2 pt-2 border-t border-gray-100 text-gray-600">
                      Bank: <strong>{paymentInfo.bankName}</strong> · A/C: <strong>{paymentInfo.accountNumber}</strong> · IFSC: <strong>{paymentInfo.ifsc}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* UTR and Proof form */}
              <form onSubmit={submitPayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    UPI Reference / UTR Number (12 Digits) *
                  </label>
                  <input
                    className="w-full text-xs sm:text-sm border border-gray-300 rounded-lg p-3 focus:border-[#00142f] focus:outline-none"
                    placeholder="e.g. 412345678901"
                    value={utr}
                    onChange={e => setUtr(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Upload Payment Screenshot / Transfer Slip *
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={e => setProof(e.target.files[0])}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#00142f] file:text-white"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Payment proof is verified automatically within minutes.
                  </span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-[#a73a00] hover:bg-[#802a00] text-white rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                  >
                    {submitting ? 'Verifying Receipt...' : 'Confirm Payment →'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Confirmation & Receipt */}
          {step === 'done' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#00142f] mb-2 font-headline">
                Application Successfully Filed!
              </h3>
              <p className="text-xs text-gray-600 max-w-md mx-auto mb-6">
                Your filing has been logged into the citizen portal dispatch queue. A notification has been dispatched to your mobile and email.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 max-w-sm mx-auto mb-8 text-xs text-left">
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Acknowledgement No:</span>
                  <strong className="text-gray-900 font-mono">{referenceId}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Service:</span>
                  <strong className="text-gray-900">{service.name}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Status:</span>
                  <strong className="text-emerald-700">Submitted / Under Verification</strong>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <Link
                  to={`/status?id=${encodeURIComponent(referenceId)}`}
                  className="px-6 py-2.5 bg-[#00142f] text-white text-xs font-semibold rounded-lg hover:bg-[#a73a00] transition-colors"
                >
                  Track Live Status
                </Link>
                <Link
                  to="/"
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}