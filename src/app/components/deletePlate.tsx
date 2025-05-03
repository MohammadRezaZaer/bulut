import {useRouter} from "next/navigation";
import {CheckIcon} from "@heroicons/react/24/outline";
import {Dialog} from "@headlessui/react";

export function DeletePlate() {

    const router = useRouter();


    function onDismiss() {
        router.back();
    }

    function onDelete() {
        router.back();
    }

    return <>
        <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <CheckIcon className="h-6 w-6 text-red-500" aria-hidden="true"/>
            </div>
            <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    حذف
                </Dialog.Title>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        ایا از حذف مطمئن هستید؟ </p>
                </div>
            </div>
        </div>
        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                onClick={onDelete}
            >
                حذف
            </button>
            <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                onClick={onDismiss}

            >
                انصراف
            </button>
        </div>
    </>;
}