"use client"

import * as React from "react"
import {cn} from "@/lib/utils"
import {SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {InputDigits} from "@/components/ui/input-plate";

type InputPlateContextType = {
    slots: React.RefObject<HTMLInputElement | HTMLSelectElement>[]
}

const InputPlateContext = React.createContext<InputPlateContextType | null>(null)

interface InputPlateProps {

    onChange: (value: { iranNumber: string, leftNumber: string, rightNumber: string, letter: string }) => void
}

export const AzadPlateInput = ({onChange}: InputPlateProps) => {
    const [digits, setDigits] = React.useState(["",  ""]) // 4 pieces: [2 digits, 1 letter, 3 digits, 2 digits]


    const updatePiece = (index: number, val: string) => {
        const newDigits = [...digits]
        newDigits[index] = val
        setDigits(newDigits)
        // console.log({newDigits})
        // Create the structured object and pass it to onChange
        onChange({
            azadleftNumber: newDigits[0] || "",
            azadrightNumber: newDigits[1] || "",
        })
    }

    return (

        <section className="flex h-[48px] w-[90%] max-w-full rounded xl:w-[280px] ">
            <section className="flex  rounded-r  border-y-[0.4px] border-r-[0.4px] border-solid border-[#A6A9BD] ">
                <section
                    className="flex h-full w-[105px] items-center justify-center border-l-[0.4px] border-solid border-[#A6A9BD] ">


                            <InputDigits
                                value={digits[1]}
                                className="mr-1 h-[28px] w-[33px] outline-none"
                                wrapperClassName="flex h-[32px] w-[89px] items-center justify-center rounded-[5px] "
                                onChange={(e) => updatePiece(1, e.target.value)}
                                maxLength={2}
                                placeholder={13}
                            />


                </section>
                <section
                    className="flex h-full w-[142px] items-center justify-center border-l-[0.4px] border-solid border-[#A6A9BD] ">
                    <section
                        className="flex h-[32px] w-[125px] items-center justify-center rounded-[5px]  ">

                            <InputDigits
                                value={digits[0]}
                                className="h-[28px] w-full outline-none "
                                wrapperClassName="flex h-[32px] w-[89px] items-center justify-center rounded-[5px] border-none"

                                onChange={(e) => updatePiece(0, e.target.value)}
                                maxLength={5}
                                placeholder={45687}
                            />

                        </section>
                </section>
            </section>
            <img className="" src={"/images/pelak-badge.png"}/>
        </section>



)
}


