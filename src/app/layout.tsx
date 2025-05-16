
import '@/styles/globals.css';

import './global.css';

import { siteConfig } from '@/lib/constant/config';

import {Metadata} from "next";

import { Toaster } from "@/components/ui/sonner"
import TopLoader from "@/components/top-loader";
import {yekanBakh} from "@/app/lib/fonts";
import {cn} from "@/lib/utils";


export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.title}`,
    },
    description: siteConfig.description,
    robots: { index: true, follow: true },
    // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
    // ! copy to /favicon folder
    icons: {
        icon: '/favicon/favicon.ico',
        shortcut: '/favicon/favicon-16x16.png',
        apple: '/favicon/apple-touch-icon.png',
    },
    manifest: `/favicon/site.webmanifest`,
    openGraph: {
        url: siteConfig.url,
        title: siteConfig.title,
        description: siteConfig.description,
        siteName: siteConfig.title,
        images: [`${siteConfig.url}/images/og.jpg`],
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
        images: [`${siteConfig.url}/images/og.jpg`],
        // creator: '@th_clarence',
    },
    // authors: [
    //   {
    //     name: 'Theodorus Clarence',
    //     url: 'https://theodorusclarence.com',
    //   },
    // ],
};


export default async function RootLayout(props: {
  children: React.ReactNode;
}) {

  return (
      <html lang="fa"   className={cn(yekanBakh.variable,/* iranSansX.variable*/)} dir={"rtl"} >

      <body>
      <TopLoader />
          {props.children}


          <Toaster richColors  position="top-right"/>
      </body>
      </html>
  );
}
