import { NextRequest, NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Table } from '@/types';

function unauthorized() {
  return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const data = readDatabase();
  return NextResponse.json(data.tables);
}

export async function POST(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const body = (await request.json().catch(() => null)) as
    | Omit<Table, 'id' | 'guestIds'>
    | null;
  if (!body?.name || !body.capacity) {
    return NextResponse.json(
      { message: 'Nombre y capacidad son obligatorios' },
      { status: 400 },
    );
  }
  const db = readDatabase();
  const newTable: Table = {
    id: Date.now().toString(),
    name: body.name,
    capacity: Math.min(Math.max(body.capacity, 1), 10),
    guestIds: [],
  };
  db.tables.push(newTable);
  writeDatabase(db);
  return NextResponse.json(newTable, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const body = (await request.json().catch(() => null)) as
    | Partial<Table> & { id?: string }
    | null;
  if (!body?.id) {
    return NextResponse.json(
      { message: 'ID requerido' },
      { status: 400 },
    );
  }
  const db = readDatabase();
  const tableIndex = db.tables.findIndex((t) => t.id === body.id);
  if (tableIndex === -1) {
    return NextResponse.json({ message: 'Mesa no encontrada' }, { status: 404 });
  }
  const updatedTable = {
    ...db.tables[tableIndex],
    ...body,
    capacity: body.capacity
      ? Math.min(Math.max(body.capacity, 1), 10)
      : db.tables[tableIndex].capacity,
  };
  if (updatedTable.guestIds.length > updatedTable.capacity) {
    return NextResponse.json(
      { message: 'La capacidad no puede ser menor a los invitados asignados' },
      { status: 400 },
    );
  }
  db.tables[tableIndex] = updatedTable;
  writeDatabase(db);
  return NextResponse.json(updatedTable);
}

export async function DELETE(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json(
      { message: 'ID requerido' },
      { status: 400 },
    );
  }
  const db = readDatabase();
  const table = db.tables.find((t) => t.id === id);
  if (!table) {
    return NextResponse.json({ message: 'Mesa no encontrada' }, { status: 404 });
  }
  // remove assignments
  db.guests = db.guests.map((guest) =>
    guest.tableId === id ? { ...guest, tableId: undefined } : guest,
  );
  db.tables = db.tables.filter((t) => t.id !== id);
  writeDatabase(db);
  return NextResponse.json({ message: 'Mesa eliminada' });
}

