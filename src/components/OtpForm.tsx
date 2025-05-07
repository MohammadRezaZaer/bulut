'use client';

import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {OtpInputInfer, otpSchema} from "@/app/lib/validation";
import {verifyOtpAction} from "@/app/login/actions";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {FIELDS} from "@/lib/constant/constants";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {ResendOtpButton} from "@/components/ResendOtpButton";
import {useRouter} from "next/navigation";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";

export default function OtpForm({mobile, onBack, onSuccess}: any) {

    const router = useRouter()

    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),

    })
    const processForm: SubmitHandler<OtpInputInfer> = async data => {
        console.log({data})
        const result = await verifyOtpAction(data);
        console.log({result})
        if (!result) {
            console.log('Something went wrong')
            return
        }

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

        if (result.success) {
            // onSuccess()
            console.log("suuuu")
            router.push('/dashboard')
        }

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
                    <h2
                        className="title text-[16px]">کد فعالسازی را وارد نمایید</h2>

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
                                    <InputOTP className="" maxLength={4} onComplete={form.handleSubmit(processForm)} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />

                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />


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
                        className="mt-4 w-full"
                        type="submit"
                        disabled={form.formState.isSubmitting}
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
