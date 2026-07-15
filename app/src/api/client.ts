const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    // Mostra detalhes de validação se disponíveis
    const message = data.details
      ? `${data.error}: ${JSON.stringify(data.details)}`
      : data.error || res.statusText;
    throw new Error(message);
  }
  return res.json();
}

export const api = {
  login: (email: string, password: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string, type: 'personal' | 'user', name?: string) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, type: type.toUpperCase(), name }),
    }),

  getProfile: () =>
    request('/auth/profile'),

  updateUserProfile: (data: Record<string, unknown>) =>
    request('/users/profile/user', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updatePersonalProfile: (data: Record<string, unknown>) =>
    request('/users/profile/personal', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  updateUser: (data: Record<string, unknown>) =>
    request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
