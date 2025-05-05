import React from "react";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "./form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";

interface PopoverSelectProps {
    control: any;
    name: string;
    label: string;
    value: string | null;
    options: { label: string; value: string }[];
    placeholder: string;
    onChange: (value: string) => void;
    description: string;
}

const PopoverSelect: React.FC<PopoverSelectProps> = ({
                                                         control,
                                                         name,
                                                         label,
                                                         value,
                                                         options,
                                                         placeholder,
                                                         onChange,
                                                         description,
                                                     }) => {
    return (
        <FormField control={control} name={name}>
            {({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                                >
                                    {field.value
                                        ? options.find((option) => option.value === field.value)?.label
                                        : placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder={`Search ${label}...`} />
                                <CommandList>
                                    <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                value={option.label}
                                                key={option.value}
                                                onSelect={() => {
                                                    onChange(option.value);
                                                    field.onChange(option.value);
                                                }}
                                            >
                                                <Check
                                                    className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")}
                                                />
                                                {option.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        </FormField>
    );
};

export default PopoverSelect;
