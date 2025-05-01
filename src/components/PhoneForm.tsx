'use client';

import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useEffect} from "react";
import {PhoneInputInfer, phoneSchema} from "@/app/lib/validation";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {PhoneInputComponent} from "@/components/ui/phone-input-component";
import {sendOtpAction} from "@/app/login/actions";
import {FIELDS} from "@/lib/constants";

export default function PhoneForm({  onSuccess}: any) {

    const form = useForm<z.infer<typeof phoneSchema>>({
        resolver: zodResolver(phoneSchema),

    })


    const processForm: SubmitHandler<PhoneInputInfer> = async data => {
        console.log({data})
        const result = await sendOtpAction(data)
        console.log({result})
        if (!result) {
            console.log('Something went wrong')
            return
        }

        if (result.error) {
            // set local error state
            console.log(result.error)
            return
        }
        if (result.success) {
            onSuccess(result?.data.mobile)
        }
        // reset()
        // setData(result.data)
    }


    return (
        <Form {...form}>
        <form /*action={action}*/ onSubmit={form.handleSubmit(processForm)}>
            <h2 className="text-center mb-4 text-xl font-semibold">ورود با شماره موبایل</h2>
            <FormField
                control={form.control}
                name={FIELDS.MOBILE}
                render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                        <FormLabel>mobileNumber</FormLabel>
                        <FormControl className="w-full">
                            <PhoneInputComponent
                                placeholder="Placeholder"
                                {...field}
                                defaultCountry="IR"
                                countries={["IR"]} // restricts to only IR
                                international={false}
                            />
                        </FormControl>
                        <FormDescription>Enter your mobile Number.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />


            <Button
                className="mt-4 w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
            >
                {form.formState.isSubmitting ? 'ارسال...' : 'ارسال کد'}
            </Button>
        </form>

        </Form>
        // <form
        //     className="mx-auto mb-8 flex w-[90%] max-w-full flex-col items-start md:w-full xl:mb-[181px] xl:w-[280px]">
        //     <h2 className="text-xl w-full mb-[35px] text-center">لطفا شماره موبایل خود را وارد
        //         کنید</h2>
        //     <section className="relative w-full">
        //         <input
        //             placeholder="شماره موبایل خود را وارد کنید"
        //             className=" false mx-0 h-[48px] w-full rounded-[4px] border-[1px] border-[#C2C2C2] p-[15px] text-xs outline-none transition-all duration-300 focus:border-[#0165e1] undefined"/>
        //     </section>
        //     <Button type="submit" variant={"default"}
        //             className="relative flex h-12  items-center justify-center rounded-md bg-brand  px-5 transition-all duration-700 disabled:opacity-50 w-full mt-7 hover:shadow-2xl focus:shadow-none">تایید
        //         و دریافت کد
        //         <div className="btnLoader">
        //
        //         </div>
        //     </Button>
        // </form>
    )
        ;
}
