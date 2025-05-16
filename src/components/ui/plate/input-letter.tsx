// InputLetter Component
import * as React from "react";

const letterOptions = [
    "الف", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ", "د", "ز", "ژ", "س", "ش", "ص", "ط", "ع", "ف", "ق", "ک", "گ", "ل", "م", "ن", "و", "ه", "ی", "معلولین", "تشریفات", "خاص", "D", "S"
];

interface InputLetterProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const InputLetter = React.forwardRef<HTMLSelectElement, InputLetterProps>(({
                                                                                      value, onChange, ...props
                                                                                  }, ref) => {
    return (
        <div
            className="flex h-[32px] w-[60px] items-center justify-center rounded-[5px] border border-solid border-[#8B929A36] ">
            <select

                ref={ref}
                value={value}
                onChange={onChange}
                className="w-[48px] focus:outline-none"
                {...props}
            >
                <option value="--">--</option>
                {letterOptions.map((letter) => (
                    <option key={letter} value={letter}>
                        {letter}
                    </option>
                ))}
            </select>
        </div>
    );
});

InputLetter.displayName = "InputLetter"; // Display name for debugging purposes