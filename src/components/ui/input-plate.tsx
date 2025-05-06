"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import {PELAK} from "@/lib/constant/constants";

type InputPlateContextType = {
    slots: React.RefObject<HTMLInputElement | HTMLSelectElement>[];
};

const InputPlateContext = React.createContext<InputPlateContextType | null>(null);

interface InputPlateProps {
    form: any;
    onChange: (value: { iranNumber: string, leftNumber: string, rightNumber: string, letter: string }) => void;
}

export const InputPlate = ({ form, onChange }: InputPlateProps) => {
    // Use getValues() to get default values from the form, with safe fallback defaults
    const pelak = form.getValues(PELAK) || {};

    const [digits, setDigits] = React.useState([
        pelak.leftNumber || "", // Default value for leftNumber
        pelak.letter || "الف",  // Default value for letter
        pelak.rightNumber || "", // Default value for rightNumber
        pelak.iranNumber || "",  // Default value for iranNumber
    ]);

    const updatePiece = (index: number, val: string) => {
        const newDigits = [...digits];
        newDigits[index] = val;
        setDigits(newDigits);

        // Create the structured object and pass it to onChange
        onChange({
            leftNumber: newDigits[0] || "",
            letter: newDigits[1] || "",
            rightNumber: newDigits[2] || "",
            iranNumber: newDigits[3] || "",
        });
    };

    return (
        <div className="mx-auto flex h-[48px] w-full max-w-full rounded-xl ">
            <div className=" flex rounded-r border-y-[0.4px] border-r-[0.4px] border-solid border-[#A6A9BD] ">
                <div className="flex h-full w-[46px] items-center justify-center border-l-[0.4px] border-solid border-[#A6A9BD] ">
                    <InputDigits
                        value={digits[3]}
                        className=" h-[28px] w-[24px] pr-px "
                        wrapperClassName=" flex h-[32px] w-[30px] items-center justify-center rounded-[6px] border border-solid border-[#8B929A36]  "
                        onChange={(e) => updatePiece(3, e.target.value)}
                        maxLength={2}
                        placeholder={50}
                    />
                </div>
                <div className=" flex h-full w-[201px] items-center justify-center gap-2">
                    <InputDigits
                        value={digits[2]}
                        className="h-[28px] w-[33px] "
                        onChange={(e) => updatePiece(2, e.target.value)}
                        maxLength={3}
                        placeholder={345}
                    />

                    <InputLetter
                        value={digits[1]} // Pass the current value
                        onValueChange={(value) => {
                            updatePiece(1, value); // Update the state with the new value
                        }}
                    />

                    <InputDigits
                        value={digits[0]}
                        className="h-[28px] w-[33px]"
                        wrapperClassName="flex h-[32px] w-[52px] items-center justify-center rounded-[6px] border border-solid border-[#8B929A36] "
                        onChange={(e) => updatePiece(0, e.target.value)}
                        maxLength={2}
                        placeholder={66}
                    />
                </div>
            </div>
            <img className="" src={"/images/pelak-badge.png"} />
        </div>
    );
};

// InputDigits Component
export const InputDigits = React.forwardRef<HTMLInputElement, InputDigitsProps>(
    ({ className, wrapperClassName, __index = 0, maxLength = 1, ...props }, ref) => {
        const ctx = React.useContext(InputPlateContext);
        const inputRef = React.useRef<HTMLInputElement>(null);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length >= maxLength && ctx) {
                const nextRef = ctx.slots[__index + 1];
                nextRef?.current?.focus();
            }
            props.onChange?.(e);
        };

        React.useEffect(() => {
            if (ctx && ctx.slots[__index]) {
                ctx.slots[__index].current = inputRef.current;
            }
        }, [ctx, __index]);

        return (
            <div className={cn("flex h-[32px] w-[65px] items-center justify-center rounded-[6px] border border-solid border-[#8B929A36] ", wrapperClassName)}>
                <input
                    ref={(node) => {
                        inputRef.current = node;
                        if (typeof ref === "function") ref(node);
                        else if (ref) (ref as any).current = node;
                    }}
                    maxLength={maxLength}
                    type="text"
                    inputMode="numeric"
                    className={cn(
                        "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-md text-center",
                        className
                    )}
                    onChange={handleChange}
                    {...props}
                />
            </div>
        );
    }
);
InputDigits.displayName = "InputDigits";

// InputLetter Component
const letterOptions = [
    "الف", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ز", "ژ", "س", "ش", "ص", "ط", "ع", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی", "معلولین", "تشریفات", "خاص", "D", "S"
];

export const InputLetter = React.forwardRef<HTMLSelectElement, InputLetterProps>(({
                                                                                      value, ...props
                                                                                  }, ref) => {
    return (
        <div className="flex h-[32px] w-[52px] justify-center rounded-[6px] border border-solid border-[#8B929A36]">
            <Select defaultValue={value} {...props}>
                <SelectTrigger className="w-[48px] focus:outline-none h-8 p-1">
                    <span>{value || '--'}</span>
                </SelectTrigger>
                <SelectContent>
                    {letterOptions.map((letter) => (
                        <SelectItem key={letter} value={letter}>
                            {letter}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
});

InputLetter.displayName = "InputLetter";
