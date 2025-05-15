import { useState } from "react";
import MarkaziBimeRegister from "@/components/step-form/MarkaziBimeRegister";
import ManualBimeRegister from "@/components/step-form/ManualBimeRegister2";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function BimeForm({ goToNext, goToPrev, onboardingData }) {
    const [mode, setMode] = useState<"markazi" | "manual">("manual");
    const sharedProps = { goToNext, goToPrev, onboardingData };

    return (
        <div className="max-w-7xl mx-auto px-4" >
            {/* هشدار */}
            <section className="bg-rose-100 text-red-600 text-center p-4 mt-4 rounded-md text-[18px] leading-relaxed space-y-4">
                <p>
                    نکته: در صورتی که ثبت‌نام به کمک استعلام بیمه مرکزی با مشکل مواجه شد، می‌توانید از ثبت‌نام دستی استفاده کنید.
                </p>
                <p>
                    نکته: در صورتی که دارای پلاک مناطق آزاد هستید، از ثبت‌نام دستی استفاده کنید.
                </p>
            </section>

            <section className="mt-6 ">
                <RadioGroup
                    value={mode}
                    dir="rtl"
                    onValueChange={(value) => setMode(value as "markazi" | "manual")}
                    className=""
                >
                    <div className="flex items-center space-x-2 p-2 cursor-pointer">
                        <RadioGroupItem className="ml-2" value="manual" id="r2"/>
                        <Label htmlFor="r2">ثبت‌نام دستی</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 cursor-pointer">
                        <RadioGroupItem className="ml-2" value="markazi" id="r1"/>
                        <Label htmlFor="r1">ثبت‌نام به کمک استعلام بیمه مرکزی</Label>
                    </div>

                </RadioGroup>
            </section>

            <div className="mt-8">
                {mode === "markazi" ? (
                    <MarkaziBimeRegister {...sharedProps} />
                ) : (
                    <ManualBimeRegister {...sharedProps} />
                )}
            </div>
        </div>
    );
}
