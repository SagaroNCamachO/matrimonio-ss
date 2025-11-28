import { NextRequest, NextResponse } from 'next/server';
import { readDatabase, writeDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Expense } from '@/types';

function unauthorized() {
  return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const data = readDatabase();
  return NextResponse.json(data.expenses);
}

export async function POST(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const body = (await request.json().catch(() => null)) as
    | Omit<Expense, 'id'>
    | null;
  if (!body?.description || !body?.amount || !body?.category || !body?.date) {
    return NextResponse.json(
      { message: 'Todos los campos son obligatorios' },
      { status: 400 },
    );
  }
  const db = readDatabase();
  const newExpense: Expense = {
    id: Date.now().toString(),
    description: body.description,
    amount: body.amount,
    category: body.category,
    date: body.date,
    notes: body.notes,
  };
  db.expenses.push(newExpense);
  writeDatabase(db);
  return NextResponse.json(newExpense, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!requireAuth(request)) return unauthorized();
  const body = (await request.json().catch(() => null)) as
    | Partial<Expense> & { id?: string }
    | null;
  if (!body?.id) {
    return NextResponse.json(
      { message: 'ID requerido' },
      { status: 400 },
    );
  }
  const db = readDatabase();
  const index = db.expenses.findIndex((exp) => exp.id === body.id);
  if (index === -1) {
    return NextResponse.json({ message: 'Gasto no encontrado' }, { status: 404 });
  }
  db.expenses[index] = { ...db.expenses[index], ...body };
  writeDatabase(db);
  return NextResponse.json(db.expenses[index]);
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
  const exists = db.expenses.find((exp) => exp.id === id);
  if (!exists) {
    return NextResponse.json({ message: 'Gasto no encontrado' }, { status: 404 });
  }
  db.expenses = db.expenses.filter((exp) => exp.id !== id);
  writeDatabase(db);
  return NextResponse.json({ message: 'Gasto eliminado' });
}

