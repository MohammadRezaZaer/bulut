"use client"
import {Popover, Transition} from "@headlessui/react";
import {ShoppingBagIcon} from "@heroicons/react/24/outline";
import React, {Fragment, useEffect, useRef, useState} from "react";
import Button from "@/components/buttons/Button";
import {useCart} from "@/components/cart/cart-context";
import {createCartAndSetCookie} from "@/components/cart/actions";
import {CartItem} from "@/lib/shopify/types";
import {AddOrUpdate} from "@/components/addOrUpdate";
import {AddToCart} from "@/components/cart/add-to-cart";


export function Cart() {

    const { cart, updateCartItem } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const quantityRef = useRef(cart?.totalQuantity);
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);








    return <>
        {/* Cart */}
        <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8 z-50">
            <Popover.Button className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart?.lines.length} </span>
                <span className="sr-only">items in cart, view bag</span>
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Popover.Panel
                    className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:right-auto lg:left-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5">
                    <h2 className="sr-only">Shopping Cart</h2>

                    <div className="mx-auto max-w-2xl px-4 pt-4">
                        <ul role="list" className="divide-y divide-gray-200 max-h-[50vh] overflow-hidden overflow-y-auto">
                            {cart?.lines?.map((item:CartItem,idx) => (
                                <li key={idx} className="flex items-center py-6">
                                    <img
                                        src={`/items/${idx%4+1}.png`}

                                        className=" w-[110px] aspect-square flex-none rounded-md border border-gray-200"
                                    />
                                    <div className="mr-4 flex-auto">
                                        <h3 className="text-[12px] font-medium text-gray-900">
                                            <span> نام کتاب: {item.merchandise?.product.title}  </span>
                                        </h3>
                                        <p className="text-gray-500">{item.cost?.totalAmount.amount} تومان</p>
                                        <AddOrUpdate LineItem={{ id: item.merchandise.product.id, title: item.merchandise.product.title, price: item.cost.totalAmount.amount}} />

                                    </div>

                                </li>
                            ))}
                        </ul>

                        <Button
                            type="submit"
                            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 my-2"
                        >
                            ثبت سفارش
                        </Button>

                        <p className="mt-6 text-center">
                            مجموع تعداد درخواست:<span> {cart?.lines.length} </span>
                        </p>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    </>;
}