import { CheckIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface Step {
  stepNoLabel: string;
  title: string;
}

interface StepperProps {
  currentStep: number;
  steps: Step[];
}

export function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <ul className="mb-5 flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <li className="flex flex-col items-start justify-center gap-3" key={step.title}>
          <div className="flex items-center gap-2">
            {/* Step Circle */}
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors duration-300",
                currentStep >= index
                  ? "bg-violet-300 text-slate-900"
                  : "border border-violet-400 text-violet-400",
              )}
            >
              {currentStep <= index && index + 1}
              {currentStep > index && <CheckIcon className="h-6 w-6" />}
            </div>

            {/* Line between steps (except for the last one) */}
            {index < steps.length - 1 && (
              <div
                className={cn("h-[2px] w-44 bg-violet-200", currentStep > index && "bg-violet-300")}
              ></div>
            )}
          </div>

          {/* Step labels */}
          <div className="text-xs transition-colors duration-300">
            <p className="text-slate-300">{step.stepNoLabel}</p>

            <p
              className={cn(
                "font-medium text-slate-400",
                currentStep === index ? "text-slate-900" : "",
                currentStep > index ? "text-slate-700" : "",
              )}
            >
              {step.title}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
