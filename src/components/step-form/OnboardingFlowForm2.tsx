// Define JSON configuration (in practice, you might load this from an external file or API)
import {FormProvider, useForm, useFormContext} from "react-hook-form";
import * as yup from "yup";
import React, {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {Textarea} from "@headlessui/react";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import {DynamicStepSVG} from "@/components/step-form/DynamicStepSVG";


const formConfig = {
    steps: [
        {
            name: "StepOne",
            validationSchema: yup.object().shape({
                name: yup.string().required("Full Name is required"),
            }),
            fields: [
                {
                    name: "name",
                    label: "Please enter your full name.",
                    description: "Please enter your full name.",
                    type: "text",
                    placeholder: "Richard Anderson",
                },
            ],
        },
        {
            name: "StepTwo",
            validationSchema: yup.object().shape({
                company: yup.string().required("Company Name is required"),
            }),
            fields: [
                {
                    name: "company",
                    label: "Enter the name of your company.",
                    description: "Enter the name of your company.",
                    type: "text",
                    placeholder: "Company",
                },
            ],
        },
        {
            name: "StepThree",
            validationSchema: yup.object().shape({
                message: yup.string().required("Message is required"),
            }),
            fields: [
                {
                    name: "message",
                    label: "Please provide your message.",
                    description: "Please provide your message.",
                    type: "textarea",
                    placeholder: "Message",
                },
            ],
        },
        {
            name: "StepFour",
            validationSchema: yup.object().shape({
                email: yup.string().email("Enter a valid email").required("Email is required"),
            }),
            fields: [
                {
                    name: "email",
                    label: "Please enter a valid email address.",
                    description: "Please enter a valid email address.",
                    type: "email",
                    placeholder: "Email",
                },
            ],
        },
    ],
};
const DynamicStepComponent = ({fields}: { fields: any[] }) => {
    const {register, formState: {errors}} = useFormContext();

    return (
        <>
            {fields.map((field) => (
                <div className="w-full flex min-h-[150px]" key={field.name}>
                    {field.type === 'textarea' ? (


                        <Textarea
                            label={<span className="text-gray-dark text-base font-normal"> {field?.label}<span
                                className="text-[#E35959] ">*</span> </span>}
                            {...register('message')}
                            error={errors[field.name]?.message}
                            {...register(field.name)}
                            placeholder={field.placeholder}
                            labelClassName="-top-7 absolute text-base font-normal text-gray-dark w-full text-center"
                            className={"w-full"}
                            inputClassName={"rounded-2xl input-shadow border-0 bg-white"}
                        />

                    ) : (

                        <Input
                            label={<span className="text-gray-dark text-base font-normal"> {field?.label}<span
                                className="text-[#E35959]">*</span> </span>}
                            labelClassName="-top-7 w-full text-center"
                            placeholder={field.placeholder}
                            inputClassName="rounded-2xl input-shadow border-0 bg-white"
                            {...register(field.name)}
                            error={errors[field.name]?.message}


                        />

                    )}

                </div>
            ))}
        </>
    );
};


export const OnboardingFlow2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [steps, setSteps] = useState<any[]>([]);
    const methods = useForm({
        mode: 'onBlur',
    });

    useEffect(() => {
        setSteps(formConfig.steps);
    }, []);

    const StepComponent = steps[currentIndex] ? DynamicStepComponent : null;

    // const validationSchema = getValidationSchema(steps[currentIndex]?.validationSchema);
    const validationSchema = (steps[currentIndex]?.validationSchema);

    const methodsWithValidation = useForm({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema),
        defaultValues: {},
    });

    const handleNext = async () => {
        const isValid = await methodsWithValidation.trigger();
        if (isValid) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => setCurrentIndex(prev => prev - 1);

    const handleSubmit = async (data) => {
        if (currentIndex < steps.length - 1) {
            await handleNext()
        }
        try {
            // Combine all step schemas into a single final schema
            const finalSchema = yup.object().shape(
                formConfig.steps.reduce((acc, step) => {
                    return {...acc, ...step.validationSchema.fields};
                }, {})
            );


            console.log({finalSchema})
            // Validate the entire form data against the final schema
            await finalSchema.validate(data, {abortEarly: false});

            // Success message on valid data submission
            toast.success("We received your information and will be in touch soon!");
            console.log('Final validation passed:', data);
        } catch (errors) {
            console.error('Final validation errors:', errors);
            // Handle error notifications
        }
    };


    return (
        <div className="flex flex-col text-blue-hazy w-full px-3 ">

            <FormProvider {...methodsWithValidation}>
                <form onSubmit={methodsWithValidation.handleSubmit(handleSubmit)}>
                    <fieldset rotationY={0} x={0} y={-80} as={"fieldset"}
                              className={("gap-2 z-10 w-full")}
                    >


                        {StepComponent && <StepComponent fields={steps[currentIndex]?.fields}/>}


                        <div className="col-start-1 mx-auto">


                            <div className="flex mx-auto w-full px-8"><DynamicStepSVG stepsConfig={steps}
                                                                                      currentIndex={currentIndex}/>
                            </div>


                            <div className="w-full flex justify-between pt-8">
                                {currentIndex > 0 &&
                                    <button className="select-none active:scale-75 transition " type="button"
                                            onClick={handlePrev}>
                                        <svg width="100" height="32" viewBox="0 0 100 32" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5H84C92.5604 0.5 99.5 7.43959 99.5 16C99.5 24.5604 92.5604 31.5 84 31.5H16C7.43959 31.5 0.5 24.5604 0.5 16Z"
                                                fill="#007AFF"/>
                                            <path
                                                d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5H84C92.5604 0.5 99.5 7.43959 99.5 16C99.5 24.5604 92.5604 31.5 84 31.5H16C7.43959 31.5 0.5 24.5604 0.5 16Z"
                                                stroke="#007AFF"/>
                                            <text fill="white" xmlSpace="preserve" style={{whiteSpace: "pre"}}
                                                  font-family="Poppins" font-size="14" font-weight="bold"
                                                  letter-spacing="-0.5px">
                                                <tspan x="34" y="20.9">Prev</tspan>
                                            </text>
                                        </svg>
                                    </button>}
                                {currentIndex < steps.length - 1 ? (
                                    <button className="ml-auto select-none active:scale-75 transition animate-bounce"
                                            type="button"
                                            onClick={handleNext}>

                                        <svg width="100" height="32" viewBox="0 0 100 32" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5H84C92.5604 0.5 99.5 7.43959 99.5 16C99.5 24.5604 92.5604 31.5 84 31.5H16C7.43959 31.5 0.5 24.5604 0.5 16Z"
                                                fill="#007AFF"/>
                                            <path
                                                d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5H84C92.5604 0.5 99.5 7.43959 99.5 16C99.5 24.5604 92.5604 31.5 84 31.5H16C7.43959 31.5 0.5 24.5604 0.5 16Z"
                                                stroke="#007AFF"/>
                                            <text fill="white" xmlSpace="preserve" style={{whiteSpace: "pre"}}
                                                  font-family="Poppins" font-size="14" font-weight="bold"
                                                  letter-spacing="-0.5px">
                                                <tspan x="34" y="20.9">Next</tspan>
                                            </text>
                                        </svg>

                                    </button>
                                ) : (
                                    <button className="select-none active:scale-75 transition animate-bounce"
                                            type="submit">
                                        <svg width="100" height="32" viewBox="0 0 100 32" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5H84C92.5604 0.5 99.5 7.43959 99.5 16C99.5 24.5604 92.5604 31.5 84 31.5H16C7.43959 31.5 0.5 24.5604 0.5 16Z"
                                                fill="#F88D2A"/>
                                            <path
                                                d="M0.5 16C0.5 7.43959 7.43959 0.5 16 0.5H84C92.5604 0.5 99.5 7.43959 99.5 16C99.5 24.5604 92.5604 31.5 84 31.5H16C7.43959 31.5 0.5 24.5604 0.5 16Z"
                                                stroke="#F88D2A"/>
                                            <text fill="white" xmlSpace="preserve" style={{whiteSpace: "pre"}}
                                                  font-family="Poppins" font-size="14" font-weight="bold"
                                                  letter-spacing="-0.5px">
                                                <tspan x="30" y="20.9">Finish</tspan>
                                            </text>
                                        </svg>
                                    </button>
                                )}
                            </div>

                        </div>
                    </fieldset>

                </form>


            </FormProvider>
        </div>
    );
};


