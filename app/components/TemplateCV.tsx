import { FC } from "react";

export type ContactType = {
  phone: string;
  email: string;
  linkedin?: string;
};

export type ExperienceType = {
  company: string;
  sector: string;
  companyType: string;
  position: string;
  duration: string;
  description: string;
};

export type EducationType = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  duration: string;
};

export type CertificateType = {
  certTitle: string;
  certDate: string;
};

export type ClasicCVTemplate = {
  isModern: boolean | undefined;
  header: string;
  subHeader: string;
  name: string;
  positionTitle: string;
  portfolio?: string;
  contact: ContactType;
  technologies: string[];
  summary: string;
  experience: ExperienceType[];
  education: EducationType[];
  skills: string[];
  certyficates: CertificateType[];
  company: string;
};

export interface TemplateCVProps {
  data: ClasicCVTemplate;
  isModern?: boolean; // Dodajemy ten props, żeby zarządzać szablonem
}

export const TemplateCV: FC<TemplateCVProps> = ({ data, isModern }) => {
  return (
    <div className="flex w-full max-w-[628px] gap-4 pb-8 pl-8 pr-6 pt-8">
      {/* PIERWSZA-KOLUMNA */}
      <div className={`flex max-w-56 flex-col gap-5 pl-8 pt-8 ${isModern ? "bg-slate-200" : ""}`}>
        {/* Personal Information */}
        <h1 className="text-2xl font-semibold leading-6">{data.name}</h1>
        <section className="">
          <h3 className="mb-2 text-xs font-bold">KONTAKT</h3>
          <p className="mb-1 text-xs">{data.contact.email}</p>
          <p className="text-xs">{data.contact.phone}</p>
        </section>

        <section className="pr-4">
          <h3 className="mb-2 text-xs font-bold">PORTFOLIO</h3>
          {data.portfolio && (
            <p className="mb-1 text-xs">
              <a
                href={data.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 hover:underline"
              >
                {data.portfolio}
              </a>
            </p>
          )}
          {data.contact.linkedin && (
            <p className="mb-1 text-xs">
              <a
                href={data.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 hover:underline"
              >
                {data.contact.linkedin}
              </a>
            </p>
          )}
        </section>

        {/* Skills */}
        <section className="">
          <h3 className="mb-2 text-xs font-bold">UMIEJĘTNOŚCI</h3>
          <ul>
            {data.skills.map((skill, index) => (
              <li key={index} className="mb-1 text-xs">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        {/* Technologies */}
        <section className="">
          <h3 className="mb-2 text-xs font-bold">TECHNOLOGIE</h3>
          <ul>
            {data.technologies.map((technoItem, index) => (
              <li key={index} className="mb-1 text-xs text-[#474F53]">
                {technoItem}
              </li>
            ))}
          </ul>
        </section>

        {/* Certificates */}
        <section className="pr-12">
          <h3 className="mb-2 text-xs font-bold">CERTYFIKATY</h3>
          {data.certyficates.map((cert, index) => (
            <div
              key={index}
              className="mb-1 flex items-center justify-between text-xs text-[#474F53]"
            >
              <span>{cert.certTitle}</span>
              <span>{cert.certDate}</span>
            </div>
          ))}
        </section>

        {/* Clause */}
        <section className="pb-40 pr-7">
          <h3 className="mb-2 text-xs font-bold">KLAUZULA</h3>
          <p className="text-[8px] font-normal text-[#474F53]">
            Wyrażam zgode na przetwarzanie moich danych osobowych przez{" "}
            <span className="text-[8px] font-black">{data.company}</span> w celu prowadzenia
            rekrutacji na aplikowane przeze mnie stanowisko.
          </p>
        </section>
      </div>
      {/* DRUGA-KOLUMNA */}
      <div className="flex max-w-[342px] flex-col gap-5 pb-36 pl-8 pt-8">
        <h2 className="text-base font-normal text-[#838994]">CV - {data.positionTitle}</h2>
        {/* Summary */}
        <section className="mb-6">
          <h3 className="mb-2 gap-2 text-xs font-bold">O MNIE</h3>
          <p className="text-xs font-normal text-[#474F53]">{data.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h3 className="mb-4 gap-2 text-xs font-bold">DOŚWIADCZENIE</h3>
          {data.experience.map((job, index) => (
            <div key={index}>
              <p className="mb-1 flex gap-1 text-xs font-normal text-[#838994]">
                <span className="underline">{job.company}</span>
                <span>{job.companyType}</span>
                <span>{job.sector}</span>
              </p>
              <h4 className="flex items-center justify-between text-base font-semibold">
                <span>{job.position}</span>
                <span className="text-xs font-normal text-[#838994]">{job.duration}</span>
              </h4>
              <p className="mb-6 text-xs font-normal text-[#474F53]">{job.description}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-6">
          <h3 className="mb-2 text-xs font-bold">WYKSZTAŁCENIE</h3>
          {data.education.map((edu, index) => (
            <div key={index}>
              <h4 className="mb-1 text-xs font-normal text-[#838994]">{edu.institution}</h4>
              <div className="flex items-center justify-between">
                <p className="text-base font-normal">
                  {edu.degree} i {edu.fieldOfStudy}
                </p>
                <span className="text-xs font-normal text-[#838994]">{edu.duration}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
