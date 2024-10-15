import { AlertCircle } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

type JobUrlStepProps = {
  goBack: () => void;
};

export const JobUrlStep = ({ goBack }: JobUrlStepProps) => {
  const [jobUrl, setJobUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;

    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      setError("Dodany link nie jest prawidłowy. Spróbuj jeszcze raz.");
      return;
    }

    setError(null);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-center text-3xl font-semibold text-slate-900">
        Dodaj link do oferty, na którą chcesz aplikować
      </h1>

      <div className="flex w-full flex-col items-center gap-2">
        <Input
          type="url"
          name="jobUrl"
          placeholder="https://ofertapracy.pl"
          className={cn(
            "w-full border-violet-400 bg-transparent text-black placeholder:text-violet-200",
            error ? "border-red-600" : "",
          )}
          onChange={(e) => setJobUrl(e.target.value)}
          onBlur={handleBlur}
          value={jobUrl}
        />

        {error && (
          <Alert variant={"destructive"} className="border-none p-0">
            <AlertDescription className="flex items-center justify-center gap-2">
              <AlertCircle /> Dodany link nie jest prawidłowy. Spróbuj jeszcze raz.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button type="button" onClick={goBack} variant={"outline"} className="opacity-30">
          Wróć
        </Button>

        <Button disabled={jobUrl === "" || !!error} type="submit">
          Dostosuj z AI i edytuj CV
        </Button>
      </div>
    </div>
  );
};
