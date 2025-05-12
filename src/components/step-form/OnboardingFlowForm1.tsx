"use client"
import React, {useState} from 'react';
import BimeForm from "@/components/step-form/BimeForm";
import {DynamicStepSVGCounting} from "@/components/step-form/DynamicStepSVGCounting";
import {Button} from "@/components/ui/button";
import {CheckCheck, FileCheck2, TicketCheck} from "lucide-react";
import FreeTowingInfo from "@/components/step-form/Free-Towing-Info";


const StepThree = ({goToNext, goToPrev}) => (
    <>
        <h1>Step 3</h1>
        <button onClick={() => goToNext({age: 50})}>Next</button>
        <button onClick={() => goToPrev({age: 50})}>prev</button>
    </>
);

const StepFour = ({goToNext, goToPrev}) => (
    <>
        <h1>Step 4</h1>
        <button onClick={() => goToNext({hairColor: 'brown'})}>Next</button>
        <button onClick={() => goToPrev({hairColor: 'brown'})}>prev</button>
    </>
);

function PrePayment() {
    return <div className="max-w-[80%] mx-auto">
        <div className="bg-red-100 p-4 rounded-md mb-4">
            <p className="text-red-600 text-lg font-semibold">توجه:</p>
            <p className="text-red-600">قبل از زدن دکمه پرداخت و ورود به درگاه پرداخت حتما VPN خود را خاموش
                کنید</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">نوع سرویس:</span>
                    <span className="text-gray-700">بیمه امداد حمل رایگان</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">سقف تعهد:</span>
                    <span className="text-gray-700">۵,۰۰۰,۰۰۰ تومان</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">قیمت بیمه نامه:</span>
                    <span className="text-gray-700">۳۵۰,۰۰۰ تومان</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">مالیات بر ارزش افزوده:</span>
                    <span className="text-gray-700">۳۵,۰۰۰ تومان</span>
                </div>
            </div>

            <div className="mt-4 flex justify-between">
                <span className="font-semibold text-lg">مبلغ قابل پرداخت:</span>
                <span className="text-lg text-gray-800">۳۷۵,۰۰۰ تومان</span>
            </div>

            <div className="mt-6 flex gap-4 justify-center">

                <Button
                    variant={"outline"}
                    className="">
                    مرحله قبل
                </Button>
                <Button
                    className="min-w-[160px]"
                >
                    پرداخت
                </Button>
            </div>


        </div>
    </div>;
}

function PaymentSuccessful() {
    return <div className="max-w-[80%] mx-auto">
        <div className="bg-green-100 p-6 rounded-lg shadow-md mb-4">
            <div className="flex items-center flex-col space-x-3">
    <span className="text-green-600 text-2xl">

        <TicketCheck size="50" className=""/>
    </span>
                <span className="text-green-600 font-semibold">پرداخت با موفقیت انجام شد</span>
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">به پرداخت ملت</span>
                    <span className="text-gray-700">دریافت کننده</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">تاریخ و ساعت:</span>
                    <span className="text-gray-700">۱۴۰۴/۰۵/۰۷ - ۱۱:۴۵</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">مبلغ:</span>
                    <span className="text-gray-700">۲,۷۵۰,۰۰۰ ریال</span>
                </div>

                <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">کدپیگیری:</span>
                    <span className="text-gray-700">BCD69B9BE93B</span>
                </div>

                <div className="flex justify-between mt-4">
                    <span className="font-semibold text-gray-700">وضعیت:</span>
                    <span className="text-green-600">پرداخت شده</span>
                </div>
            </div>
        </div>
        <div className="mt-6 flex gap-4 justify-center">


            <Button
                className="min-w-[260px]"
            >
                بازگشت به سایت
            </Button>
        </div>
    </div>;
}

function PrintAndDownloadBime() {
    return <div className="max-w-[80%] mx-auto">
        <div className="bg-green-100 p-6 rounded-lg shadow-md mb-4">
            <div className="flex  flex-col items-center space-x-3">
    <span className="text-green-600 text-2xl  ">
<FileCheck2 size={50}/>
    </span>
                <span className="text-green-600 text-xl font-semibold">اطلاعات شما با موفقیت ثبت شد</span>
            </div>

        </div>
        <p className="text-gray-700 text-center  mt-2">کاربر گرامی از طریق دکمه زیر می‌توانید اقدام به دریافت بیمه
            نامه خود نمایید.</p>
        <div className="bg-white p-6 rounded-lg shadow-md mt-4 flex flex-col justify-center">
            <Button
                className="w-full max-w-3xl mx-auto ">
                دریافت بیمه نامه
            </Button>
            <div className="mt-4 text-center">
                <a href="#" className="text-sm text-gray-600 hover:underline">بازگشت به صفحه اصلی</a>
            </div>
        </div>
    </div>;
}

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

            <div className="flex mx-auto w-full max-w-md lg:max-w-xl p-4 xl:p-8 xl:pt-4">
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


                <>
                    <PrintAndDownloadBime/>


                    <PaymentSuccessful/>


                    <PrePayment/>
                </>
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