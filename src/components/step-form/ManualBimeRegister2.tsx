"use client";
import React from "react";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import LocationSelector from "@/components/ui/location-input";
import {carColors} from "@/utils/navigations-and_other_sets";
import {ChangablePelaktoAzad} from "@/components/step-form/ChangablePelaktoAzad";
import CarSelector from "@/components/ui/car-brand-selector";


import {
    FormDateControl,
    FormFieldControl,
    FormPhoneControl,
    FormSelectControl
} from "@/components/step-form/FormSelectControl";
import {formSchema} from "@/lib/schema/schemas";
import {useAtom} from "jotai/index";
import {showAzadPlateAtom} from "@/lib/atoms/showAzadPlateAtom";



export default function ManualBimeRegister({goToNext, goToPrev, onboardingData}) {
    const [showAzadPlate] = useAtom(showAzadPlateAtom);

    console.log({onboardingData})
    // Form initialization using react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            azadOrNormal:showAzadPlate,
            ...onboardingData, // Use the saved data to set default values in the form
            // "car-detail": {
            //     "car_brand": "کیا"
            // },
        },
    });

    // Submit form handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            goToNext?.(form.getValues());
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10 max-lg:px-2">
                {/* Personal Information */}
                <section className="mt-5"><span className="text-[24px] font-bold">اطلاعات فردی:</span>
                </section>
                <div className="grid grid-cols-12 gap-4">
                    <FormFieldControl colSpan={4} label="نام" name="name" placeholder="نام را وارد کنید" form={form}/>
                    <FormFieldControl colSpan={4} label="نام خانوادگی" name="last_name"
                                      placeholder="نام خانوادگی را وارد کنید" form={form}/>
                    <FormFieldControl colSpan={4} label="کد ملی" name="national_number"
                                      placeholder="کد ملی را وارد کنید" form={form}/>
                </div>

                {/* Date and Mobile */}
                <div className="grid grid-cols-12 gap-4">
                    <FormDateControl className="lg:col-span-6" label="تاریخ تولد" name="birthdate" form={form}/>
                    <FormPhoneControl className="lg:col-span-6" name="mobile_number" form={form}/>
                </div>

                <section className="xl:col-span-4 mt-5"><span className="text-[24px] font-bold">مشخصات خودرو:</span>
                </section>

                {/* Car Details */}

                <CarSelector

                    form={form}
                />


                <div className="grid grid-cols-12 gap-4 gap-y-6">

                    <FormSelectControl label="رنگ" name="car_color" options={carColors} form={form}/>


                    <FormFieldControl className="lg:col-span-6" label="شماره VIN" name="vin_number"
                                      placeholder="شماره Vin را وارد کنید" form={form}/>
                    <FormFieldControl className="lg:col-span-6" label="شماره بیمه ثالث" name="bime_thaleth"
                                      placeholder="شماره بیمه ثالث را وارد کنید" form={form}/>
                    <FormDateControl className="lg:col-span-6" label="تاریخ انقضای بیمه ثالث" name="bime_thaleth_expire"
                                     form={form}/>
                    <ChangablePelaktoAzad form={form}/>
                </div>

                <section className="xl:col-span-4 mt-5"><span className="text-[24px] font-bold">مشخصات محل اقامت:</span>
                </section>

                <LocationSelector

                    form={form}
                />

                <section className="xl:col-span-4 mt-5"><span
                    className="text-[24px] font-bold">تعیین سقف پوشش خدمات:</span></section>
                {/* Coverage Amount */}
                <FormSelectControl label="میزان تعهدات درخواست امداد حمل رایگان را مشخص نمائید (تومان)"
                                   name="coverageAmount"
                                   options={Array.from({length: 25}, (_, i) => ({
                                       value: ((i + 1) * 1000000).toString(),
                                       label: ((i + 1) * 1000000).toLocaleString()
                                   }))} form={form}/>

                {/* Submit Button */}
                <div className="flex w-full gap-4">

                    <Button onClick={() => goToPrev(form.getValues())} variant={"outline"} type="button">مرحله
                        قبل</Button>
                    <Button className="w-full" type="submit">ذخیره</Button></div>
            </form>
        </Form>
    );
}


