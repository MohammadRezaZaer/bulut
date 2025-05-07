import { z } from 'zod';
import {
    CAR_BRAND,
    CAR_DETAIL,
    CAR_MODEL,
    CAR_TYPE,
    CAR_YEAR,
    CITY,
    LOCATION_STATE_FIELD,
    PELAK,
    PELAK_AZAD,
    STATE
} from "@/lib/constant/constants";
import {DateObject} from "react-multi-date-picker";

// Shared fields schema
const sharedFields = z.object({
    // name: z.string({
    //     required_error: "نام الزامی است.",
    // }).min(1, "نام الزامی است."),
    //
    // last_name: z.string({
    //     required_error: "نام خانوادگی الزامی است.",
    // }).min(1, "نام خانوادگی الزامی است."),
    //
    // national_number: z.string({
    //     required_error: "کد ملی الزامی است.",
    // }).min(1, "کد ملی الزامی است."),

    birthdate: z.preprocess(
        (val) => {
            if (val instanceof DateObject) {
                return val.toDate();
            }
            return val;
        },
        z
            .date({
                required_error: "تاریخ تولد الزامی است.",
                invalid_type_error: "فرمت تاریخ اشتباه است.",
            })
    ),

    //
    // mobile_number: z.string({
    //     required_error: "شماره موبایل الزامی است.",
    // }).min(1, "شماره موبایل الزامی است."),
    //
    // car_color: z.string({
    //     required_error: "رنگ خودرو الزامی است.",
    // }).min(1, "رنگ خودرو الزامی است."),
    //
    // vin_number: z.string({
    //     required_error: "VIN الزامی است.",
    // }).min(1, "VIN الزامی است."),
    //
    // bime_thaleth: z.string({
    //     required_error: "شماره بیمه ثالث الزامی است.",
    // }).min(1, "شماره بیمه ثالث الزامی است."),
    //
    // bime_thaleth_expire: z.coerce.date({
    //     required_error: "تاریخ انقضای بیمه الزامی است.",
    //     invalid_type_error: "تاریخ انقضای بیمه معتبر نیست.",
    // }),
    //
    // [LOCATION_STATE_FIELD]: z.object({
    //     [STATE]: z.string({
    //         required_error: "استان الزامی است.",
    //     }).min(1, "استان الزامی است."),
    //
    //     [CITY]: z.string({
    //         required_error: "شهر الزامی است.",
    //     }).min(1, "شهر الزامی است."),
    // }),
    //
    // [CAR_DETAIL]: z.object({
    //     [CAR_BRAND]: z.string({
    //         required_error: "برند خودرو الزامی است.",
    //     }).nonempty("برند خودرو الزامی است."),
    //
    //     [CAR_MODEL]: z.string({
    //         required_error: "مدل خودرو الزامی است.",
    //     }).nonempty("مدل خودرو الزامی است."),
    //
    //     [CAR_YEAR]: z.number({
    //         required_error: "سال تولید الزامی است.",
    //         invalid_type_error: "سال باید عدد باشد.",
    //     }),
    //
    //     [CAR_TYPE]: z.string({
    //         required_error: "نوع خودرو الزامی است.",
    //     }).nonempty("نوع خودرو الزامی است."),
    // }),
    //
    // coverageAmount: z.string({
    //     required_error: "مقدار پوشش الزامی است.",
    // }).nonempty("مقدار پوشش الزامی است."),
});

// پلاک عادی
const normalPlateSchema = sharedFields.extend({
    azadOrNormal: z.literal(false),
    // [PELAK]: z.object({
    //     leftNumber: z.string({
    //         required_error: "۲ رقم سمت چپ الزامی است.",
    //     }).regex(/^\d{2}$/, "۲ رقم الزامی است"),
    //
    //     letter: z.string({
    //         required_error: "حرف پلاک الزامی است.",
    //     }).regex(/^[\u0600-\u06FFa-zA-Z]+$/, "حرف پلاک نامعتبر است"),
    //
    //     rightNumber: z.string({
    //         required_error: "۳ رقم سمت راست الزامی است.",
    //     }).regex(/^\d{3}$/, "۳ رقم الزامی است"),
    //
    //     iranNumber: z.string({
    //         required_error: "عدد ایران الزامی است.",
    //     }).regex(/^\d{2}$/, "۲ رقم الزامی است"),
    // }),
    // [PELAK_AZAD]: z.undefined().optional(),
});

// پلاک مناطق آزاد
const azadPlateSchema = sharedFields.extend({
    azadOrNormal: z.literal(true),
    [PELAK_AZAD]: z.object({
        azadleftNumber: z.string({
            required_error: "۵ رقم سمت چپ الزامی است.",
        }).regex(/^\d{5}$/, "۵ رقم الزامی است"),

        azadrightNumber: z.string({
            required_error: "۲ رقم سمت راست الزامی است.",
        }).regex(/^\d{2}$/, "۲ رقم الزامی است"),
    }),
    [PELAK]: z.undefined().optional(),
});

// ترکیب نهایی با توجه به نوع پلاک
export const formSchema = z.discriminatedUnion("azadOrNormal", [
    normalPlateSchema,
    azadPlateSchema,
]);
