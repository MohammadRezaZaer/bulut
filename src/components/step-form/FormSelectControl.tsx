// Helper components for field controls
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import React from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

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