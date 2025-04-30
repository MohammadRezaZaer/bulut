'use server';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { generateOTP, saveOtp, sendOtpToPhone } from '@/lib/otp';

const phoneSchema = z.object({
    phone: z.string().min(8),
});

export async function sendOtpAction(_: any, formData: FormData) {
    const parsed = phoneSchema.safeParse({ phone: formData.get('phone') });

    if (!parsed.success) return { error: 'Invalid phone' };

    const phone = parsed.data.phone;
    const otp = generateOTP();
    saveOtp(phone, otp);
    sendOtpToPhone(phone, otp);

    redirect(`/verify?phone=${phone}`);
}
