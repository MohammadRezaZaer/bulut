"use client"

import React, {Fragment} from 'react'

import {PlateCardShowing} from "@/components/plate-card-showing";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ROUTES} from "@/lib/constant/constants";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

// Plate structure
interface Plate {
    first: string;
    middle: string;
    letter: string;
    last: string;
}

// Car details
interface Car {
    plate: Plate;
    brand: string;
    model: string;
    color: string;
}

// Insurance details
interface Insurance {
    name: string;
    family: string;
    commitment: number;
    paid: number;
    insuranceExpiry: string; // e.g. "1405/02/01"
}

// Possible statuses (extend as needed)
type Status = 'prepaid' | 'postpaid' | 'pending';

// Full record type
export interface VehicleRecord {
    id: number;
    title: string;
    car: Car;
    insurance: Insurance;
    status: Status;
}

import { useState } from 'react';
export default function Page() {
    // استیت برای نگه داشتن صفحه فعلی و تعداد کل صفحات
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // تعداد آیتم‌ها در هر صفحه
    const totalItems = 25; // تعداد کل آیتم‌ها
    const totalPages = Math.ceil(totalItems / itemsPerPage); // تعداد صفحات

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // صفحات اطراف صفحه فعلی
    const pageNumbers = [];
    for (let i = totalPages; i >= 1; i--) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            pageNumbers.push(i);
        }
    }

    return (
        <>
            <div className="flex w-full items-center mb-10">
                <div className="flex items-center justify-between w-full">
                    <span>لیست بیمه نامه ها</span>
                    <Button>
                        <Link href={ROUTES.INSURANCE_SIGNUP}>افزودن بیمه نامه جدید</Link>
                    </Button>
                </div>
            </div>

            <div className="mx-[24px] grid gap-4 md:mx-auto md:w-[80%] xl:w-full xl:grid-cols-3 xl:gap-6 pb-8">
                {Array.from({ length: itemsPerPage }, (_, idx) => (
                    <PlateCardShowing
                        key={idx}
                        Bime={{
                            title: 'ساینا',
                            car: {
                                plate: {
                                    first: '15',
                                    middle: '567',
                                    letter: 'الف',
                                    last: '77',
                                },
                                brand: 'ایران خودرو',
                                model: 'پژو 207',
                                color: 'سفید',
                            },
                            insurance: {
                                name: 'نام',
                                family: 'نام خانوادگی',
                                commitment: 5000000,
                                paid: 275000,
                                insuranceExpiry: '1405/02/01',
                            },
                            id: idx + 1,
                            status: 'prepaid',
                        }}
                    />
                ))}
            </div>

            {/* پیجینیشن */}
            <Pagination>
                <PaginationContent>

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        />
                    </PaginationItem>
                    {/* نمایش شماره صفحات */}
                    {pageNumbers.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href="#"
                                onClick={() => handlePageClick(page)}
                                className={currentPage === page ? 'font-bold' : ''}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}
