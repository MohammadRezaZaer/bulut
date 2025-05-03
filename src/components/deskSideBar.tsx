import {cn} from "@/lib/utils";
import React from "react";
import {navigation} from "@/utils/navigations-and_other_sets";

export function DeskSideBar(props: { sidebarOpen: boolean, onClick: () => void}) {
    return <>
        {/* Static sidebar for desktop */}
        <div
            className={cn("hidden  lg:inset-y-0 lg:end-0 lg:z-30 lg:block lg:w-20 bg-white lg:overflow-y-auto shadow-sm border-l border-gray-200 lg:pb-4 transition-all duration-500 lg:min-h-[calc(100vh-64px)]", {"lg:w-80": props.sidebarOpen})}>

            <nav className="">
                <ul role="list" className="flex flex-col items-center space-y-1 min-w-12 px-4">


                    <svg className={cn("w-full min-w-12 active:scale-95 transition self-start ", {"rotate-180 ": props.sidebarOpen})}
                         onClick={props.onClick}
                         width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="4" transform="matrix(-1 0 0 1 36 12)" fill="#EBE7FF"/>
                        <path d="M17 24H31" stroke="#6E21FF" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M22 29L17 24" stroke="#6E21FF" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                        <path d="M22 19L17 24" stroke="#6E21FF" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>

                    {navigation.map((item) => (
                        <li key={item.name} className="w-full min-w-12">
                            <a
                                href={item.href}
                                className={cn(
                                    item.current ? 'bg-brand text-white' : 'text-gray-400 hover:text-white hover:bg-brand',
                                    'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
                                )}
                            >
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                <span className={cn({"sr-only": !props.sidebarOpen})}>{item.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </>;
}