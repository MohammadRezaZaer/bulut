'use client';

import {useState} from 'react';
import {Sidebar} from '@/components/sidebar';
import {Header} from '@/components/header';
import {navLinks} from "@/utils/navigations-and_other_sets";

type Props = {
    children: React.ReactNode;
    isAuthenticated: boolean;
};
export default function HomeShell({children, isAuthenticated}: Props) {
    const [mobSidebarOpen, setMobSidebarOpen] = useState(false);
    const [SidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <Sidebar
                show={mobSidebarOpen}
                isAuthenticated={isAuthenticated}
                onClose={setMobSidebarOpen}
                onClick={() => setMobSidebarOpen(false)}
                items={navLinks}
            />

            <Header setMobSidebarOpen={setMobSidebarOpen} isAuthenticated={isAuthenticated}/>

            <main className="bg-[#F0F1F1]">
                <div className="flex">

                    <section className="p-1 xl:py-10 xl:px-12 w-full bg-white xl:m-4 rounded-xl">

                        {children}
                    </section>
                </div>
            </main>
        </div>
    );
}
