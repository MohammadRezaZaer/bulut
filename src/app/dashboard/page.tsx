"use client"

import React, {Fragment, useState} from 'react'
import {BadgeCheck, Car, Plus} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";


const cards = [
    { title: "ثبت نام اولیه", value: 98 },
    { title: "بیمه نامه های خریداری شده", value: 120 },
    { title: "کل بیمه نامه ها", value: 218 },
    { title: "کل درخواست های امداد", value: 6 },
    { title: "درخواست های همکاری امدادگر", value: 6 },
    { title: "درخواست های همکاری بازاریاب", value: 13 },
];
export default function Page() {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false)
    const [SidebarOpen, setSidebarOpen] = useState(false)


    return (<>


            {/*<div className="mx-[24px] grid gap-4 md:mx-auto md:w-[80%] xl:w-full xl:grid-cols-3  xl:gap-6 ">*/}


            {/*    <DashboardCard*/}
            {/*        href="/dashboard/Inquiry/violation"*/}
            {/*        title="استعلام خلافی"*/}
            {/*        Icon={Car}*/}
            {/*    />*/}
            {/*    <DashboardCard*/}
            {/*        href="/dashboard/Inquiry/plates"*/}
            {/*        title="پلاک های من"*/}
            {/*        Icon={BadgeCheck}*/}
            {/*    />*/}


            {/*</div>*/}


            <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className=" bg-[url('/images/rec-bg.svg')] bg-[length:333px_333px] bg-[left_0rem_top_-3.5rem] bg-no-repeat border-2 border-brand/80 gap-y-8 flex rounded-lg p-4 shadow hover:shadow-md transition flex-col items-center justify-center"
                    >
                        <p className="text-gray-700 text-sm mb-2">{card.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    </div>
                ))}
            </div>

        </>

    );
}


