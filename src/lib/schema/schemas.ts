import { z } from 'zod';
import {
    CAR_BRAND,
    CAR_DETAIL,
    CAR_MODEL, CAR_TYPE, CAR_YEAR,
    CITY,
    LOCATION_STATE_FIELD,
    PELAK,
    PELAK_AZAD,
    STATE
} from "@/lib/constant/constants";



// Shared fields schema
const sharedFields = z.object({
    name: z.string().min(1, "نام الزامی است."),
    last_name: z.string().min(1, "نام خانوادگی الزامی است."),
    national_number: z.string().min(1, "کد ملی الزامی است."),
    birthdate: z.coerce.date({ invalid_type_error: "تاریخ تولد معتبر نیست." }),
    mobile_number: z.string().min(1, "شماره موبایل الزامی است."),
    car_color: z.string().min(1, "رنگ خودرو الزامی است."),
    vin_number: z.string().min(1, "VIN الزامی است."),
    bime_thaleth: z.string().min(1, "شماره بیمه ثالث الزامی است."),
    bime_thaleth_expire: z.coerce.date({ invalid_type_error: "تاریخ انقضای بیمه معتبر نیست." }),

    [LOCATION_STATE_FIELD]: z.object({
        [STATE]: z.string().min(1, "استان الزامی است."),
        [CITY]: z.string().min(1, "شهر الزامی است."),
    }),

    [CAR_DETAIL]: z.object({
        [CAR_BRAND]: z.string().nonempty("برند خودرو الزامی است."),
        [CAR_MODEL]: z.string().nonempty("مدل خودرو الزامی است."),
        [CAR_YEAR]: z.number({ invalid_type_error: "سال باید عدد باشد." }),
        [CAR_TYPE]: z.string().nonempty("نوع خودرو الزامی است."),
    }),

    coverageAmount: z.string().nonempty("مقدار پوشش الزامی است."),
});


// پلاک عادی
const normalPlateSchema = sharedFields.extend({
    azadOrNormal: z.literal(false),
    [PELAK]: z.object({
        leftNumber: z.string().regex(/^\d{2}$/, "۲ رقم الزامی است"),
        letter: z.string().regex(/^[\u0600-\u06FFa-zA-Z]+$/, "حرف پلاک نامعتبر است"),
        rightNumber: z.string().regex(/^\d{3}$/, "۳ رقم الزامی است"),
        iranNumber: z.string().regex(/^\d{2}$/, "۲ رقم الزامی است"),
    }),
    [PELAK_AZAD]: z.undefined().optional(),
});

// پلاک مناطق آزاد
const azadPlateSchema = sharedFields.extend({
    azadOrNormal: z.literal(true),
    [PELAK_AZAD]: z.object({
        azadleftNumber: z.string().regex(/^\d{5}$/, "۵ رقم الزامی است"),
        azadrightNumber: z.string().regex(/^\d{2}$/, "۲ رقم الزامی است"),
    }),
    [PELAK]: z.undefined().optional(),
});


// Combine both using discriminatedUnion
export const formSchema = z.discriminatedUnion("azadOrNormal", [
    normalPlateSchema,
    azadPlateSchema,
]);

