import { useUser } from "@clerk/remix";
import { CVSkeleton } from "~/components/CVSkeleton";
import { TemplateCV } from "~/components/TemplateCV";
import { Button } from "~/components/ui/button";
import { ActionData } from "~/routes/_index";

type SummaryStepProps = {
  summary: ActionData | undefined;
  goBack: () => void;
};

export const SummaryStep = ({ summary, goBack }: SummaryStepProps) => {
  const { isSignedIn } = useUser();

  const handleDownload = () => {
    console.log("Downloading CV...");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-center text-3xl font-semibold text-slate-900">
        Sprawdź, jak dopasowaliśmy Twoje CV, i, jeśli chcesz, edytuj je dalej
      </h1>

      <div className="flex items-center gap-4">
        <Button type="button" onClick={goBack} variant={"outline"} className="opacity-30">
          Wróć
        </Button>

        <Button disabled={!summary || !isSignedIn} type="button" onClick={handleDownload}>
          Pobierz
        </Button>
      </div>

      {!summary ? (
        <CVSkeleton />
      ) : summary.error ? (
        <p>Error</p>
      ) : (
        <TemplateCV data={summary.enhancedCV} isModern={summary.cvStyle === "modern"} />
      )}
    </div>
  );
};
