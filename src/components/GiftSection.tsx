'use client';

import { Gift, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface GiftSectionProps {
  bank: string;
  accountNumber: string;
  accountHolder: string;
  accountType: 'cuenta_rut' | 'cuenta_corriente' | 'cuenta_vista' | 'chequera_electronica' | 'cuenta_ahorro';
  accountRut?: string;
  totalReceived: number;
  goal: number;
  currency: string;
}

export default function GiftSection({
  bank,
  accountNumber,
  accountHolder,
  accountType,
  accountRut,
  totalReceived,
  goal,
  currency,
}: GiftSectionProps) {
  const [copiedField, setCopiedField] = useState<'account' | 'rut' | null>(null);
  const percentage = goal > 0 ? Math.min((totalReceived / goal) * 100, 100) : 0;
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: currency || 'CLP',
    minimumFractionDigits: 0,
  });

  const accountTypeLabels: Record<GiftSectionProps['accountType'], string> = {
    cuenta_rut: 'Cuenta RUT',
    cuenta_corriente: 'Cuenta Corriente',
    cuenta_vista: 'Cuenta Vista',
    chequera_electronica: 'Chequera Electrónica',
    cuenta_ahorro: 'Cuenta de Ahorro',
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedField('account');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyRut = () => {
    if (!accountRut) return;
    navigator.clipboard.writeText(accountRut);
    setCopiedField('rut');
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
            <Gift className="w-8 h-8 text-rose-600" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
            Regalos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
          <p className="text-gray-600 mt-6 text-lg">
            Tu presencia es el mejor regalo, pero si deseas colaborar con nuestra luna de miel,
            puedes hacer un depósito en la siguiente cuenta:
          </p>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl shadow-lg p-8 md:p-12">
          {/* Account Info */}
          <div className="bg-white rounded-xl p-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Tipo de Cuenta
                  </label>
                  <p className="text-lg text-gray-800 mt-1">
                    {accountTypeLabels[accountType]}
                  </p>
                </div>
                {accountRut && accountType === 'cuenta_rut' && (
                  <button
                    onClick={copyRut}
                    className="px-3 py-1 text-xs font-semibold text-rose-600 bg-rose-50 rounded-full hover:bg-rose-100 transition-colors"
                    title="Copiar RUT del titular"
                  >
                    Copiar RUT
                  </button>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Banco
                </label>
                <p className="text-xl text-gray-800 mt-1">{bank}</p>
              </div>
              
              {accountRut && accountType === 'cuenta_rut' && (
                <div>
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    RUT del Titular
                  </label>
                  <p className="text-xl text-gray-800 mt-1">{accountRut}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Titular
                </label>
                <p className="text-xl text-gray-800 mt-1">{accountHolder}</p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Número de Cuenta
                </label>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-2xl font-mono text-gray-800 flex-1">{accountNumber}</p>
                  <button
                    onClick={copyToClipboard}
                    className="p-3 bg-rose-100 hover:bg-rose-200 rounded-lg transition-colors"
                    title="Copiar número de cuenta"
                  >
                    {copiedField === 'account' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-rose-600" />
                    )}
                  </button>
                </div>
                {copiedField === 'account' && (
                  <p className="text-sm text-green-600 mt-2">¡Copiado al portapapeles!</p>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">Meta de Luna de Miel</span>
              <span className="text-sm font-semibold text-rose-600">
                {formatter.format(totalReceived)} / {formatter.format(goal)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-400 to-pink-500 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              {percentage.toFixed(1)}% completado
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

