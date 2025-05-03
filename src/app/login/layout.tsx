
import { Metadata } from 'next';
import * as React from 'react';


export const metadata: Metadata = {
  title: 'Components',
  description: 'Pre-built components with awesome default',
};



export default function DashboardLayout(props: {
    children: React.ReactNode;

}) {


    return <main className="flex h-screen items-center justify-center bg-gray-100">
        {props.children}

    </main>


}




