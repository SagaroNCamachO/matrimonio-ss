import { Info, Phone, Mail, Car, Hotel, Music } from 'lucide-react';
import { WeddingInfo } from '@/types';

interface AdditionalInfoProps {
  weddingInfo: WeddingInfo;
}

export default function AdditionalInfo({ weddingInfo }: AdditionalInfoProps) {
  const additionalInfo = weddingInfo.additionalInfo || {};
  
  const infoItems = [
    {
      icon: Phone,
      title: 'Contacto',
      description: 'Para cualquier consulta o ayuda durante el viaje',
            details: [
        additionalInfo.contact?.phone && `Teléfono: ${additionalInfo.contact.phone}`,
        additionalInfo.contact?.email && `Email: ${additionalInfo.contact.email}`,
      ].filter(Boolean) as string[],
      badge: 'bg-[#fde5ea] text-[#b04a60]',
    },
    {
      icon: Car,
      title: 'Transporte',
      description: additionalInfo.transport?.description || 'Información sobre cómo llegar',
      details: additionalInfo.transport?.details || [],
      badge: 'bg-[#fef3e2] text-[#b06a41]',
    },
    {
      icon: Hotel,
      title: 'Alojamiento',
      description: additionalInfo.accommodation?.description || 'Hoteles recomendados cerca del evento',
      details: additionalInfo.accommodation?.details || [],
      badge: 'bg-[#f0f4ff] text-[#4f63a6]',
    },
    {
      icon: Music,
      title: 'Música',
      description: additionalInfo.music?.description || '¿Tienes alguna canción especial que no puede faltar?',
      details: additionalInfo.music?.details || [],
      badge: 'bg-[#f9e0ec] text-[#a94c7b]',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#fff5f7] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
            <Info className="w-8 h-8 text-rose-500" />
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300 mb-3">
            Todo listo
          </p>
          <h2 className="text-4xl font-serif font-bold text-[#4f2d33] mb-4">
            Información Adicional
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"></div>
          <p className="text-gray-600 mt-6 text-lg max-w-3xl mx-auto">
            Queremos que vivas una experiencia cálida y cuidada, por eso dejamos estos datos útiles
            para que puedas planificar sin preocupaciones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {infoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-1 transition-all border border-rose-50"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${item.badge}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#4f2d33] mb-2">{item.title}</h3>
                <p className="text-[#6b3d45] mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-[#4f2d33] flex items-start gap-2">
                      <span className="text-rose-400 mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

