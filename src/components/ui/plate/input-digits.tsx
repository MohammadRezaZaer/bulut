import React from "react";
import { cn } from "@/lib/utils";
import { useController, useFormContext } from "react-hook-form";
import {useFormField} from "@/components/ui/form";

interface InputDigitsProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    wrapperClassName?: string;
    maxLength?: number;
}

export const InputDigits = ({
                                name,
                                className,
                                wrapperClassName,
                                maxLength = 1,
                                ...props
                            }: InputDigitsProps) => {
    const { control } = useFormContext();

    const {
        field: { value = "", onChange, ref },
    } = useController({
        name,
        control,
        defaultValue: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitized = e.target.value.replace(/\D/g, "").slice(0, maxLength);
        console.log({sanitized})
        onChange(sanitized);
    };
    const { error } = useFormField()

    const lastPart = name.includes('.') ? name.split('.').pop() : name;
     // console.log({eeeeeee:error?.[lastPart]?.message,name,lastPart})
    return (
        <div className={cn("flex h-[32px] w-[65px] items-center justify-center rounded-[6px]", wrapperClassName)}>
            <input
                ref={ref}
                dir="ltr"
                value={value}
                onChange={handleChange}
                className={cn(
                    "outline-none ring-1 ring-gray-100 ring-offset-2 focus-visible:ring-2 focus-visible:ring-brand rounded-md text-center",
                    { "text-red-500 dark:text-red-900 ring-red-500 focus:ring-red-500 border-red-500 focus-visible:ring-red-500 ":error?.[lastPart]?.message},
                    className
                )}
                inputMode="numeric"
                maxLength={maxLength}
                pattern="\d*"
                {...props}
            />
        </div>
    );
};
