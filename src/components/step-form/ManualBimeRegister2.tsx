"use client";
import React, {useState} from "react";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import LocationSelector from "@/components/ui/location-input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {PhoneInputComponent} from "@/components/ui/phone-input-component";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {CustomInput} from "@/components/ManualBimeRegister";
import {carColors} from "@/utils/navigations-and_other_sets";
import {ChangablePelaktoAzad} from "@/components/step-form/ChangablePelaktoAzad";
import CarSelector from "@/components/ui/car-brand-selector";

import {
    CAR_BRAND,
    CAR_DETAIL,
    CAR_MODEL,
    CAR_TYPE,
    CAR_YEAR, CITY,
    LOCATION_STATE_FIELD,
    STATE
} from "@/lib/constant/constants";

// Form schema validation using zod
const formSchema = z.object({
    // pelak: z.object({
    //     leftNumber: z.string(),
    //     letter: z.string(),
    //     rightNumber: z.string(),
    //     iranNumber: z.string(),
    // }).refine((data) => {
    //     return (
    //         /^\d{2}$/.test(data.leftNumber) &&
    //         /^[\u0600-\u06FFa-zA-Z]+$/.test(data.letter) &&
    //         /^\d{3}$/.test(data.rightNumber) &&
    //         /^\d{2}$/.test(data.iranNumber)
    //     );
    // }, {
    //     message: "Please fill all pelak fields correctly.",
    //     path: [],
    // }),
    // name: z.string().min(1),
    // last_name: z.string().min(1),
    // national_number: z.string().min(1),
    // birthdate: z.coerce.date(),
    // mobile_number: z.string(),
    // brand: z.string(),
    // car_color: z.string(),
    // vin_number: z.string().min(1),
    // bime_thaleth: z.string().min(1),
    // bime_thaleth_expire: z.coerce.date(),
    [LOCATION_STATE_FIELD]: z.object({
        [STATE]: z.string(),
        [CITY]: z.string()

    }),
    [CAR_DETAIL]: z.object({
        [CAR_BRAND]: z.string(),
        [CAR_MODEL]: z.string(),
        [CAR_YEAR]: z.number(),
        [CAR_TYPE]: z.string()

    }),
    // coverageAmount: z.string(),
});

export default function ManualBimeRegister() {

    // Form initialization using react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            birthdate: new Date(),
            bime_thaleth_expire: new Date(),
        },
    });

    // Submit form handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
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
                {/* Personal Information */}
                <div className="grid grid-cols-12 gap-4">
                    <FormFieldControl colSpan={4} label="نام" name="name" placeholder="نام را وارد کنید" form={form}/>
                    <FormFieldControl colSpan={4} label="نام خانوادگی" name="last_name"
                                      placeholder="نام خانوادگی را وارد کنید" form={form}/>
                    <FormFieldControl colSpan={4} label="کد ملی" name="national_number"
                                      placeholder="کد ملی را وارد کنید" form={form}/>
                </div>

                {/* Date and Mobile */}
                <div className="grid grid-cols-12 gap-4">
                    <FormDateControl colSpan={6} label="تاریخ تولد" name="birthdate" form={form}/>
                    <FormPhoneControl colSpan={6} name="mobile_number" form={form}/>
                </div>








                                <CarSelector

                                    form={form}
                                />


                {/* Car Details */}
                <div className="grid grid-cols-12 gap-4">
                    <FormSelectControl colSpan={4} label="رنگ" name="car_color" options={carColors} form={form}/>
                    <ChangablePelaktoAzad form={form}/>
                    <FormFieldControl colSpan={4} label="شماره VIN" name="vin_number"
                                      placeholder="شماره Vin را وارد کنید" form={form}/>
                    <FormFieldControl colSpan={4} label="شماره بیمه ثالث" name="bime_thaleth"
                                      placeholder="شماره بیمه ثالث را وارد کنید" form={form}/>
                </div>


                <FormDateControl colSpan={6} label="تاریخ انقضای بیمه ثالث" name="bime_thaleth_expire" form={form}/>


                                <LocationSelector

                                    form={form}
                                />




                {/* Coverage Amount */}
                <FormSelectControl colSpan={12} label="Coverage Amount" name="coverageAmount"
                                   options={Array.from({length: 25}, (_, i) => ({
                                       value: ((i + 1) * 1000000).toString(),
                                       label: ((i + 1) * 1000000).toLocaleString()
                                   }))} form={form}/>

                {/* Submit Button */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

// Helper components for field controls
function FormFieldControl({colSpan, label, name, placeholder, form}: any) {
    return (
        <div className={`col-span-${colSpan}`}>
            <FormField control={form.control} name={name} render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    );
}

function FormDateControl({colSpan, name, label, form}: any) {
    return (
        <div className={`col-span-${colSpan}`}>
            <FormField control={form.control} name={name} render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                    <div className="flex w-full flex-col gap-[2px] text-sm xl:col-span-2">
                            <DatePicker
                                value={field.value || ""}
                                onChange={(date) => field.onChange(date?.isValid ? date : "")}
                                format={"YYYY/MM/DD"}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                render={<CustomInput/>}
                            />
                        </div>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    );
}


function FormPhoneControl({colSpan, name, form}: any) {
    return (
        <div className={`col-span-${colSpan}`}>
            <FormField control={form.control} name={name} render={({field}) => (
                <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                        <PhoneInputComponent placeholder="Enter your mobile number" {...field} defaultCountry="IR"
                                             countries={["IR"]} international={false}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    );
}

function FormSelectControl({colSpan, label, name, options, form}: any) {
    return (
        <div className={`col-span-${colSpan}`}>
            <FormField control={form.control} name={name} render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={`Select ${label}`}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option: any) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    );
}
