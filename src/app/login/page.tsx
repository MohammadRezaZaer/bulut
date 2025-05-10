'use client';


import PhoneForm from "@/components/PhoneForm";
import {useState} from "react";
import OtpForm from "@/components/OtpForm";

export default function LoginPage() {


    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [mobile, setMobile] = useState('');

    return (

        <section className="flex h-screen w-full items-center justify-center ">
            <section
                className="relative flex h-[600px] w-[1000px] justify-between overflow-hidden rounded-xl md:border md:border-solid">
                <section className="z-10 hidden h-full w-[400px] items-center bg-brand md:flex">
                    <img alt="" loading="lazy"
                         width="555" height="259"
                         decoding="async"
                         data-nimg="1"
                         className="w-[555px] min-w-[555px] "

                         src="/images/login-hero-image.webp"
                    />
                </section>
                <section className="flex h-full w-[470px] flex-col items-center justify-center">
                    <a
                        className="cursor-pointer"
                        href="/">
                        <img
                            alt="Picture of the author" loading="lazy" width="56" height="56" decoding="async"
                            data-nimg="1"
                            className="logo m-auto mb-6 mt-4 w-[180px]" src="/images/fake-logo.png"
                        />
                    </a>

                    <section className="flex w-[310px]  overflow-hidden">
                        <section
                            className="flex w-[1200px] min-w-[1200px] gap-5 transition-all duration-500 ease-in-out"
                        >
                            {step === 'phone' ?
                                ( <section
                                className="h-[325px] w-[300px] text-center transition-all duration-700 ease-in-out p-2"><h2
                                className="mb-[20px] text-[30px] font-semibold text-brand text-center">خوش آمدید!</h2>
                                <section className="mb-[9px] flex gap-1 justify-center text-lg"><span
                                    className=" ">ورود</span><span>|</span> <span>ثبت نام</span></section>
                               <PhoneForm


                                   onSuccess={(phone: string) => {
                                       setMobile(phone);
                                       setStep('otp');
                                   }}
                               />


                            </section>):(

                            <section className="relative h-[425px] w-[300px] text-center p-2">
                                <OtpForm

                                    mobile={mobile}
                                    onBack={() => setStep('phone')}
                                    // onSuccess={}
                                />
                            </section>)

                            }
                        </section>
                    </section>
                </section>
            </section>
        </section>
    );
}
