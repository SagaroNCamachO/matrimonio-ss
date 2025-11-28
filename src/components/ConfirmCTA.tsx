'use client';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

interface ConfirmCTAProps {
  couple: {
    name1: string;
    name2: string;
  };
}

export default function ConfirmCTA({ couple }: ConfirmCTAProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#fff5f7] via-white to-[#fdecee]">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-6">
          <CheckCircle2 className="w-10 h-10 text-rose-600" />
        </div>
        <h2 className="text-4xl font-serif font-bold text-[#4f2d33] mb-4">
          ¿Te unes a nuestra celebración?
        </h2>
        <p className="text-lg text-[#6b3d45] max-w-3xl mx-auto mb-10">
          Confirma tu asistencia para que podamos preparar cada detalle con mucho cariño.
        </p>

        <Link
          href="/confirmar"
          className="inline-flex items-center gap-2 bg-rose-600 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-rose-700 transition-colors text-lg"
        >
          <CheckCircle2 className="w-6 h-6" />
          Confirmar asistencia
        </Link>

        <p className="text-sm text-[#874c57] mt-8">
          {couple.name1} & {couple.name2} estarán felices de celebrar contigo.
        </p>
      </div>
    </section>
  );
}

