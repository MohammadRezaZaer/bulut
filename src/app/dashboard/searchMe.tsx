import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import React from "react";

export function SearchMe() {
    return <form className="relative flex flex-[0.4] mr-auto mx-4 h-12" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
            Search
        </label>

        <input
            id="search-field"
            className="direction-rtl block h-full w-full border-1 border-gray-400 rounded-lg py-3 pr-8 pl-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="جستجو بر اساس نام کتاب"
            type="search"
            name="search"
        />
        <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 right-2 h-full w-5 text-gray-400"
            aria-hidden="true"
        />
    </form>;
}