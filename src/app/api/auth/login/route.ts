import { NextRequest, NextResponse } from 'next/server';
import { createAuthSuccessResponse, validateCredentials } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const username = body?.username;
  const password = body?.password;

  if (!username || !password) {
    return NextResponse.json(
      { message: 'Usuario y contraseña son obligatorios' },
      { status: 400 },
    );
  }

  if (!validateCredentials(username, password)) {
    return NextResponse.json(
      { message: 'Credenciales inválidas' },
      { status: 401 },
    );
  }

  return createAuthSuccessResponse();
}

