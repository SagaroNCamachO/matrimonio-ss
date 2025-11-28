'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { Heart } from 'lucide-react';
import { WeddingInfo } from '@/types';
import Countdown from './Countdown';

interface HeroProps {
  weddingInfo: WeddingInfo;
}

export default function Hero({ weddingInfo }: HeroProps) {
  // Parsear la fecha como local para evitar problemas de zona horaria
  const [year, month, day] = weddingInfo.date.split('-').map(Number);
  const weddingDate = new Date(year, month - 1, day);
  const formattedDate = format(weddingDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#fff6f7] via-[#fdecee] to-[#f8dfe4] overflow-hidden pt-24 pb-16">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_45%)]" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto px-6">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 text-rose-500 mb-6 shadow-sm">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span className="uppercase tracking-[0.3em] text-xs">Matrimonio</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#4b2a30] leading-tight">
            {weddingInfo.couple.name1}
            <span className="text-rose-400"> & </span>
            {weddingInfo.couple.name2}
          </h1>
          <p className="mt-6 text-2xl text-[#874c57] font-light">
            {weddingInfo.hero.headline}
          </p>
          <p className="mt-3 text-lg text-[#5f3a40]">{weddingInfo.hero.subheadline}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 text-[#4f2d33]">
            <div className="flex-1 bg-white/80 rounded-2xl p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.4em] text-rose-300">Fecha</p>
              <p className="text-xl font-semibold">
                {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
              </p>
            </div>
            <div className="flex-1 bg-white/80 rounded-2xl p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.4em] text-rose-300">Hora</p>
              <p className="text-xl font-semibold">{weddingInfo.time} hrs</p>
            </div>
          </div>

          {/* Contador regresivo */}
          <Countdown targetDate={weddingInfo.date} targetTime={weddingInfo.time} />
        </div>

        <div className="flex-1 w-full">
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl ring-8 ring-white/70 bg-gray-100">
            {weddingInfo.hero.image ? (
              <img
                src={weddingInfo.hero.image}
                alt="Inspiración boda tonos palo rosa"
                className="h-[420px] w-full object-cover"
                onError={(e) => {
                  // Si la imagen falla, mostrar placeholder
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80';
                  target.onerror = null; // Evitar loop infinito
                }}
                onLoad={() => {
                  // Imagen cargada correctamente
                  console.log('Imagen hero cargada:', weddingInfo.hero.image);
                }}
              />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80"
                alt="Inspiración boda tonos palo rosa"
                className="h-[420px] w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1b0b0d]/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
              <p className="text-sm uppercase tracking-[0.5em]">Ancud, Chile</p>
              <p className="text-3xl font-serif font-semibold mt-1">
                {format(weddingDate, 'd')} · {format(weddingDate, 'MMM', { locale: es })} · {format(weddingDate, 'yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

