import { z } from 'zod';
import {FIELDS} from "@/lib/constants";

export const phoneSchema = z.object({
    [FIELDS.MOBILE]: z
        .string()
        .min(10, 'شماره موبایل معتبر نیست')

});
export type PhoneInputInfer = z.infer<typeof phoneSchema>;

export const otpSchema = z.object({
     [FIELDS.MOBILE]: z.string(),
    [FIELDS.OTP]: z.string().min(4, 'کد کوتاه است').max(6, 'کد بلند است')
});

export type OtpInputInfer = z.infer<typeof otpSchema>;



export const FormDataSchema = z.object({
    [FIELDS.MOBILE]: z.string().nonempty('mobile is required.'),

})

export type Inputs = z.infer<typeof FormDataSchema>