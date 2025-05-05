import React, {useState} from "react"
import {Check, ChevronsUpDown} from "lucide-react"
import {Button} from "@/components/ui/button"
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {cn} from "@/lib/utils"

// Import JSON data directly
import states from "@/data/states.json"
import cities from "@/data/cities.json"
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

interface Timezone {
    zoneName: string
    gmtOffset: number
    gmtOffsetName: string
    abbreviation: string
    tzName: string
}

interface CityProps {
    "id": number,
    "name": string,
    "enable": true,
    "slug": string,
    "provinceId": number
}

interface StateMeProps {
    "id": number,
    "name": string,
    "amarCode": string,
    "enable": true
}

interface LocationSelectorProps {
    disabled?: boolean

    form: any
}

const LocationSelector = ({
                              disabled,
                              onCountryChange,
                              onStateChange,
                              form
                          }: LocationSelectorProps) => {
    const [selectedState, setSelectedState] = useState<StateMeProps | null>(
        null,
    )
    const [selectedCity, setSelectedCity] = useState<CityProps | null>(null)
    const [openCountryDropdown, setOpenCountryDropdown] = useState(false)
    const [openStateDropdown, setOpenStateDropdown] = useState(false)

    // Cast imported JSON data to their respective types
    const statesData = states as StateMeProps[]
    const citiesData = cities as CityProps[]

    // Filter states for selected country
    const availableCities = citiesData.filter(
        (city) => city.provinceId === selectedState?.id,
    )

    onStateChange={(city) => {
        setCityName(city?.title || '');
        form.setValue(field.name, [form.getValues(field.name)[0] || '', city?.title || '']);
    }}
    const handleCountrySelect = (country: StateMeProps | null) => {
        setSelectedState(country)
        setSelectedCity(null) // Reset state when country changes
        onCountryChange?.{(state) => {
            setStateName(state?.title || '');
            form.setValue(field.name, [state?.title || '', stateName || '']);
        }}
        onStateChange?.(null)
    }

    const handleStateSelect = (state: CityProps | null) => {
        setSelectedCity(state)
        onStateChange?.(state)
    }

    return (
        <div className="flex gap-4">
            {/* Country Selector */}
            {/* ostan Selection */}
            <FormField
                control={form.control}
                name="location-state"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>انتخاب استان</FormLabel>
                        <FormControl>
                            <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openCountryDropdown}
                                        disabled={disabled}
                                        className="w-full justify-between"
                                    >
                                        {selectedState ? (
                                            <div className="flex items-center gap-2">
                                                {/*<span>{selectedState.emoji}</span>*/}
                                                <span>{selectedState.name}</span>
                                            </div>
                                        ) : (
                                            <span>انتخاب استان...</span>
                                        )}
                                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                        <CommandInput placeholder="جستجو"/>
                                        <CommandList>
                                            <CommandEmpty>استانی یافت نشد</CommandEmpty>
                                            <CommandGroup>
                                                <ScrollArea className="h-[280px]">
                                                    {statesData.map((state) => (
                                                        <CommandItem
                                                            key={state.id}
                                                            value={state.name}
                                                            onSelect={() => {
                                                                handleCountrySelect(state)
                                                                setOpenCountryDropdown(false)
                                                            }}
                                                            className="flex cursor-pointer items-center justify-between text-sm"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {/*<span>{state.emoji}</span>*/}
                                                                <span>{state.name}</span>
                                                            </div>
                                                            <Check
                                                                className={cn(
                                                                    "'h-4 w-4'",
                                                                    selectedState?.id === state.id
                                                                        ? "'opacity-100'"
                                                                        : "'opacity-0'",
                                                                )}
                                                            />


                                                        </CommandItem>
                                                    ))}
                                                    <ScrollBar orientation="vertical"/>
                                                </ScrollArea>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>


                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            {/* State Selector - Only shown if selected country has states */}
            {(<FormField
                    control={form.control}
                    name="location-city"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>انتخاب شهر</FormLabel>
                            <FormControl>
                                <Popover open={openStateDropdown} onOpenChange={setOpenStateDropdown}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openStateDropdown}
                                            disabled={!selectedState}
                                            className="w-full justify-between"
                                        >
                                            {selectedCity ? (
                                                <span>{selectedCity.name}</span>
                                            ) : (
                                                <span>انتخاب شهر</span>
                                            )}
                                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50"/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search state..."/>
                                            <CommandList>
                                                <CommandEmpty>No state found.</CommandEmpty>
                                                <CommandGroup>
                                                    <ScrollArea className="h-[280px]">
                                                        {availableCities.map((state) => (
                                                            <CommandItem
                                                                key={state.id}
                                                                value={state.name}
                                                                onSelect={() => {
                                                                    handleStateSelect(state)
                                                                    setOpenStateDropdown(false)
                                                                }}
                                                                className="flex cursor-pointer items-center justify-between text-sm"
                                                            >
                                                                <span>{state.name}</span>
                                                                <Check
                                                                    className={cn(
                                                                        "'h-4 w-4'",
                                                                        selectedCity?.id === state.id
                                                                            ? "'opacity-100'"
                                                                            : "'opacity-0'",
                                                                    )}
                                                                />


                                                            </CommandItem>
                                                        ))}
                                                        <ScrollBar orientation="vertical"/>
                                                    </ScrollArea>
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            )}

        </div>
    )
}

export default LocationSelector
