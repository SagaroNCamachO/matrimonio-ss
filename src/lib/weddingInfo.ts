import { readDatabase } from '@/lib/db';
import { WeddingData } from '@/types';

export async function getWeddingData(): Promise<WeddingData> {
  return readDatabase();
}

