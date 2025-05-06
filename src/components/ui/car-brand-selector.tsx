import React, {useEffect, useState} from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Import JSON data directly
import brands from "@/data/car-brands.json";
import models from "@/data/car-models.json";
import years from "@/data/car-years.json";
import types from "@/data/car-types.json";
import {CAR_BRAND, CAR_DETAIL, CAR_MODEL, CAR_TYPE, CAR_YEAR, LOCATION_STATE_FIELD} from "@/lib/constant/constants";

interface BrandProps {
    id: number;
    name: string;
    brandEnglishName: string;
}

interface ModelProps {
    id: number;
    name: string;
    englishName: string;
    vehicleTypeEnum: null;
    deviceType: string;
    brandId: number;
}

interface YearProps {
    model_id: number;
    years: number[];
}

interface TypeProps {
    id: number;
    carModelId: number;
    year: number;
    name: string;
    englishName: string;
}

interface CarSelectorProps {
    disabled?: boolean;
    form: any;
}

const CarSelector = ({
                         disabled,
                         form,
                     }: CarSelectorProps) => {
    const [selectedBrand, setSelectedBrand] = useState<BrandProps | null>(null);
    const [selectedModel, setSelectedModel] = useState<ModelProps | null>(null);
    const [selectedYear, setSelectedYear] = useState<YearProps | null>(null);
    const [selectedType, setSelectedType] = useState<TypeProps | null>(null);

    const [openBrandDropdown, setOpenBrandDropdown] = useState(false);
    const [openModelDropdown, setOpenModelDropdown] = useState(false);
    const [openYearDropdown, setOpenYearDropdown] = useState(false);
    const [openTypeDropdown, setOpenTypeDropdown] = useState(false);


    const CAR_BRAND_FIELD = `${CAR_DETAIL}.${CAR_BRAND}`;
    const CAR_MODEL_FIELD = `${CAR_DETAIL}.${CAR_MODEL}`;
    const CAR_YEAR_FIELD = `${CAR_DETAIL}.${CAR_YEAR}`;
    const CAR_TYPE_FIELD = `${CAR_DETAIL}.${CAR_TYPE}`;

    useEffect(() => {
        // Get the current car details from the form
        const carDetail = form.getValues(CAR_DETAIL);

        // Check if carDetail exists and has data
        if (carDetail) {
            // Set the selected brand if it exists in carDetail
            if (carDetail[CAR_BRAND]) {
                const brand = brands.find((b) => b.name === carDetail[CAR_BRAND]);
                setSelectedBrand(brand); // Update the selected brand state
            }

            // Set the selected model if it exists in carDetail
            if (carDetail[CAR_MODEL]) {
                const model = models.find((m) => m.name === carDetail[CAR_MODEL]);
                setSelectedModel(model); // Update the selected model state
            }

            // Set the selected year if it exists in carDetail
            if (carDetail[CAR_YEAR]) {
                const year = years.find((y) => y.years.includes(carDetail[CAR_YEAR]));
                setSelectedYear(year); // Update the selected year state
            }

            // Set the selected type if it exists in carDetail
            if (carDetail[CAR_TYPE]) {
                const type = types.find((t) => t.name === carDetail[CAR_TYPE]);
                setSelectedType(type); // Update the selected type state
            }
        }
    }, [form]); // Re-run this effect when the form changes


    const availableModels = models.filter(
        (model) => model.brandId === selectedBrand?.id
    );

    // Manage internal state changes instead of passing callbacks from parent
    const handleBrandChange = (brand: BrandProps | null) => {
        setSelectedBrand(brand);
        setSelectedModel(null);
        setSelectedYear(null);
        setSelectedType(null);

        form.setValue(CAR_BRAND_FIELD, brand?.name || ""); // Update form value for state dynamically
        form.clearErrors(CAR_BRAND_FIELD); // Clear state error dynamically
        form.trigger(CAR_BRAND_FIELD); // Re-validate state field dynamically
    };

    const handleModelChange = (model: ModelProps | null) => {
        setSelectedModel(model);
        setSelectedYear(null);
        setSelectedType(null);

        form.setValue(CAR_MODEL_FIELD, model?.name || ""); // Update form value for state dynamically
        form.clearErrors(CAR_MODEL_FIELD); // Clear state error dynamically
        form.trigger(CAR_MODEL_FIELD); // Re-validate state field dynamically
    };

    const handleYearChange = (year: YearProps | null) => {
        setSelectedYear(year);
        setSelectedType(null);

        form.setValue(CAR_YEAR_FIELD, year?.years?.[0] || ""); // Update form value for state dynamically
        form.clearErrors(CAR_YEAR_FIELD); // Clear state error dynamically
        form.trigger(CAR_YEAR_FIELD); // Re-validate state field dynamically
    };

    const handleTypeChange = (type: TypeProps | null) => {
        setSelectedType(type);

        form.setValue(CAR_TYPE_FIELD, type?.name || ""); // Update form value for state dynamically
        form.clearErrors(CAR_TYPE_FIELD); // Clear state error dynamically
        form.trigger(CAR_TYPE_FIELD); // Re-validate state field dynamically
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Brand Selector */}
            <FormField
                control={form.control}
                name={CAR_BRAND_FIELD}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>انتخاب برند</FormLabel>
                        <FormControl>
                            <Popover open={openBrandDropdown} onOpenChange={setOpenBrandDropdown}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openBrandDropdown}
                                        disabled={disabled}
                                        className="w-full justify-between"
                                    >
                                        {selectedBrand ? (
                                            <span>{selectedBrand.name}</span>
                                        ) : (
                                            <span>انتخاب برند</span>
                                        )}
                                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                        <CommandInput placeholder="جستجوی برند..." />
                                        <CommandList>
                                            <CommandEmpty>برندی یافت نشد.</CommandEmpty>
                                            <CommandGroup>
                                                <ScrollArea className="h-[280px]">
                                                    {brands.map((brand) => (
                                                        <CommandItem
                                                            key={brand.id}
                                                            value={brand.name}
                                                            onSelect={() => {
                                                                handleBrandChange(brand);
                                                                setOpenBrandDropdown(false);
                                                            }}
                                                            className="flex cursor-pointer items-center justify-between text-sm"
                                                        >
                                                            <span>{brand.name}</span>
                                                            <Check
                                                                className={cn(
                                                                    "h-4 w-4",
                                                                    selectedBrand?.id === brand.id ? "opacity-100" : "opacity-0"
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

            {/* Model Selector */}
            <FormField
                control={form.control}
                name={CAR_MODEL_FIELD}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>مدل</FormLabel>
                        <FormControl>
                            <Popover open={openModelDropdown} onOpenChange={setOpenModelDropdown}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openModelDropdown}
                                        disabled={!selectedBrand}
                                        className="w-full justify-between"
                                    >
                                        {selectedModel ? (
                                            <span>{selectedModel.name}</span>
                                        ) : (
                                            <span>مدل</span>
                                        )}
                                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                        <CommandInput placeholder="جستجوی مدل" />
                                        <CommandList>
                                            <CommandEmpty>مدلی یافت نشد...</CommandEmpty>
                                            <CommandGroup>
                                                <ScrollArea className="h-[280px]">
                                                    {availableModels.map((model) => (
                                                        <CommandItem
                                                            key={model.id}
                                                            value={model.name}
                                                            onSelect={() => {
                                                                handleModelChange(model);
                                                                setOpenModelDropdown(false);
                                                            }}
                                                            className="flex cursor-pointer items-center justify-between text-sm"
                                                        >
                                                            <span>{model.name}</span>
                                                            <Check
                                                                className={cn(
                                                                    "h-4 w-4",
                                                                    selectedModel?.id === model.id ? "opacity-100" : "opacity-0"
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

            {/* Year Selector */}
            <FormField
                control={form.control}
                name={CAR_YEAR_FIELD}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>انتخاب سال ساخت</FormLabel>
                        <FormControl>
                            <Popover open={openYearDropdown} onOpenChange={setOpenYearDropdown}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openYearDropdown}
                                        disabled={!selectedModel}
                                        className="w-full justify-between"
                                    >
                                        {selectedYear ? (
                                            <span>{selectedYear.years.join(", ")}</span>
                                        ) : (
                                            <span>انتخاب سال ساخت</span>
                                        )}
                                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                        <CommandInput placeholder="جستجوی سال..." />
                                        <CommandList>
                                            <CommandEmpty>یافت نشد</CommandEmpty>
                                            <CommandGroup>
                                                <ScrollArea className="h-[280px]">
                                                    {years
                                                        .filter((modelyear) => modelyear.model_id === selectedModel?.id)
                                                        .map((modelyear) =>
                                                            modelyear.years.map((year) => (
                                                                <CommandItem
                                                                    key={year.toString()} // Ensure key is also a string
                                                                    value={year.toString()} // Ensure value is a string
                                                                    onSelect={() => {
                                                                        handleYearChange({ model_id: modelyear.model_id, years: [year] });
                                                                        setOpenYearDropdown(false);
                                                                    }}
                                                                    className="flex cursor-pointer items-center justify-between text-sm"
                                                                >
                                                                    <span>{year}</span>
                                                                    <Check
                                                                        className={cn(
                                                                            "h-4 w-4",
                                                                            selectedYear?.years.includes(year.toString()) ? "opacity-100" : "opacity-0" // Ensure comparison is with string
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))
                                                        )}
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

            {/* Type Selector */}
            <FormField
                control={form.control}
                name={CAR_TYPE_FIELD}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>انتخاب تیپ</FormLabel>
                        <FormControl>
                            <Popover open={openTypeDropdown} onOpenChange={setOpenTypeDropdown}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openTypeDropdown}
                                        disabled={!selectedYear}
                                        className="w-full justify-between"
                                    >
                                        {selectedType ? (
                                            <span>{selectedType.name}</span>
                                        ) : (
                                            <span>انتخاب تیپ</span>
                                        )}
                                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                        <CommandInput placeholder="جستجو" />
                                        <CommandList>
                                            <CommandEmpty>تیپی یافت نشد</CommandEmpty>
                                            <CommandGroup>
                                                <ScrollArea className="h-[280px]">
                                                    {types
                                                        .filter(
                                                            (type) =>
                                                                type.carModelId === selectedModel?.id &&
                                                                type.year === selectedYear?.years[0]
                                                        )
                                                        .map((type) => (
                                                            <CommandItem
                                                                key={type.id}
                                                                value={type.name}
                                                                onSelect={() => {
                                                                    handleTypeChange(type);
                                                                    setOpenTypeDropdown(false);
                                                                }}
                                                                className="flex cursor-pointer items-center justify-between text-sm"
                                                            >
                                                                <span>{type.name}</span>
                                                                <Check
                                                                    className={cn(
                                                                        "h-4 w-4",
                                                                        selectedType?.id === type.id ? "opacity-100" : "opacity-0"
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
        </div>
    );
};

export default CarSelector;
