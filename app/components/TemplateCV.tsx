import { FC, useState } from "react";
import { CVData } from "~/utils/aiEnhancer";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export interface TemplateCVProps {
  data: CVData;
  isModern?: boolean; // Dodajemy ten props, żeby zarządzać szablonem
}

export const TemplateCV: FC<TemplateCVProps> = ({ data, isModern }) => {
  const [cvData, setCVdata] = useState<CVData>(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
  ) => {
    setCVdata((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setCVdata((prevData) => ({
      ...prevData,
      contact: {
        ...prevData.contact,
        [field]: e.target.value,
      },
    }));
  };
  return (
    <div className="flex gap-4 bg-slate-100" id="element-to-pdf">
      {/* PIERWSZA-KOLUMNA */}
      <div className={`flex max-w-60 flex-col gap-5 pl-8 pt-8 ${isModern ? "bg-slate-200" : ""}`}>
        {/* Personal Information */}

        <Input
          type="text"
          value={cvData.name}
          placeholder={cvData.name}
          onChange={(e) => handleChange(e, "name")}
          className="text-2xl font-semibold leading-6"
        />

        <section className="">
          <h3 className="mb-2 text-xs font-bold">KONTAKT</h3>

          <Input
            type="email"
            value={cvData.contact.email}
            placeholder={cvData.contact.email}
            onChange={(e) => handleContactChange(e, "email")}
            className="mb-1 text-xs"
          />

          <Input
            type="tel"
            value={cvData.contact.phone}
            placeholder={cvData.contact.phone}
            onChange={(e) => handleContactChange(e, "phone")}
            className="text-xs"
          />
        </section>

        <section className="pr-4">
          <h3 className="mb-2 text-xs font-bold">PORTFOLIO</h3>
          {data.portfolio && (
            <a
              href={data.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 hover:underline"
            >
              <Input
                type="url"
                value={cvData.portfolio}
                placeholder={cvData.portfolio}
                onChange={(e) => handleChange(e, "portfolio")}
                className="mb-1 text-xs"
              />
            </a>
          )}
          {data.contact.linkedin && (
            <a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 hover:underline"
            >
              <Input
                type="url"
                value={cvData.contact.linkedin}
                placeholder={cvData.contact.linkedin}
                onChange={(e) => handleContactChange(e, "linkedin")}
                className="mb-1 text-xs"
              />
            </a>
          )}
        </section>

        {/* Skills */}
        <section className="">
          <h3 className="mb-2 text-xs font-bold">UMIEJĘTNOŚCI</h3>
          <ul>
            {cvData.skills.map((skill, index) => (
              <li key={index} className="mb-1 text-xs">
                <Input
                  type="text"
                  value={skill}
                  placeholder={skill}
                  onChange={(e) => {
                    const updatedSkills = [...cvData.skills];
                    updatedSkills[index] = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, skills: updatedSkills }));
                  }}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Technologies */}
        <section className="">
          <h3 className="mb-2 text-xs font-bold">TECHNOLOGIE</h3>
          <ul>
            {cvData.technologies.map((technoItem, index) => (
              <li key={index} className="mb-1 text-xs text-[#474F53]">
                <Input
                  type="text"
                  value={technoItem}
                  placeholder={technoItem}
                  onChange={(e) => {
                    const updatedTechnologies = [...cvData.technologies];
                    updatedTechnologies[index] = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, technologies: updatedTechnologies }));
                  }}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Certificates */}
        <section className="pr-12">
          <h3 className="mb-2 text-xs font-bold">CERTYFIKATY</h3>
          {cvData.certificates.map((cert, index) => (
            <div
              key={index}
              className="mb-1 flex items-center justify-between text-xs text-[#474F53]"
            >
              <Input
                type="text"
                value={cert.certTitle}
                placeholder={cert.certTitle}
                onChange={(e) => {
                  const updatedCertificates = [...cvData.certificates];
                  updatedCertificates[index].certTitle = e.target.value;
                  setCVdata((prevData) => ({ ...prevData, certificates: updatedCertificates }));
                }}
              />

              <Input
                type="text"
                value={cert.certDate}
                placeholder={cert.certDate}
                onChange={(e) => {
                  const updatedCertificates = [...cvData.certificates];
                  updatedCertificates[index].certDate = e.target.value;
                  setCVdata((prevData) => ({ ...prevData, certificates: updatedCertificates }));
                }}
              />
            </div>
          ))}
        </section>

        {/* Clause */}
        <section className="pb-8 pr-7">
          <h3 className="mb-2 text-xs font-bold">KLAUZULA</h3>
          <p className="text-[8px] font-normal text-[#474F53]">
            Wyrażam zgode na przetwarzanie moich danych osobowych przez{" "}
            <Input
              type="text"
              value={cvData.company}
              placeholder={cvData.company}
              onChange={(e) => handleChange(e, "company")}
              className="text-[8px] font-black"
            />
            w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.
          </p>
        </section>
      </div>
      {/* DRUGA-KOLUMNA */}
      <div className="flex flex-col gap-5 pr-8 pt-8">
        CV -
        <Input
          type="text"
          value={cvData.positionTitle}
          placeholder={cvData.positionTitle}
          onChange={(e) => handleChange(e, "position title")}
          className="text-base font-normal text-[#838994]"
        />
        {/* Summary */}
        <section>
          <h3 className="mb-2 gap-2 text-xs font-bold">O MNIE</h3>

          <Textarea
            placeholder={cvData.summary}
            onChange={(e) => handleChange(e, "summary")}
            className="resize-none text-xs font-normal text-[#474F53]"
          />
        </section>
        {/* Experience */}
        <section>
          <h3 className="mb-2 text-xs font-bold">DOŚWIADCZENIE</h3>
          {cvData.experience.map((job, index) => (
            <div key={index}>
              <p className="mb-1 flex gap-1 text-xs font-normal text-[#838994]">
                <Input
                  type="text"
                  placeholder={job.company}
                  onChange={(e) => {
                    const updatedExperience = [...cvData.experience];
                    updatedExperience[index].company = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, experience: updatedExperience }));
                  }}
                  className="underline"
                />

                <Input
                  type="text"
                  placeholder={job.companyType}
                  onChange={(e) => {
                    const updatedExperience = [...cvData.experience];
                    updatedExperience[index].companyType = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, experience: updatedExperience }));
                  }}
                />

                <Input
                  type="text"
                  placeholder={job.sector}
                  onChange={(e) => {
                    const updatedExperience = [...cvData.experience];
                    updatedExperience[index].sector = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, experience: updatedExperience }));
                  }}
                />
              </p>
              <h4 className="flex items-center justify-between text-base font-semibold">
                <Input
                  type="text"
                  placeholder={job.position}
                  onChange={(e) => {
                    const updatedExperience = [...cvData.experience];
                    updatedExperience[index].position = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, experience: updatedExperience }));
                  }}
                />

                <Input
                  type="text"
                  placeholder={job.duration}
                  onChange={(e) => {
                    const updatedExperience = [...cvData.experience];
                    updatedExperience[index].duration = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, experience: updatedExperience }));
                  }}
                  className="text-xs font-normal text-[#838994]"
                />
              </h4>

              <Textarea
                placeholder={job.description}
                onChange={(e) => handleChange(e, "job description")}
                className="rezize-none text-xs font-normal text-[#474F53]"
              />
            </div>
          ))}
        </section>
        {/* Education */}
        <section>
          <h3 className="mb-2 text-xs font-bold">WYKSZTAŁCENIE</h3>
          {cvData.education.map((edu, index) => (
            <div key={index}>
              <Input
                type="text"
                placeholder={edu.institution}
                onChange={(e) => {
                  const updatedEducation = [...cvData.education];
                  updatedEducation[index].institution = e.target.value;
                  setCVdata((prevData) => ({ ...prevData, education: updatedEducation }));
                }}
                className="mb-1 text-xs font-normal text-[#838994]"
              />

              <div className="flex items-center justify-between">
                <p className="text-base font-normal">
                  <Input
                    type="text"
                    placeholder={edu.degree}
                    onChange={(e) => {
                      const updatedEducation = [...cvData.education];
                      updatedEducation[index].degree = e.target.value;
                      setCVdata((prevData) => ({ ...prevData, education: updatedEducation }));
                    }}
                  />{" "}
                  i
                  <Input
                    type="text"
                    placeholder={edu.fieldOfStudy}
                    onChange={(e) => {
                      const updatedEducation = [...cvData.education];
                      updatedEducation[index].fieldOfStudy = e.target.value;
                      setCVdata((prevData) => ({ ...prevData, education: updatedEducation }));
                    }}
                  />
                </p>

                <Input
                  type="text"
                  placeholder={edu.duration}
                  onChange={(e) => {
                    const updatedEducation = [...cvData.education];
                    updatedEducation[index].duration = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, education: updatedEducation }));
                  }}
                  className="text-xs font-normal text-[#838994]"
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
