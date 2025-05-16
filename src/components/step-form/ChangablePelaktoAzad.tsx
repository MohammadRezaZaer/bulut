import { useAtom } from "jotai";
import {setShowAzadPlateAtom, showAzadPlateAtom} from "@/lib/atoms/showAzadPlateAtom";
import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {InputPlate} from "@/components/ui/plate/input-plate";
import {AzadPlateInput} from "@/components/ui/azad-plate-input";
import {AZAD_OR_NORMAL, PELAK, PELAK_AZAD} from "@/lib/schema/schemas"; // Import atoms

export function ChangablePelaktoAzad(props: { form: any }) {
    // Get the state and setter for the plate type using Jotai atoms
    const [showAzadPlate, setShowAzadPlate] = useAtom(showAzadPlateAtom);
    const [, setPlateType] = useAtom(setShowAzadPlateAtom);

    // Function to handle the plate type toggle
    const handlePlateTypeToggle = (isAzadPlate: boolean) => {
        setShowAzadPlate(isAzadPlate); // Update the local state
        setPlateType(isAzadPlate); // Sync with localStorage


        props.form.setValue(AZAD_OR_NORMAL, isAzadPlate )
        console.log(props.form.getValues())
        // Reset the form values and errors when toggling
        // props.form.reset({
        //     [PELAK]: {}, // Clear normal plate field value
        //     [PELAK_AZAD]: {} // Clear Azad plate field value
        // });
        props.form.clearErrors(PELAK);
        props.form.clearErrors(PELAK_AZAD);
    };

    return (
        <div className="relative flex flex-col col-span-full mx-auto">
            <section className="flex items-center gap-2 h-4 text-sm top-0 right-0 mb-3">
                <span className="whitespace-nowrap">نوع پلاک:</span>
                <button
                    className={` text-black rounded-md p-1 border whitespace-nowrap cursor-pointer ${!showAzadPlate ? 'bg-red-600 text-white' : ''}`}
                    onClick={() => handlePlateTypeToggle(false)} // Switch to normal plate
                    type="button"
                >
                    پلاک عادی
                </button>
                <button
                    className={`bg-red  rounded-md border p-1 whitespace-nowrap cursor-pointer ${showAzadPlate ? 'bg-red-600 text-white' : ''}`}
                    onClick={() => handlePlateTypeToggle(true)} // Switch to Azad plate
                    type="button"
                >
                    پلاک مناطق آزاد
                </button>
            </section>

            {/* Normal Plate Input */}
            {!showAzadPlate && (
                <div className="w-full">
                    <FormField
                        control={props.form.control}
                        name={PELAK}
                        render={({ field }) => (
                            <FormItem>

                                <FormControl>
                                    <InputPlate form={props.form} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            )}

            {/* Azad Plate Input */}
            {showAzadPlate && (
                <div className="col-span-4">
                    <FormField
                        control={props.form.control}
                        name={PELAK_AZAD}
                        render={({ field }) => (
                            <FormItem>

                                <FormControl>
                                    <AzadPlateInput form={props.form} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            )}
        </div>
    );
}
