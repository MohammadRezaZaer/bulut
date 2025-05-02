
import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/colors.css';
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: 'Components',
  description: 'Pre-built components with awesome default',
};

import DashboardShell from '@/components/layouts/dashboard-shell';

export default function DashboardLayout(props: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return <>

        {props.children}
        {props.modal}
        <div id="modal-root"/>
    </>;
}




