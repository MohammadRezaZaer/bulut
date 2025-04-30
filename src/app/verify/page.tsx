'use client';

import { useSearchParams } from 'next/navigation';
import { useFormState } from 'react-dom';
import { verifyOtpAction } from './actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const phone = searchParams.get('phone');
    const [state, action] = useFormState(verifyOtpAction, null);

    return (
        <form action={action} className="max-w-sm mx-auto mt-20 space-y-4">
            <input type="hidden" name="phone" value={phone ?? ''} />
            <Input name="otp" placeholder="Enter OTP" />
            {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
            <Button type="submit">Verify</Button>
        </form>
    );
}
