'use client';
import * as React from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
    agreed: z.boolean().refine((val) => val, {
        message: 'You must agree to the terms.',
    }),
});


interface FreeTowingInfoProps {
    onboardingData: Record<string, any>; // onboardingData holds key-value pairs of data
    onAccept?: () => void; // onAccept doesn't take any parameters
    goToNext?: (stepData: Record<string, any>) => void; // goToNext takes stepData as an argument
    onPrev?: (stepData: Record<string, any>) => void; // onPrev takes stepData as an argument
}
export default function FreeTowingInfo({
                                           onAccept,
                                           goToNext,
                                           onboardingData
                                       }: FreeTowingInfoProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            agreed: false,
            ...onboardingData
        },
    });

    // Submit handler
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (values.agreed) {
            toast.success('You have agreed to the terms.');
            goToNext?.(form.getValues());
        } else {
            toast.error('Please agree to the terms.');
        }
    };

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

                <form onSubmit={form.handleSubmit(onSubmit)} className='mt-6'>
                    <label className='flex items-center space-x-2 space-x-reverse'>
                        <Checkbox
                            id='agree'
                            checked={form.watch('agreed')}
                            onCheckedChange={(value) => form.setValue('agreed', !!value)}
                        />
                        <span className='text-sm'>با تمام قوانین بالا موافقم</span>
                    </label>

                    <div className='flex justify-center mt-10'>
                        <Button
                            disabled={!form.watch('agreed')}
                            className='w-full max-w-[500px]'
                            type='submit'
                        >
                            مرحله بعد
                        </Button>
                    </div>
                </form>
            </section>
        </section>
    );
}
