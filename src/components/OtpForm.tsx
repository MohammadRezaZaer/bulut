'use client';

import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import * as z from "zod";

import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/ui/input-otp";

import OtpInput from 'react-otp-input';

import {verifyOtpAction} from "@/app/login/actions";
import {ResendOtpButton} from "@/components/ResendOtpButton";
import {FIELDS, ROUTES} from "@/lib/constant/constants";
import {otpSchema, OtpInputInfer} from "@/lib/schema/schemas";

export default function OtpForm({mobile, onBack, onSuccess}: {
    mobile: string,
    onBack: () => void,
    onSuccess?: () => void
}) {
    const router = useRouter();

    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            [FIELDS.OTP]: '',
            [FIELDS.MOBILE]: mobile,
        },
    });

    const {mutate: verifyOtp, isPending} = useMutation({
        mutationFn: verifyOtpAction,
        onSuccess: (result) => {
            if (result.success) {
                toast.success('با موفقیت وارد شدید!');
                onSuccess?.(); // Optional external callback
                router.push(ROUTES.DASHBOARD.Dashboard);
            } else if (result.error) {
                toast.error('کد وارد شده معتبر نیست.');
                Object.entries(result.error).forEach(([key, messages]) => {
                    form.setError(key as keyof OtpInputInfer, {
                        message: messages?.[0] || 'خطا',
                        type: 'manual'
                    });
                });
            }
        },
        onError: () => {
            toast.error('خطایی در ارتباط با سرور رخ داد.');
        },
    });

    const handleSubmit: SubmitHandler<OtpInputInfer> = data => {
        verifyOtp(data);
    };

    return (
        <>
            <button onClick={onBack} className="mr-auto flex justify-center text-black">
                <span>بازگشت</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15.5 6L9.5 12L15.5 18"/>
                </svg>
            </button>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-y-4 justify-center py-4"
                >
                    <h2 className="text-[16px]">کد فعال‌سازی را وارد نمایید</h2>

                    <FormField
                        control={form.control}
                        name={FIELDS.OTP}
                        render={({field}) => (
                            <FormItem className="direction-ltr flex flex-col items-center justify-center">
                                <FormControl>


                                    <OtpInput
                                        value={field.value}
                                        onChange={ field.onChange}
                                        numInputs={4}
                                        renderSeparator={""}
                                        renderInput={(props) => <input {...props} />}
                                    />

                                    {/*<InputOTP*/}
                                    {/*    maxLength={5}*/}
                                    {/*    onComplete={form.handleSubmit(handleSubmit)}*/}
                                    {/*    {...field}*/}
                                    {/*>*/}
                                    {/*    <InputOTPGroup>*/}
                                    {/*        <InputOTPSlot index={0}/>*/}
                                    {/*        <InputOTPSeparator/>*/}
                                    {/*        <InputOTPSlot index={1}/>*/}
                                    {/*        <InputOTPSeparator/>*/}
                                    {/*        <InputOTPSlot index={2}/>*/}
                                    {/*        <InputOTPSeparator/>*/}
                                    {/*        <InputOTPSlot index={3}/>*/}
                                    {/*        <InputOTPSeparator/>*/}
                                    {/*        <InputOTPSlot index={4}/>*/}
                                    {/*    </InputOTPGroup>*/}
                                    {/*</InputOTP>*/}
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <input type="hidden" {...form.register(FIELDS.MOBILE)} value={mobile}/>

                    <Button
                        isLoading={isPending}
                        type="submit"
                        className="mt-4 w-full"
                        disabled={isPending}
                    >
                        ورود
                    </Button>
                </form>
            </Form>

            <ResendOtpButton
                duration={150}
                onResend={() => {
                    // Optional: handle resend logic
                    toast.success('کد فعال‌سازی مجدداً ارسال شد.');
                }}
            />
        </>
    );
}
