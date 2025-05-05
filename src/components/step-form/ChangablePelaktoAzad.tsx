import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {InputPlate} from "@/components/ui/input-plate";

export function ChangablePelaktoAzad(props: {
    form: any
}) {
    return <>
        {/*<section className="flex items-center gap-2 mr-2"><span>نوع پلاک:</span><span*/}
        {/*    className="bg-[whitesmoke] text-black rounded-md p-1 border border-[gray] cursor-pointer">پلاک عادی</span><span*/}
        {/*    className="bg-red text-white rounded-md border p-1 border-[gray] cursor-pointer">پلاک مناطق آزاد</span>*/}
        {/*</section>*/}
        <div className="col-span-4">
            <FormField
                control={props.form.control}
                name="pelak"

                render={({field}) => (
                    <FormItem>
                        <FormLabel>Plate Number</FormLabel>
                        <FormControl>
                            <InputPlate value={field.value} onChange={field.onChange}/>


                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
        {/*<div className="col-span-4">*/}
        {/*    <FormField*/}
        {/*        control={props.form.control}*/}
        {/*        name="pelakazad"*/}

        {/*        render={({field}) => (*/}
        {/*            <FormItem>*/}
        {/*                <FormLabel>azad Plate Number</FormLabel>*/}
        {/*                <FormControl>*/}
        {/*                    <AzadInputPlate value={field.value} onChange={field.onChange}/>*/}


        {/*                </FormControl>*/}
        {/*                <FormMessage/>*/}
        {/*            </FormItem>*/}
        {/*        )}*/}
        {/*    />*/}
        {/*</div>*/}
    </>;
}