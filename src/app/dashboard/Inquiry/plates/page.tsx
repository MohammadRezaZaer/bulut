"use client"

import React, {Fragment} from 'react'
import {Plus} from "lucide-react";
import Button from "@/components/buttons/Button";
import NextImage from "@/components/NextImage";
import {ContextMenu} from "@/components/contextMenu";
import {AddOrUpdate} from "@/components/addOrUpdate";
import {books} from "@/app/page";
import {PlateCard} from "@/components/plate-card";


export default function Page() {


    return (<>

            <div className="flex w-full items-center mb-10">
                <div className="flex items-center justify-between w-full"> <span>پلاک های من
</span>
                    <Button
                        rightIcon={Plus}> افزودن
                    </Button></div>
            </div>
            <div className="mx-[24px] grid gap-4 md:mx-auto md:w-[80%] xl:w-full xl:grid-cols-3  xl:gap-6 ">

                {books.map((item,idx) =>       <PlateCard
                        title="ساینا"
                        plate={{
                            id:++idx,
                            first: '15',
                            middle: '567',
                            letter: 'الف',
                            last: '67',
                        }}
                    />
                )}
            </div>

        </>

    );
}


