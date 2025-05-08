"use client"
import React, {useState} from 'react';
import FreeTowingInfo from "@/components/step-form/Free-Towing-Info";
import BimeForm from "@/components/step-form/BimeForm";
import {DynamicStepSVGCounting} from "@/components/step-form/DynamicStepSVGCounting";


const StepThree = ({goToNext,goToPrev}) => (
    <>
        <h1>Step 3</h1>
        <button onClick={() => goToNext({age: 50})}>Next</button>
        <button onClick={() => goToPrev({age: 50})}>prev</button>
    </>
);

const StepFour = ({goToNext,goToPrev}) => (
    <>
        <h1>Step 4</h1>
        <button onClick={() => goToNext({hairColor: 'brown'})}>Next</button>
        <button onClick={() => goToPrev({hairColor: 'brown'})}>prev</button>
    </>
);

function OnboardingFlow() {
    const [onboardingData, setOnboardingData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const onNext = stepData => {
        console.log({onboardingData, stepData})
        setOnboardingData({...onboardingData, ...stepData});
        setCurrentIndex(currentIndex + 1);
    }
    const onPrev = (stepData) => {
        console.log({onboardingData, stepData})
        setOnboardingData({...onboardingData, ...stepData});
        setCurrentIndex(currentIndex - 1);
    }
    return (<>
            <section
                className="xl:my-[40px] rounded flex xl:h-[150px] h-[100px] w-full items-center justify-center bg-brand font-bold">
                <h1 className="xl:text-[40px] text-[24px] font-bold text-center text-white px-10">ثبت نام بیمه امداد حمل
                    رایگان</h1></section>

            <div className="flex mx-auto w-full max-w-xl p-8 pt-4">
                <DynamicStepSVGCounting stepsConfig={4}
                                        currentIndex={currentIndex}/>
            </div>
            <ControlledOnboardingFlow
                currentIndex={currentIndex}
                onNext={onNext}
                onPrev={onPrev}
                onboardingData={onboardingData}
            >

                <FreeTowingInfo/>

                <BimeForm/>

                <StepThree/>

                <StepFour/>
            </ControlledOnboardingFlow>

        </>
    );
}

export default OnboardingFlow;

export const ControlledOnboardingFlow = ({children, onFinish, currentIndex, onboardingData, onNext, onPrev}) => {
    const goToNext = stepData => {
        console.log({onboardingData})

        onNext(stepData);
    }
    const goToPrev = (stepData) => {
        onPrev(stepData);
    }

    const currentChild = React.Children.toArray(children)[currentIndex];

    if (React.isValidElement(currentChild)) {
        return React.cloneElement(currentChild, {goToNext, goToPrev, onboardingData});
    }

    return currentChild;
}