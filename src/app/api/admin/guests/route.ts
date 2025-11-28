import { NextRequest, NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Guest } from '@/types';

function unauthorized() {
  return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const data = readDatabase();
  return NextResponse.json(data.guests);
}

export async function POST(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const body = (await request.json().catch(() => null)) as
    | Omit<Guest, 'id'>
    | null;
  if (!body?.name) {
    return NextResponse.json(
      { message: 'El nombre es obligatorio' },
      { status: 400 },
    );
  }

  const db = readDatabase();
  const newGuest: Guest = {
    id: Date.now().toString(),
    name: body.name,
    email: body.email,
    phone: body.phone,
    confirmed: body.confirmed ?? false,
    tableId: body.tableId,
    notes: body.notes,
  };
  db.guests.push(newGuest);
  if (newGuest.tableId) {
    const table = db.tables.find((t) => t.id === newGuest.tableId);
    if (table) {
      if (table.guestIds.length >= table.capacity) {
        return NextResponse.json(
          { message: 'La mesa ya está llena' },
          { status: 400 },
        );
      }
      table.guestIds.push(newGuest.id);
    }
  }
  writeDatabase(db);
  return NextResponse.json(newGuest, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const body = (await request.json().catch(() => null)) as
    | Partial<Guest> & { id?: string }
    | null;
  if (!body?.id) {
    return NextResponse.json(
      { message: 'ID requerido' },
      { status: 400 },
    );
  }
  const db = readDatabase();
  const index = db.guests.findIndex((guest) => guest.id === body.id);
  if (index === -1) {
    return NextResponse.json({ message: 'Invitado no encontrado' }, { status: 404 });
  }
  const previousTableId = db.guests[index].tableId;
  db.guests[index] = { ...db.guests[index], ...body };

  if (body.tableId !== undefined && body.tableId !== previousTableId) {
    // remove from old table
    if (previousTableId) {
      const previousTable = db.tables.find((t) => t.id === previousTableId);
      if (previousTable) {
        previousTable.guestIds = previousTable.guestIds.filter(
          (guestId) => guestId !== body.id,
        );
      }
    }
    // add to new table
    if (body.tableId) {
      const newTable = db.tables.find((t) => t.id === body.tableId);
      if (newTable) {
        if (newTable.guestIds.length >= newTable.capacity) {
          return NextResponse.json(
            { message: 'La mesa ya está llena' },
            { status: 400 },
          );
        }
        if (!newTable.guestIds.includes(body.id!)) {
          newTable.guestIds.push(body.id!);
        }
      }
    } else {
      db.guests[index].tableId = undefined;
    }
  }

  writeDatabase(db);
  return NextResponse.json(db.guests[index]);
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
  const guest = db.guests.find((g) => g.id === id);
  if (!guest) {
    return NextResponse.json({ message: 'Invitado no encontrado' }, { status: 404 });
  }
  if (guest.tableId) {
    const tableIndex = db.tables.findIndex((t) => t.id === guest.tableId);
    if (tableIndex !== -1) {
      db.tables[tableIndex].guestIds = db.tables[tableIndex].guestIds.filter(
        (guestId) => guestId !== id,
      );
    }
  }
  db.guests = db.guests.filter((g) => g.id !== id);
  writeDatabase(db);
  return NextResponse.json({ message: 'Invitado eliminado' });
}

