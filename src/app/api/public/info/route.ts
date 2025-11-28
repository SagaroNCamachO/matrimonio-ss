import { readDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = readDatabase();
  return NextResponse.json({
    weddingInfo: data.weddingInfo,
  });
}

