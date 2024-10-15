import { useState } from "react";
import { TemplateCard } from "~/components/TemplateCard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export type CVTemplateName = "classic" | "modern";

type TemplateStepProps = {
  goBack: () => void;
  setCvStyle: React.Dispatch<React.SetStateAction<CVTemplateName>>;
};

export const TemplateStep = ({ goBack }: TemplateStepProps) => {
  const [cvStyle, setCvStyle] = useState<CVTemplateName | null>(null);

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-center text-3xl font-semibold text-slate-900">
        Wybierz szablon, którego mamy użyć do wygenerowania Twojego CV
      </h1>

      <div className="grid grid-cols-2 gap-5">
        <TemplateCard
          onChoose={() => setCvStyle("classic")}
          choosen={cvStyle === "classic"}
          imgSrc="/cv-templates/classic.png"
          alt="Classic CV template"
          title="Klasyczny"
        />

        <TemplateCard
          onChoose={() => setCvStyle("modern")}
          choosen={cvStyle === "modern"}
          imgSrc="/cv-templates/modern.png"
          alt="Modern CV template"
          title="Nowoczesny"
        />
      </div>

      <Input type="hidden" name="cvStyle" value={cvStyle || ""} />

      <div className="flex items-center gap-4">
        <Button type="button" onClick={goBack} variant={"outline"} className="opacity-30">
          Wróć
        </Button>

        <Button type="submit" disabled={!cvStyle}>
          Dodaj link do ogłoszenia
        </Button>
      </div>
    </div>
  );
};
