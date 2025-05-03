"use client"
import {
    useState
} from "react"
import {
    toast
} from "sonner"
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    cn
} from "@/lib/utils"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Input
} from "@/components/ui/input"
import {
    format
} from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import {
    Calendar
} from "@/components/ui/calendar"
import {
    Calendar as CalendarIcon
} from "lucide-react"

import LocationSelector from "@/components/ui/location-input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {PhoneInputComponent} from "@/components/ui/phone-input-component";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {CustomInput} from "@/components/ManualBimeRegister";
import {carColors} from "@/utils/navigations-and_other_sets";
import {InputPlate} from "@/components/ui/input-plate";
import {AzadInputPlate} from "@/components/ui/azad-input-plate";

const formSchema = z.object({

    pelak: z.object({
        leftNumber: z.string(),
        letter: z.string(),
        rightNumber: z.string(),
        iranNumber: z.string(),
    }).refine((data) => {
        return (
            /^\d{2}$/.test(data.leftNumber) &&
            /^[\u0600-\u06FFa-zA-Z]+$/.test(data.letter) && // Allow Farsi or Latin letters
            /^\d{3}$/.test(data.rightNumber) &&
            /^\d{2}$/.test(data.iranNumber)
        );
    }, {
        message: "Please fill all pelak fields correctly.",
        path: [],
    }),

    name: z.string().min(1),
    last_name: z.string().min(1),
    national_number: z.string().min(1),
    birthdate: z.coerce.date(),
    mobile_number: z.string(),
    brand: z.tuple([z.string(), z.string().optional()]),
    car_color: z.string(),
    vin_number: z.string().min(1),
    bime_thaleth: z.string().min(1),
    bime_thaleth_expire: z.coerce.date(),
    'location-state': z.tuple([z.string(), z.string().optional()]),
    coverageAmount: z.string()
});

function ChangablePelaktoAzad(props: {
    form: any
}) {
    return <>
        {/*<section className="flex items-center gap-2 mr-2"><span>نوع پلاک:</span><span*/}
        {/*    className="bg-[whitesmoke] text-black rounded-md p-1 border border-[gray] cursor-pointer">پلاک عادی</span><span*/}
        {/*    className="bg-red text-white rounded-md border p-1 border-[gray] cursor-pointer">پلاک مناطق آزاد</span>*/}
        {/*</section>*/}
        <div className="col-span-4">
            <FormField
                control={props.form.control}
                name="pelak"

                render={({field}) => (
                    <FormItem>
                        <FormLabel>Plate Number</FormLabel>
                        <FormControl>
                            <InputPlate value={field.value} onChange={field.onChange}/>


                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
        {/*<div className="col-span-4">*/}
        {/*    <FormField*/}
        {/*        control={props.form.control}*/}
        {/*        name="pelakazad"*/}

        {/*        render={({field}) => (*/}
        {/*            <FormItem>*/}
        {/*                <FormLabel>azad Plate Number</FormLabel>*/}
        {/*                <FormControl>*/}
        {/*                    <AzadInputPlate value={field.value} onChange={field.onChange}/>*/}


        {/*                </FormControl>*/}
        {/*                <FormMessage/>*/}
        {/*            </FormItem>*/}
        {/*        )}*/}
        {/*    />*/}
        {/*</div>*/}
    </>;
}

export default function ManualBimeRegister() {

    const [stateName, setStateName] = useState<string>('')
    const [cityName, setCityName] = useState<string>('')


    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "birthdate": new Date(),
            "bime_thaleth_expire": new Date()
        },
    })

    function onSubmit(values: z.infer < typeof formSchema > ) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>نام</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="نام را وارد کنید"

                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>نام خانوادگی</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="نام خانوادگی را وارد کنید"

                                            type=""
                                            {...field} />
                                    </FormControl>
                                    {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="national_number"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>کد ملی</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="کد ملی را وارد کنید"

                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="birthdate"
                            render={({field}) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>تاریخ تولد</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {/*<FormDescription>Your date of birth is used to calculate your age.</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-6">

                        <FormField
                            control={form.control}
                            name="mobileNumber"
                            render={({field}) => (
                                <FormItem className="flex flex-col items-start">
                                    <FormLabel>mobileNumber</FormLabel>
                                    <FormControl className="w-full">
                                        <PhoneInputComponent
                                            placeholder="Placeholder"
                                            {...field}
                                            defaultCountry="IR"
                                            countries={["IR"]} // restricts to only IR
                                            international={false}
                                        />
                                    </FormControl>
                                    {/*<FormDescription>Enter your mobile Number.</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>

                </div>

                <FormField
                    control={form.control}
                    name="brand"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>برند</FormLabel>
                            <FormControl>
                                <LocationSelector
                                    onCountryChange={(state) => {
                                        setStateName(state?.title || '')
                                        form.setValue(field.name, [state?.title || '', stateName || ''])
                                    }}
                                    onStateChange={(city) => {
                                        setCityName(city?.title || '')
                                        form.setValue(field.name, [form.getValues(field.name)[0] || '', city?.title || ''])
                                    }}
                                />
                            </FormControl><FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-12 gap-4">

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="car_color"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>رنگ</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="رنگ خودرو را انتخاب کنید"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {carColors.map((color) => (
                                                <SelectItem key={color.value} value={color.value}>
                                                    {color.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>


                    <ChangablePelaktoAzad form={form} />

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="vin_number"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>شماره VIN</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="شماره Vin را وارد کنید"

                                            type=""
                                            {...field} />
                                    </FormControl>
                                    {/*<FormDescription>This is your public display name.</FormDescription>*/}
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="col-span-4">

                        <FormField
                            control={form.control}
                            name="bime_thaleth"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>شماره بیمه ثالث</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="شماره بیمه ثالث را وارد کنید"

                                            type=""
                                            {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                </div>

                <FormField
                    control={form.control}
                    name="bime_thaleth_expire"

                    render={({field}) => (
                        <FormItem>
                            <FormLabel>تاریخ انقضای بیمه ثالث</FormLabel>
                            <FormControl>
                                <div className="flex w-full flex-col gap-[2px]  text-sm xl:col-span-2">


                                    <DatePicker
                                        value={field.value || ""}
                                        onChange={(date) => {
                                            // console.log({"date":date.format?.("YYYY-MM-D")})
                                            // field.onChange(date?.isValid ? date : "");
                                        }}
                                        format={"YYYY/MM/DD"}
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="bottom-right"
                                        render={<CustomInput/>}

                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="location-state"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Select Country</FormLabel>
                            <FormControl>
                                <LocationSelector
                                    onCountryChange={(state) => {
                                        setStateName(state?.title || '')
                                        form.setValue(field.name, [state?.title || '', stateName || ''])
                                    }}
                                    onStateChange={(city) => {
                                        setCityName(city?.title || '')
                                        form.setValue(field.name, [form.getValues(field.name)[0] || '', city?.title || ''])
                                    }}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="coverageAmount"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Coverage Amount</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="coverageAmount"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Array.from({length: 25}, (_, i) => {
                                        const value = (i + 1) * 1000000;
                                        const label = value.toLocaleString();
                                        return (
                                            <SelectItem key={value} value={value.toString()}>
                                                {label}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}