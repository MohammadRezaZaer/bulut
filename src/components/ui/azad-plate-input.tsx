"use client"

import * as React from "react"

import {InputDigits} from "@/components/ui/plate/input-digits";


export const AzadPlateInput = ({name = "plate"}: { name?: string }) => {


    return (

        <section className="flex h-[48px] w-[90%] max-w-full rounded xl:w-[280px] ">
            <section className="flex  rounded-r  border-y-[0.4px] border-r-[0.4px] border-solid border-[#A6A9BD] ">
                <section
                    className="flex h-full w-[105px] items-center justify-center border-l-[0.4px] border-solid border-[#A6A9BD] ">


                    <InputDigits
                        name={`${name}.azadrightNumber`}
                        className="mr-1 h-[28px] w-[33px] outline-none"
                        wrapperClassName="flex h-[32px] w-[89px] items-center justify-center rounded-[5px] "
                        maxLength={2}
                        placeholder={13}
                    />


                </section>
                <section
                    className="flex h-full w-[142px] items-center justify-center border-l-[0.4px] border-solid border-[#A6A9BD] ">
                    <section
                        className="flex h-[32px] w-[125px] items-center justify-center rounded-[5px]  ">

                        <InputDigits
                            name={`${name}.azadleftNumber`}
                            className="h-[28px] w-full outline-none "
                            wrapperClassName="flex h-[32px] w-[89px] items-center justify-center rounded-[5px] border-none"
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


