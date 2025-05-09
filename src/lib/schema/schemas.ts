import {z} from 'zod';
import {DateObject} from "react-multi-date-picker";
import {FIELDS} from "@/lib/constant/constants";


// Constants for form field names
export const LOCATION_STATE_FIELD = "location-state";
export const STATE = "state"
export const CITY = "city"
export const CAR_DETAIL = "car-detail";
export const CAR_BRAND = "car_brand"
export const CAR_MODEL = "car_model"
export const CAR_YEAR = "car_year"
export const CAR_TYPE = "car_type"
export const PELAK = "pelak"
export const PELAK_TITLE = "pelak-title"
export const VEHICLE_TYPE = 'vehicle-type'
export const PELAK_AZAD = "pelak-azad"
export const PELAK_MOTOR = "pelak-motor"
export const MOTOR_RIGHT_NUMBER ="motorRightNumber"
export const MOTOR_LEFT_NUMBER ="motorLeftNumber"
export const AZAD_OR_NORMAL = "azadOrNormal"
export const MOTORCYCLE = "motorcycle"
export const SAVARI = "savari"


export const FieldsSchemaForMarkazi = z.object({
    name: z.string({
        required_error: "نام الزامی است.",
    }).min(1, "نام الزامی است."),

    last_name: z.string({
        required_error: "نام خانوادگی الزامی است.",
    }).min(1, "نام خانوادگی الزامی است."),

    national_number: z.string({
        required_error: "کد ملی الزامی است.",
    }).min(1, "کد ملی الزامی است."),

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
    mobile_number: z.string({
        required_error: "شماره موبایل الزامی است.",
    }).min(1, "شماره موبایل الزامی است."),


    [LOCATION_STATE_FIELD]: z.object({
        [STATE]: z.string({
            required_error: "استان الزامی است.",
        }).min(1, "استان الزامی است."),

        [CITY]: z.string({
            required_error: "شهر الزامی است.",
        }).min(1, "شهر الزامی است."),
    }),
    //
    [PELAK]: getZodPelak(),

    coverageAmount: z.string({
        required_error: "مقدار پوشش الزامی است.",
    }).nonempty("مقدار پوشش الزامی است."),
});


const sharedFieldsForManual = z.object({
    name: z.string({
        required_error: "نام الزامی است.",
    }).min(1, "نام الزامی است."),

    last_name: z.string({
        required_error: "نام خانوادگی الزامی است.",
    }).min(1, "نام خانوادگی الزامی است."),

    national_number: z.string({
        required_error: "کد ملی الزامی است.",
    }).min(1, "کد ملی الزامی است."),

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


    mobile_number: z.string({
        required_error: "شماره موبایل الزامی است.",
    }).min(1, "شماره موبایل الزامی است."),

    car_color: z.string({
        required_error: "رنگ خودرو الزامی است.",
    }).min(1, "رنگ خودرو الزامی است."),

    vin_number: z.string({
        required_error: "VIN الزامی است.",
    }).min(1, "VIN الزامی است."),

    bime_thaleth: z.string({
        required_error: "شماره بیمه ثالث الزامی است.",
    }).min(1, "شماره بیمه ثالث الزامی است."),

    bime_thaleth_expire: z.preprocess(
        (val) => {
            if (val instanceof DateObject) {
                return val.toDate();
            }
            return val;
        },
        z
            .date({
                required_error: "تاریخ انقضای بیمه الزامی است",
                invalid_type_error: "تاریخ انقضای بیمه معتبر نیست.",
            })
    ),

    [LOCATION_STATE_FIELD]: z.object({
        [STATE]: z.string({
            required_error: "استان الزامی است.",
        }).min(1, "استان الزامی است."),

        [CITY]: z.string({
            required_error: "شهر الزامی است.",
        }).min(1, "شهر الزامی است."),
    }),

    [CAR_DETAIL]: z.object({
        [CAR_BRAND]: z.string({
            required_error: "برند خودرو الزامی است.",
        }).nonempty("برند خودرو الزامی است."),

        [CAR_MODEL]: z.string({
            required_error: "مدل خودرو الزامی است.",
        }).nonempty("مدل خودرو الزامی است."),

        [CAR_YEAR]: z.number({
            required_error: "سال تولید الزامی است.",
            invalid_type_error: "سال باید عدد باشد.",
        }),

        [CAR_TYPE]: z.string({
            required_error: "نوع خودرو الزامی است.",
        }).nonempty("نوع خودرو الزامی است."),
    }),

    coverageAmount: z.string({
        required_error: "مقدار پوشش الزامی است.",
    }).nonempty("مقدار پوشش الزامی است."),
});

function getZodPelak() {
    return z.preprocess((val) => {
            console.log({val})
            return val ?? {
                leftNumber: "",
                letter: "",
                rightNumber: "",
                iranNumber: "",
            };
        },
        z.object({
            leftNumber: z.string(),
            letter: z.string(),
            rightNumber: z.string(),
            iranNumber: z.string(),
        })
            .refine((data) => {
                return (
                    /^\d{2}$/.test(data.leftNumber) &&
                    /^[\u0600-\u06FFa-zA-Z]+$/.test(data.letter) &&
                    /^\d{3}$/.test(data.rightNumber) &&
                    /^\d{2}$/.test(data.iranNumber)
                );
            }, {
                message: "لطفا همه فیلدهای پلاک را بدرستی وارد نمایید.",
                path: [],
            }));
}

// پلاک عادی
const normalPlateSchema = sharedFieldsForManual.extend({
    azadOrNormal: z.literal(false),
    [PELAK]: getZodPelak(),
    [PELAK_AZAD]: z.undefined().optional(),
});


function getZodMotorPelak() {
    return z.preprocess(
        (val) => {
            console.log({val})
            return val ?? {
                [MOTOR_LEFT_NUMBER]: "",
                [MOTOR_RIGHT_NUMBER]: "",
            };
        },
        z
            .object({
                [MOTOR_LEFT_NUMBER]: z.string(),
                [MOTOR_RIGHT_NUMBER]: z.string(),
            })
            .refine((data) => {
                console.log({data})
                return (
                    /^\d{3}$/.test(data[MOTOR_LEFT_NUMBER]) &&
                    /^\d{5}$/.test(data[MOTOR_RIGHT_NUMBER])
                );
            }, {
                message: "لطفا همه فیلدهای پلاک را بدرستی وارد نمایید.",
                path: [],
            })
    );
}



function getZodAzadPelak() {
    return z.preprocess((val) => {
            console.log({val})
            return val ?? {
                azadleftNumber: "",
                azadrightNumber: "",

            };
        },
        z.object({
            azadleftNumber: z.string(),
            azadrightNumber: z.string(),

        })
            .refine((data) => {
                return (
                    /^\d{5}$/.test(data.azadleftNumber) &&

                    /^\d{2}$/.test(data.azadrightNumber)

                );
            }, {
                message: "لطفا همه فیلدهای پلاک را بدرستی وارد نمایید.",
                path: [],
            }));
}

// پلاک مناطق آزاد
const azadPlateSchema = sharedFieldsForManual.extend({
    azadOrNormal: z.literal(true),
    [PELAK_AZAD]:
        getZodAzadPelak(),


    [PELAK]: z.undefined().optional(),
});

// ترکیب نهایی با توجه به نوع پلاک
export const ManualRegisterformSchema = z.discriminatedUnion("azadOrNormal", [
    normalPlateSchema,
    azadPlateSchema,
]);

//  اسکیما برای سواری
const savariPlateSchema = z.object({
    [VEHICLE_TYPE]: z.literal(SAVARI),
    [PELAK_TITLE]: z.string({
        required_error: "عنوان پلاک الزامی است.",
    }).min(1, { message: "عنوان پلاک نمی‌تواند خالی باشد." }),
    [PELAK]: getZodPelak(),
});

//  اسکیما برای موتور
const motorPlateSchema = z.object({
    [VEHICLE_TYPE]: z.literal(MOTORCYCLE),
    // [PELAK_TITLE]: z.string({
    //     required_error: "عنوان پلاک الزامی است.",
    // }).min(1, { message: "عنوان پلاک نمی‌تواند خالی باشد." }),
    [PELAK_MOTOR]: getZodMotorPelak(),
});

//  اسکیما نهایی
export const AddPlateSchema = z.discriminatedUnion(VEHICLE_TYPE, [
    savariPlateSchema,
    motorPlateSchema,
]);

function getZodPhoneValidation() {
    return z.preprocess(
        (val) => {
            if (typeof val === 'string') {
                // تبدیل فارسی به انگلیسی و حذف نویسه‌های غیرعددی
                const cleaned = val
                    .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728))
                    .replace(/\D/g, '')

                // اگر با 9 شروع بشه، 09 اضافه کن
                if (cleaned.length === 10 && cleaned.startsWith('9')) {
                    return '0' + cleaned
                }

                return cleaned
            }
            return val
        },
        z.string({required_error: 'شماره موبایل الزامی است'})
            .nonempty('شماره موبایل را وارد کنید')
            .regex(/^09\d{9}$/, 'شماره موبایل نامعتبر است')
    );
}

export const phoneSchema = z.object({
    [FIELDS.MOBILE]: getZodPhoneValidation()
})
export type PhoneInputInfer = z.infer<typeof phoneSchema>;

export const otpSchema = z.object({
    [FIELDS.MOBILE]: getZodPhoneValidation(),
    [FIELDS.OTP]: z.string({required_error: 'کد ارسالی الزامی است'}).min(4, 'کد کوتاه است').max(6, 'کد بلند است')
        .nonempty('کد ارسالی را وارد کنید')
        .regex(/^\d{5}$/, 'کد ارسالی نامعتبر است')
});
export type OtpInputInfer = z.infer<typeof otpSchema>;