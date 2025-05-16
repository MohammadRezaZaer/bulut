"use client";

import * as React from "react";
import {InputLetter} from "@/components/ui/plate/input-letter";
import {InputDigits} from "@/components/ui/plate/input-digits";

interface InputPlateProps {
    form: any;
    onChange: (value: { iranNumber: string, leftNumber: string, rightNumber: string, letter: string }) => void;
}

export const InputPlate = ({ form, onChange }: InputPlateProps) => {



    return (
        <div className="mx-auto flex h-[48px] w-full max-w-full rounded-xl ">
            <div className=" flex rounded-r border-y-[0.4px] border-r-[0.4px] border-solid border-[#A6A9BD] ">
                <div className="flex h-full w-[46px] items-center justify-center border-l-[0.4px] border-solid border-[#A6A9BD] ">
                    <InputDigits

                        className=" h-[28px] w-[24px] pr-px "
                        wrapperClassName=" flex h-[32px] w-[30px] items-center justify-center rounded-[6px]"
                        maxLength={2}
                        max="99"
                        placeholder={50}
                    />
                </div>
                <div className=" flex h-full w-[201px] items-center justify-center gap-2">
                    <InputDigits

                        className="h-[28px] w-[33px] "
                        maxLength={3}
                        placeholder={345}
                    />

                    <InputLetter

                    />

                    <InputDigits
                        className="h-[28px] w-[33px]"
                        wrapperClassName="flex h-[32px] w-[52px] items-center justify-center rounded-[6px]"
                        maxLength={2}
                        placeholder={66}
                    />
                </div>
            </div>
            <img className="" src={"/images/pelak-badge.png"} />
        </div>
    );
};



