'use client';

import { useEffect, useMemo, useState } from 'react';
import { ShieldCheck, LogOut, Loader2 } from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';

const TOKEN_KEY = 'wedding_admin_token';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      setToken(stored);
    }
    setLoading(false);
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message ?? 'Credenciales inválidas');
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      (event.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
              <ShieldCheck className="w-8 h-8 text-rose-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">
              Panel Administrativo
            </h1>
            <p className="text-gray-600">
              Inicia sesión con tus credenciales para gestionar toda la información del
              matrimonio.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Usuario
              </label>
              <input
                name="username"
                type="text"
                required
                defaultValue="Admin"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                placeholder="Admin"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                required
                defaultValue="12345"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                placeholder="•••••"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-rose-700 transition-colors"
            >
              Entrar al panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-800">
              Panel de Control
            </h1>
            <p className="text-gray-500">Gestiona toda la información del matrimonio</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>

        <AdminDashboard token={token} />
      </div>
    </div>
  );
}

