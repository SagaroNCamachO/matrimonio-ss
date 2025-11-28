'use client';

import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

interface CountdownProps {
  targetDate: string; // Formato: "2026-02-14"
  targetTime: string; // Formato: "16:00"
}

export default function Countdown({ targetDate, targetTime }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Parsear la fecha y hora como local
    const [year, month, day] = targetDate.split('-').map(Number);
    const [hours, minutes] = targetTime.split(':').map(Number);
    
    const target = new Date(year, month - 1, day, hours, minutes, 0);
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsExpired(false);
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  if (isExpired) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-100 text-rose-700 mb-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-semibold">¡El día ha llegado!</span>
        </div>
        <p className="text-lg text-[#874c57] font-light">
          Gracias por acompañarnos en este día especial
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4">
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/70 text-rose-500 mb-2">
        <Calendar className="w-4 h-4" />
        <span className="text-xs uppercase tracking-[0.3em]">Faltan</span>
      </div>
      
      <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-md">
        <div className="bg-white/80 rounded-2xl p-4 shadow-sm text-center">
          <div className="text-3xl md:text-4xl font-bold text-[#4b2a30]">
            {timeLeft.days}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-rose-300 mt-1">
            {timeLeft.days === 1 ? 'Día' : 'Días'}
          </div>
        </div>
        
        <div className="bg-white/80 rounded-2xl p-4 shadow-sm text-center">
          <div className="text-3xl md:text-4xl font-bold text-[#4b2a30]">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-rose-300 mt-1">
            {timeLeft.hours === 1 ? 'Hora' : 'Horas'}
          </div>
        </div>
        
        <div className="bg-white/80 rounded-2xl p-4 shadow-sm text-center">
          <div className="text-3xl md:text-4xl font-bold text-[#4b2a30]">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-rose-300 mt-1">
            Minutos
          </div>
        </div>
        
        <div className="bg-white/80 rounded-2xl p-4 shadow-sm text-center">
          <div className="text-3xl md:text-4xl font-bold text-[#4b2a30]">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-rose-300 mt-1">
            Segundos
          </div>
        </div>
      </div>
      
      <p className="text-sm text-[#874c57] font-light mt-2">
        para nuestro gran día
      </p>
    </div>
  );
}

