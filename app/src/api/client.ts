const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || res.statusText);
  }
  return res.json();
}

export const api = {
  login: (email: string, password: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string, type: 'personal' | 'user') =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, type: type.toUpperCase() }),
    }),

  getProfile: (token: string) =>
    request('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
