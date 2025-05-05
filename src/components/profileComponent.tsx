import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import React, {Fragment} from "react";
import {cn} from "@/lib/utils";
import {Text_tokens} from "@/lib/constant/constants";
import LogoutForm from "@/app/dashboard/logout-form";

const userNavigation = [
    {name: 'Your profile', href: '#'},
    {name: Text_tokens.Sign_out, href: '#'},
]

export function ProfileComponent() {
    return <>
        {/* Profile dropdown */}
        <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5 w-full">
                <span className="sr-only">Open user menu</span>
                <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                />
                <span className="hidden lg:flex lg:items-center">
                      <span className="mr-4 text-sm font-semibold leading-6 text-gray-900 whitespace-nowrap" aria-hidden="true">
                        سجاد تهامی
                      </span>
                      <ChevronDownIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
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
                            {({ active }) =>
                                item.name === Text_tokens.Sign_out ? (
                                    <LogoutForm />
                                ) : (
                                    <a
                                        href={item.href}
                                        className={cn(
                                            active ? 'bg-gray-50' : '',
                                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                )
                            }
                        </Menu.Item>
                    ))}

                </Menu.Items>
            </Transition>
        </Menu>
    </>;
}