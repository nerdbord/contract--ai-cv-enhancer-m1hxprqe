import { useActionData } from "@remix-run/react";
import { ClasicCVTemplate, TemplateCV } from "~/components/TemplateCV";

const exampleData: ClasicCVTemplate = {
  header: "CV Profesjonalne",
  subHeader: "Specjalista IT",
  name: "Jan Kowalski",
  positionTitle: "Frontend Developer",
  portfolio: "https://portfolio-jankowalski.dev",
  contact: {
    phone: "+48 123 456 789",
    email: "jan.kowalski@example.com",
    linkedin: "https://linkedin.com/in/jankowalski",
  },
  technologies: ["React", "TypeScript", "Next.js", "CSS", "HTML"],
  summary:
    "Doświadczony frontend developer z pasją do tworzenia interaktywnych aplikacji webowych. Specjalizuję się w nowoczesnych technologiach, takich jak React i Next.js.",
  experience: [
    {
      company: "Tech Solutions",
      sector: "IT",
      companyType: "Firma prywatna",
      position: "Senior Frontend Developer",
      duration: "2020 - obecnie",
      description:
        "Opracowywanie i wdrażanie nowoczesnych interfejsów użytkownika dla klientów korporacyjnych z wykorzystaniem React i TypeScript.",
    },
    {
      company: "WebDev Inc.",
      sector: "IT",
      companyType: "Startup",
      position: "Frontend Developer",
      duration: "2017 - 2020",
      description:
        "Tworzenie responsywnych stron internetowych oraz aplikacji SPA przy użyciu JavaScript, React i innych nowoczesnych narzędzi.",
    },
  ],
  education: [
    {
      institution: "Politechnika Warszawska",
      degree: "Inżynier Informatyki",
      fieldOfStudy: "Informatyka",
      duration: "2013 - 2017",
    },
  ],
  skills: [
    "Programowanie",
    "Rozwiązywanie problemów",
    "Praca w zespole",
    "Testowanie aplikacji",
    "Git",
  ],
  certyficates: [
    {
      certTitle: "Certyfikat JavaScript Developer",
      certDate: "2021",
    },
    {
      certTitle: "Certyfikat React Advanced",
      certDate: "2022",
    },
  ],
  company: "Tech Solutions",
};

export default function Cv() {
  const actionData = useActionData<{ cvData: ClasicCVTemplate }>();
  //   na potrzeby przetestowania komponentu wstawiam randomowe dane:
  const data = actionData?.cvData || exampleData;
  //   po przetestowaniu usunę powyższe a odkomentuję Loading...
  //   if (!actionData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="">Your Generated CV</h1>
      <TemplateCV data={data} />
      {/* <TemplateCV data={actionData.cvData} /> */}
    </div>
  );
}
