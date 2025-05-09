'use client';

import {Car, MoreHorizontal, TableProperties} from 'lucide-react';
import * as React from "react";
import {ContextMenu} from "@/components/contextMenu";
import {PlateContextMenu} from "@/components/plateContextMenu";

type PlateCardProps = {
    title: string;
    plate: {
        id:number;
        first: string;
        middle: string;
        letter: string;
        last: string;
    };
};

export function PlateCard({ title, plate }: PlateCardProps) {
    return (
        <section className="relative mx-auto max-w-full rounded-[5px] border border-[#8B929A36] md:w-[80%] xl:w-[410px] dark:bg-[#2a2c31]">
            {/* Header */}
            <section className="flex justify-between border-b border-[#8B929A36] px-4 py-4">
                <section className="flex items-center gap-2">
                    <Car  size={28} className="text-[#707070] dark:text-white" />
                    <span className="font-semibold text-[#707070] dark:text-white">عنوان: {title}</span>
                </section>
                <PlateContextMenu id={plate.id}/>
            </section>

            {/* Body */}
            <section className="mx-4 mb-6 mt-4  flex items-center justify-between">
                <p className="text-sm dark:text-white px-2">شماره پلاک</p>

                <section className="flex h-[48px] w-[220px] max-w-full rounded transition-all duration-500">
                    <section className="flex rounded-r border-y-[0.4px] border-r-[0.4px] border-[#A6A9BD] bg-white dark:bg-[#3b3d42]">
                        {/* Right Section */}
                        <section className="flex h-full w-[44px] items-center justify-center border-l-[0.4px] border-[#A6A9BD]">
                            {plate.first}
                        </section>

                        {/* Middle Section */}
                        <section className="flex h-full w-[143px] items-center justify-center gap-2 px-2">
                            <span className="dark:text-white">{plate.middle}</span>
                            <span className="flex h-[32px] w-[52px] items-center justify-center">{plate.letter}</span>
                            <span className="flex h-[32px] w-[52px] items-center justify-center">{plate.last}</span>
                        </section>
                    </section>

                    <div className="flex items-center pl-2">
                        <div
                            className="h-[48px] w-[33px] bg-gray-200 dark:bg-gray-600 rounded-sm flex items-center justify-center text-xs font-bold text-gray-600 dark:text-white">
                            <img className="" src={"/images/pelak-badge.png"}/>
                        </div>

                    </div>
                </section>
            </section>
        </section>
    );
}
