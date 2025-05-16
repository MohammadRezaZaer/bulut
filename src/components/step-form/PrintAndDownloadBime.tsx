"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FileCheck2 } from "lucide-react";
import html2pdf from "html2pdf.js";

export function PrintAndDownloadBime() {
    const handleDownloadPDF = () => {
        const element = document.getElementById("insurance-detail");
        if (!element) return;

        const opt = {
            margin: 0.5,
            filename: "bimeh-nameh.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="max-w-[80%] mx-auto">
            <div className="bg-green-100 p-6 rounded-lg shadow-md mb-4">
                <div className="flex flex-col items-center space-x-3">
          <span className="text-green-600 text-2xl">
            <FileCheck2 size={50} />
          </span>
                    <span className="text-green-600 text-xl font-semibold">
            اطلاعات شما با موفقیت ثبت شد
          </span>
                </div>
            </div>

            {/* این بخش به PDF تبدیل می‌شود */}
            <div id="insurance-detail" className="bg-white p-6 rounded-lg shadow-md mb-4 text-right leading-loose">
                <img src="/images/fake-logo.png" alt="لوگو بیمه" className="w-32 mb-4 mx-auto" />
                <h2 className="text-center text-xl font-bold mb-4">جزئیات بیمه‌نامه</h2>
                <p><strong>شماره بیمه‌نامه:</strong> 12345678</p>
                <p><strong>نام بیمه‌گذار:</strong> علی رضایی</p>
                <p><strong>نوع بیمه:</strong> امداد حمل رایگان</p>
                <p><strong>تاریخ صدور:</strong> 1403/02/20</p>
                <p><strong>مدت اعتبار:</strong> یک سال</p>
                <p><strong>هزینه:</strong> ۵۰۰٬۰۰۰ تومان</p>
            </div>

            <p className="text-gray-700 text-center mt-2">
                کاربر گرامی از طریق دکمه زیر می‌توانید اقدام به دریافت بیمه
                نامه خود نمایید.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md mt-4 flex flex-col justify-center">
                <Button className="w-full max-w-3xl mx-auto" onClick={handleDownloadPDF}>
                    دریافت بیمه نامه
                </Button>
                <div className="mt-4 text-center">
                    <a href="#" className="text-sm text-gray-600 hover:underline">بازگشت به صفحه اصلی</a>
                </div>
            </div>
        </div>
    );
}
