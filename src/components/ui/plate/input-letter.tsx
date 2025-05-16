import React from "react";
import { useController, useFormContext } from "react-hook-form";
import {useFormField} from "@/components/ui/form";
import {cn} from "@/lib/utils";

interface InputLetterProps {
    name: string;
}

const letterOptions = [
    "الف", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ز", "ژ", "س", "ش",
    "ص", "ط", "ع", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی", "معلولین",
    "تشریفات", "خاص", "D", "S"
];

export const InputLetter = ({ name }: InputLetterProps) => {
    const { control } = useFormContext();

    const {
        field: { value = "", onChange, ref },
    } = useController({
        name,
        control,
        defaultValue: "",
    });

    const { error } = useFormField()

    const lastPart = name.includes('.') ? name.split('.').pop() : name;

    return (
        <div className="flex h-[32px] w-[60px] items-center justify-center rounded-md ">
            <select
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn("w-[48px] focus:outline-none ring-1 ring-gray-100 ring-offset-2 focus-visible:ring-2 focus-visible:ring-brand rounded-md"
                ,
                    { " dark:text-red-900 ring-red-500 focus:ring-red-500 border-red-500 focus-visible:ring-red-500 ":error?.[lastPart]?.message}
                )}
            >
                <option value="">--</option>
                {letterOptions.map((letter) => (
                    <option key={letter} value={letter}>
                        {letter}
                    </option>
                ))}
            </select>
        </div>
    );
};
