"use client"

import React, {Fragment, useState} from 'react'
import {BadgeCheck, Car, Plus} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";



export default function Page() {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false)
    const [SidebarOpen, setSidebarOpen] = useState(false)


    return (<>


                            <div className="mx-[24px] grid gap-4 md:mx-auto md:w-[80%] xl:w-full xl:grid-cols-3  xl:gap-6 ">


                                <DashboardCard
                                    href="/dashboard/Inquiry/violation"
                                    title="استعلام خلافی"
                                    Icon={Car}
                                />
                                <DashboardCard
                                    href="/dashboard/Inquiry/plates"
                                    title="پلاک های من"
                                    Icon={BadgeCheck}
                                />



                            </div>

        </>

    );
}


