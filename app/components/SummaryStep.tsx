import { useUser } from "@clerk/remix";
import { TemplateCV } from "~/components/TemplateCV";
import { Button } from "~/components/ui/button";
import { ActionData } from "~/routes/_index";

type SummaryStepProps = {
  summary: ActionData | undefined;
};

export const SummaryStep = ({ summary }: SummaryStepProps) => {
  const { isSignedIn } = useUser();

  const handleDownload = () => {
    console.log("Downloading CV...");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-center text-3xl font-semibold text-slate-900">
        Sprawdź, jak dopasowaliśmy Twoje CV, i, jeśli chcesz, edytuj je dalej
      </h1>

      <Button disabled={!summary || !isSignedIn} type="button" onClick={handleDownload}>
        Pobierz
      </Button>

      {!summary ? (
        "skeleton"
      ) : summary.error ? (
        <p>Error</p>
      ) : (
        <TemplateCV data={summary.enhancedCV} isModern={summary.cvStyle === "modern"} />
      )}
    </div>
  );
};
