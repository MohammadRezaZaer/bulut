import { z } from 'zod';
import {FIELDS} from "@/lib/constant/constants";
import {DateObject} from "react-multi-date-picker";

export const phoneSchema =
    z.object({
    [FIELDS.MOBILE]: z
        .string()
        // .regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است'),

});

    // z.preprocess(
    //     (val) => {
    //         if (typeof val === 'string') {
    //             let cleaned = val.trim()
    //
    //             // اگر با +98 شروع شد، تبدیل به 0
    //             if (cleaned.startsWith('+98')) {
    //                 cleaned = '0' + cleaned.slice(3)
    //             }
    //
    //             // اگر با 0098 شروع شد، تبدیل به 0
    //             if (cleaned.startsWith('0098')) {
    //                 cleaned = '0' + cleaned.slice(4)
    //             }
    //
    //             // حذف فاصله‌ها و نویسه‌های اضافی
    //             return cleaned.replace(/\s/g, '')
    //         }
    //         return val
    //     },
    //     z.string().regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است')
    // )

export type PhoneInputInfer = z.infer<typeof phoneSchema>;

export const otpSchema = z.object({
    [FIELDS.MOBILE]: z
        .string()
        .regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است'),
    [FIELDS.OTP]: z.string().min(4, 'کد کوتاه است').max(6, 'کد بلند است')
});
// export const otpSchema = z.object({
//     [FIELDS.MOBILE]: z
//         .string()
//         .regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است'),
//     [FIELDS.OTP]: z
//         .string()
//         .regex(/^\d{4}$/, 'کد باید دقیقا ۴ رقم باشد'),
// });


export type OtpInputInfer = z.infer<typeof otpSchema>;



export const FormDataSchema = z.object({
    [FIELDS.MOBILE]: z.string().nonempty('mobile is required.'),

})

export type Inputs = z.infer<typeof FormDataSchema>