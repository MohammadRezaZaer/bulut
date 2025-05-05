// lib/auth.ts
import { cookies } from 'next/headers';
import {FIELDS} from "@/lib/constant/constants";

export function loginUser(phone: string) {
    cookies().set(FIELDS.AUTH_TOKEN, phone, { httpOnly: true });
}

export function logoutUser() {
    cookies().delete(FIELDS.AUTH_TOKEN);
}

export function getUser() {
    const phone = cookies().get(FIELDS.AUTH_TOKEN)?.value;
    return phone ? { phone } : null;
}


export function isAuthenticated(): boolean {
    const token = cookies().get(FIELDS.AUTH_TOKEN)?.value;
    return !!token;
}

export function setLoginCookie(phone: string) {
    cookies().set(FIELDS.AUTH_TOKEN, phone, { httpOnly: true });
}

export function clearLoginCookie() {
    cookies().delete(FIELDS.AUTH_TOKEN);
}

