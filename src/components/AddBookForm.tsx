"use client"
import {useState} from "react"
import {toast} from "sonner"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {CloudUpload, Paperclip} from "lucide-react"
import {FileInput, FileUploader, FileUploaderContent, FileUploaderItem} from "@/components/ui/extension/file-upload"
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

const formSchema = z.object({
    book_name: z.string(),
    price: z.string(),
    image: z.string()
});

export default function MyForm() {

    const router = useRouter();
    function onDismiss() {
        router.back();
    }
    const [files, setFiles] = useState<File[] | null>(null);

    const dropZoneConfig = {
        maxFiles: 5,
        maxSize: 1024 * 1024 * 4,
        multiple: true,
    };
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="book_name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>نام کتاب</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="نام کتاب"

                                    type=""
                                    {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>قیمت (تومان)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="قیمت (تومان)"

                                    type=""
                                    {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>بارگذاری عکس</FormLabel>
                            <FormControl>
                                <FileUploader
                                    value={files}
                                    onValueChange={setFiles}
                                    dropzoneOptions={dropZoneConfig}
                                    className="relative bg-background rounded-lg p-2"
                                    dir={"rtl"}
                                    reSelect={true}
                                >
                                    <FileInput
                                        id="fileInput"
                                        className="outline-dashed outline-1 outline-slate-500"
                                    >
                                        <div className="flex items-center justify-center flex-col p-8 w-full ">
                                            <CloudUpload className='text-brand w-10 h-10'/>
                                            <p className="mb-1 text-sm text-center text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">بارگذاری عکس</span><br/>

                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF
                                            </p>
                                        </div>
                                    </FileInput>
                                    <FileUploaderContent>
                                        {files &&
                                            files.length > 0 &&
                                            files.map((file, i) => (
                                                <FileUploaderItem key={i} index={i}>
                                                    <Paperclip className="h-4 w-4 stroke-current"/>
                                                    <span>{file.name}</span>
                                                </FileUploaderItem>
                                            ))}
                                    </FileUploaderContent>
                                </FileUploader>
                            </FormControl>
                            <FormDescription>در این قسمت میتوانید عکس محصول خودتان را بارگزاری نمایید.</FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 flex-row-reverse">

                    <Button type="submit">افزودن</Button>
                    <Button onClick={onDismiss} type="button" variant={"outline"}>انصراف</Button></div>
            </form>
        </Form>
    )
}