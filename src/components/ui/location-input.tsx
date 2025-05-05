import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Import JSON data directly
import states from "@/data/states.json";
import cities from "@/data/cities.json";
import {LOCATION_STATE_FIELD} from "@/lib/constant/constants";

interface CityProps {
    id: number;
    name: string;
    enable: true;
    slug: string;
    provinceId: number;
}

interface StateMeProps {
    id: number;
    name: string;
    amarCode: string;
    enable: true;
}

interface LocationSelectorProps {
    disabled?: boolean;
    form: any;
}


const STATE_FIELD = `${LOCATION_STATE_FIELD}.state`;
const CITY_FIELD = `${LOCATION_STATE_FIELD}.city`;

const LocationSelector = ({ disabled, form }: LocationSelectorProps) => {
    const [selectedState, setSelectedState] = useState<StateMeProps | null>(null);
    const [selectedCity, setSelectedCity] = useState<CityProps | null>(null);
    const [openCountryDropdown, setOpenCountryDropdown] = useState(false);
    const [openStateDropdown, setOpenStateDropdown] = useState(false);

    // Cast imported JSON data to their respective types
    const statesData = states as StateMeProps[];
    const citiesData = cities as CityProps[];

    // Filter cities for selected state
    const availableCities = citiesData.filter(
        (city) => city.provinceId === selectedState?.id
    );

    const handleCountrySelect = (state: StateMeProps | null) => {
        setSelectedState(state);
        setSelectedCity(null); // Reset city when state changes
        form.setValue(STATE_FIELD, state?.name || ""); // Update form value for state dynamically
        form.clearErrors(STATE_FIELD); // Clear state error dynamically
        form.trigger(STATE_FIELD); // Re-validate state field dynamically
    };

    const handleStateSelect = (city: CityProps | null) => {
        setSelectedCity(city);
        form.setValue(CITY_FIELD, city?.name || ""); // Update form value for city dynamically
        form.clearErrors(CITY_FIELD); // Clear city error dynamically
        form.trigger(CITY_FIELD); // Re-validate city field dynamically
    };

    return (
        <div className="max-lg:flex-col flex gap-4">
            {/* State Selector */}
            <FormField
                control={form.control}
                name={STATE_FIELD} // Use dynamic field name
                render={({ field }) => (
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
                                                <span>{selectedState.name}</span>
                                            </div>
                                        ) : (
                                            <span>انتخاب استان...</span>
                                        )}
                                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                        <CommandInput placeholder="جستجو" />
                                        <CommandList>
                                            <CommandEmpty>استانی یافت نشد</CommandEmpty>
                                            <CommandGroup>
                                                <ScrollArea className="h-[280px]">
                                                    {statesData.map((state) => (
                                                        <CommandItem
                                                            key={state.id}
                                                            value={state.name}
                                                            onSelect={() => {
                                                                handleCountrySelect(state);
                                                                setOpenCountryDropdown(false);
                                                            }}
                                                            className="flex cursor-pointer items-center justify-between text-sm"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span>{state.name}</span>
                                                            </div>
                                                            <Check
                                                                className={cn(
                                                                    "h-4 w-4",
                                                                    selectedState?.id === state.id
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                    <ScrollBar orientation="vertical" />
                                                </ScrollArea>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* City Selector */}
            { (
                <FormField
                    control={form.control}
                    name={CITY_FIELD} // Use dynamic field name
                    render={({ field }) => (
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
                                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0">
                                        <Command>
                                            <CommandInput placeholder="جستجو" />
                                            <CommandList>
                                                <CommandEmpty>شهر یافت نشد</CommandEmpty>
                                                <CommandGroup>
                                                    <ScrollArea className="h-[280px]">
                                                        {availableCities.map((city) => (
                                                            <CommandItem
                                                                key={city.id}
                                                                value={city.name}
                                                                onSelect={() => {
                                                                    handleStateSelect(city);
                                                                    setOpenStateDropdown(false);
                                                                }}
                                                                className="flex cursor-pointer items-center justify-between text-sm"
                                                            >
                                                                <span>{city.name}</span>
                                                                <Check
                                                                    className={cn(
                                                                        "h-4 w-4",
                                                                        selectedCity?.id === city.id
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                        <ScrollBar orientation="vertical" />
                                                    </ScrollArea>
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
        </div>
    );
};

export default LocationSelector;
