'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { DashHeader } from '@/components/dashHeader';
import { DeskSideBar } from '@/components/deskSideBar';
import { cn } from '@/lib/utils';
import {BackLink} from "@/components/Back-Link";


export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false);
    const [SidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <Sidebar
                show={mobSidebarOpen}
                onClose={setMobSidebarOpen}
                onClick={() => setMobSidebarOpen(false)}
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
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        </a>
                    </li>
                )}
            />

            <DashHeader setMobSidebarOpen={setMobSidebarOpen} />

            <main className="bg-[#F0F1F1]">
                <div className="flex">
                    <DeskSideBar
                        sidebarOpen={SidebarOpen}
                        onClick={() => setSidebarOpen((prev) => !prev)}
                    />
                    <section className="py-10 px-12 w-full bg-white m-4 rounded-xl">
                        <BackLink href="../" />
                        {children}
                    </section>
                </div>
            </main>
        </div>
    );
}
