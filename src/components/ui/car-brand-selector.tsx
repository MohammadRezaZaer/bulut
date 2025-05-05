"use client";
import React, {useState} from "react";
import {Check, ChevronsUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {cn} from "@/lib/utils";

// Import JSON data directly
import brands from "@/data/car-brands.json";
import models from "@/data/car-models.json";
import years from "@/data/car-years.json";
import types from "@/data/car-types.json";

interface BrandProps {
    "id": number,
    "name": string,
    "brandEnglishName": string
}

interface ModelProps {
    "id": number,
    "name": string,
    "englishName": string,
    "vehicleTypeEnum": null,
    "deviceType": string,
    "brandId": number
}

interface YearProps {
    model_id: number;
    years: number[];
}

interface TypeProps {
    "id": number,
    "carModelId": number,
    "year": number,
    "name": string,
    "englishName": string
}
interface CarSelectorProps {
    disabled?: boolean;
    onBrandChange?: (brand: BrandProps | null) => void;
    onModelChange?: (model: ModelProps | null) => void;
    onYearChange?: (year: YearProps | null) => void;
    onTypeChange?: (type: TypeProps | null) => void;
    form: any;  // Add the form prop here
}

const CarSelector = ({
                         disabled,
                         onBrandChange,
                         onModelChange,
                         onYearChange,
                         onTypeChange,
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

    // Filter models for the selected brand
    const availableModels = models.filter(
        (model) => model.brandId === selectedBrand?.id
    );

    return (
        <div className="flex gap-4">
            {/* Brand Selector */}
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
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput placeholder="جستجوی برند..."/>
                        <CommandList>
                            <CommandEmpty>برندی یافت نشد.</CommandEmpty>
                            <CommandGroup>
                                <ScrollArea className="h-[280px]">
                                    {brands.map((brand) => (
                                        <CommandItem
                                            key={brand.id}
                                            value={brand.name}
                                            onSelect={() => {
                                                setSelectedBrand(brand);
                                                setSelectedModel(null); // Reset model when brand changes
                                                setSelectedYear(null); // Reset year when brand changes
                                                setSelectedType(null); // Reset type when brand changes
                                                onBrandChange?.(brand);
                                                onModelChange?.(null);
                                                onYearChange?.(null);
                                                onTypeChange?.(null);
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
                                    <ScrollBar orientation="vertical"/>
                                </ScrollArea>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {form.errors.brand && (
                <p className="text-red-500 text-sm">{form.errors.brand.message}</p>
            )}

            {/* Model Selector */}
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
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput placeholder="جستجوی مدل"/>
                        <CommandList>
                            <CommandEmpty>مدلی یافت نشد...</CommandEmpty>
                            <CommandGroup>
                                <ScrollArea className="h-[280px]">
                                    {availableModels.map((model) => (
                                        <CommandItem
                                            key={model.id}
                                            value={model.name}
                                            onSelect={() => {
                                                setSelectedModel(model);
                                                setOpenModelDropdown(false);
                                                onModelChange?.(model);
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
                                    <ScrollBar orientation="vertical"/>
                                </ScrollArea>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {form.errors.model && (
                <p className="text-red-500 text-sm">{form.errors.model.message}</p>
            )}

            {/* Year Selector */}
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
                            <span>{selectedYear.years.join(", ")}</span> // Display years array as a comma-separated string
                        ) : (
                            <span>انتخاب سال ساخت</span>
                        )}
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput placeholder="جستجوی سال..."/>
                        <CommandList>
                            <CommandEmpty>یافت نشد</CommandEmpty>
                            <CommandGroup>
                                <ScrollArea className="h-[280px]">
                                    {years
                                        .filter((modelyear) => modelyear.model_id === selectedModel?.id) // Filter years for the selected model
                                        .map((modelyear) => (
                                            modelyear.years.map((year) => (
                                                <CommandItem
                                                    key={year} // Use year as key
                                                    value={year.toString()}
                                                    onSelect={() => {
                                                        setSelectedYear({model_id: modelyear.model_id, years: [year]}); // Set selected year
                                                        setOpenYearDropdown(false);
                                                        onYearChange?.({model_id: modelyear.model_id, years: [year]}); // Update parent state
                                                    }}
                                                    className="flex cursor-pointer items-center justify-between text-sm"
                                                >
                                                    <span>{year}</span>
                                                    <Check
                                                        className={cn(
                                                            "h-4 w-4",
                                                            selectedYear?.years.includes(year) ? "opacity-100" : "opacity-0" // Check if this year is selected
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))
                                        ))}
                                    <ScrollBar orientation="vertical"/>
                                </ScrollArea>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {form.errors.year && (
                <p className="text-red-500 text-sm">{form.errors.year.message}</p>
            )}

            {/* Type Selector */}
            <Popover open={openTypeDropdown} onOpenChange={setOpenTypeDropdown}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openTypeDropdown}
                        disabled={!selectedYear} // Ensuring the year is selected before choosing the type
                        className="w-full justify-between"
                    >
                        {selectedType ? (
                            <span>{selectedType.name}</span> // Display selected type's name
                        ) : (
                            <span>انتخاب تیپ</span> // Default text in Persian (Select Type)
                        )}
                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput placeholder="Search type..."/>
                        <CommandList>
                            <CommandEmpty>تیپی یافت نشد</CommandEmpty> {/* Message when no types found */}
                            <CommandGroup>
                                <ScrollArea className="h-[280px]">
                                    {types
                                        .filter((type) => type.carModelId === selectedModel?.id && type.year === selectedYear?.years[0]) // Filter types based on selected model and year
                                        .map((type) => (
                                            <CommandItem
                                                key={type.id} // Use type's ID as the key
                                                value={type.name}
                                                onSelect={() => {
                                                    setSelectedType(type); // Set the selected type
                                                    setOpenTypeDropdown(false); // Close dropdown
                                                    onTypeChange?.(type); // Callback function for type change
                                                }}
                                                className="flex cursor-pointer items-center justify-between text-sm"
                                            >
                                                <span>{type.name}</span> {/* Display the name of the type */}
                                                <Check
                                                    className={cn(
                                                        "h-4 w-4",
                                                        selectedType?.id === type.id ? "opacity-100" : "opacity-0" // Show check icon for selected type
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
            {form.errors.type && (
                <p className="text-red-500 text-sm">{form.errors.type.message}</p>
            )}
        </div>
    );
};

export default CarSelector;
