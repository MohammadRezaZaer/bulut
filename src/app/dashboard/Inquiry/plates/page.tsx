"use client"

import React, {Fragment} from 'react'

import {PlateCardShowing} from "@/components/plate-card-showing";

import Link from "next/link";
import {Button} from "@/components/ui/button";


export default function Page() {


    return (<>

            <div className="flex w-full items-center mb-10">
                <div className="flex items-center justify-between w-full"> <span>پلاک های من
</span>
                    <Button
                        >

                        <Link
                            href={"/dashboard/Inquiry/plates/add"}

                        >

                            افزودن پلاک جدید
                        </Link>


                    </Button>

                </div>
            </div>
            <div className="mx-[24px] grid gap-4 md:mx-auto md:w-[80%] xl:w-full xl:grid-cols-3  xl:gap-6 ">
                {Array.from({ length: 25 }, (_, idx) => {
                    return (   <PlateCardShowing
                            key={idx}
                            title="ساینا"
                            plate={{
                                id:++idx,
                                first: '15',
                                middle: '567',
                                letter: 'الف',
                                last: '67',
                            }}
                        />
                    );
                })}

            </div>

        </>

    );
}


