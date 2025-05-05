"use client"
import {useState} from "react"
import {toast} from "sonner"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import DatePicker from "react-multi-date-picker";
import {Check, ChevronsUpDown} from "lucide-react"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import LocationSelector from "@/components/ui/location-input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {PhoneInputComponent} from "@/components/ui/phone-input-component";

import {InputPlate} from "@/components/ui/input-plate";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";
import {Input} from "@/components/ui/input";


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


    tavalod: z.coerce.date(),
    'location-state': z.tuple([z.string(), z.string().optional()])


});

export default function ManualBimeRegister() {
    const languages = [{
        label: "English",
        value: "en"
    },
        {
            label: "French",
            value: "fr"
        },

    ] as
        const;

    const [stateName, setStateName] = useState<string>('')
    const [cityName, setCityName] = useState<string>('')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "tavalod": new Date(),
            pelak: {
                leftNumber: "",
                letter: "",
                rightNumber: "",
                iranNumber: "",
            },
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
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

    console.log("Form state", form.watch());
    console.log("Errors", form.formState.errors);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">


                <FormField
                    control={form.control}
                    name="pelak"
                    rules={{
                        validate: (value) => {
                            // console.log({value})
                            // const regex = /^\d{2}.{1}\d{3}\d{2}$/
                            // if (!regex.test(value)) return "Please fill out all plate fields correctly."
                            // return true
                        }
                    }}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Plate Number</FormLabel>
                            <FormControl>
                                <InputPlate value={field.value} onChange={field.onChange}/>


                            </FormControl>
                            <FormDescription>Please enter the one-time password sent to your phone.</FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tavalod"
                    rules={{
                        validate: (value) => {
                            console.log({value})
                            // const regex = /^\d{2}.{1}\d{3}\d{2}$/
                            // if (!regex.test(value)) return "Please fill out all plate fields correctly."
                            // return true
                        }
                    }}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>tavalod</FormLabel>
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
                            <FormDescription>Please enter the one-time password sent to your phone.</FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="location-state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>انتخاب استان</FormLabel>
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
                            <FormDescription>If your country has states, it will be appear after selecting country</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="coverageAmount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Coverage Amount</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="coverageAmount" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Array.from({ length: 25 }, (_, i) => {
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
                            <FormDescription>coverageAmount</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />



                <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
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
                            <FormDescription>Enter your mobile Number.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export function CustomInput({onFocus, value, onChange}) {


    const toEnglishDigits = (str: string) =>
        str.replace(/[\u06F0-\u06F9]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728))
            .replace(/[\u0660-\u0669]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1584));


    // console.log({val: value.toString()})

    let raw = toEnglishDigits(value.toString());

    const [year = "", month = "", day = ""] = raw.split("/");
    if (raw.length > 8) raw = raw.slice(0, 8);

    const formatted = [
        year.slice(0, 4),
        month.slice(0, 2),
        day.slice(0, 2),
    ]
        .filter(Boolean)
        .join("/");


    // console.log({raw,formatted,value})
    return (
        <Input
            onFocus={onFocus}
            value={formatted}
            onChange={onChange}
        />
    )
}
