'use client';

import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // (اختیاری) اگر نیاز به ترکیب کلاس‌ها داشتید
import { useRef } from 'react';

type PlateFormValues = {
    leftTwoDigits: string;
    middleLetter: string;
    middleThreeDigits: string;
    rightTwoDigits: string;
};

export default function PlateForm() {
    const { handleSubmit, control, setFocus } = useForm<PlateFormValues>({
        defaultValues: {
            leftTwoDigits: '',
            middleLetter: '',
            middleThreeDigits: '',
            rightTwoDigits: '',
        },
    });

    const onSubmit = (data: PlateFormValues) => {
        console.log('Plate data:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 p-4">
            <div className="flex items-center gap-2 ">

                {/* Iran Flag */}
                <div className="flex flex-col items-center justify-center w-12 h-20 border rounded">
                    <span className="text-xs">I.R.</span>
                    <span className="text-xs">IRAN</span>
                </div>

                {/* Inputs */}
                <Controller
                    name="leftTwoDigits"
                    control={control}
                    rules={{ required: true, minLength: 2, maxLength: 2 }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="23"
                            maxLength={2}
                            className="mr-px w-[22px]"
                            onChange={(e) => {
                                field.onChange(e);
                                if (e.target.value.length >= 2) setFocus('middleLetter');
                            }}
                        />
                    )}
                />

                <Controller
                    name="middleLetter"
                    control={control}
                    rules={{ required: true, minLength: 1, maxLength: 1 }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="الف"
                            maxLength={1}
                            className="w-10 text-center"
                            onChange={(e) => {
                                field.onChange(e);
                                if (e.target.value.length >= 1) setFocus('middleThreeDigits');
                            }}
                        />
                    )}
                />

                <Controller
                    name="middleThreeDigits"
                    control={control}
                    rules={{ required: true, minLength: 3, maxLength: 3 }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="223"
                            maxLength={3}
                            className="w-16 text-center"
                            onChange={(e) => {
                                field.onChange(e);
                                if (e.target.value.length >= 3) setFocus('rightTwoDigits');
                            }}
                        />
                    )}
                />

                <Controller
                    name="rightTwoDigits"
                    control={control}
                    rules={{ required: true, minLength: 2, maxLength: 2 }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder="23"
                            maxLength={2}
                            className="w-14 text-center"
                        />
                    )}
                />

            </div>

            <Button type="submit" className="w-32">ثبت</Button>
        </form>
    );
}
