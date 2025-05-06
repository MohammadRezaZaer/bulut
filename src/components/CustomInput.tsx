import {Input} from "@/components/ui/input";

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