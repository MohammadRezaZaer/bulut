import {cn} from "@/lib/utils";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {PhoneInputComponent} from "@/components/ui/phone-input-component";
import React from "react";

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