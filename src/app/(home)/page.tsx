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
        icon: <Wrench size={60} />, // تعمیرات و حمل رایگان
        label: 'خرید بیمه یدک (حمل رایگان)',
    },
    {
        href: '/request-relief',
        icon: <PhoneCall size={60} />, // تماس برای امداد
        label: 'درخواست امداد خودرو رایگان',
    },
    {
        href: '/marketing',
        icon: <Users size={60} />, // مشاوران
        label: 'مشاور و کارشناس فروش',
    },
    {
        href: '/price-calculate',
        icon: <DollarSign size={60} />, // محاسبه قیمت
        label: 'ارزش روز خودرو',
    },
    {
        href: '/price-drop-insurance',
        icon: <FileText size={60} />, // افت قیمت
        label: 'محاسبه افت بیمه خودرو',
    },
    {
        href: 'https://emdad.hafezinsurance.ir/bimeh',
        icon: <Shield size={60} />, // بیمه امدادگران
        label: 'بیمه امدادگران',
    },
    {
        href: '/assistance-invoice',
        icon: <FileCheck2 size={60} />, // فاکتور امداد
        label: 'صدور فاکتور امدادگر',
    },
    {
        href: '#',
        icon: <AlertTriangle size={60} />, // به زودی
        label: 'بیمه تعمیرات',
        soon: true,
    },
    {
        href: '#',
        icon: <AlertTriangle size={60} />, // به زودی
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
        <section className="w-full max-w-[1366px] mx-auto  px-4">
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-3">
                    <NextImage src="/images/fake-logo.png" alt="بیمه یدک" width={88} height={88} />
                    <h1 className="text-[#303030] text-3xl xl:text-5xl font-bold">بیمه مدد</h1>
                </div>
                <p className="mt-4 xl:mt-7 text-[#303030] text-base xl:text-xl font-bold max-w-2xl px-4 xl:px-0">
                    معتبرترین پلتفرم درخواست بیمه‌های خاص خودرو و امداد خودرو به همراه فروش انواع بیمه‌نامه‌ها
                </p>
            </div>

            <div className="grid grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-10 justify-items-center mt-8 xl:mt-10">
                {menuItems.map(({ href, icon, label, soon }) => (
                    <Link key={label} href={href} className="relative flex flex-col items-center text-center group hover:scale-105 group  transition-transform duration-300">
                        {soon && (
                            <span className="absolute top-1 left-9 bg-brand text-white text-xs px-2 py-0.5 rounded-md z-10">
                به زودی
              </span>
                        )}
                        <div className="relative group-hover:text-brand w-[67px] h-[67px] rotate-[330deg] flex items-center justify-center">
                            <div className="z-10">
                                {icon}
                            </div>
                        </div>
                        <span className="mt-2 group-hover:text-brand text-[#303030] text-xs xl:text-base font-medium leading-[31px] min-w-[100px] hover:text-brand xl:w-[130px] h-[80px] flex items-center justify-center text-center">
              {label}
            </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}