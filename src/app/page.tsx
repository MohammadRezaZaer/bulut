"use client"

import React, {Fragment, useState} from 'react'
import {Menu} from '@headlessui/react'
import {cn} from "@/lib/utils";
import {Sidebar} from "@/components/sidebar";
import {DashHeader} from "@/components/dashHeader";

export const  photos = Array.from({ length: 3 }, (_, i) => i + 1);

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


          <DashHeader onClick={() => setMobSidebarOpen(true)} callbackfn={(item) => (
              <Menu.Item key={item.name}>
                {({active}) => (
                    <a
                        href={item.href}
                        className={cn(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                    >
                      {item.name}
                    </a>
                )}
              </Menu.Item>
          )} sidebarOpen={SidebarOpen} onClick1={() => setSidebarOpen((prev) => !prev)} callbackfn1={(item) => (
              <li key={item.name} className="w-full min-w-12">
                <a
                    href={item.href}
                    className={cn(
                        item.current ? 'bg-brand text-white' : 'text-gray-400 hover:text-white hover:bg-brand',
                        'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
                    )}
                >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                    <span className={cn({"sr-only": !SidebarOpen})}>{item.name}</span>
                </a>
              </li>
          )} />


        </div>

      </>

  );
}
