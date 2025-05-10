'use client';

import { logoutAction } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { LogOut, ArrowRight } from "lucide-react";

export default function LogoutForm() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="flex items-center  direction-rtl  hover:bg-gray-50 text-right w-full px-3 py-1 text-sm leading-6 text-gray-900"
                >
                    <LogOut className="w-4 h-4 ml-2" />
                    <span>خروج</span>
                </button>
            </DialogTrigger>

            <DialogContent dir="rtl">
                <DialogHeader className="text-center justify-center items-center">
                    <DialogTitle>خروج</DialogTitle>
                    <DialogDescription className="text-center">

                        <LogOut className="w-72 h-20 py-4 text-red-600" />
                        آیا مایلید از حساب کاربری خود خارج شوید؟
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex  gap-2 sm:justify-center justify-center items-center">
                    <form action={logoutAction}>
                        <Button type="submit" variant="destructive" className="ml-2">

                            تأیید خروج
                        </Button>
                    </form>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <ArrowRight className="w-4 h-4 ml-1" />
                            بازگشت
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
