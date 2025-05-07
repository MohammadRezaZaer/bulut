import React from "react";

interface DynamicStepSVGCountingProps {
    stepsConfig: number;    // number of steps
    currentIndex: number;   // 0-based, but now counts from the right
}

export const DynamicStepSVGCounting = ({
                                           stepsConfig,
                                           currentIndex,
                                       }: DynamicStepSVGCountingProps) => {
    const svgWidth = 308;
    const circleRadius = 10;
    const gapBetweenSteps = (svgWidth - 4 * circleRadius) / (stepsConfig - 1);

    // Compute “logical index from right” per element:
    const isActive = (i: number) => {
        // map i=0 (leftmost) → stepIndex = last
        const stepIndexFromRight = stepsConfig - 1 - i;
        return stepIndexFromRight <= currentIndex;
    };

    const renderCircles = () =>
        Array.from({ length: stepsConfig }).map((_, i) => {
            const cx = 10 + (circleRadius + i * gapBetweenSteps);
            return (
                <g key={i}>
                    <circle
                        cx={cx}
                        cy="19"
                        r={circleRadius}
                        fill={isActive(i) ? "#273B8E" : "#98CEFF"}
                    />
                    {isActive(i) && (
                        <circle
                            cx={cx}
                            cy="19"
                            r="17.5"
                            stroke="#273B8E"
                            strokeWidth="3"
                        />
                    )}
                </g>
            );
        });

    const renderPaths = () =>
        Array.from({ length: stepsConfig - 1 }).map((_, i) => {
            const x1 = 10 + circleRadius + i * gapBetweenSteps + 10;
            const x2 = 10 + circleRadius + (i + 1) * gapBetweenSteps - 10;
            // For paths, “active” if both ends should be active:
            const activePath = isActive(i) && isActive(i + 1);

            return (
                <path
                    key={i}
                    d={`M${x1} 19H${x2}`}
                    stroke={activePath ? "#273B8E" : "#98CEFF"}
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            );
        });

    return (
        <svg
            viewBox={`0 0 ${svgWidth} 38`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {renderPaths()}
            {renderCircles()}
        </svg>
    );
};
