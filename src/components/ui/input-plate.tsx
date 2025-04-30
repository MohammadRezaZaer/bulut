"use client"

import * as React from "react"
import {cn} from "@/lib/utils"

type InputPlateContextType = {
    slots: React.RefObject<HTMLInputElement | HTMLSelectElement>[]
}

const InputPlateContext = React.createContext<InputPlateContextType | null>(null)

interface InputPlateProps {
    value: string
    onChange: (value: { iranNumber: string, leftNumber: string, rightNumber: string, letter: string }) => void
}

export const InputPlate = ({value, onChange}: InputPlateProps) => {
    const [digits, setDigits] = React.useState(["", "الف", "", ""]) // 4 pieces: [2 digits, 1 letter, 3 digits, 2 digits]
    // console.log({digits})

    // Split incoming value into local state
    // React.useEffect(() => {
    //     if (value) {
            // console.log({value})
            // const matched = value.match(/^(\d{0,2})(.?)(\d{0,3})(\d{0,2})$/)
            // if (matched) {
            //     setDigits([
            //         matched[1] || "",
            //         matched[2] || "",
            //         matched[3] || "",
            //         matched[4] || ""
            //     ])
            // }
    //     }
    // }, [value])

    const updatePiece = (index: number, val: string) => {
        const newDigits = [...digits]
        newDigits[index] = val
        setDigits(newDigits)

        // Create the structured object and pass it to onChange
        onChange({
            leftNumber: newDigits[0] || "",
            letter: newDigits[1] || "",
            rightNumber: newDigits[2] || "",
            iranNumber: newDigits[3] || "",
        })
    }

    return (
        <div className="mx-auto flex h-[48px]  w-full max-w-full rounded-xl">
            <div className=" flex rounded-r border-y-[0.4px] border-r-[0.4px] border-solid border-[#A6A9BD] ">
                <div
                    className="flex h-full w-[46px] items-center justify-center border-l-[0.4px] border-solid border-[#A6A9BD] ">
                    <InputDigits
                        value={digits[3]}
                        className=" h-[28px] w-[24px] pr-px "
                        wrapperClassName=" flex h-[32px] w-[30px] items-center justify-center rounded-[6px] border border-solid border-[#8B929A36]  "
                        onChange={(e) => updatePiece(3, e.target.value)}
                        maxLength={2}
                        placeholder={50}
                    /></div>
                <div
                    className=" flex h-full w-[201px] items-center justify-center gap-2">
                    <InputDigits
                        value={digits[2]}
                        className="h-[28px] w-[33px] "
                        onChange={(e) => updatePiece(2, e.target.value)}
                        maxLength={3}
                        placeholder={345}
                    />

                    <InputLetter
                        value={digits[1]}
                        onChange={(e) => updatePiece(1, e.target.value)}
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
            <img className="" src={"/images/pelak-badge.png"}/>
        </div>
    )
}


export const InputPlateGroup = ({className, children}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
)
InputPlateGroup.displayName = "InputPlateGroup"

interface InputDigitsProps extends React.InputHTMLAttributes<HTMLInputElement> {
    __index?: number
    maxLength?: number
}

export const InputDigits = React.forwardRef<HTMLInputElement, InputDigitsProps>(
    ({className, wrapperClassName, __index = 0, maxLength = 1, ...props}, ref) => {
        const ctx = React.useContext(InputPlateContext)
        const inputRef = React.useRef<HTMLInputElement>(null)

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length >= maxLength && ctx) {
                const nextRef = ctx.slots[__index + 1]
                nextRef?.current?.focus()
            }
            props.onChange?.(e)
        }

        React.useEffect(() => {
            if (ctx && ctx.slots[__index]) {
                ctx.slots[__index].current = inputRef.current
            }
        }, [ctx, __index])

        return (
            <div
                className={cn("flex h-[32px] w-[65px] items-center justify-center rounded-[6px] border border-solid border-[#8B929A36] ", wrapperClassName)}>
                <input
                    ref={(node) => {
                        inputRef.current = node
                        if (typeof ref === "function") ref(node)
                        else if (ref) (ref as any).current = node
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
        )
    }
)
InputDigits.displayName = "InputDigits"

interface InputLetterProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    __index?: number
}

const letterOptions = [
    "الف", "ب", "پ", "ت", "ث", "ج", "چ", "ح", "خ",
    "د", "ز", "ژ", "س", "ش", "ص", "ط", "ع", "ف", "ق",
    "ک", "گ", "ل", "م", "ن", "و", "ه", "ی",
    "معلولین", "تشریفات", "خاص", "D", "S"
];
export const InputLetter = React.forwardRef<HTMLSelectElement, InputLetterProps>(
    ({value, onChange, ...props}, ref) => {
        // console.log({value})
        return (
            <div className="flex h-[32px] w-[52px] justify-center rounded-[6px] border border-solid border-[#8B929A36]">
                <select
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    className="w-[48px] focus:outline-none"
                    {...props}
                >
                    <option value="">--</option>
                    {letterOptions.map((letter) => (
                        <option key={letter} value={letter}>
                            {letter}
                        </option>
                    ))}
                </select>

            </div>

        )
    }
)

InputLetter.displayName = "InputLetter"
