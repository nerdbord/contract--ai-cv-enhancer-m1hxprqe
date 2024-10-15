import { useUser } from "@clerk/remix";
import { CVSkeleton } from "~/components/CVSkeleton";
import { TemplateCV } from "~/components/TemplateCV";
import { Button } from "~/components/ui/button";
import { ActionData } from "~/routes/_index";

import { useEffect, useState } from "react";
import { generatePDF } from "~/utils/generatePDF";

type SummaryStepProps = {
  summary: ActionData | undefined;
  goBack: () => void;
};

export const SummaryStep = ({ summary, goBack }: SummaryStepProps) => {
  const { isSignedIn } = useUser();
  const [data, setData] = useState<ActionData | null>(null);

  const handleDownload = async () => {
    console.log("Downloading CV...");
    const element = document.getElementById("element-to-pdf");

    if (!element) return;

    try {
      await generatePDF(element, data?.enhancedCV.name || "CV");
    } catch (error) {
      console.log("Error during generating PDF:", error);
    }
  };

  useEffect(() => {
    if (summary) {
      setData(summary);
    }
  }, [summary]);

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-center text-3xl font-semibold text-slate-900">
        Sprawdź, jak dopasowaliśmy Twoje CV, i, jeśli chcesz, edytuj je dalej
      </h1>

      <div className="flex items-center gap-4">
        <Button type="button" onClick={goBack} variant={"outline"} className="opacity-30">
          Wróć
        </Button>

        <Button disabled={!data || !isSignedIn} type="button" onClick={handleDownload}>
          Pobierz
        </Button>
      </div>

      {!data ? (
        <CVSkeleton />
      ) : data.error ? (
        <p>Error</p>
      ) : (
        <div className="max-h-[1122px] w-full max-w-[794px]">
          <TemplateCV data={data.enhancedCV} isModern={data.cvStyle === "modern"} />
        </div>
      )}
    </div>
  );
};
