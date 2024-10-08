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
        <h1 className="text-2xl font-semibold">{data.name}</h1>
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
          <h3 className="gap-2 text-xs font-bold">KLAUZULA</h3>
          <p>
            Wyrażam zgode na przetwarzanie moich danych osobowych przez {data.company} w celu
            prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.
          </p>
        </section>
      </div>

      <div className="DRUGA-KOLUMNA">
        <h2 className="text-base font-normal">CV - {data.positionTitle}</h2>
        {/* Summary */}
        <section className="">
          <h3 className="gap-2 text-xs font-bold">O MNIE</h3>
          <p className="text-#474F53">{data.summary}</p>
        </section>

        {/* Experience */}
        <section className="">
          <h3 className="gap-2 text-xs font-bold">DOŚWIADCZENIE</h3>
          {data.experience.map((job, index) => (
            <div key={index}>
              <p className="text-#838994 text-xs font-normal">
                {job.company} {job.companyType} {job.sector}
              </p>
              <h4 className="text-base font-semibold">
                {job.position}{" "}
                <span className="text-#838994 text-xs font-normal">{job.duration}</span>
              </h4>
              <p className="text-#474F53">{job.description}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="">
          <h3 className="gap-2 text-xs font-bold">WYKSZTAŁCENIE</h3>
          {data.education.map((edu, index) => (
            <div key={index}>
              <h4>{edu.institution}</h4>
              <p>
                {edu.degree} i {edu.fieldOfStudy} <span>{edu.duration}</span>
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
