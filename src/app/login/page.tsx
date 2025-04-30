'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { sendOtpAction } from './actions';

export default function LoginPage() {
    const [state, action] = useFormState(sendOtpAction, null);

    return (
        <form action={action} className="max-w-sm mx-auto mt-20 space-y-4">
            <Input name="phone" placeholder="Enter your phone number" required />
            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
            <Button type="submit">Send OTP</Button>
        </form>
    );
}
