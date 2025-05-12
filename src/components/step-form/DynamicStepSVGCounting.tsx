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

    const isActive = (i: number) => {
        const stepIndexFromRight = stepsConfig - 1 - i;
        return stepIndexFromRight <= currentIndex;
    };
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

    const renderCircles = () =>
        Array.from({length: stepsConfig}).map((_, i) => {
            const cx = 10 + (circleRadius + i * gapBetweenSteps);
            return (
                <g key={i}>
                    <circle
                        ref={(el) => (circleRefs.current[i] = el)}
                        cx={cx}
                        cy="30"
                        r={(i - 1 !== currentIndex) ? circleRadius : circleRadius - 2}
                        fill={isActive(i) ? (i - 1 !== currentIndex) ? "#28a745" : "#6E21FF" : "#98CEFF"}
                    />
                    <text
                        x={cx}
                        y="10"
                        fontSize="12"
                        textAnchor="middle"
                        fill={isActive(i) ? (i - 1 !== currentIndex)?"#28a745":"#6E21FF" : "#98CEFF"}
                    >
                        {stepTexts[i]}
                    </text>
                    {(isActive(i)) && (
                        <>
                            <circle
                                cx={cx}
                                cy="30"
                                r="13.5"
                                stroke={(i - 1 !== currentIndex)?"#28a745":"#6E21FF"}
                                strokeWidth="3"
                            />

                            {(i - 1 !== currentIndex) && <text
                                x={cx}
                                y="34"
                                fontSize="16"
                                textAnchor="middle"
                                fill="#fff"
                            >
                                ✓
                            </text>}
                        </>
                    )}
                </g>
            );
        });

    const renderPaths = () =>
        Array.from({length: stepsConfig - 1}).map((_, i) => {
            const x1 = 15 + circleRadius + i * gapBetweenSteps + 15;
            const x2 = 10 + circleRadius + (i + 1) * gapBetweenSteps - 10;
            const activePath = isActive(i) && isActive(i + 1);

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
