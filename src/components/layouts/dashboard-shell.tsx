'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { DeskSideBar } from '@/components/deskSideBar';
import { cn } from '@/lib/utils';
import {BackLink} from "@/components/Back-Link";
import {navigation} from "@/utils/navigations-and_other_sets";

type Props = {
    children: React.ReactNode;
    isAuthenticated: boolean;
};
export default function DashboardShell({ children ,isAuthenticated }: Props) {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false);
    const [SidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <Sidebar
                show={mobSidebarOpen}
                onClose={setMobSidebarOpen}
                onClick={() => setMobSidebarOpen(false)}
items={navigation}
            />

            <Header setMobSidebarOpen={setMobSidebarOpen} isAuthenticated={isAuthenticated} />

            <main className="bg-[#F0F1F1]">
                <div className="flex min-h-[93vh] overflow-x-hidden">
                    <DeskSideBar
                        sidebarOpen={SidebarOpen}
                        onClick={() => setSidebarOpen((prev) => !prev)}
                    />
                    <section className="p-1 xl:py-10 xl:px-12 w-full bg-white xl:m-4 rounded-xl">
                        <BackLink href="../" />
                        {children}
                    </section>
                </div>
            </main>
        </div>
    );
}
