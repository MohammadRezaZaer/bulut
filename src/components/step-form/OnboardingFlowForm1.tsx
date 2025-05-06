"use client"
import React, { useState } from 'react';
import FreeTowingInfo from "@/components/step-form/Free-Towing-Info";
import ManualBimeRegister from "@/components/step-form/ManualBimeRegister2";

const StepOne = ({ goToNext }) => (
    <>
        <h1>Step 1</h1>
        <button onClick={() => goToNext({ name: 'John Doe' })}>Next</button>
    </>
);
const StepTwo = ({ goToNext }) => (
    <>
        <h1>Step 2</h1>
        <button onClick={() => goToNext({ age: 50 })}>Next</button>
    </>
);

const StepFour = ({ goToNext }) => (
    <>
        <h1>Step 4</h1>
        <button onClick={() => goToNext({ hairColor: 'brown' })}>Next</button>
    </>
);

function OnboardingFlow() {
    const [onboardingData, setOnboardingData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const onNext = stepData => {
        console.log({onboardingData,stepData})
        setOnboardingData({ ...onboardingData, ...stepData });
        setCurrentIndex(currentIndex + 1);
    }
    const onPrev = (stepData) => {
        console.log({onboardingData,stepData})
        setOnboardingData({ ...onboardingData, ...stepData });
        setCurrentIndex(currentIndex -1);
    }
    return (
        <ControlledOnboardingFlow
            currentIndex={currentIndex}
            onNext={onNext}
            onPrev={onPrev}
            onboardingData={onboardingData}
        >

            <FreeTowingInfo/>
            <ManualBimeRegister/>
            <StepOne />
            <StepTwo />

            <StepFour />
        </ControlledOnboardingFlow>
    );
}

export default OnboardingFlow;

export const ControlledOnboardingFlow = ({ children, onFinish, currentIndex,onboardingData, onNext,onPrev }) => {
    const goToNext = stepData => {
        onNext(stepData);
    }
    const goToPrev = (stepData) => {
        console.log({onboardingData})
        onPrev(stepData);
    }

    const currentChild = React.Children.toArray(children)[currentIndex];

    if (React.isValidElement(currentChild)) {
        return React.cloneElement(currentChild, { goToNext ,goToPrev,onboardingData});
    }

    return currentChild;
}