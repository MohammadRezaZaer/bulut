


import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Components',
  description: 'Pre-built components with awesome default',
};

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




