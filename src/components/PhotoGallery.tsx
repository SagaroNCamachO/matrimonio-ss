'use client';

import Image from 'next/image';
import { WeddingInfo } from '@/types';

interface PhotoGalleryProps {
  weddingInfo: WeddingInfo;
}

export default function PhotoGallery({ weddingInfo }: PhotoGalleryProps) {
  const galleryImages = weddingInfo.photoGallery?.images || [
    {
      src: 'https://images.unsplash.com/photo-1520854223477-53da4c4631e8?auto=format&fit=crop&w=900&q=80',
      alt: 'Pareja celebrando al atardecer',
    },
    {
      src: 'https://images.unsplash.com/photo-1520854223477-3d8c5f7d7da3?auto=format&fit=crop&w=900&q=80',
      alt: 'Mesa romántica decorada',
    },
    {
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
      alt: 'Detalles florales en tonos palo rosa',
    },
  ];
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#fdf5f7] to-[#f8e5ea]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-rose-400 mb-3">
            Capturas de amor
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#4f2d33]">
            Un poco de nuestra historia
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Compartimos algunos momentos que reflejan nuestro camino y el estilo de vida que compartimos.
          </p>
        </div>

        {galleryImages.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative overflow-hidden rounded-3xl shadow-xl group"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={500}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                  unoptimized
                  onError={(e) => {
                    // Si la imagen falla, mostrar placeholder
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23f3f4f6" width="400" height="500"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="18"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-white text-lg font-semibold drop-shadow-lg">
                  {image.alt}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay fotos en la galería aún</p>
          </div>
        )}
      </div>
    </section>
  );
}

