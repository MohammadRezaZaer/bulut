"use client"

import React, {Fragment} from 'react'
import NextImage from "@/components/NextImage";
import {ContextMenu} from "@/components/contextMenu";
import Link from "next/link";
import {  Wrench, DollarSign, FileText, PhoneCall, Users, Shield,  FileCheck2, AlertTriangle } from 'lucide-react';
import {ROUTES} from "@/lib/constant/constants";


const menuItems = [
    {
        href: ROUTES.INSURANCE_SIGNUP,
        icon: <Wrench  size={40}/>, // تعمیرات و حمل رایگان
        label: 'خرید بیمه امداد (حمل رایگان)',
    },
    {
        href: '/request-relief',
        icon: <PhoneCall size={40} />, // تماس برای امداد
        label: 'درخواست امداد خودرو رایگان',
    },
    {
        href: '/marketing',
        icon: <Users size={40} />, // مشاوران
        label: 'مشاور و کارشناس فروش',
    },


    {
        href: 'https://emdad.hafezinsurance.ir/bimeh',
        icon: <Shield size={40} />, // بیمه امدادگران
        label: 'بیمه امدادگران',
    },
    {
        href: '/assistance-invoice',
        icon: <FileCheck2 size={40} />, // فاکتور امداد
        label: 'صدور فاکتور امدادگر',
    },
    {
        href: '#',
        icon: <AlertTriangle size={40} />, // به زودی
        label: 'صدور فاکتور حمل',
        soon: true,
    },
    {
        href: '#',
        icon: <AlertTriangle size={40} />, // به زودی
        label: 'صدور بارنامه الکترونیکی',
        soon: true,
    },
];
export default function Page() {


    return (<>


            <HeroSection/>

        </>

    );
}

function HeroSection() {
    return (
        <section className="w-full  max-w-[1366px] mx-auto">
            <div className="flex flex-col items-center text-center">
                <div className="flex max-lg:flex-col items-center gap-3">
                    <NextImage src="/images/fake-logo.png" alt="بیمه امداد" width={88} height={88} />
                    <h1 className="text-[#303030] text-3xl xl:text-5xl font-bold">بیمه امداد</h1>
                </div>
                <p className="mt-4 xl:mt-7 text-[#303030] text-base xl:text-xl font-bold max-w-2xl px-4 xl:px-0">
                    معتبرترین پلتفرم درخواست بیمه‌های خاص خودرو و امداد خودرو به همراه فروش انواع بیمه‌نامه‌ها
                </p>
            </div>

            <div className="w-[90%] mx-auto  xl:w-full flex justify-center gap-x-10 xl:gap-[164px] gap-y-6 xl:gap-y-[20px] xl:mt-[20px] mt-[30px] ">
                <div
                    className="grid grid-cols-3 gap-x-16 xl:gap-10 justify-items-center place-items-center mt-8 xl:mt-10 m-2">
                    {menuItems.map(({href, icon, label, soon}) => (

                        <Link key={label} href={href}
                              className="xl:w-[122px] w-[69px]  justify-center m-auto max-xl:max-w-[130px] relative p-2 flex flex-col items-center text-center group hover:scale-105 group  transition-transform duration-300">


                            {soon && (
                                <span
                                    className="z-20 whitespace-nowrap absolute top-1 left-9 bg-brand-secondary text-white text-xs px-2 py-0.5 rounded-md ">
                            به زودی
                          </span>
                            )}

                            <div
                                className=" relative text-white group-hover:text-brand-secondary w-[67px] xl:h-[67px]  flex items-center justify-center">

                                <svg className="w-20 aspect-square text-brand absolute" viewBox="0 0 857 857"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M428.5 0L731.495 125.505L857 428.5L731.495 731.495L428.5 857L125.505 731.495L0 428.5L125.505 125.505L428.5 0Z"
                                        fill="currentColor"/>
                                </svg>
                                <div className=" relative  p-8">

                                    {icon}

                                </div>
                            </div>
                            <span
                                className="text-black max-lg:text-[10px] z-10 group-hover:text-brand text-xs font-medium leading-normal min-w-[100px] hover:text-brand xl:w-[130px] h-[60px] xl:h-[80px] flex items-center justify-center text-center">
                          {label}
                        </span>
                        </Link>

                    ))}


                </div>
            </div>
        </section>
    );
}