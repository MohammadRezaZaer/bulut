"use client"

import React, {Fragment, useState} from 'react'
import {cn} from "@/lib/utils";
import {Sidebar} from "@/components/sidebar";
import {DashHeader} from "@/components/dashHeader";
import {DeskSideBar} from "@/components/deskSideBar";
import Button from "@/components/buttons/Button";
import {Plus} from "lucide-react";
import NextImage from "@/components/NextImage";
import {ContextMenu} from "@/components/contextMenu";
import {Cart} from "@/components/cart";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {AddOrUpdate} from "@/components/addOrUpdate";
import {useCart} from "@/components/cart/cart-context";
import {Product, ProductVariant} from "@/lib/shopify/types";
import {useProduct} from "@/components/product/product-context";
import {AddToCart} from "@/components/cart/add-to-cart";

export const  books = [{
    id:1,
    title:"تخریب با دیزاین",
    price:58000

},
    {
        id:2,
        title:"تئوری های دیزاین گرافیک",
        price:53000
    },{
        id:3,
        title:"دیزاین یک شغل است",
        price:59000
    }];

export default function Page() {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false)
    const [SidebarOpen, setSidebarOpen] = useState(false)


    return (<>


            <div>
                <Sidebar show={mobSidebarOpen} onClose={setMobSidebarOpen} onClick={() => setMobSidebarOpen(false)}
                         callbackfn={(item) => (
                             <li key={item.name}>
                                 <a
                                     href={item.href}
                                     className={cn(
                                         item.current
                                             ? 'bg-gray-800 text-white'
                                             : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                         'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                     )}
                                 >
                                     {item.name}
                                     <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                 </a>
                             </li>
                         )}/>


                <DashHeader setMobSidebarOpen={setMobSidebarOpen}/>


                <main className="bg-[#F0F1F1] ">
                    <div className="flex   ">

                        <DeskSideBar sidebarOpen={SidebarOpen} onClick={() => setSidebarOpen((prev) => !prev)}
                        />
                        <section className="py-10 px-12 w-full bg-white m-4 rounded-xl">
                            <div className="flex w-full items-center mb-10">

                                <span>مدیریت کتاب‌ها</span>
                                <form className="relative flex flex-[0.4] mr-auto mx-4 h-12" action="#" method="GET">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>

                                    <input
                                        id="search-field"
                                        className="dir-rtl block h-full w-full border-1 border-gray-400 rounded-lg py-3 pr-8 pl-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                        placeholder="جستجو بر اساس نام کتاب"
                                        type="search"
                                        name="search"
                                    />
                                    <MagnifyingGlassIcon
                                        className="pointer-events-none absolute inset-y-0 right-2 h-full w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </form>
                                <Cart/>
                                <Button
                                    rightIcon={Plus}> افزودن
                                </Button>
                            </div>
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

                                        <AddOrUpdate LineItem={item} />
                                    </div>
                                </div>)}
                            </div>
                        </section>

                    </div>
                </main>


            </div>

        </>

    );
}


