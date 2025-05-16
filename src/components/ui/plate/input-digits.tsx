import * as React from "react";
import {cn} from "@/lib/utils";
import { useController, useFormContext } from "react-hook-form";

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
        onChange(sanitized);
    };

    return (
        <div className={cn("flex h-[32px] w-[65px] items-center justify-center rounded-[6px]", wrapperClassName)}>
            <input
                ref={ref}
                dir="ltr"
                value={value}
                onChange={handleChange}
                className={cn(
                    "outline-none ring-1 ring-gray-100 ring-offset-2 focus-visible:ring-2 focus-visible:ring-brand rounded-md text-center",
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
