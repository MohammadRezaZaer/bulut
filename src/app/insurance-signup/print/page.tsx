
import React from 'react'
import OnboardingFlow from "@/components/step-form/OnboardingFlowForm1";
import {usePathname} from "next/navigation";


interface Props {
    searchParams: { [key: string]: string | string[] | undefined };
    params: { [key: string]: string };
}

export default function Page({ searchParams, params }: Props) {
    const pathname = "/print";
    const queryString = new URLSearchParams(searchParams as Record<string, string>).toString();
    const fullUrl = queryString ? `${pathname}?${queryString}` : pathname;

    return <OnboardingFlow url={fullUrl} />;
}
