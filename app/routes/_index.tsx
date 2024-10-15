import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { useActionData, Form, json, useNavigate, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";
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
    { title: "AI CV Enhancer App" },
    { name: "description", content: "Enhance your CV with AI" },
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

    // Extract text from the uploaded CV
    const extractedText = await getExtractedText(cv);

    // Scrape the job URL for description
    const jobDescription = await getJobDescription(jobUrl);

    // Enhance CV with AI
    const enhancedCV = await enhance(extractedText, jobDescription);

    return json({ success: true, enhancedCV: enhancedCV.enhancedCv, cvStyle });
  } catch (error) {
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong! Try again.",
    });
  }
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(0);

  const [cv, setCv] = useState<File | null>(null);
  const [cvStyle, setCvStyle] = useState<"modern" | "classic">("classic");
  const [jobUrl, setJobUrl] = useState("");

  // Synchronize step with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stepFromUrl = params.get("step");
    if (stepFromUrl) {
      setCurrentStep(Number(stepFromUrl));
    }
  }, [location.search]);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    const savedCv = localStorage.getItem("cv");
    const savedCvStyle = localStorage.getItem("cvStyle");
    const savedJobUrl = localStorage.getItem("jobUrl");

    if (savedCv) setCv(JSON.parse(savedCv));
    if (savedCvStyle) setCvStyle(savedCvStyle as "modern" | "classic");
    if (savedJobUrl) setJobUrl(savedJobUrl);
  }, []);

  // Save data to localStorage when they change
  useEffect(() => {
    if (cv) localStorage.setItem("cv", JSON.stringify(cv));
    localStorage.setItem("cvStyle", cvStyle);
    localStorage.setItem("jobUrl", jobUrl);
  }, [cv, cvStyle, jobUrl]);

  // useEffect(() => {
  //   localStorage.setItem("cvStyle", cvStyle);
  // }, [cvStyle]);

  // useEffect(() => {
  //   localStorage.setItem("jobUrl", jobUrl);
  // }, [jobUrl]);

  // Update URL when step changes
  const updateUrl = (step: number) => {
    const newUrl = new URLSearchParams(location.search);
    newUrl.set("step", String(step));
    navigate(`/?${newUrl.toString()}`, { replace: true });
  };

  const goNextStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    updateUrl(nextStep);
  };

  const _onPrevious = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    updateUrl(prevStep);
  };

  const _onSubmit = (event: React.FormEvent) => {
    if (currentStep < steps.length - 1) {
      event.preventDefault(); // Only prevent form submission for steps 1-3
      goNextStep();
    }
  };

  return (
    <Form
      method="post"
      onSubmit={_onSubmit}
      encType="multipart/form-data"
      className="flex flex-col items-center justify-center"
    >
      <div className="mb-10 flex w-full flex-col items-center justify-between">
        <Stepper currentStep={currentStep} steps={steps} />
      </div>

      <div id="form_content" className="w-[630px]">
        <div hidden={currentStep !== 0}>
          <UploadCVStep setCv={setCv} />
        </div>

        <div hidden={currentStep !== 1}>
          <TemplateStep goBack={_onPrevious} setCvStyle={setCvStyle} />
        </div>

        <div hidden={currentStep !== 2}>
          <JobUrlStep goBack={_onPrevious} setJobUrl={setJobUrl} />
        </div>

        {currentStep === 3 && (
          <div>
            <SummaryStep summary={actionData} goBack={_onPrevious} />
          </div>
        )}
      </div>
    </Form>
  );
}
