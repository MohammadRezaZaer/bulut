import {cn} from "@/lib/utils";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {CustomInput} from "@/components/CustomInput";
import React from "react";

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
                                onChange={(date) => field.onChange(date?.isValid ? date.toDate() : "")}
                                format="YYYY/MM/DD"
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