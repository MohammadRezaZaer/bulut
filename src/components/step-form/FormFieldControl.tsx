import {cn} from "@/lib/utils";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";

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