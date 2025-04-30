// app/api/logout/route.ts
import { logout } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  logout();
  const origin = req.headers.get('origin') || 'http://localhost:3000';
  return NextResponse.redirect(`${origin}/login`);
}
