'use client';



import {logoutAction} from "@/app/dashboard/actions";

export default function LogoutForm() {
    return (
        <form action={logoutAction}>
            <button type="submit" className="block px-3 py-1 text-sm leading-6 text-gray-900">Logout</button>
        </form>
    );
}
