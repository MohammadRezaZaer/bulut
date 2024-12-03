import {Bars3Icon, BellIcon} from "@heroicons/react/24/outline";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import React, {Fragment, useState} from "react";
import {DeskSideBar} from "@/components/deskSideBar";
import Button from "@/components/buttons/Button";
import {Plus} from "lucide-react";
import NextImage from "@/components/NextImage";
import {ContextMenu} from "@/components/contextMenu";
import {photos} from "@/app/page";
import {cn} from "@/lib/utils";

const userNavigation = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '#'},
]

export function DashHeader( {

                                setMobSidebarOpen




}) {
    const [SidebarOpen, setSidebarOpen] = useState(false)

    return <div className="">
        <div
            className="sticky  top-0 z-40 flex  h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6  lg:pl-8 ">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    onClick={() => setMobSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"/>

            <div className="flex lg:flex-row-reverse flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="hidden lg:flex h-16 shrink-0 items-center justify-center">
                    <img
                        className="h-8 w-auto"
                        src="/images/logo.png"
                        alt="Your Company"
                    />
                </div>


                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>

                    {/* Separator */}
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"/>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full bg-gray-50"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        Tom Cook
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({active}) => (
                                            <a
                                                href={item.href}
                                                className={cn(
                                                    active ? 'bg-gray-50' : '',
                                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>

        <main className="bg-[#F0F1F1] ">
            <div className="flex   ">

                <DeskSideBar sidebarOpen={SidebarOpen} onClick={() => setSidebarOpen((prev) => !prev)}
                             callbackfn={(item) => (
                                 <li key={item.name} className="w-full min-w-12">
                                     <a
                                         href={item.href}
                                         className={cn(
                                             item.current ? 'bg-brand text-white' : 'text-gray-400 hover:text-white hover:bg-brand',
                                             'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
                                         )}
                                     >
                                         <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                         <span className={cn({"sr-only": !SidebarOpen})}>{item.name}</span>
                                     </a>
                                 </li>
                             )}/>
                <section className="py-10 px-12 w-full bg-white m-4 rounded-xl">
                    <div className="flex w-full items-center mb-10">

                        <span>مدیریت کتاب‌ها</span>
                        <form className="relative flex flex-[0.4] mr-auto mx-4 h-12" action="#" method="GET">
                            <label htmlFor="search-field" className="sr-only">
                                Search
                            </label>

                            <input
                                id="search-field"
                                className="dir-rtl block h-full w-full border-1 border-gray-400 rounded-lg py-3 pr-8 pl-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                placeholder="جستجو بر اساس نام کتاب"
                                type="search"
                                name="search"
                            />
                            <MagnifyingGlassIcon
                                className="pointer-events-none absolute inset-y-0 right-2 h-full w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </form>

                        <Button
                            rightIcon={Plus}> افزودن
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 ">


                        {photos.map((id) => <div
                            className="relative min-w-[306px] max-h-[401px] aspect-[1.3] bg-white shadow-lg items-start flex flex-col rounded"
                            key={id}>
                            <NextImage
                                useSkeleton
                                className='w-full aspect-square relative'
                                src={`/items/${id}.png`}
                                fill
                                alt='Icon'
                            />
                            <div className="p-4 relative w-full">
                                <div className="flex w-full justify-between items-center">


                                    <h2 className="text-lg ">دیزاین یک شغل است</h2>


                                    <ContextMenu id={id}/>
                                </div>
                                <p className="text-lg font-bold"><span
                                    className="text-gray-400 font-medium">قیمت :</span> 58.000 تومان
                                </p></div>
                        </div>)}
                    </div>
                </section>

            </div>
        </main>
    </div>;
}