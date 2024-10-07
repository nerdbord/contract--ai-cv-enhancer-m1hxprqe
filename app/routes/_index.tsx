import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData, Form, json } from "@remix-run/react";
import { useState } from "react";

import { Stepper } from "~/components/Stepper";
import { UploadCVStep } from "~/components/UploadCVStep";
import { TemplateStep } from "~/components/TemplateStep";
import { JobUrlStep } from "~/components/JobUrlStep";
import { SummaryStep } from "~/components/SummaryStep";

export const meta: MetaFunction = () => {
  return [
    { title: "AI cv enhancer app." },
    { name: "description", content: "Welcome to AI CV enhancer app!" },
  ];
};

export interface ActionData {
  success?: boolean;
  error?: string;
  enhancedCV?: string;
}

interface Step {
  stepNoLabel: string;
  title: string;
}

const steps: Step[] = [
  { stepNoLabel: "Krok 1", title: "Wybierz CV" },
  { stepNoLabel: "Krok 2", title: "Wybierz szablon" },
  { stepNoLabel: "Krok 3", title: "Dodaj ogłoszenie" },
  { stepNoLabel: "Krok 4", title: "Edytuj CV" },
];

export const action: ActionFunction = async ({ request }) => {
  console.log("Form submitted");

  const formData = await request.formData();

  console.log("formData", formData);

  // TODO: Implement form submission logic here

  const res = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 5000);
  });

  return json(await res);
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const [currentStep, setCurrentStep] = useState(0);
  const isOneBeforeLastStep = currentStep === steps.length - 2;

  const _onSubmit = (event: React.FormEvent) => {
    if (!isOneBeforeLastStep) {
      event.preventDefault();

      setCurrentStep((prev) => prev + 1);
      return;
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <Form method="post" onSubmit={_onSubmit} className="flex flex-col items-center justify-center">
      <div className="mb-10 flex w-full flex-col items-center justify-between">
        <Stepper currentStep={currentStep} steps={steps} />
      </div>

      <div id="form content" className="w-[630px]">
        <div hidden={currentStep !== 0}>
          <UploadCVStep />
        </div>

        <div hidden={currentStep !== 1}>
          <TemplateStep />
        </div>

        <div hidden={currentStep !== 2}>
          <JobUrlStep />
        </div>

        {currentStep === 3 && (
          <div>
            <SummaryStep summary={actionData} />
          </div>
        )}
      </div>
    </Form>
  );
}
