import {Bars3Icon} from "@heroicons/react/24/outline";
import React from "react";
import {ProfileComponent} from "@/components/profileComponent";
import {Navbar} from "@/components/Navbar";
import {NotificationComponent} from "@/components/notificationComponent";
import {LoginButton} from "@/components/ui/buttons/LoginButton";
import {ROUTES} from "@/lib/constant/constants";
import {cn} from "@/lib/utils";


export function Header({

                                setMobSidebarOpen,
                           isAuthenticated



}) {




    return (<div
        className="sticky  top-0 z-40 flex  h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6  lg:pl-8 ">
        <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                onClick={() => setMobSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"/>

        <div className="flex lg:flex-row-reverse flex-1 gap-x-4 justify-between self-stretch lg:gap-x-6 ">


            <div className="flex items-center gap-x-4 lg:gap-x-6 mr-auto">

                <Navbar/>
                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"/>
                {/* Show NotificationComponent if authenticated */}
                {isAuthenticated && <NotificationComponent />}

                {/* Show ProfileComponent if authenticated, else show LoginButton */}
                {isAuthenticated ? <ProfileComponent /> : <LoginButton className="bg-brand rounded-full [&_*]:text-white" href={ROUTES.LOGIN} text="ورود | ثبت نام" />}

            </div>
            <div className={cn("flex h-16 shrink-0 items-center justify-center", {isAuthenticated:"max-xl:hidden"})}>
                <img
                    className="h-8 w-auto"
                    src="/images/fake-logo.png"
                    alt="Your Company"
                />
                <span className=" lg:flex lg:px-4">بیمه امداد</span>
            </div>
        </div>
    </div>)



}