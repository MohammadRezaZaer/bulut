import React from "react";

export const DynamicStepSVG = ({
                                   stepsConfig, currentIndex
                               }) => {
    const svgWidth = 308; // Width of the SVG
    const circleRadius = 10; // Radius of the circle
    const gapBetweenSteps = (svgWidth - 4 * circleRadius) / (stepsConfig.length - 1); // Dynamic gap

    const renderCircles = () => {
        return stepsConfig.map((step, index) => (
            <g key={index}>
                <circle
                    cx={10 + (circleRadius + index * gapBetweenSteps)}
                    cy="19"
                    r={circleRadius}
                    fill={currentIndex >= index ? "#273B8E" : "#98CEFF"}
                />
                {currentIndex >= index && (
                    <circle
                        cx={10 + (circleRadius + index * gapBetweenSteps)}
                        cy="19"
                        r="17.5"
                        stroke="#273B8E"
                        strokeWidth="3"
                    />
                )}
            </g>
        ));
    };

    const renderPaths = () => {
        return stepsConfig.slice(1).map((step, index) => (
            <path
                key={index}
                d={`M${(circleRadius + index * gapBetweenSteps + circleRadius) + 20} 19H${
                    (circleRadius + (index + 1) * gapBetweenSteps - circleRadius) - 10
                }`}
                stroke={currentIndex > index ? "#273B8E" : "#98CEFF"}
                strokeWidth="3"
                strokeLinecap="round"
            />
        ));
    };

    return (
        <svg
            // width={svgWidth}
            // height="38"
            viewBox={`0 0 ${svgWidth} 38`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {renderPaths()}
            {renderCircles()}
        </svg>
    );
};