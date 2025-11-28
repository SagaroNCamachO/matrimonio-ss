'use client';

import { MapPin, Navigation } from 'lucide-react';

interface LocationMapProps {
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: 'ceremony' | 'reception';
}

export default function LocationMap({ name, address, lat, lng, type }: LocationMapProps) {
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  
  // URL de embed de Google Maps - funciona sin API key usando la dirección
  const embedUrl = apiKey 
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=15`
    : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDUxJzUzLjQiUyA3M8KwNDknMzkuNyJX!5e0!3m2!1ses!2scl!4v1234567890&q=${encodeURIComponent(address)}`;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-full ${type === 'ceremony' ? 'bg-blue-100' : 'bg-pink-100'}`}>
            {type === 'ceremony' ? (
              <MapPin className={`w-6 h-6 ${type === 'ceremony' ? 'text-blue-600' : 'text-pink-600'}`} />
            ) : (
              <Navigation className="w-6 h-6 text-pink-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {address}
            </p>
          </div>
        </div>
      </div>
      
      <div className="relative h-64 bg-gray-200">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
          title={`Mapa de ${name}`}
        ></iframe>
        
        {/* Link to open in Google Maps */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 z-10"
        >
          Abrir en Google Maps
        </a>
      </div>
    </div>
  );
}

