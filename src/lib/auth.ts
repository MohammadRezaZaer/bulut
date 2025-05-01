// lib/auth.ts
import { cookies } from 'next/headers';
import {FIELDS} from "@/lib/constants";

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




export function setLoginCookie(phone: string) {
    cookies().set(FIELDS.MOBILE, phone, { httpOnly: true });
}

export function clearLoginCookie() {
    cookies().delete(FIELDS.MOBILE);
}

