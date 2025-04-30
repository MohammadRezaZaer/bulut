'use server';

import { redirect } from 'next/navigation';
import { verifyOtp } from '@/lib/otp';
import { setLoginCookie } from '@/lib/auth';

export async function verifyOtpAction(_: any, formData: FormData) {
    const phone = formData.get('phone')?.toString();
    const code = formData.get('otp')?.toString();

    if (!phone || !code) return { error: 'Missing data' };
    const valid = verifyOtp(phone, code);

    if (!valid) return { error: 'Invalid OTP' };

    setLoginCookie(phone);
    redirect('/dashboard');
}
