interface StepperProps {
  currentStep: number;
}

const steps = [1, 2, 3, 4];

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-center space-x-1">
      {steps.map((step, index) => (
        <div className="flex items-center justify-center gap-1" key={step}>
          {/* Step Circle */}
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 ${currentStep >= step ? "bg-violet-300 text-slate-900" : "border border-violet-200 text-violet-400"}`}
          >
            {step}
          </div>

          {/* Line between steps (except for the last one) */}
          {index < steps.length - 1 && <div className="h-[2px] w-44 bg-violet-200"></div>}
        </div>
      ))}
    </div>
  );
}
