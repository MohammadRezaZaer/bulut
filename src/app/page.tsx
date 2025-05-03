"use client"

import React, {Fragment} from 'react'
import NextImage from "@/components/NextImage";
import {ContextMenu} from "@/components/contextMenu";

export const books = [{
    id: 1,
    title: "تخریب با دیزاین",
    price: 58000

},
    {
        id: 2,
        title: "تئوری های دیزاین گرافیک",
        price: 53000
    }, {
        id: 3,
        title: "دیزاین یک شغل است",
        price: 59000
    }];

export default function Page() {


    return (<>


            <div>


                <div className="flex   ">


                    <section className="py-10 px-12 w-full bg-white m-4 rounded-xl">

                        <div className="flex flex-wrap gap-2 ">


                            {books.map((item) => <div
                                className="relative min-w-[306px]  aspect-[1.3] bg-white shadow-lg items-start flex flex-col rounded"
                                key={item.id}>
                                <NextImage
                                    useSkeleton
                                    className='w-full aspect-square relative'
                                    src={`/items/${item.id}.png`}
                                    fill
                                    alt='Icon'
                                />
                                <div className="p-4 relative w-full">
                                    <div className="flex w-full justify-between items-center">


                                        <h2 className="text-lg ">{item.title}</h2>


                                        <ContextMenu id={item.id}/>
                                    </div>
                                    <p className="text-lg font-bold"><span
                                        className="text-gray-400 font-medium">قیمت :</span> 58.000 تومان
                                    </p>


                                </div>
                            </div>)}
                        </div>
                    </section>

                </div>


            </div>

        </>

    );
}


