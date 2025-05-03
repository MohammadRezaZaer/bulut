"use client"

export const dynamicParams = false;

import {type ElementRef, Fragment, useEffect, useRef, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import {DialogShell} from "@/app/components/dialog-shell";
import {DeletePlate} from "@/app/components/deletePlate";

export default function DeletePage({
                                           params,
                                         }: {
  params: Promise<{ id: string }>;
}) {


    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);



    const [open, setOpen] = useState(true)

    const cancelButtonRef = useRef(null)

    return (



        <DialogShell show={open} initialFocus={cancelButtonRef} onClose={setOpen}>
            <DeletePlate />

        </DialogShell>





 );
}