"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {InputLetter} from "@/components/ui/plate/input-letter";
import {InputDigits} from "@/components/ui/plate/input-digits";


export const InputPlate = ({ name = "plate" }: { name?: string }) => {

    return (
        <div className="mx-auto flex h-[48px] w-full max-w-full rounded-xl">
            <div className="flex rounded-r border-y-[0.4px] border-r-[0.4px] border-solid border-[#A6A9BD]">
                {/* Left digits */}
                <div className="flex h-full w-[46px] items-center justify-center border-l-[0.4px] border-solid border-[#A6A9BD]">
                    <InputDigits
                        name={`${name}.iranNumber`}
                        maxLength={2}
                        placeholder="50"
                        className="h-[28px] w-[24px] pr-px"
                        wrapperClassName="flex h-[32px] w-[30px] items-center justify-center rounded-[6px]"
                    />
                </div>

                {/* Middle section */}
                <div className="flex h-full w-[201px] items-center justify-center gap-2">
                    <InputDigits
                        name={`${name}.rightNumber`}
                        maxLength={3}
                        placeholder="345"
                        className="h-[28px] w-[33px]"
                    />

                    <InputLetter name={`${name}.letter`} />

                    <InputDigits
                        name={`${name}.leftNumber`}
                        maxLength={2}
                        placeholder="66"
                        className="h-[28px] w-[33px]"
                        wrapperClassName="flex h-[32px] w-[52px] items-center justify-center rounded-[6px]"
                    />
                </div>
            </div>
            <img src="/images/pelak-badge.png" alt="badge" />
        </div>
    );
};
