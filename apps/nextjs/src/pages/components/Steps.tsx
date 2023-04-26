import { Fragment } from "react";

interface StepWithTextProps {
  text: string;
  isLastStep: boolean;
}

const StepWithText: React.FC<StepWithTextProps> = ({ text, isLastStep }) => {
  return (
    <Fragment>
      <div className="flex h-32 flex-col items-center md:h-24">
        <div className="h-24 w-24 flex-none rounded-full border border-solid bg-gray-300"></div>
        <div className="mt-2 flex justify-center text-gray-500">{text}</div>
      </div>

      {!isLastStep && (
        <div className="my-1 h-auto w-[-2] flex-grow border-r border-solid border-gray-300 md:h-auto md:border-t"></div>
      )}
    </Fragment>
  );
};

interface ConnectedStepsProps {
  numberOfSteps: number;
  texts: string[];
}

const ConnectedSteps: React.FC<ConnectedStepsProps> = ({
  numberOfSteps,
  texts,
}) => {
  if (numberOfSteps !== texts.length) {
    return (
      <div>
        Error: The number of steps does not match the number of texts provided.
      </div>
    );
  }

  const steps = Array.from({ length: numberOfSteps }, (_, index) => index);

  return (
    <section className="flex w-full items-center justify-center px-4 py-20">
      <div className="flex h-[32rem] flex-grow flex-col items-center space-y-2 sm:px-10 md:h-full md:flex-row md:space-y-0 md:space-x-8 md:px-20 xl:px-36">
        {steps.map((_, index) => (
          <StepWithText
            key={index}
            text={texts[index] as string}
            isLastStep={index === steps.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default ConnectedSteps;
