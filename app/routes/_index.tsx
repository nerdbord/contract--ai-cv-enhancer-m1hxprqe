import { ActionFunction } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { useState } from "react";

import type { MetaFunction } from "@remix-run/node";
import { Stepper } from "~/components/Stepper";
import useFormData from "~/utils/useFormData";
import { UploadCVStep } from "~/components/UploadCVStep";

export const meta: MetaFunction = () => {
  return [
    { title: "AI cv enhancer app." },
    { name: "description", content: "Welcome to AI CV enhancer app!" },
  ];
};

interface ActionData {
  success?: boolean;
  error?: string;
  extractedText?: string;
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

  // const file = formData.get("cv");

  // if (!file || !(file instanceof File)) {
  //   return json({ error: "File upload failed or incorrect file type!" }, { status: 400 });
  // }

  // let extractedText;

  // if (file.type === "application/pdf") {
  //   extractedText = (await getDocsFromPDF(file)).pageContent;
  //   console.log(extractedText);
  // } else if (
  //   file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  // ) {
  //   extractedText = (await getDocsFromDocx(file)).pageContent;
  //   console.log(extractedText);
  // } else {
  //   return json({ error: "Unsupported file format! Please upload PDF or DOCX." }, { status: 400 });
  // }

  // return json({ success: true, extractedText });

  return null;
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;
  const { ref, getFormData } = useFormData();

  const _onSubmit = (event: React.FormEvent) => {
    if (!isLastStep) {
      event.preventDefault();

      setCurrentStep((prev) => prev + 1);
      return;
    }
  };

  console.log("formData", getFormData());

  console.log("actionData", actionData);

  return (
    <Form
      method="post"
      ref={ref}
      onSubmit={_onSubmit}
      className="flex flex-col items-center justify-center"
    >
      <div className="mb-10 flex w-full flex-col items-center justify-between">
        <Stepper currentStep={currentStep} steps={steps} />
      </div>

      <div id="form content" className="w-[630px]">
        <div hidden={currentStep !== 0}>
          <UploadCVStep />
        </div>

        <div hidden={currentStep !== 1}>template</div>

        <div hidden={currentStep !== 2}>job url</div>

        {currentStep === 3 && <div>edit</div>}
      </div>
    </Form>
  );
}
