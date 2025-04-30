import { getUser } from '@/lib/auth';
import LogoutForm from "@/app/dashboard/logout-form";

export default function Dashboard() {
    const user = getUser();

    return (
        <div style={{ padding: 20 }}>
            <h1>Welcome, {user?.phone}</h1>
            <LogoutForm />
        </div>
    );
}
