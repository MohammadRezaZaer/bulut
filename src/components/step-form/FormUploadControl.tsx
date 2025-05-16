import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import React from "react";
import {
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem,
} from "@/components/ui/extension/file-upload";
import { CloudUpload, Paperclip } from "lucide-react";

interface FormUploadControlProps {
    label?: string;
    name: string;
    form: any; // بهتره به جای any از UseFormReturn استفاده بشه
    dropzoneOptions?: {
        maxFiles?: number;
        maxSize?: number;
        multiple?: boolean;
    };
}

export function FormUploadControl({
                                      label = "آپلود فایل",
                                      name,
                                      form,
                                      dropzoneOptions = {
                                          maxFiles: 5,
                                          maxSize: 1024 * 1024 * 4, // 4MB
                                          multiple: true,
                                      },
                                  }: FormUploadControlProps) {
    return (
        <div className="col-span-full lg:col-span-6">
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <FileUploader
                                value={field.value}
                                onValueChange={(files) => field.onChange(files)}
                                dropzoneOptions={dropzoneOptions}
                                className="relative bg-background rounded-lg p-2"
                                dir={"rtl"}
                            >
                                <FileInput
                                    id="fileInput"
                                    className="outline-dashed outline-1 outline-slate-500"
                                >
                                    <div className="flex items-center justify-center flex-col p-8 w-full text-center">
                                        <CloudUpload className="text-gray-500 w-10 h-10" />
                                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">برای آپلود کلیک کنید</span>
                                            &nbsp; یا فایل را بکشید و رها کنید
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            فرمت‌های مجاز: PNG، JPG، JPEG، GIF
                                        </p>
                                    </div>
                                </FileInput>
                                <FileUploaderContent>
                                    {field.value &&
                                        field.value.length > 0 &&
                                        field.value.map((file: File, index: number) => (
                                            <FileUploaderItem key={index} index={index}>
                                                <Paperclip className="h-4 w-4 stroke-current" />
                                                <span>{file.name}</span>
                                            </FileUploaderItem>
                                        ))}
                                </FileUploaderContent>
                            </FileUploader>
                        </FormControl>
                        <FormDescription>یک یا چند فایل برای آپلود انتخاب کنید.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
