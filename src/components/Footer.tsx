'use client';

import { Heart } from 'lucide-react';

interface FooterProps {
  coupleNames: {
    name1: string;
    name2: string;
  };
}

export default function Footer({ coupleNames }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
          <p className="text-xl font-serif">
            {coupleNames.name1} & {coupleNames.name2}
          </p>
        </div>
        <p className="text-gray-400 mb-2">
          Gracias por ser parte de nuestro día especial
        </p>
        <p className="text-sm text-gray-500">
          ¡Esperamos verte pronto!
        </p>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} - Hecho con ❤️ para nuestro matrimonio
          </p>
        </div>
      </div>
    </footer>
  );
}

