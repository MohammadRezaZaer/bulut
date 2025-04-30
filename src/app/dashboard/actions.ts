'use server';

import { logoutUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function logoutAction() {
    logoutUser();
    redirect('/login');
}
