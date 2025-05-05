'use client';

import * as React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {Button} from "@/components/ui/button";

interface FreeTowingInfoProps {
    onAccept?: () => void;
    goToNext?: () => void;
}

export default function FreeTowingInfo({
                                           onAccept,
                                           goToNext,
                                       }: FreeTowingInfoProps) {
    const [agreed, setAgreed] = React.useState(false);

    return (
        <section dir='rtl' className='block'>
            <section className='w-[800px] max-w-[95%] mx-auto mt-10 p-5 xl:p-10 rounded-lg border-4 xl:border-8 border-gray-200 bg-white text-justify'>
                <h1 className='text-center xl:text-right font-bold text-lg xl:text-xl'>
                    چرا حمل در امداد خودرو رایگان می‌شود؟
                </h1>

                <p className='mt-3 text-base font-light leading-10'>
                    با توجه به شکایت‌های متعدد صاحبان خودرو از نرخ و تعرفه حمل و عملکرد...
                    {/* Your full paragraph here */}
                </p>

                <ul className='mt-4 text-sm list-disc leading-10 ps-5'>
                    <li>توجه ۱: کلیه پیامک‌ها از سامانه پیامکی 90006421 فقط معتبر می‌باشد.</li>
                    <li>توجه ۲: تلفن‌های ۱۵۹۳ و ۹۰۰۰۱۵۹۳ و ۹۰۰۰۶۴۲۱ فقط پاسخگوی شما عزیزان می‌باشد.</li>
                    <li>
                        توجه ۳: در انتخاب سقف تعهدات بیمه برای حمل رایگان بر اساس خودرو خود کاملاً
                        دقت نموده و یا در صورت نیاز با مشاوران ما با شماره ۰۲۱۹۱۳۰۶۴۲۱ تماس بگیرید.
                    </li>
                </ul>

                <div className='mt-6'>
                    <label className='flex items-center space-x-2 space-x-reverse'>
                        <Checkbox
                            id='agree'
                            checked={agreed}
                            onCheckedChange={(value) => {
                                setAgreed(!!value);
                                onAccept?.();
                            }}
                        />
                        <span className='text-sm'>با تمام قوانین بالا موافقم</span>
                    </label>
                </div>

                <div className='flex justify-center mt-10'>
                    <Button
                        disabled={!agreed}
                        className='w-full max-w-[500px]'
                        onClick={goToNext}
                    >
                        مرحله بعد
                    </Button>
                </div>
            </section>
        </section>
    );
}
