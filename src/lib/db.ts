import fs from 'fs';
import path from 'path';
import { WeddingInfo, Guest, Table, Expense } from '@/types';

const dataPath = path.join(process.cwd(), 'data', 'database.json');

export interface DatabaseSchema {
  weddingInfo: WeddingInfo;
  guests: Guest[];
  tables: Table[];
  expenses: Expense[];
}

function ensureDataFile() {
  if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    fs.writeFileSync(
      dataPath,
      JSON.stringify(
        {
          weddingInfo: {
            couple: { name1: 'Pareja 1', name2: 'Pareja 2' },
            date: '2025-01-01',
            time: '16:00',
            hero: {
              headline: 'Bienvenidos a nuestra celebración',
              subheadline:
                'Gracias por compartir con nosotros este día tan especial.',
            },
            ceremony: {
              name: 'Lugar de la ceremonia',
              address: 'Dirección de la ceremonia',
              lat: 0,
              lng: 0,
            },
            reception: {
              name: 'Lugar de la fiesta',
              address: 'Dirección de la fiesta',
              lat: 0,
              lng: 0,
            },
            dressCode: 'Código de vestimenta elegante',
            giftAccount: {
              bank: 'Banco',
              accountNumber: '0000 0000 0000 0000',
              accountHolder: 'Nombre del titular',
              accountType: 'cuenta_corriente',
              accountRut: '',
              totalReceived: 0,
              goal: 0,
              currency: 'EUR',
            },
            whatsappMessage:
              '¡Hola! Nos encantaría que nos acompañaras en nuestro matrimonio. Confirma tu asistencia aquí: {confirmUrl}',
          },
          guests: [],
          tables: [],
          expenses: [],
        },
        null,
        2,
      ),
    );
  }
}

export function readDatabase(): DatabaseSchema {
  ensureDataFile();
  const data = fs.readFileSync(dataPath, 'utf-8');
  const parsed = JSON.parse(data) as DatabaseSchema;
  // Asegurar que todos los datos sean serializables
  return JSON.parse(JSON.stringify(parsed)) as DatabaseSchema;
}

export function writeDatabase(updated: DatabaseSchema) {
  fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2));
}

