import {RadioGroup} from '@headlessui/react'
import {CheckCircleIcon} from '@heroicons/react/20/solid'
import {cn} from "@/lib/utils";

const optionsLists = [
    {value:"manual",id: 1, title: 'ثبت‌نام دستی', description: 'ثبت نام بصورت دستی بدون استعلام', price: 'رایگان'},
    {value:"markazi",
        id: 2,
        title: 'ثبت‌نام به کمک استعلام بیمه مرکزی',
        description: 'ثبت‌نام با کمک استعلام از بیمه مرکزی -هزینه دارد-',
        price: '5000 تومان'
    },
]

export default function RadioGroupsCard({value, onChange}) {
    return (
        <RadioGroup value={value} onChange={onChange}>
            <RadioGroup.Label className="text-center text-base font-semibold leading-6 text-gray-900 mb-2 block">
                نحوه ثبت نام را انتخاب کنید:
            </RadioGroup.Label>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4" dir="rtl">
                {optionsLists.map((option) => (
                    <RadioGroup.Option
                        key={option.id}
                        value={option.value}
                        className={({checked, active}) =>
                            cn(
                                checked ? 'border-transparent' : 'border-gray-300',
                                active ? 'border-brand ring-2 ring-brand' : '',
                                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none'
                            )
                        }
                    >
                        {({checked, active}) => (
                            <>
                <span className="flex flex-1">
                  <span className="flex flex-col text-right">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      {option.title}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="mt-1 text-sm text-gray-500">
                      {option.description}
                    </RadioGroup.Description>
                    <RadioGroup.Description as="span" className="mt-6 text-sm font-medium text-gray-900">
                      {option.price}
                    </RadioGroup.Description>
                  </span>
                </span>
                                <CheckCircleIcon
                                    className={cn(!checked ? 'invisible' : '', 'h-5 w-5 text-brand')}
                                    aria-hidden="true"
                                />
                                <span
                                    className={cn(
                                        active ? 'border' : 'border-2',
                                        checked ? 'border-brand' : 'border-transparent',
                                        'pointer-events-none absolute -inset-px rounded-lg'
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
}
