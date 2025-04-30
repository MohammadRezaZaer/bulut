'use client';



import {logoutAction} from "@/app/dashboard/actions";

export default function LogoutForm() {
    return (
        <form action={logoutAction}>
            <button type="submit">Logout</button>
        </form>
    );
}
