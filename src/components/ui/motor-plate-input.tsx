"use client"

import * as React from "react"
import {cn} from "@/lib/utils"
import {SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select";
import {InputDigits} from "@/components/ui/input-plate";
import {MOTOR_LEFT_NUMBER, MOTOR_RIGHT_NUMBER, PELAK_MOTOR} from "@/lib/schema/schemas";
import {useEffect} from "react";
import {useFormContext} from "react-hook-form";


interface InputPlateProps {

    onChange: any
}

export const MotorPlateInput = ({onChange}: InputPlateProps) => {
    const [digits, setDigits] = React.useState(["",  ""]) // 4 pieces: [2 digits, 1 letter, 3 digits, 2 digits]


    const updatePiece = (index: number, val: string) => {
        const newDigits = [...digits]
        newDigits[index] = val
        setDigits(newDigits)
        // console.log({newDigits})
        // Create the structured object and pass it to onChange
        onChange({
            [MOTOR_LEFT_NUMBER]: newDigits[0] || "",
            [MOTOR_RIGHT_NUMBER]: newDigits[1] || "",
        })
    }
    const { control, formState: { errors } } = useFormContext()
    const rightRef = React.useRef<HTMLInputElement>(null);
    // console.log({eeeee:errors?.[PELAK_MOTOR]})
    useEffect(() => {
        if (errors?.[PELAK_MOTOR]) {
            rightRef.current?.focus();

        }
    }, [errors]);

    return (

        <section className="flex h-[48px] w-[90%] max-w-full rounded xl:w-[280px] ">
            <section className="flex  rounded-r  border-y-[0.4px] border-r-[0.4px] border-solid border-[#A6A9BD] ">


                <section
                    className="flex h-full w-[142px] items-center justify-center border-l-[0.4px] border-solid border-[#A6A9BD] ">
                    <section
                        className="flex h-[32px] w-[125px] items-center justify-center rounded-[5px] border border-solid border-[#8B929A36] ">

                        <InputDigits
                            value={digits[1]}
                            className="h-[28px] w-full outline-none "
                            wrapperClassName="flex h-[32px] w-[89px] items-center justify-center rounded-[5px] border-none"

                            onChange={(e) => updatePiece(1, e.target.value)}
                            maxLength={5}
                            placeholder="45687"
                            ref={rightRef}
                        />

                    </section>
                </section>
                <section
                    className="flex h-full w-[105px] items-center justify-center border-l-[0.4px] border-solid border-[#A6A9BD] ">


                    <InputDigits
                        value={digits[0]}
                        className="mr-1 h-[28px] w-[33px] outline-none"
                        wrapperClassName="flex h-[32px] w-[89px] items-center justify-center rounded-[5px] "
                        onChange={(e) => updatePiece(0, e.target.value)}
                        maxLength={3}
                        placeholder="123"
                    />


                </section>

            </section>
            <img className="" src={"/images/pelak-badge.png"}/>
        </section>


    )
}


