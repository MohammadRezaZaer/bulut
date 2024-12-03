"use client"

import React, {Fragment, useState} from 'react'
import {Menu} from '@headlessui/react'
import {cn} from "@/lib/utils";
import {Sidebar} from "@/components/sidebar";
import {DashHeader} from "@/components/dashHeader";

export const  photos = Array.from({ length: 3 }, (_, i) => i + 1);

export default function Page() {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false)

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


          <DashHeader    setMobSidebarOpen={setMobSidebarOpen} />


        </div>

      </>

  );
}
