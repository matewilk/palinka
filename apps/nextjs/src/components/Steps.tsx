import { Fragment } from "react";

interface StepWithTextProps {
  step: string;
  isLastStep: boolean;
}

const StepWithText: React.FC<StepWithTextProps> = ({ step, isLastStep }) => {
  return (
    <Fragment>
      <div className="flex h-32 flex-col items-center md:h-24">
        <div className="h-24 w-24 flex-none rounded-full border border-solid bg-gray-300"></div>
        <div className="mt-2 flex justify-center text-gray-500">{step}</div>
      </div>

      {!isLastStep && (
        <div className="my-1 h-auto w-[-2] flex-grow border-r border-solid border-gray-300 md:h-auto md:border-t"></div>
      )}
    </Fragment>
  );
};

interface ConnectedStepsProps {
  steps: string[];
}

const ConnectedSteps: React.FC<ConnectedStepsProps> = ({ steps }) => {
  return (
    <section className="flex w-full items-center justify-center px-4 py-20">
      <div className="flex h-[32rem] flex-grow flex-col items-center space-y-2 sm:px-10 md:h-full md:flex-row md:space-y-0 md:space-x-8 md:px-20 xl:px-36">
        {steps.map((step, index) => (
          <StepWithText
            key={index}
            step={step}
            isLastStep={index === steps.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default ConnectedSteps;
