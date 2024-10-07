import { Label } from "@radix-ui/react-label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/components/ui/card";

export const UploadCVStep = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-center text-5xl font-extrabold leading-tight">
        Poprawimy Twoje CV <br /> i <span className="text-violet-800">dopasujemy do oferty</span>,
        na <br />
        którą chcesz aplikować
      </h1>

      <Card className="rounded-[38px] border-2 border-violet-900 bg-transparent text-center">
        <CardHeader>
          <CardTitle>Wrzuć swoje CV</CardTitle>
        </CardHeader>

        <CardContent>
          <p>Przeciągnij plik i upuść z pulpitu lub wybierz plik poprzez przycisk poniżej.</p>

          <p>
            Obsługujemy formaty <strong>DOCX</strong> i <strong>PDF</strong>.
          </p>
        </CardContent>

        <CardFooter className="justify-center">
          <div>
            <Label htmlFor="cv">Wybierz plik z dysku</Label>

            <input
              id="cv"
              type="file"
              name="cv"
              accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              hidden
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
