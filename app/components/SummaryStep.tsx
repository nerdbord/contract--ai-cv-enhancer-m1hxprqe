import { useUser } from "@clerk/remix";
import { CVSkeleton } from "~/components/CVSkeleton";
import { TemplateCV } from "~/components/TemplateCV";
import { Button } from "~/components/ui/button";
import { ActionData } from "~/routes/_index";

import { useEffect, useState } from "react";

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

    const htmlContent = `
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_PDF_ENDPOINT_API_KEY}`,
      },
      body: JSON.stringify({
        html: htmlContent,
        delivery_mode: "inline",
        zoom: 1.2,
      }),
    };

    try {
      const response = await fetch("https://api.pdfendpoint.com/v1/convert", options);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `CV_${data?.enhancedCV.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error:", error);
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
