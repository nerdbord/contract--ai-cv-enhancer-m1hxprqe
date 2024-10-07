type ClasicCVTemplate = {
  header: string;
  subHeader: string;
  name: string;
  positionTitle: string;
  portfolio?: string;
  contact: {
    phone: string;
    email: string;
    linkedin?: string;
  };
  technogies: string[];
  summary: string;
  experience: Array<{
    company: string;
    sector: string;
    companyType: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    duration: string;
  }>;
  skills: string[];
  certyficates: Array<{ certTitle: string; certDate: string }>;
  company: string;
};

interface TemplateCVProps {
  data: ClasicCVTemplate;
}

export const TemplateCV: React.FC<TemplateCVProps> = ({ data }) => {
  return (
    <div className="">
      {/* Header */}
      <header className="">
        {/* Person name ???? */}
        <h1>{data.header}</h1>
        <h2>{data.name}</h2>
        {/* Job position ???? */}
        <h3>{data.subHeader}</h3>
        <h3>CV - {data.positionTitle}</h3>
      </header>

      <div className="PIERWSZA-KOLUMNA">
        {/* Personal Information */}
        <section className="">
          <h3>KONTAKT</h3>
          <p>{data.contact.email}</p>
          <p>{data.contact.phone}</p>
          {data.contact.linkedin && <p>{data.contact.linkedin}</p>}
        </section>
        <section>
          <h3>PORTFOLIO</h3>
          {data.portfolio && <p>{data.portfolio}</p>}
        </section>

        {/* Skills */}
        <section className="">
          <h3>UMIEJĘTNOŚCI</h3>
          <ul>
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
        {/* Tech Stack */}
        <section className="">
          <h3>TECHNOLOGIE</h3>
          <ul>
            {data.technologies.map((technoItem, index) => (
              <li key={index}>{technoItem}</li>
            ))}
          </ul>
        </section>

        {/* Certificates */}
        <section className="">
          <h3>CERTYFIKATY</h3>
          {data.certyficates.map((cert, index) => (
            <div key={index}>
              <span>{cert.certTitle}</span>
              <span>{cert.certDate}</span>
            </div>
          ))}
        </section>

        {/* Klauzula */}
        <section>
          <h3>KLAUZULA</h3>
          <p>
            Wyrażam zgode na przetwarzanie moich danych osobowych przez {data.company} w celu
            prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.
          </p>
        </section>
      </div>
      <div className="DRUGA-KOLUMNA">
        {/* Summary */}
        <section className="">
          <h3>O MNIE</h3>
          <p>{data.summary}</p>
        </section>

        {/* Work Experience */}
        <section className="">
          <h3>DOŚWIADCZENIE</h3>
          {data.experience.map((job, index) => (
            <div key={index}>
              <p>
                {job.company} {job.companyType} {job.sector}
              </p>
              <h4>
                {job.position} <span>{job.duration}</span>
              </h4>
              <p>{job.description}</p>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="">
          <h3>WYKSZTAŁCENIE</h3>
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
