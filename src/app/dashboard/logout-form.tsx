'use client';

import { logoutAction } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRight, LogOut } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {ROUTES} from "@/lib/constant/constants";
import {cn} from "@/lib/utils";

export default function LogoutForm(className) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleLogout = () => {
        startTransition(async () => {
            await logoutAction(); // اجرای server action
            toast.success('با موفقیت خارج شدید!');
            router.push(ROUTES.LOGIN); // هدایت به صفحه لاگین یا صفحه اصلی
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className={cn("flex items-center direction-rtl hover:bg-gray-50 text-right w-full px-3 py-1 text-sm leading-6 text-gray-900",className)}
                >
                    <LogOut className="w-4 h-4 ml-2" />
                    <span >خروج</span>
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
                <DialogFooter className="flex gap-2 sm:justify-center justify-center items-center">
                    <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="ml-2"
                        isLoading={isPending}
                        disabled={isPending}
                    >
                        {isPending ? 'در حال خروج...' : 'تأیید خروج'}
                    </Button>
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
