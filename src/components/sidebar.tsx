import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";

export const navigation = [
    {name: 'داشبورد', href: '/', icon: HomeIcon, current: true},
    {name: 'مدیریت کتاب‌ها', href: '/manage-books', icon: UsersIcon, current: false},
    {name: 'فروشگاه', href: '/shop', icon: FolderIcon, current: false},
]

export function Sidebar(props: {
    show: boolean,
    onClose: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    onClick: () => void,
    callbackfn: (item) => JSX.Element
}) {
    return <Transition.Root show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={props.onClose}>
            <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-900/80"/>
            </Transition.Child>

            <div className="fixed inset-0 flex ">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <Dialog.Panel className="relative ml-16 flex w-full max-w-xs flex-1">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute right-full top-0 flex w-16 justify-center pt-5">
                                <button type="button" className="-m-2.5 p-2.5" onClick={props.onClick}>
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                </button>
                            </div>
                        </Transition.Child>

                        <div
                            className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 ring-1 ring-white/10">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="/images/logo.png"
                                    alt="Your Company"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="-mx-2 flex-1 space-y-1">
                                    {navigation.map(props.callbackfn)}
                                </ul>
                            </nav>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>;
}