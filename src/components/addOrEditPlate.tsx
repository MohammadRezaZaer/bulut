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
import {
    AddPlateSchema,
    MOTORCYCLE,
    PELAK,
    PELAK_AZAD,
    PELAK_MOTOR,
    PELAK_TITLE,
    SAVARI,
    VEHICLE_TYPE
} from "@/lib/schema/schemas";
import {MotorPlateInput} from "@/components/ui/motor-plate-input";




export function AddOrEditPlate({ plateID }) {
    const form = useForm<z.infer<typeof AddPlateSchema>>({
        resolver: zodResolver(AddPlateSchema),
    });

    const vehicleType = form.watch(VEHICLE_TYPE); // 👈 برای واکشی نوع وسیله

    function onSubmit(values: z.infer<typeof AddPlateSchema>) {
        try {
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

                {/* نوع وسیله نقلیه */}
                <FormField
                    control={form.control}
                    name={VEHICLE_TYPE}
                    render={({ field }) => (
                        <FormItem className="space-y-3 justify-center">
                            <FormLabel>نوع وسیله نقلیه</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    dir="rtl"
                                    onValueChange={field.onChange}
                                    className="flex  space-x-1"
                                >
                                    {[
                                        ["سواری", SAVARI],
                                        ["موتور سیکلت", MOTORCYCLE],
                                    ].map(([label, value], index) => (
                                        <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                            <FormControl>
                                                <RadioGroupItem value={value} />
                                            </FormControl>
                                            <FormLabel className="font-normal px-2">
                                                {label}
                                            </FormLabel>
                                        </FormItem>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* پلاک بر اساس نوع وسیله */}
                {vehicleType === SAVARI && (
                    <FormField
                        control={form.control}
                        name={PELAK}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> شماره پلاک سواری</FormLabel>
                                <FormControl>
                                    <InputPlate form={form} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {vehicleType === MOTORCYCLE && (
                    <FormField
                        control={form.control}
                        name={PELAK_MOTOR}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> شماره پلاک موتور</FormLabel>
                                <FormControl>
                                    <MotorPlateInput

                                        onChange={field.onChange}


                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {/* عنوان پلاک */}
                <FormField
                    control={form.control}
                    name={PELAK_TITLE}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>عنوان پلاک</FormLabel>
                            <FormControl>
                                <Input placeholder="عنوان پلاک" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button size={"lg"} type="submit">افزودن</Button>
            </form>
        </Form>
    );
}
