
import { Metadata } from 'next';
import * as React from 'react';


export const metadata: Metadata = {
  title: 'Components',
  description: 'Pre-built components with awesome default',
};

import DashboardShell from '@/components/layouts/dashboard-shell';
import {isAuthenticated} from "@/lib/auth";

export default function DashboardLayout(props: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {


    return <main className="flex h-screen items-center justify-center bg-gray-100">
        {props.children}
        {props.modal}
        <div id="modal-root"/>
    </main>


}




