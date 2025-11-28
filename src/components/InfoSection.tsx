'use client';

import { Calendar, Clock, MapPin, UtensilsCrossed } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import LocationMap from './LocationMap';
import { WeddingInfo } from '@/types';

interface InfoSectionProps {
  weddingInfo: WeddingInfo;
}

export default function InfoSection({ weddingInfo }: InfoSectionProps) {
  // Parsear la fecha como local para evitar problemas de zona horaria
  const [year, month, day] = weddingInfo.date.split('-').map(Number);
  const weddingDate = new Date(year, month - 1, day);
  const formattedDate = format(weddingDate, "EEEE, d 'de' MMMM", { locale: es });

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-rose-500" />
          </div>
          <p className="uppercase text-xs tracking-[0.5em] text-rose-300 mb-2">Detalles</p>
          <h2 className="text-4xl font-serif font-bold text-[#4f2d33] mb-4">
            Información del Evento
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
        </div>


        {/* Ceremony */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-100 rounded-lg">
              <MapPin className="w-5 h-5 text-rose-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#4f2d33]">Ceremonia</h3>
          </div>
          
          {/* Fecha y hora de ceremonia */}
          {weddingInfo.ceremony.date && weddingInfo.ceremony.time && (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-[#fff3f4] to-white rounded-2xl p-6 shadow-lg shadow-rose-50 border border-rose-100">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-rose-500" />
                  <h4 className="text-lg font-bold text-[#4f2d33]">Fecha</h4>
                </div>
                <p className="text-xl text-[#6b3d45] font-light">
                  {(() => {
                    const [y, m, d] = weddingInfo.ceremony.date.split('-').map(Number);
                    const ceremonyDate = new Date(y, m - 1, d);
                    const formatted = format(ceremonyDate, "EEEE, d 'de' MMMM", { locale: es });
                    return formatted.charAt(0).toUpperCase() + formatted.slice(1) + ' de ' + format(ceremonyDate, 'yyyy');
                  })()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#ffeef3] to-white rounded-2xl p-6 shadow-lg shadow-rose-50 border border-rose-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-rose-500" />
                  <h4 className="text-lg font-bold text-[#4f2d33]">Hora</h4>
                </div>
                <p className="text-xl text-[#6b3d45] font-light">{weddingInfo.ceremony.time} horas</p>
              </div>
            </div>
          )}
          
          <LocationMap
            name={weddingInfo.ceremony.name}
            address={weddingInfo.ceremony.address}
            lat={weddingInfo.ceremony.lat}
            lng={weddingInfo.ceremony.lng}
            type="ceremony"
          />
        </div>

        {/* Reception */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-100 rounded-lg">
              <UtensilsCrossed className="w-5 h-5 text-rose-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#4f2d33]">Celebración</h3>
          </div>
          
          {/* Fecha y hora de celebración */}
          {weddingInfo.reception.date && weddingInfo.reception.time && (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-[#fff3f4] to-white rounded-2xl p-6 shadow-lg shadow-rose-50 border border-rose-100">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-rose-500" />
                  <h4 className="text-lg font-bold text-[#4f2d33]">Fecha</h4>
                </div>
                <p className="text-xl text-[#6b3d45] font-light">
                  {(() => {
                    const [y, m, d] = weddingInfo.reception.date.split('-').map(Number);
                    const receptionDate = new Date(y, m - 1, d);
                    const formatted = format(receptionDate, "EEEE, d 'de' MMMM", { locale: es });
                    return formatted.charAt(0).toUpperCase() + formatted.slice(1) + ' de ' + format(receptionDate, 'yyyy');
                  })()}
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#ffeef3] to-white rounded-2xl p-6 shadow-lg shadow-rose-50 border border-rose-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-rose-500" />
                  <h4 className="text-lg font-bold text-[#4f2d33]">Hora</h4>
                </div>
                <p className="text-xl text-[#6b3d45] font-light">{weddingInfo.reception.time} horas</p>
              </div>
            </div>
          )}
          
          <LocationMap
            name={weddingInfo.reception.name}
            address={weddingInfo.reception.address}
            lat={weddingInfo.reception.lat}
            lng={weddingInfo.reception.lng}
            type="reception"
          />
        </div>
      </div>
    </section>
  );
}

