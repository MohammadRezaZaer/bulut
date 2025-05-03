import React from "react";
import {OnboardingFlow2} from "@/components/step-form/OnboardingFlowForm2";

export function SteppedContactSection() {
    return <section className="flex flex-col bg-blue-light items-center relative py-16">



        <div className="flex flex-col my-8 relative z-10"><h2
            className="text-[30px] lg:text-[48px] text-blue-main-dark font-extrabold col-start-2 mx-auto  text-center ">Hi,
            welcome
            to
            Task us</h2>
            <h3 className="text-[30px] lg:text-[24px] font-extrabold col-start-2 mx-auto text-light-base text-center ">what
                can we
                help with today </h3></div>

        <div className="flex max-w-[551px] w-full  bg-[#CAE6FF] py-12 px-8 rounded-[20px] relative z-10">
            <OnboardingFlow2/>
        </div>
    </section>;
}