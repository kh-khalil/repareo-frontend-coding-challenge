import React from "react";
import useStepper from "../../hooks/useStepper";
import STEPS from "./steps";

export default function Stepper() {
  const { currentStep, goToStep } = useStepper();
  const numberOfSteps = STEPS.length;

  const activeColor = (index: number): string =>
    currentStep >= index ? "bg-blue-500 text-white" : "bg-gray-300 text-black";
  const connectorActiveColor = (index: number): string => {
    return currentStep > index ? "bg-blue-500" : "bg-gray-300";
  };
  const isFinalStep = (index: number) => index === numberOfSteps - 1;

  return (
    <>
      <div className='w-full flex items-center justify-between'>
        {STEPS.map((_, index) => (
          <React.Fragment key={index}>
            <button
              type='button'
              onClick={() => goToStep(index)}
              className={`w-8 h-8 md:w-16 md:h-16 rounded-full ${activeColor(
                index
              )}`}>
              {index + 1}
            </button>
            {!isFinalStep(index) && (
              <div
                className={`max-sm:w-[19.5%] md:w-[20.5%] lg:w-[19.5%] h-1 ${connectorActiveColor(
                  index
                )}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='w-full flex items-center justify-between'>
        {STEPS.map((step, index) => (
          <p className='w-8 h-8 md:w-16 md:h-16 text-center' key={index}>
            {step.title}
          </p>
        ))}
      </div>
    </>
  );
}
