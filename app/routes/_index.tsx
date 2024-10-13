import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData, Form, json } from "@remix-run/react";
import { useState } from "react";

import { Stepper } from "~/components/Stepper";
import { UploadCVStep } from "~/components/UploadCVStep";
import { TemplateStep } from "~/components/TemplateStep";
import { JobUrlStep } from "~/components/JobUrlStep";
import { SummaryStep } from "~/components/SummaryStep";
import { getExtractedText } from "~/utils/getDocsFromFile";
import { getJobDescription } from "~/utils/jobScraper";
import { CVData, enhance } from "~/utils/aiEnhancer";

export const meta: MetaFunction = () => {
  return [
    { title: "AI cv enhancer app." },
    { name: "description", content: "Welcome to AI CV enhancer app!" },
  ];
};

export interface ActionData {
  success?: boolean;
  error?: string;
  enhancedCV: CVData;
  cvStyle: "modern" | "classic";
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
  try {
    const formData = await request.formData();

    const formObject = Object.fromEntries(formData) as {
      cv: File;
      cvStyle: "modern" | "classic";
      jobUrl: string;
    };

    const { cv, cvStyle, jobUrl } = formObject;

    if (!cv || !cvStyle || !jobUrl) {
      throw new Error("Form data is missing required fields");
    }

    // Wyciąganie tekstu z pliku
    const extractedText = await getExtractedText(cv);

    // Scraping the job URL
    const jobDescription = await getJobDescription(jobUrl);

    // Enhance CV
    const enhancedCV = await enhance(extractedText, jobDescription);

    return json({ success: true, enhancedCV: enhancedCV.enhancedCv, cvStyle: cvStyle });
  } catch (error) {
    console.log(error);
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong! Try again.",
    });
  }
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const [currentStep, setCurrentStep] = useState(0);
  const isOneBeforeLastStep = currentStep === steps.length - 2;

  // const navigate = useNavigate();
  // const location = useLocation();

  // // Funkcja zmieniająca URL bez przeładowania strony
  // const updateUrl = (step: number) => {
  //   const newUrl = new URLSearchParams(location.search);
  //   newUrl.set("step", String(step));
  //   navigate(`/?${newUrl.toString()}`, { replace: true });
  // };

  // // Funkcja obsługująca formularz (zmiana kroku)
  // const _onSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   const nextStep = currentStep + 1;
  //   setCurrentStep(nextStep);
  //   updateUrl(nextStep);
  // };

  // // Odczytywanie kroku z URL podczas pierwszego renderu
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const stepFromUrl = params.get("step");
  //   if (stepFromUrl) {
  //     setCurrentStep(Number(stepFromUrl));
  //   }
  // }, [location.search]);

  // return (
  //   <Form method="post" onSubmit={_onSubmit} className="flex flex-col items-center justify-center">
  //     <div className="mb-10 flex w-full flex-col items-center justify-between">
  //       <Stepper currentStep={currentStep} steps={steps} />
  //     </div>

  //     <div id="form_content" className="w-[630px]">
  //       <div hidden={currentStep !== 0}>
  //         <UploadCVStep />
  //       </div>

  //       <div hidden={currentStep !== 1}>
  //         <TemplateStep />
  //       </div>

  //       <div hidden={currentStep !== 2}>
  //         <JobUrlStep />
  //       </div>

  //       {currentStep === 3 && (
  //         <div>
  //           <SummaryStep summary={actionData} />
  //         </div>
  //       )}
  //     </div>
  //   </Form>
  // );

  const _onSubmit = (event: React.FormEvent) => {
    if (!isOneBeforeLastStep) {
      event.preventDefault();

      setCurrentStep((prev) => prev + 1);
      return;
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  console.log("actionData", actionData);

  return (
    <Form
      method="post"
      onSubmit={_onSubmit}
      className="flex flex-col items-center justify-center"
      encType="multipart/form-data"
    >
      <div className="mb-10 flex w-full flex-col items-center justify-between">
        <Stepper currentStep={currentStep} steps={steps} />
      </div>

      <div id="form_content" className="w-[630px]">
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
