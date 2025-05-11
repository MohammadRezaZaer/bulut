'use client';

import {Car, MoreHorizontal, TableProperties} from 'lucide-react';
import * as React from "react";
import {ContextMenu} from "@/components/contextMenu";
import {PlateContextMenu} from "@/components/plateContextMenu";
import {VehicleRecord} from "@/app/dashboard/insurance-list/page";

type PlateCardProps = {

    Bime: VehicleRecord
};

function PlateRaw(props: { first: string, middle: string, letter: string, last: string }) {
    return <section className="flex h-[48px] w-[220px] max-w-full rounded transition-all duration-500">
        <section
            className="flex rounded-r border-y-[0.4px] border-r-[0.4px] border-[#A6A9BD] bg-white dark:bg-[#3b3d42]">
            {/* Right Section */}
            <section className="flex h-full w-[44px] items-center justify-center border-l-[0.4px] border-[#A6A9BD]">
                {props.first}
            </section>

            {/* Middle Section */}
            <section className="flex h-full w-[143px] items-center justify-center gap-2 px-2">
                <span className="dark:text-white">{props.middle}</span>
                <span className="flex h-[32px] w-[52px] items-center justify-center">{props.letter}</span>
                <span className="flex h-[32px] w-[52px] items-center justify-center">{props.last}</span>
            </section>
        </section>

        <div className="flex items-center pl-2">
            <div
                className="h-[48px] w-[33px] bg-gray-200 dark:bg-gray-600 rounded-sm flex items-center justify-center text-xs font-bold text-gray-600 dark:text-white">
                <img className="" src={"/images/pelak-badge.png"}/>
            </div>

        </div>
    </section>;
}

export function PlateCardShowing({  Bime }: PlateCardProps) {
    return (
        <section
            className="relative mx-auto max-w-full rounded-[5px] border border-[#8B929A36] md:w-[80%] xl:w-[410px] dark:bg-[#2a2c31]">
            {/* Header */}
            <section className="flex justify-between border-b border-[#8B929A36] px-4 py-4">
                <section className="flex items-center gap-2">
                    <Car size={28} className="text-[#707070] dark:text-white"/>
                    <span className="font-semibold text-[#707070] dark:text-white">عنوان: {Bime.title}</span>
                </section>
                <PlateContextMenu id={Bime.id}/>
            </section>

            {/* Body */}
            <section className="mx-4 mb-6 mt-4  flex items-center justify-between">

                <p className="text-sm dark:text-white px-2">شماره پلاک</p>
                <PlateRaw first={Bime.car.plate.first} middle={Bime.car.plate.middle} letter={Bime.car.plate.letter} last={Bime.car.plate.last}/>


            </section>

            <section className="mx-4 mb-6 mt-4  flex items-center justify-between">

                {/* جزئیات دیگر */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 w-full">
                    {/* شناسه */}
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">شناسه</p>
                        <p className="font-medium dark:text-white">{Bime.id}</p>
                    </div>
                    {/* نام و نام خانوادگی */}
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">نام</p>
                        <p className="font-medium dark:text-white">{Bime.insurance.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">نام خانوادگی</p>
                        <p className="font-medium dark:text-white">{Bime.insurance.family}</p>
                    </div>
                    {/* تعهدات و پرداختی */}
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">میزان تعهدات (تومان)</p>
                        <p className="font-medium dark:text-white">
                            {Bime.insurance.commitment.toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            مبلغ پرداختی (تومان)
                        </p>
                        <p className="font-medium dark:text-white">
                            {Bime.insurance.paid.toLocaleString()}
                        </p>
                    </div>
                    {/* مشخصات خودرو */}
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">برند خودرو</p>
                        <p className="font-medium dark:text-white">{Bime.car.brand}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">مدل خودرو</p>
                        <p className="font-medium dark:text-white">{Bime.car.model}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">رنگ خودرو</p>
                        <p className="font-medium dark:text-white">{Bime.car.color}</p>
                    </div>
                    {/* تاریخ اعتبار بیمه */}
                    <div className="sm:col-span-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            تاریخ اعتبار بیمه‌نامه
                        </p>
                        <p className="font-medium dark:text-white">
                            {Bime.insurance.insuranceExpiry}
                        </p>
                    </div>
                </div>
            </section>
        </section>
    );
}
