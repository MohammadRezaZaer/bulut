// Helper components for field controls
import {cn} from "@/lib/utils";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";
import {PhoneInputComponent} from "@/components/ui/phone-input-component";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {CustomInput} from "@/components/ManualBimeRegister";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export function FormFieldControl({className, label, name, placeholder, form}: any) {
    return (
        <div className={cn("col-span-full lg:col-span-4", className)}>
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

export function FormDateControl({className, name, label, form}: any) {
    return (
        <div className={cn("col-span-full", className)}>
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

export function FormPhoneControl({className, name, form}: any) {
    return (
        <div className={cn("col-span-full", className)}>
            <FormField control={form.control} name={name} render={({field}) => (
                <FormItem>
                    <FormLabel>تلفن همراه
                    </FormLabel>
                    <FormControl>
                        <PhoneInputComponent placeholder="تلفن همراه را وارد کنید" {...field} defaultCountry="IR"
                                             countries={["IR"]} international={false}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    );
}

export function FormSelectControl({label, name, options, form}: any) {
    return (
        <div className={`col-span-full lg:col-span-6`}>
            <FormField control={form.control} name={name} render={({field}) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={`${label}`}/>
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