import {cn, faToEnDigits} from "@/lib/utils";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {PhoneInputComponent} from "@/components/ui/phone-input-component";
import React from "react";
import {Input} from "@/components/ui/input";

export function FormPhoneControl({className, name, form}: any) {
    return (
        <div className={cn("col-span-full", className)}>
            <FormField control={form.control} name={name} render={({field}) => (
                <FormItem>
                    <FormLabel>تلفن همراه
                    </FormLabel>
                    <FormControl>
                        <Input
                            type="tel"
                            placeholder="09141234567"
                            maxLength={11}
                            {...field}
                            onChange={(e) => {
                                const raw = e.target.value
                                const converted = faToEnDigits(raw).replace(/\D/g, '') // فقط عدد مجاز
                                field.onChange(converted)
                            }}
                            value={field.value}
                            dir="ltr"
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}/>
        </div>
    );
}