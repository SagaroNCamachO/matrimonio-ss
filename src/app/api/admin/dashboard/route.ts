import { NextRequest, NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  if (!requireAuth(request)) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }
  const data = readDatabase();
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  if (!requireAuth(request)) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { message: 'Datos inválidos' },
      { status: 400 },
    );
  }
  writeDatabase(body);
  return NextResponse.json({ message: 'Actualizado' });
}

