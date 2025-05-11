"use client"

import React, {Fragment} from 'react'

import {PlateCardShowing} from "@/components/plate-card-showing";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ROUTES} from "@/lib/constant/constants";


// Plate structure
interface Plate {
    first: string;
    middle: string;
    letter: string;
    last: string;
}

// Car details
interface Car {
    plate: Plate;
    brand: string;
    model: string;
    color: string;
}

// Insurance details
interface Insurance {
    name: string;
    family: string;
    commitment: number;
    paid: number;
    insuranceExpiry: string; // e.g. "1405/02/01"
}

// Possible statuses (extend as needed)
type Status = 'prepaid' | 'postpaid' | 'pending';

// Full record type
export interface VehicleRecord {
    id: number;
    title: string;
    car: Car;
    insurance: Insurance;
    status: Status;
}


export default function Page() {


    return (<>

            <div className="flex w-full items-center mb-10">
                <div className="flex items-center justify-between w-full"> <span>لیست بیمه نامه ها
</span>
                    <Button
                    >

                        <Link
                            href={ROUTES.INSURANCE_SIGNUP}

                        >

                            افزودن بیمه نامه جدید
                        </Link>


                    </Button>

                </div>
            </div>
            <div className="mx-[24px] grid gap-4 md:mx-auto md:w-[80%] xl:w-full xl:grid-cols-3  xl:gap-6 ">
                {Array.from({length: 25}, (_, idx) => {
                    return (<PlateCardShowing
                            key={idx}
                            title="ساینا"
                            Bime={{
                                car: {
                                    plate: {
                                        first: '15',
                                        middle: '567',
                                        letter: 'الف',
                                        last: '77',
                                    },
                                    brand: "ایران خودرو",
                                    model: "پژو 207",
                                    color: "سفید",
                                },
                                insurance: {
                                    name: "نام",
                                    family: "نام خانوادگی",
                                    commitment: 5000000,
                                    paid: 275000,

                                    insuranceExpiry: "1405/02/01",
                                },
                                id: ++idx,

                                status: "prepaid"
                            }}
                        />
                    );
                })}

            </div>

        </>

    );
}


