// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { login } from '@/lib/auth';

export async function POST(req: Request) {
  const { phone } = await req.json();
  login(phone);
  return NextResponse.json({ success: true });
}
