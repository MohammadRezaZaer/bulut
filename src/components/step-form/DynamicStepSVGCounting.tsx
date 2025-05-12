import React, {useEffect, useRef} from "react";
import gsap from "gsap";

interface DynamicStepSVGCountingProps {
    stepsConfig: number;
    currentIndex: number;
}

export const DynamicStepSVGCounting = ({
                                           stepsConfig,
                                           currentIndex,
                                       }: DynamicStepSVGCountingProps) => {
    const svgWidth = 308;
    const circleRadius = 13;
    const gapBetweenSteps = (svgWidth - 4 * circleRadius) / (stepsConfig - 1);
    const stepTexts = ["چاپ", "پرداخت", "ثبت بیمه", "قوانین"];

    const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);


    const reversedPathRefs = [...pathRefs.current].reverse();

    useEffect(() => {
        pathRefs.current.forEach((path, i) => {
            if (path) {
                gsap.fromTo(
                    path,
                    {scale: 0, transformOrigin: "50% 50%"},
                    {
                        scale: 1,
                        duration: 0.5,
                        delay: i * 0.2,

                        ease: "back.out(1.7)",
                    }
                );
            }
        });
        // معکوس کردن آرایه circleRefs.current
        const reversedCircleRefs = [...circleRefs.current].reverse();

        reversedCircleRefs.forEach((circle, i) => {
            if (circle) {
                gsap.fromTo(
                    circle,
                    {scale: 0, transformOrigin: "50% 50%"},
                    {
                        scale: 1,
                        duration: 0.5,
                        delay: i * 0.2,

                        ease: "back.out(1.7)",
                    }
                );
            }
        });

        const texts = document.querySelectorAll("text");
        texts.forEach((text, i) => {
            gsap.fromTo(
                text,
                {opacity: 0, y: -10},
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: i * 0.2,
                    ease: "power2.out",
                }
            );
        });
    }, [stepsConfig]);


    const isPreCurrent = (i: number,currentIndex: number) => {
        const stepIndexFromRight = stepsConfig - 1 - i;
        return stepIndexFromRight < currentIndex;

    };

    function IsCurrentStep(i: number,currentIndex: number) {

        return (stepsConfig - 1 - i) == currentIndex ;
    }

    const renderCircles = () =>
        Array.from({length: stepsConfig}).map((_, i) => {

            console.log({i,currentIndex,IC:IsCurrentStep(i,currentIndex),PC:isPreCurrent(i ,currentIndex)})
            const cx = 10 + (circleRadius + i * gapBetweenSteps);
            return (
                <g key={i}>
                    <circle
                        ref={(el) => (circleRefs.current[i] = el)}
                        cx={cx}
                        cy="30"
                        r={IsCurrentStep(i,currentIndex) ? circleRadius : circleRadius - 2}
                        fill={IsCurrentStep(i ,currentIndex) ? "#6E21FF" : isPreCurrent(i ,currentIndex)?"#28a745":"#98CEFF"  }
                    />
                    <text
                        x={cx}
                        y="10"
                        fontSize="12"
                        textAnchor="middle"
                        fill={IsCurrentStep(i ,currentIndex) ? "#6E21FF" : isPreCurrent(i ,currentIndex)?"#28a745":"#98CEFF"}
                    >
                        {stepTexts[i]}
                    </text>

                        <>
                            <circle
                                cx={cx}
                                cy="30"
                                r="13.5"
                                stroke={IsCurrentStep(i ,currentIndex) ? "#6E21FF" : isPreCurrent(i ,currentIndex)?"#28a745":"#98CEFF"}
                                strokeWidth="3"
                            />

                            {isPreCurrent(i,currentIndex)&& <text
                                x={cx}
                                y="34"
                                fontSize="16"
                                textAnchor="middle"
                                fill="#fff"
                            >
                                ✓
                            </text>}
                        </>

                </g>
            );
        });

    const renderPaths = () =>
        Array.from({length: stepsConfig - 1}).map((_, i) => {
            const x1 = 2 + circleRadius + i * gapBetweenSteps + 2;
            const x2 = 2 + circleRadius + (i + 1) * gapBetweenSteps - 2;
            const activePath = isPreCurrent(i) && isPreCurrent(i + 1);

            return (
                <path
                    ref={(el) => (pathRefs.current[i] = el)}
                    key={i}
                    d={`M${x1} 30H${x2}`}
                    stroke={activePath ? "#28a745" : "#98CEFF"}
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            );
        });

    return (
        <svg
            viewBox={`0 0 ${svgWidth} 60`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {renderPaths()}
            {renderCircles()}
        </svg>
    );
};
