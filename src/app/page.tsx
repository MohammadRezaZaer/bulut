"use client"

import Link from 'next/link';
import {Fragment, useState} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon,} from '@heroicons/react/24/outline'
import {ChevronDownIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import {cn} from "@/lib/utils";
import {navigation, Sidebar} from "@/components/sidebar";

export const  photos = Array.from({ length: 6 }, (_, i) => i + 1);

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function DeskSideBar(props: { sidebarOpen: boolean, onClick: () => void, callbackfn: (item) => JSX.Element }) {
  return <>
    {/* Static sidebar for desktop */}
    <div
        className={cn("hidden  lg:inset-y-0 lg:right-0 lg:z-30 lg:block lg:w-20 lg:overflow-y-auto shadow-sm border-l border-gray-200 lg:pb-4 transition-all lg:min-h-[calc(100vh-64px)]", {"lg:w-40": props.sidebarOpen})}>

      <nav className="px-4">
        <ul role="list" className="flex flex-col items-center space-y-1">


          <svg className={cn("active:scale-95 transition", {"rotate-180": props.sidebarOpen})} onClick={props.onClick}
               width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" transform="matrix(-1 0 0 1 36 12)" fill="#EBE7FF"/>
            <path d="M17 24H31" stroke="#6E21FF" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M22 29L17 24" stroke="#6E21FF" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M22 19L17 24" stroke="#6E21FF" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>

          {navigation.map(props.callbackfn)}
        </ul>
      </nav>
    </div>
  </>;
}

function DashHeader(props: {
  onClick: () => void,
  callbackfn: (item) => JSX.Element,
  sidebarOpen: boolean,
  onClick1: () => void,
  callbackfn1: (item) => JSX.Element,
  callbackfn2: (id) => JSX.Element
}) {
  return <div className="">
    <div
        className="sticky  top-0 z-40 flex  h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6  lg:pl-8 ">
      <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={props.onClick}>
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

        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
              aria-hidden="true"
          />
          <input
              id="search-field"
              className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              type="search"
              name="search"
          />
        </form>
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
                {userNavigation.map(props.callbackfn)}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>

    <main className="">
      <div className="flex flex-row-reverse">

        <DeskSideBar sidebarOpen={props.sidebarOpen} onClick={props.onClick1}
                     callbackfn={props.callbackfn1}/>
        <section className="cards-container">
          {photos.map(props.callbackfn2)}
        </section>


      </div>
    </main>
  </div>;
}

export default function Page() {
  const [mobSidebarOpen, setMobSidebarOpen] = useState(false)
  const [SidebarOpen, setSidebarOpen] = useState(false)

  return (<>


        <div>
          <Sidebar show={mobSidebarOpen} onClose={setMobSidebarOpen} onClick={() => setMobSidebarOpen(false)}
                   callbackfn={(item) => (
                       <li key={item.name}>
                         <a
                             href={item.href}
                             className={cn(
                                 item.current
                                     ? 'bg-gray-800 text-white'
                                     : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                             )}
                         >
                           <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                           {item.name}
                         </a>
                       </li>
                   )}/>


          <DashHeader onClick={() => setMobSidebarOpen(true)} callbackfn={(item) => (
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
          )} sidebarOpen={SidebarOpen} onClick1={() => setSidebarOpen((prev) => !prev)} callbackfn1={(item) => (
              <li key={item.name} className="w-full">
                <a
                    href={item.href}
                    className={cn(
                        item.current ? 'bg-brand text-white' : 'text-gray-400 hover:text-white hover:bg-brand',
                        'group flex gap-x-3 rounded-md p-3 flex-row-reverse text-sm leading-6 font-semibold'
                    )}
                >
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                  <span className={cn({"sr-only": !SidebarOpen})}>{item.name}</span>
                </a>
              </li>
          )} callbackfn2={(id) => (
              <Link className="card" key={id} href={`/photos/${id}`} passHref>
                {id}
              </Link>
          )}/>


        </div>

      </>

  );
}
