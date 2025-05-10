
import { Metadata } from 'next';
import * as React from 'react';
import {ReactQueryClientProvider} from "@/lib/client/ReactQueryClientProvider";


export const metadata: Metadata = {
  title: 'Components',
  description: 'Pre-built components with awesome default',
};



export default function Layout(props: {
    children: React.ReactNode;

}) {


    return (<ReactQueryClientProvider>

    <main className="flex h-screen items-center justify-center bg-gray-100">
        {props.children}

    </main>
    </ReactQueryClientProvider>)


}




