'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function ConfirmarPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message ?? 'Error al confirmar');
      }
      setStatus('success');
      setMessage(data.message);
      setFullName('');
      setPhone('');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Error al confirmar');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 flex items-center justify-center px-4 pt-20 pb-10">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">Confirma tu asistencia</h1>
          <p className="text-gray-600">
            Completa el siguiente formulario para confirmar tu asistencia al matrimonio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Ej: Juan Pérez González"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número de teléfono <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Ej: +56 9 1234 5678"
            />
            <p className="text-xs text-gray-500 mt-1">Incluye el código de país (ej: +56 para Chile)</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo electrónico <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Ej: juan.perez@ejemplo.com"
            />
          </div>
          {message && (
            <div
              className={`p-3 rounded-xl text-sm ${
                status === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message}
            </div>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full inline-flex items-center justify-center gap-2 bg-rose-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-rose-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Confirmar asistencia
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

