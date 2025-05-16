import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import {FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField} from "@/components/ui/form";

// Import JSON data directly
import brands from "@/data/car-brands.json";
import models from "@/data/car-models.json";
import years from "@/data/car-years.json";
import types from "@/data/car-types.json";

import { CAR_BRAND, CAR_DETAIL, CAR_MODEL, CAR_TYPE, CAR_YEAR } from "@/lib/schema/schemas";

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

export function getReactSelectClassNames(fieldState: ControllerFieldState) {
    return {
        control: (state) =>
            `border rounded-md  ${
                fieldState?.error
                    ? "text-red-500 ring-1 dark:text-red-900 ring-red-500  border-red-500 focus-visible:ring-red-500"
                    : state?.isFocused
                        ? "!border-brand !ring-brand !ring-1"
                        : "border-gray-300"
            }`,

    };
}

const CarSelector = ({ disabled, form }: CarSelectorProps) => {
    const [selectedBrand, setSelectedBrand] = useState<BrandProps | null>(null);
    const [selectedModel, setSelectedModel] = useState<ModelProps | null>(null);
    const [selectedYear, setSelectedYear] = useState<YearProps | null>(null);
    const [selectedType, setSelectedType] = useState<TypeProps | null>(null);

    const CAR_BRAND_FIELD = `${CAR_DETAIL}.${CAR_BRAND}`;
    const CAR_MODEL_FIELD = `${CAR_DETAIL}.${CAR_MODEL}`;
    const CAR_YEAR_FIELD = `${CAR_DETAIL}.${CAR_YEAR}`;
    const CAR_TYPE_FIELD = `${CAR_DETAIL}.${CAR_TYPE}`;

    useEffect(() => {
        // Get the current car details from the form
        const carDetail = form.getValues(CAR_DETAIL);

        if (carDetail) {
            if (carDetail[CAR_BRAND]) {
                const brand = brands.find((b) => b.name === carDetail[CAR_BRAND]);
                setSelectedBrand(brand);
            }

            if (carDetail[CAR_MODEL]) {
                const model = models.find((m) => m.name === carDetail[CAR_MODEL]);
                setSelectedModel(model);
            }

            if (carDetail[CAR_YEAR]) {
                const year = years.find((y) => y.years.includes(carDetail[CAR_YEAR]));
                setSelectedYear(year);
            }

            if (carDetail[CAR_TYPE]) {
                const type = types.find((t) => t.name === carDetail[CAR_TYPE]);
                setSelectedType(type);
            }
        }
    }, [form]);

    const availableModels = models.filter(
        (model) => model.brandId === selectedBrand?.id
    );

    const handleBrandChange = (brand: BrandProps | null) => {
        setSelectedBrand(brand);
        setSelectedModel(null);
        setSelectedYear(null);
        setSelectedType(null);

        form.setValue(CAR_BRAND_FIELD, brand?.name || "");
        form.clearErrors(CAR_BRAND_FIELD);
        form.trigger(CAR_BRAND_FIELD);
    };

    const handleModelChange = (model: ModelProps | null) => {
        setSelectedModel(model);
        setSelectedYear(null);
        setSelectedType(null);

        form.setValue(CAR_MODEL_FIELD, model?.name || "");
        form.clearErrors(CAR_MODEL_FIELD);
        form.trigger(CAR_MODEL_FIELD);
    };

    const handleYearChange = (year: number | null) => {
        setSelectedYear({ model_id: selectedModel?.id || 0, years: [year!] });
        setSelectedType(null);

        form.setValue(CAR_YEAR_FIELD, year || "");
        form.clearErrors(CAR_YEAR_FIELD);
        form.trigger(CAR_YEAR_FIELD);
    };

    const handleTypeChange = (type: TypeProps | null) => {
        setSelectedType(type);

        form.setValue(CAR_TYPE_FIELD, type?.name || "");
        form.clearErrors(CAR_TYPE_FIELD);
        form.trigger(CAR_TYPE_FIELD);
    };

    // Prepare years options as number types
    const yearsOptions = years
        .filter((year) => year.model_id === selectedModel?.id)
        .flatMap((year) => year.years.map((y) => ({ value: y, label: y.toString() })));



    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
            {/* Brand Selector */}
            <FormField
                control={form.control}
                name={CAR_BRAND_FIELD}
                render={({ field,fieldState }) => (
                    <FormItem>
                        <FormLabel>انتخاب برند</FormLabel>
                        <FormControl>
                            <Select
                                isDisabled={disabled}
                                options={brands.map((brand) => ({
                                    value: brand.name,
                                    label: brand.name,
                                }))}
                                value={selectedBrand ? { value: selectedBrand.name, label: selectedBrand.name } : null}
                                onChange={(option) => handleBrandChange(brands.find(b => b.name === option?.label) || null)}
                                placeholder="انتخاب برند"
                                className="w-full "
                                classNames={getReactSelectClassNames(fieldState)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Model Selector */}
            <FormField
                control={form.control}
                name={CAR_MODEL_FIELD}
                render={({ field,fieldState }) => (
                    <FormItem>
                        <FormLabel>مدل</FormLabel>
                        <FormControl>
                            <Select
                                isDisabled={!selectedBrand}
                                options={availableModels.map((model) => ({
                                    value: model.name,
                                    label: model.name,
                                }))}
                                value={selectedModel ? { value: selectedModel.name, label: selectedModel.name } : null}
                                onChange={(option) => handleModelChange(availableModels.find(m => m.name === option?.label) || null)}
                                placeholder="انتخاب مدل"
                                className="w-full"
                                classNames={getReactSelectClassNames(fieldState)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Year Selector */}
            <FormField
                control={form.control}
                name={CAR_YEAR_FIELD}
                render={({ field,fieldState }) => (
                    <FormItem>
                        <FormLabel>سال تولید</FormLabel>
                        <FormControl>
                            <Select
                                isDisabled={!selectedModel}
                                options={yearsOptions}
                                value={selectedYear ? { value: selectedYear.years[0], label: selectedYear.years[0].toString() } : null}
                                onChange={(option) => handleYearChange(option?.value || null)}
                                placeholder="انتخاب سال تولید"
                                className="w-full"
                                classNames={getReactSelectClassNames(fieldState)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Type Selector */}
            <FormField
                control={form.control}
                name={CAR_TYPE_FIELD}
                render={({ field,fieldState }) => (
                    <FormItem>
                        <FormLabel>نوع خودرو</FormLabel>
                        <FormControl>
                            <Select
                                isDisabled={!selectedYear}
                                options={types
                                    .filter((type) => type.carModelId === selectedModel?.id && type.year === selectedYear?.years[0])
                                    .map((type) => ({
                                        value: type.name,
                                        label: type.name,
                                    }))}
                                value={selectedType ? { value: selectedType.name, label: selectedType.name } : null}
                                onChange={(option) => handleTypeChange(types.find(t => t.name === option?.label) || null)}
                                placeholder="انتخاب نوع"
                                className="w-full"
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

export default CarSelector;
