import { Shirt } from 'lucide-react';

interface DressCodeProps {
  dressCode: string;
}

export default function DressCode({ dressCode }: DressCodeProps) {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <Shirt className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
            Código de Vestimenta
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"></div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <p className="text-xl text-gray-700 text-center leading-relaxed font-light">
            {dressCode}
          </p>
        </div>
      </div>
    </section>
  );
}

