'use client';



import {logoutAction} from "@/app/dashboard/actions";

export default function LogoutForm() {
    return (
        <form action={logoutAction}>
            <button type="submit" className="hover:bg-gray-50 text-right w-full block px-3 py-1 text-sm leading-6 text-gray-900">خروج</button>
        </form>
    );
}
