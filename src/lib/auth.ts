import { NextRequest, NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? 'Admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '12345';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? 'admin-token';

export function validateCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createAuthSuccessResponse() {
  return NextResponse.json({
    token: ADMIN_TOKEN,
    role: 'admin',
  });
}

export function requireAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.split(' ')[1];
  return token === ADMIN_TOKEN;
}

export function verifyAdminToken(token: string) {
  return token === ADMIN_TOKEN;
}

