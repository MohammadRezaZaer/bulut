import React, { useEffect, useState } from "react";
import Select from "react-select";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Import JSON data directly
import states from "@/data/states.json";
import cities from "@/data/cities.json";

import { LOCATION_STATE_FIELD } from "@/lib/schema/schemas";
import {getReactSelectClassNames} from "@/components/ui/car-brand-selector";

// Define types for state and city
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

    // Cast imported JSON data to their respective types
    const statesData = states as StateMeProps[];
    const citiesData = cities as CityProps[];

    // Filter cities for selected state
    const availableCities = citiesData.filter(
        (city) => city.provinceId === selectedState?.id
    );

    // useEffect to initialize the selected values from the form
    useEffect(() => {
        const locationState = form.getValues(LOCATION_STATE_FIELD); // Get current state and city from the form
        const currentState = locationState?.state || null;
        const currentCity = locationState?.city || null;

        if (currentState) {
            // Set the selected state if it exists in the form values
            const state = statesData.find((s) => s.name === currentState);
            setSelectedState(state || null);
        }

        if (currentCity) {
            // Set the selected city if it exists in the form values
            const city = citiesData.find((c) => c.name === currentCity);
            setSelectedCity(city || null);
        }
    }, [form]); // Re-run this effect when the form state changes

    // Handle state change and update form value
    const handleCountrySelect = (state: StateMeProps | null) => {
        setSelectedState(state);
        setSelectedCity(null); // Reset city when state changes
        form.setValue(STATE_FIELD, state?.name || ""); // Update form value for state dynamically
        form.clearErrors(STATE_FIELD); // Clear state error dynamically
        form.trigger(STATE_FIELD); // Re-validate state field dynamically
    };

    // Handle city change and update form value
    const handleStateSelect = (city: CityProps | null) => {
        setSelectedCity(city);
        form.setValue(CITY_FIELD, city?.name || ""); // Update form value for city dynamically
        form.clearErrors(CITY_FIELD); // Clear city error dynamically
        form.trigger(CITY_FIELD); // Re-validate city field dynamically
    };

    // Format states data for react-select
    const stateOptions = statesData.map((state) => ({
        value: state.name,
        label: state.name,
        id: state.id,
    }));

    // Format cities data for react-select
    const cityOptions = availableCities.map((city) => ({
        value: city.name,
        label: city.name,
        id: city.id,
    }));

    return (
        <div className="max-lg:flex-col flex gap-4">
            {/* State Selector */}
            <FormField
                control={form.control}
                name={STATE_FIELD}
                render={({ field,fieldState }) => (
                    <FormItem>
                        <FormLabel>انتخاب استان</FormLabel>
                        <FormControl>
                            <Select
                                isDisabled={disabled}
                                options={stateOptions}
                                value={selectedState ? { value: selectedState.name, label: selectedState.name } : null}
                                onChange={(option) => handleCountrySelect(statesData.find(s => s.name === option?.label) || null)}
                                placeholder="انتخاب استان..."
                                className="w-full"
                                getOptionLabel={(e) => e.label}
                                getOptionValue={(e) => e.value}
                                classNames={getReactSelectClassNames(fieldState)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* City Selector */}
            <FormField
                control={form.control}
                name={CITY_FIELD}
                render={({ field,fieldState }) => (
                    <FormItem>
                        <FormLabel>انتخاب شهر</FormLabel>
                        <FormControl>
                            <Select
                                isDisabled={!selectedState || disabled}
                                options={cityOptions}
                                value={selectedCity ? { value: selectedCity.name, label: selectedCity.name } : null}
                                onChange={(option) => handleStateSelect(availableCities.find(c => c.name === option?.label) || null)}
                                placeholder="انتخاب شهر"
                                className="w-full"
                                getOptionLabel={(e) => e.label}
                                getOptionValue={(e) => e.value}
                                classNames={getReactSelectClassNames(fieldState)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};

export default LocationSelector;
