'use client';

import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {verifyOtpAction} from "@/app/login/actions";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {FIELDS, ROUTES} from "@/lib/constant/constants";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {ResendOtpButton} from "@/components/ResendOtpButton";
import {useRouter} from "next/navigation";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {OtpInputInfer, otpSchema} from "@/lib/schema/schemas";
import {useState} from "react";
import { useFormStatus } from "react-dom";
import {useMutation} from "@tanstack/react-query";

export default function OtpForm({mobile, onBack, onSuccess}: any) {

    const router = useRouter()

    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),

    })

    const {mutate: requestOTP, isPending: isLoading} = useMutation<
        any,
        any,
        any
    >({
        mutationFn: verifyOtpAction,

        onSuccess: async (result) => {
if(result.success){
        console.log("suuuu")
         router.push(ROUTES.DASHBOARD.Dashboard)
}else{
    if (result.error) {
        // set local error state
        toast.error(result.error.otp);
        console.log(result.error)


        for (const key in result.error) {
            form.setError(key as keyof OtpInputInfer, {
                message: result.error[key]?.[0] || 'خطا',
                type: 'manual'
            })
        }

        return
    }
}


        },

        onError: (error) => {
            console.log({error})
        },

    });
    console.log({isLoading})

    const processForm: SubmitHandler<OtpInputInfer> = async data => {


        requestOTP(data)

        // setLoading(true); // حالت بارگذاری را فعال می‌کنیم
        //
        // const result = await verifyOtpAction(data);
        //
        // setLoading(false); // حالت بارگذاری را غیرفعال می‌کنیم
        //
        // if (!result) {
        //     console.log('Something went wrong')
        //     return
        // }
        //
        // if (result.error) {
        //     // set local error state
        //     toast.error(result.error.otp);
        //     console.log(result.error)
        //
        //
        //     for (const key in result.error) {
        //         form.setError(key as keyof OtpInputInfer, {
        //             message: result.error[key]?.[0] || 'خطا',
        //             type: 'manual'
        //         })
        //     }
        //
        //     return
        // }
        //
        // if (result.success) {
        //     // onSuccess()
        //     console.log("suuuu")
        //     // router.push(ROUTES.DASHBOARD.Dashboard)
        // }

    }

    return (<>
            <button onClick={onBack} className=" mr-auto  flex  justify-center text-black">
                <span>بازگشت</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                     stroke="currentColor">
                    <path d="M15.5 6L9.5 12L15.5 18"></path>
                </svg>
            </button>
            <Form {...form} >
                <form /*action={action}*/ className="flex  flex-col  gap-y-4 justify-center py-4"
                                          onSubmit={form.handleSubmit(processForm)}>
                    <h2 className="title text-[16px]">کد فعالسازی را وارد نمایید</h2>
                    <h3 className="title text-[16px] text-green-400">12345</h3>


                    <FormField
                        control={form.control}
                        name={FIELDS.OTP}
                        render={({field}) => (
                            <FormItem className="direction-ltr flex flex-col items-center justify-center">
                                <FormControl>
                                    {/*<Input*/}
                                    {/*    className={"text-center"}*/}
                                    {/*    placeholder="کد 4 رقمی"*/}
                                    {/*    maxLength={4}*/}
                                    {/*    type=""*/}
                                    {/*    {...field} />*/}
                                    <InputOTP className="" maxLength={5} onComplete={form.handleSubmit(processForm)} {...field}>
                                        <InputOTPGroup>

                                            <InputOTPSlot index={0} />
                                            <InputOTPSeparator />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSeparator />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSeparator />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSeparator />
                                            <InputOTPSlot index={4} />

                                        </InputOTPGroup>


                                    </InputOTP>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {/* Hidden mobile field */}
                    <input type="hidden" {...form.register(FIELDS.MOBILE)} value={mobile}/>


                    <Button
                        isLoading={isLoading}
                        className="mt-4 w-full"
                        type="submit"
                        disabled={isLoading}
                    >
                        ورود
                    </Button>
                </form>

            </Form>
            <ResendOtpButton
                duration={150}
                onResend={() => {
                    // trigger your resend OTP server action here
                    console.log('OTP sent!')
                }}
            />

        </>


    )
        ;
}
