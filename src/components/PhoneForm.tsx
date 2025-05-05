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
import {FIELDS} from "@/lib/constant/constants";

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
                        <FormLabel>شماره همراه</FormLabel>
                        <FormControl className="w-full">
                            <PhoneInputComponent
                                placeholder="09141234123"
                                {...field}
                                defaultCountry="IR"
                                countries={["IR"]} // restricts to only IR
                                international={false}
                            />
                        </FormControl>
                        <FormDescription>لطفا شماره همراه خود را وارد نمایید.</FormDescription>
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

    )
        ;
}
