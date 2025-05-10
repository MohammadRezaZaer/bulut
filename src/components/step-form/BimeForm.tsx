import { useState } from "react";
import MarkaziBimeRegister from "@/components/step-form/MarkaziBimeRegister";
import ManualBimeRegister from "@/components/step-form/ManualBimeRegister2";
import {Button} from "@/components/ui/button";

export default function BimeForm({ goToNext, goToPrev, onboardingData }) {
    const [mode, setMode] = useState<"markazi" | "manual">("markazi");

    const sharedProps = { goToNext, goToPrev, onboardingData };

    return (
        <div className="max-w-7xl mx-auto">
            <section className="text-red-600 text-center bg-rose-100 p-2 mt-4 leading-normal rounded-md text-[18px] py-4 m-2"><p>نکته: در صورتی
                که ثبت نام به کمک استعلام بیمه مرکزی با مشکل مواجه شد می توانید از ثبت نام دستی استفاده کنید.</p><p
                className="mt-4">نکته: در صورتی که دارای پلاک مناطق آزاد هستید از ثبت نام دستی استفاده کنید.</p>
            </section>
            <section className="flex m-4">
                <section className="grid w-full grid-cols-1 gap-2 xl:grid-cols-2 mt-5">
                    <Button
                        type="button"
                        onClick={() => setMode("markazi")}
                        className={`p-3 font-bold text-center rounded-md transition-all cursor-pointer hover:text-white ${
                            mode === "markazi"
                                ? "bg-brand scale-105 text-white"
                                : "bg-gray-200 text-black "
                        }`}
                    >
                        ثبت نام به کمک استعلام بیمه مرکزی
                    </Button>
                    <Button
                        type="button"
                        onClick={() => setMode("manual")}
                        className={`p-3 font-bold text-center rounded-md transition-all cursor-pointer  hover:text-white ${
                            mode === "manual"
                                ? "bg-brand scale-105 text-white"
                                : "bg-gray-200 text-black "
                        }`}
                    >
                        ثبت نام دستی
                    </Button>
                </section>
            </section>

            <div className="max-w-7xl m-auto mt-5">
                {mode === "markazi" ? (
                    <MarkaziBimeRegister {...sharedProps} />
                ) : (
                    <ManualBimeRegister {...sharedProps} />
                )}
            </div>
        </div>
    );
}

