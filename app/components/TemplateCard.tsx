import { cn } from "~/lib/utils";

type TemplateCardProps = {
  onChoose: () => void;
  choosen: boolean;
  title: string;
  imgSrc: string;
  alt: string;
};

export const TemplateCard = ({ onChoose, choosen, title, imgSrc, alt }: TemplateCardProps) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-center text-black">{title}</p>

      <button
        type="button"
        onClick={onChoose}
        className={cn("transition duration-300", choosen ? "border-2 border-violet-900" : "")}
      >
        <img src={imgSrc} alt={alt} />
      </button>
    </div>
  );
};
