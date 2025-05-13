import React from "react";

const Footer = () => {
    return (
        <footer
            className="w-full  xl:pt-[56px] pr-6 pt-[32px] bg-brand xl:mt-[139px] mt-[59px]  xl:block relative rounded-t-[30px]  xl:rounded-t-[70px] h-auto max-w-full m-auto   ">
            <button
                className=" xl:w-[98px] w-[45px] h-[45px] flex justify-center items-center  xl:h-[98px] rounded-full   absolute -top-[2%] xl:-top-[10%] xl:left-[48%] left-[45%] ">
                <img alt="" loading="lazy" width="40" height="40" decoding="async" data-nimg="1"
                     className="xl:size-[40px] size-6 z-10" src="/svg/arrow-up.svg"
                />

                <svg className="text-brand absolute" viewBox="0 0 945 945" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M480.153 25.5225L783.148 151.027L790.803 154.197L793.973 161.851L919.478 464.847L922.647 472.5L919.478 480.153L793.973 783.148L790.803 790.803L783.148 793.973L480.153 919.478L472.5 922.647L464.847 919.478L161.851 793.973L154.197 790.803L151.027 783.148L25.5225 480.153L22.3525 472.5L25.5225 464.847L151.027 161.851L154.197 154.197L161.851 151.027L464.847 25.5225L472.5 22.3525L480.153 25.5225Z"
                        fill="currentColor" stroke="white" strokeWidth="70"/>
                </svg>


            </button>
            <section
                className="[&_*]:text-white xl:flex grid xl:pb-[60px] pb-[30px] border-b  border-[#D9DBE9] xl:gap-[153px] gap-4 xl:w-[1440px] w-[90%]  mx-auto ">
                <section className="xl:w-[310px] w-[90%] "><a className="flex gap-3 items-center " href="/">

                    <img alt=""
                         loading="lazy"

                         decoding="async"
                         data-nimg="1"
                         className="xl:w-[113.89px] xl:h-[89px] w-[60px] h-[48px]"
                         src="/images/fake-logo.png"

                />
                    <h2 className="xl:text-[32px] text-[24px] font-bold  xl:mr-[-20px]">بیمه امداد</h2></a><p
                    className="xl:mt-6 mt-3 text-justify xl:leading-9 leading-[30px] xl:text-sm text-[12px] font-medium xl:pr-0 ">بیمه
                    امداد یک محصول و خدمت جديد بیمه‌ای است که توسط کارگزاری رسمی بيمه برخط مباشر شماره پروانه فعالیت ١٨٧٨
                    تحت نظارت بیمه مرکزی‌ جمهوری اسلامی ایران با همکاری انجمن <a className="text-blue underline"
                                                                                 href="https://emdadkhodro1593.ir/">امدادخودرو</a>کشوری
                    و شرکت <a className="text-blue underline" href="https://#/">لوتوس</a> (آریانا ایده پرداز لوتوس
                    ) راه اندازی شده است.</p>
                    <section className="xl:flex xl:mt-8 mt-4 xl:gap-6 gap-4 items-center hidden">
                        <button className="hover:scale-110 hover:transition-all "><img alt="" loading="lazy" width="30"
                                                                                       height="30" decoding="async"
                                                                                       data-nimg="1"
                                                                                       className="xl:size-[20px] size-4"
                                                                                       src="/svg/YouTube.svg"

                        />
                        </button>
                        <button className="hover:scale-110 hover:transition-all "><img alt="" loading="lazy" width="30"
                                                                                       height="30" decoding="async"
                                                                                       data-nimg="1"
                                                                                       className="xl:size-[20px] size-4"
                                                                                       src="/svg/LinkedIn.svg"

                        />
                        </button>
                        <button className="hover:scale-110 hover:transition-all "><img alt="" loading="lazy" width="30"
                                                                                       height="30" decoding="async"
                                                                                       data-nimg="1"
                                                                                       className="xl:size-[20px] size-4"
                                                                                       src="/svg/Instagram.svg"


                        />
                        </button>
                        <button className="hover:scale-110 hover:transition-all "><img alt="" loading="lazy" width="30"
                                                                                       height="30" decoding="async"
                                                                                       data-nimg="1"
                                                                                       className="xl:size-[20px] size-4"
                                                                                       src="/svg/Twitter.svg"


                        />
                        </button>
                        <button className="hover:scale-110 hover:transition-all "><img alt="" loading="lazy" width="30"
                                                                                       height="30" decoding="async"
                                                                                       data-nimg="1"
                                                                                       className="xl:size-[20px] size-4"
                                                                                       src="/svg/Facebook.svg"


                        />
                        </button>
                    </section>
                </section>
                <section><h2 className="text-[#170F49] xl:text-[16px] text-[14px] font-bold leading-[22px]">خدمات</h2>
                    <nav
                        className="xl:mt-10 mt-4 xl:flex flex-col xl:gap-6 grid gap-4 xl:text-[16px] text-[14px]  font-medium leading-[20px]">
                        <a className="hover:opacity-50" href="/relief-signup">خرید بیمه‌نامه</a><a
                        className="hover:opacity-50" href="/request-relief">درخواست امداد خودرو</a><a
                        className="hover:opacity-50" href="/marketing">مشاور و کارشناس فروش</a><a
                        className="hover:opacity-50" href="/price-calculate">ارزش روز خودرو</a><a
                        className="hover:opacity-50" href="/price-drop-insurance">محاسبه افت بیمه خودرو</a></nav>
                </section>
                <section className="xl:w-[100px]"><h2
                    className="text-[#170F49]  xl:text-[16px] text-[14px] font-bold leading-[22px]">آشنایی با ما</h2>
                    <ul className="xl:mt-10 mt-4 flex flex-col xl:gap-6 gap-4 xl:text-[16px]  text-[14px]  font-medium leading-[20px]">
                        <li><a className="hover:opacity-50" href="/about">درباره ما</a></li>
                        <li>
                            <button className="hover:opacity-50">اخبار</button>
                        </li>
                        <li><a className="hover:opacity-50" href="/article">مقالات</a></li>
                    </ul>
                </section>
                <section className=""><h2
                    className="text-[#170F49]  xl:text-[16px] text-[14px] font-bold leading-[22px]">تماس با ما</h2>
                    <ul className="xl:mt-10 mt-4 flex flex-col xl:w-[286px] xl:gap-6 gap-4 xl:text-[16px] text-[14px]  font-medium leading-[20px]">
                        <li className="flex xl:gap-[6px] gap-[3px] items-center"><img alt="" loading="lazy" width="30"
                                                                                      height="30" decoding="async"
                                                                                      data-nimg="1"
                                                                                      className="xl:size-[30px] size-6"
                                                                                      src="/svg/Email.svg"


                        />info@emdadkhodroo.ir
                        </li>
                        <li className="flex xl:gap-[6px] gap-[3px] items-center"><img alt="" loading="lazy" width="30"
                                                                                      height="30" decoding="async"
                                                                                      data-nimg="1"
                                                                                      className="xl:size-[30px] size-6"
                                                                                      src="/svg/Phone.svg"


                        />02190000000
                        </li>
                        <li className="flex xl:gap-[6px] gap-[3px]  items-start  leading-[32px]"><img alt=""
                                                                                                      loading="lazy"
                                                                                                      width="30"
                                                                                                      height="30"
                                                                                                      decoding="async"
                                                                                                      data-nimg="1"
                                                                                                      className="xl:size-[30px] size-6"
                                                                                                      src="/svg/Mark.svg"


                        /><span
                            className="xl:w-[260px] ">آدرس: میرداماد میدان مادر خیابان شاه نظری پلاک 41 طبقه 5 واحد 13</span>
                        </li>
                    </ul>
                    <section className="flex items-center justify-center gap-2">
                        <img alt="" loading="lazy" width="80"
                             height="80" decoding="async"
                             data-nimg="1"
                             className="xl:w-[80px] xl:h-[110px] w-[60px] h-[75px] place-self-end mt-2"
                             src="/svg/emdad.jpeg"


                    /><img
                        alt="" loading="lazy" width="80" height="80" decoding="async" data-nimg="1"
                        className="xl:w-[80px] xl:h-[110px] w-[60px] h-[75px] place-self-end mt-2"
                        src="/svg/ase.webp"
                    /><img
                        alt="" loading="lazy"  decoding="async" data-nimg="1"
                        className="xl:h-[110px] xl:w-[110px] w-[75px]  h-[75px] place-self-end mt-2"
                        src="/svg/mobasher.webp"
                    />

                    </section>
                </section>
                <section className="flex  mt-4 gap-[32px] justify-center items-center xl:hidden">
                    <button className="hover:scale-110 hover:transition-all "><img alt="" loading="lazy" width="30"
                                                                                   height="30" decoding="async"
                                                                                   data-nimg="1"
                                                                                   className="xl:size-[20px] size-4"
                                                                                   src="/svg/YouTube.svg"

                    />
                    </button>
                    <button className="hover:scale-110 hover:transition-all "><img alt="" loading="lazy" width="30"
                                                                                   height="30" decoding="async"
                                                                                   data-nimg="1"
                                                                                   className="xl:size-[30px] size-4"
                                                                                   src="/svg/LinkedIn.svg"

                    />
                    </button>
                    <button className="hover:scale-110 hover:transition-all "><img alt="" loading="lazy" width="30"
                                                                                   height="30" decoding="async"
                                                                                   data-nimg="1"
                                                                                   className="xl:size-[30px] size-4"
                                                                                   src="/svg/Instagram.svg"

                    />
                    </button>
                    <button className="hover:scale-110 hover:transition-all "><img alt="" loading="lazy" width="30"
                                                                                   height="30" decoding="async"
                                                                                   data-nimg="1"
                                                                                   className="xl:size-[30px] size-4"
                                                                                   src="/svg/Twitter.svg"

                    />
                    </button>
                    <button className="hover:scale-110 hover:transition-all"><img alt="" loading="lazy" width="30"
                                                                                  height="30" decoding="async"
                                                                                  data-nimg="1"
                                                                                  className="xl:size-[30px] size-4"
                                                                                  src="/svg/Facebook.svg"

                    /></button>
                </section>
            </section>
            <span className="block text-white w-full text-center py-4 !border-t !border-primary">توسعه دهنده گروه برنامه نویسی بیمه امداد در <a
                className="text-blue underline" href="https://#/">شرکت لوتوس (آریانا ایده پرداز لوتوس)</a></span></footer>
    );
};

export default Footer;
