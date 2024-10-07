import { Label } from "@radix-ui/react-label";
import { AlertCircle } from "lucide-react";
import { useRef, useState } from "react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

export const UploadCVStep = () => {
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (
      file.type !== "application/pdf" &&
      file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setError("Nieprawidłowy format pliku. Obsługujemy tylko DOCX i PDF.");
      return;
    }

    submitButtonRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-center text-5xl font-extrabold leading-tight">
        Poprawimy Twoje CV <br /> i <span className="text-violet-800">dopasujemy do oferty</span>,
        na <br />
        którą chcesz aplikować
      </h1>

      <Card
        className={cn(
          "min-h-64 w-full rounded-[38px] border-2 bg-transparent text-center",
          error ? "border-red-600" : "border-violet-900",
        )}
      >
        <CardHeader>
          <CardTitle>Wrzuć swoje CV</CardTitle>
        </CardHeader>

        <CardContent>
          <p>
            Przeciągnij plik z Twojego komputera i upuść tutaj lub wybierz plik poprzez przycisk
            poniżej. Obsługujemy formaty <strong>DOCX</strong> i <strong>PDF</strong>.
          </p>
        </CardContent>

        <CardFooter className="justify-center gap-6">
          <div>
            <Label
              htmlFor="cv"
              className="flex h-10 cursor-pointer items-center rounded-md bg-violet-900 px-4 py-2 text-sm font-medium text-white"
            >
              Wybierz plik z dysku
            </Label>

            <Input
              id="cv"
              type="file"
              name="cv"
              accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          <Button className="hidden" type="submit" ref={submitButtonRef}>
            Wybierz szablon
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant={"destructive"} className="border-none p-0">
          <AlertDescription className="flex items-center gap-2">
            <AlertCircle /> Plik nie jest zgodny z tymi, które obsługujemy. Wrzuć plik DOCX lub PDF.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
