// lib/auth.ts
import { cookies } from 'next/headers';

export function loginUser(phone: string) {
    cookies().set('phone', phone, { httpOnly: true });
}

export function logoutUser() {
    cookies().delete('phone');
}

export function getUser() {
    const phone = cookies().get('phone')?.value;
    return phone ? { phone } : null;
}
