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

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (<>


        <div>
          <Sidebar show={sidebarOpen} onClose={setSidebarOpen} onClick={() => setSidebarOpen(false)}
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

          {/* Static sidebar for desktop */}
          <div
              className="hidden lg:fixed lg:inset-y-0 lg:right-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto shadow-sm border-l border-gray-200 lg:pb-4">
            <div className="flex h-16 shrink-0 items-center justify-center">
              <img
                  className="h-8 w-auto"
                  src="/images/logo.png"
                  alt="Your Company"
              />
            </div>
            <nav className="mt-8">
              <ul role="list" className="flex flex-col items-center space-y-1">
                {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                          href={item.href}
                          className={cn(
                              item.current ? 'bg-brand text-white' : 'text-gray-400 hover:text-white hover:bg-brand',
                              'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold'
                          )}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                        <span className="sr-only">{item.name}</span>
                      </a>
                    </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="">
            <div
                className="sticky top-0 z-40 flex  h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                      onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
              </button>

              {/* Separator */}
              <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"/>

              <div className="flex lg:flex-row-reverse flex-1 gap-x-4 self-stretch lg:gap-x-6">
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

            <main className="xl:pl-96">
              <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">


                <section className="cards-container">
                  {photos.map((id) => (
                      <Link className="card" key={id} href={`/photos/${id}`} passHref>
                        {id}
                      </Link>
                  ))}
                </section>


              </div>
            </main>
          </div>


        </div>

      </>

  );
}
