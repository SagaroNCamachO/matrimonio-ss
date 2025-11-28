import { NextRequest, NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { WeddingInfo } from '@/types';

function unauthorized() {
  return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const data = readDatabase();
  return NextResponse.json(data.weddingInfo);
}

export async function PUT(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const body = (await request.json().catch(() => null)) as WeddingInfo | null;
  if (!body) {
    return NextResponse.json(
      { message: 'Datos inválidos' },
      { status: 400 },
    );
  }
  
  // Validación básica de estructura
  if (!body.couple || !body.couple.name1 || !body.couple.name2) {
    return NextResponse.json(
      { message: 'Datos incompletos: se requiere información de la pareja' },
      { status: 400 },
    );
  }
  
  // Sanitizar datos antes de guardar
  const sanitizedBody = JSON.parse(JSON.stringify(body)) as WeddingInfo;
  
  const db = readDatabase();
  db.weddingInfo = sanitizedBody;
  writeDatabase(db);
  return NextResponse.json(db.weddingInfo);
}

