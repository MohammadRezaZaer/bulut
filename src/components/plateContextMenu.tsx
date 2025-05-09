import {Menu, Transition} from "@headlessui/react";
import {EllipsisHorizontalIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/20/solid";
import React, {Fragment} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";

export function PlateContextMenu({id}) {
    return <Menu as="div" className="relative inline-block text-left">
        <div>
            <Menu.Button
                className="flex items-center rounded-full bg-gray-100 text-gray-950 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true"/>
            </Menu.Button>
        </div>

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
                className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                    <Menu.Item>
                        {({active}) => (
                            <Link
                                href={`/dashboard/Inquiry/plates/edit/${id}`} passHref
                                className={cn(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'group flex items-center px-4 py-2 text-sm'
                                )}
                            >
                                <PencilSquareIcon
                                    className="ml-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                ویرایش
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <Link
                                href={`/dashboard/Inquiry/plates/delete/${id}`} passHref

                                className={cn(
                                    active ? 'bg-gray-100 text-gray-700' : ' text-red-500',
                                    'group flex items-center px-4 py-2 text-sm'
                                )}
                            >
                                <TrashIcon
                                    className="ml-3 h-5 w-5 text-red-500 group-hover:text-gray-500"
                                    aria-hidden="true"/>
                                حذف
                            </Link>
                        )}
                    </Menu.Item>

                </div>
            </Menu.Items>
        </Transition>
    </Menu>;
}