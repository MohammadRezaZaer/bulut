'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {addEntry} from "@/app/login/actions";
import {FormDataSchema, Inputs, phoneSchema} from "@/app/lib/validation";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {PhoneInputComponent} from "@/components/ui/phone-input-component";
import {FIELDS} from "@/lib/constants";




export default function RhfWithAction() {
    const [data, setData] = useState<Inputs>()



    const processForm: SubmitHandler<Inputs> = async data => {

        const result = await addEntry(data)
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

        // reset()
        setData(result.data)
    }
    const form = useForm<z.infer<typeof FormDataSchema>>({
        resolver: zodResolver(FormDataSchema),

    })
    return (
        <Form {...form}>
        <section className='flex gap-6'>
            <form
                onSubmit={form.handleSubmit(processForm)}
                className='flex flex-1 flex-col gap-4 sm:w-1/2'
            >


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


                <button className='rounded-lg bg-black py-2 text-white'>Submit</button>
            </form>

            <div className='flex-1 rounded-lg bg-cyan-600 p-8 text-white'>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </section>
        </Form>
    )
}