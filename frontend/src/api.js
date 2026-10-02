const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getServices = async () => {
  const res = await fetch(`${API_URL}/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
};

export const getServiceById = async (id) => {
  const res = await fetch(`${API_URL}/services/${id}`);
  if (!res.ok) throw new Error('Failed to fetch service');
  return res.json();
};

export const submitApplication = async (data) => {
  const res = await fetch(`${API_URL}/services/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to submit application');
  return res.json();
};

export const adminLogin = async (email, password) => {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const getApplications = async (token) => {
  const res = await fetch(`${API_URL}/admin/applications`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch applications');
  return res.json();
};

export const updateStatus = async (token, id, status) => {
  const res = await fetch(`${API_URL}/admin/applications/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
};

export const getStatusByReference = async (referenceId) => {
  const res = await fetch(`${API_URL}/services/status/${referenceId}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
};

export const userSignup = async (data) => {
  const res = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Signup failed');
  return res.json();
};

export const userLogin = async (email, password) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const getMyApplications = async (token) => {
  const res = await fetch(`${API_URL}/users/my-applications`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const uploadPaymentProof = async (referenceId, formData) => {
  const res = await fetch(`${API_URL}/services/applications/${referenceId}/payment`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
};

export const sendContact = async (data) => {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
};