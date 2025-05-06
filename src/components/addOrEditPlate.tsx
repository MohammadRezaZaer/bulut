"use client"
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {InputPlate} from "@/components/ui/input-plate";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";

const formSchema = z.object({
    'vehicle-type': z.string(),
    'pelak': z.string(),
    plateTitle: z.string().min(1)
});

export function AddOrEditPlate() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="vehicle-type"
                    render={({field}) => (
                        <FormItem className="space-y-3">
                            <FormLabel>نوع وسیله نقلیه

                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    className="flex  space-x-1"
                                >
                                    {[
                                        ["سواری", "savari"],
                                        ["موتور سیکلت", "motor"],

                                    ].map((option, index) => (
                                        <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={option[1]}/>
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                {option[0]}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="pelak"

                    render={({field}) => (
                        <FormItem>
                            <FormLabel>شماره پلاک</FormLabel>
                            <FormControl>
                                <InputPlate form={form} onChange={field.onChange}/>


                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="plateTitle"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>عنوان پلاک
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="عنوان پلاک"

                                    type=""
                                    {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button size={"lg"} type="submit">افزودن</Button>
            </form>
        </Form>)
}