import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface PaginationMeProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationMe({ currentPage, totalPages, onPageChange }: PaginationMeProps) {
    const visiblePages = generatePageNumbers(currentPage, totalPages);

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rtl">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        صفحه <span className="font-medium">{currentPage}</span> از <span className="font-medium">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm rtl:space-x-reverse" aria-label="Pagination">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">قبلی</span>
                            <ChevronRightIcon className="size-5" />
                        </button>

                        {visiblePages.map((page, index) =>
                                typeof page === 'number' ? (
                                    <button
                                        key={index}
                                        onClick={() => onPageChange(page)}
                                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 ${
                                            page === currentPage
                                                ? 'bg-indigo-600 text-white ring-indigo-600'
                                                : 'text-gray-900 ring-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ) : (
                                    <span
                                        key={index}
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                                    >
                  ...
                </span>
                                )
                        )}

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">بعدی</span>
                            <ChevronLeftIcon className="size-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

// Helper: generates visible page numbers with ellipsis
function generatePageNumbers(current: number, total: number): (number | string)[] {
    const delta = 2;
    const range: (number | string)[] = [];

    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
        range.push(i);
    }

    if (current - delta > 2) range.unshift('...');
    if (current + delta < total - 1) range.push('...');

    range.unshift(1);
    if (total > 1) range.push(total);

    return range;
}
