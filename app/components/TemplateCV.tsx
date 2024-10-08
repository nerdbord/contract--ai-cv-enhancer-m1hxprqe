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
}

export const TemplateCV: React.FC<TemplateCVProps> = ({ data }) => {
  return (
    <div className="flex w-full max-w-[628px] gap-4 pb-8 pl-8 pr-6 pt-8">
      {/* Header */}
      {/* <header className="">
        <h1>{data.header}</h1>
        <h2>{data.name}</h2>
        <h3>{data.subHeader}</h3>
        <h3>CV - {data.positionTitle}</h3>
      </header> */}

      {/* PIERWSZA-KOLUMNA */}
      <div className="flex max-w-56 flex-col gap-5">
        {/* Personal Information */}
        <h1 className="text-2xl font-semibold leading-6">{data.name}</h1>
        <section className="">
          <h3 className="gap-2 text-xs font-bold">KONTAKT</h3>
          <p>{data.contact.email}</p>
          <p>{data.contact.phone}</p>
          {data.contact.linkedin && <p>{data.contact.linkedin}</p>}
        </section>

        <section>
          <h3 className="gap-2 text-xs font-bold">PORTFOLIO</h3>
          {data.portfolio && <p>{data.portfolio}</p>}
        </section>

        {/* Skills */}
        <section className="">
          <h3 className="gap-2 text-xs font-bold">UMIEJĘTNOŚCI</h3>
          <ul>
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        {/* Technologies */}
        <section className="">
          <h3 className="gap-2 text-xs font-bold">TECHNOLOGIE</h3>
          <ul>
            {data.technologies.map((technoItem, index) => (
              <li key={index}>{technoItem}</li>
            ))}
          </ul>
        </section>

        {/* Certificates */}
        <section className="">
          <h3 className="gap-2 text-xs font-bold">CERTYFIKATY</h3>
          {data.certyficates.map((cert, index) => (
            <div key={index}>
              <span>{cert.certTitle}</span>
              <span>{cert.certDate}</span>
            </div>
          ))}
        </section>

        {/* Clause */}
        <section>
          <h3 className="mb-2 text-xs font-bold">KLAUZULA</h3>
          <p className="text-[8px] font-normal text-[#474F53]">
            Wyrażam zgode na przetwarzanie moich danych osobowych przez{" "}
            <span className="text-[8px] font-black">{data.company}</span> w celu prowadzenia
            rekrutacji na aplikowane przeze mnie stanowisko.
          </p>
        </section>
      </div>
      {/* DRUGA-KOLUMNA */}
      <div className="flex max-w-[342px] flex-col gap-5">
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
