'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { DeskSideBar } from '@/components/deskSideBar';
import { cn } from '@/lib/utils';
import {BackLink} from "@/components/Back-Link";


export default function HomeShell({ children }: { children: React.ReactNode }) {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false);
    const [SidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <Sidebar
                show={mobSidebarOpen}
                onClose={setMobSidebarOpen}
                onClick={() => setMobSidebarOpen(false)}

            />

            <Header setMobSidebarOpen={setMobSidebarOpen} />

            <main className="bg-[#F0F1F1]">
                <div className="flex">

                    <section className="py-10 px-12 w-full bg-white m-4 rounded-xl">

                        {children}
                    </section>
                </div>
            </main>
        </div>
    );
}
