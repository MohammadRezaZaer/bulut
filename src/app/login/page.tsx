'use client';

import {useFormState} from 'react-dom';
import {sendOtpAction} from './actions';
import {Button} from "@/components/ui/button";

export default function LoginPage() {
    const [state, action] = useFormState(sendOtpAction, null);

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
                            <section
                                className="h-[325px] w-[300px] text-center transition-all duration-700 ease-in-out"><h2
                                className="mb-[20px] text-[30px] font-semibold text-brand text-center">خوش آمدید!</h2>
                                <section className="mb-[9px] flex gap-1 justify-center text-lg"><span
                                    className=" ">ورود</span><span>|</span> <span>ثبت نام</span></section>
                                <form
                                    className="mx-auto mb-8 flex w-[90%] max-w-full flex-col items-start md:w-full xl:mb-[181px] xl:w-[280px]">
                                    <h2 className="text-xl w-full mb-[35px] text-center">لطفا شماره موبایل خود را وارد
                                        کنید</h2>
                                    <section className="relative w-full">
                                        <input
                                            placeholder="شماره موبایل خود را وارد کنید"
                                            className=" false mx-0 h-[48px] w-full rounded-[4px] border-[1px] border-[#C2C2C2] p-[15px] text-xs outline-none transition-all duration-300 focus:border-[#0165e1] undefined"/>
                                    </section>
                                    <Button type="submit" variant={"default"}
                                            className="relative flex h-12  items-center justify-center rounded-md bg-brand  px-5 transition-all duration-700 disabled:opacity-50 w-full mt-7 hover:shadow-2xl focus:shadow-none">تایید
                                        و دریافت کد
                                        <div className="btnLoader">

                                        </div>
                                    </Button>
                                </form>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    );
}
