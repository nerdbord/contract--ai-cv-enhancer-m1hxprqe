import { Button } from "~/components/ui/button";
import { ActionData } from "~/routes/_index";

type SummaryStepProps = {
  summary: ActionData | undefined;
};

export const SummaryStep = ({ summary }: SummaryStepProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-center text-3xl font-semibold text-slate-900">
        Sprawdź, jak dopasowaliśmy Twoje CV, i, jeśli chcesz, edytuj je dalej
      </h1>

      <Button disabled={!summary} type="button">
        Pobierz
      </Button>

      {!summary ? "skeleton" : <div>wygenerowane cv</div>}
    </div>
  );
};
