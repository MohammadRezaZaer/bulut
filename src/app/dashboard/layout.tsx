
import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/colors.css';

export const metadata: Metadata = {
  title: 'Components',
  description: 'Pre-built components with awesome default',
};

import DashboardShell from '@/components/layouts/dashboard-shell';
import {isAuthenticated} from "@/lib/auth";

export default function DashboardLayout(props: {
    children: React.ReactNode;

}) {

    const auth_token = isAuthenticated();

    return <DashboardShell isAuthenticated={auth_token}>

        {props.children}


    </DashboardShell>;
}




