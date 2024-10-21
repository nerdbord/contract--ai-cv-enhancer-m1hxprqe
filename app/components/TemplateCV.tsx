import { FC, useState } from "react";
import { CVData } from "~/utils/aiEnhancer";
import { EditableInputField } from "./EditableInputField";
import { EditableTextareaField } from "./EditableTextareaField";

export interface TemplateCVProps {
  data: CVData;
  isModern?: boolean; // Add this prop to manage the template
}

export const TemplateCV: FC<TemplateCVProps> = ({ data, isModern }) => {
  const [cvData, setCvData] = useState<CVData>(data);

  const handleInputChange = (field: keyof CVData, value: string) => {
    setCvData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: keyof CVData["contact"], value: string) => {
    setCvData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  return (
    <div className="flex gap-4 bg-slate-100" id="element-to-pdf">
      {/* FIRST COLUMN */}
      <div className={`flex max-w-60 flex-col gap-5 pl-8 pt-8 ${isModern ? "bg-slate-200" : ""}`}>
        {/* Personal Information */}
        <h1 className="text-2xl font-semibold leading-6">
          <EditableInputField
            elementType="p"
            name="name"
            value={cvData.name}
            className="text-2xl font-semibold leading-6"
            onChange={(value) => handleInputChange("name", value)}
          />
        </h1>
        <section>
          <h3 className="mb-2 text-xs font-bold">KONTAKT</h3>
          <div className="mb-1 text-xs">
            <EditableInputField
              elementType="p"
              name="email"
              value={cvData.contact.email}
              className="text-xs"
              onChange={(value) => handleContactChange("email", value)}
            />
          </div>
          <div className="text-xs">
            <EditableInputField
              elementType="p"
              name="phone"
              value={cvData.contact.phone}
              className="text-xs"
              onChange={(value) => handleContactChange("phone", value)}
            />
          </div>
        </section>

        <section className="pr-4">
          <h3 className="mb-2 text-xs font-bold">PORTFOLIO</h3>
          {cvData.portfolio && (
            <p className="mb-1 text-xs">
              <EditableInputField
                elementType="a"
                name="portfolio"
                value={cvData.portfolio}
                className="hover:text-blue-600 hover:underline"
                onChange={(value) => handleInputChange("portfolio", value)}
              />
            </p>
          )}
          {cvData.contact.linkedin && (
            <p className="mb-1 text-xs">
              <EditableInputField
                elementType="a"
                name="linkedin"
                value={cvData.contact.linkedin}
                className="hover:text-blue-600 hover:underline"
                onChange={(value) => handleContactChange("linkedin", value)}
              />
            </p>
          )}
        </section>

        {/* Skills */}
        <section>
          <h3 className="mb-2 text-xs font-bold">UMIEJĘTNOŚCI</h3>
          <ul>
            {cvData.skills.map((skill, index) => (
              <li key={`skill-${index}`} className="mb-1 text-xs">
                <EditableInputField
                  elementType="span"
                  name={`skill-${index}`}
                  value={skill}
                  className="text-xs"
                  onChange={(value) => {
                    const newSkills = [...cvData.skills];
                    newSkills[index] = value;
                    setCvData((prev) => ({ ...prev, skills: newSkills }));
                  }}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Technologies */}
        <section>
          <h3 className="mb-2 text-xs font-bold">TECHNOLOGIE</h3>
          <ul>
            {cvData.technologies.map((technoItem, index) => (
              <li key={`technoItem-${index}`} className="mb-1 text-xs text-[#474F53]">
                <EditableInputField
                  elementType="span"
                  name={`technoItem-${index}`}
                  value={technoItem}
                  className="text-xs"
                  onChange={(value) => {
                    const newTechnologies = [...cvData.technologies];
                    newTechnologies[index] = value;
                    setCvData((prev) => ({ ...prev, technologies: newTechnologies }));
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
              key={`cert-${index}`}
              className="mb-1 flex items-center justify-between text-xs text-[#474F53]"
            >
              <EditableInputField
                elementType="span"
                name={`certTitle-${index}`}
                value={cert.certTitle}
                className="text-xs"
                onChange={(value) => {
                  const newCertificates = [...cvData.certificates];
                  newCertificates[index].certTitle = value;
                  setCvData((prev) => ({ ...prev, certificates: newCertificates }));
                }}
              />
              <EditableInputField
                elementType="span"
                name={`certDate-${index}`}
                value={cert.certDate}
                className="text-xs"
                onChange={(value) => {
                  const newCertificates = [...cvData.certificates];
                  newCertificates[index].certDate = value;
                  setCvData((prev) => ({ ...prev, certificates: newCertificates }));
                }}
              />
            </div>
          ))}
        </section>

        {/* Clause */}
        <section className="pb-8 pr-7">
          <h3 className="mb-2 text-xs font-bold">KLAUZULA</h3>

          <p className="text-[8px] font-normal text-[#474F53]">
            Wyrażam zgodę na przetwarzanie moich danych osobowych przez{" "}
            <EditableInputField
              value={cvData.company}
              elementType="span"
              name="company"
              onChange={(value) => handleInputChange("company", value)}
              className="text-[8px] font-normal text-[#474F53]"
            />{" "}
            w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.
          </p>
        </section>
      </div>
      {/* SECOND COLUMN */}
      <div className="flex flex-col gap-5 pr-8 pt-8">
        <h2 className="text-base font-normal text-[#838994]">CV - {cvData.positionTitle}</h2>
        {/* Summary */}
        <section>
          <h3 className="mb-2 gap-2 text-xs font-bold">O MNIE</h3>
          <EditableTextareaField
            value={cvData.summary}
            onChange={(value) => handleInputChange("summary", value)}
            className="text-xs font-normal text-[#474F53]"
          />
        </section>

        {/* Experience */}
        <section>
          <h3 className="mb-2 text-xs font-bold">DOŚWIADCZENIE</h3>
          {cvData.experience.map((job, index) => (
            <div key={`job-${index}`}>
              <p className="mb-1 flex gap-1 text-xs font-normal text-[#838994]">
                <EditableInputField
                  elementType="span"
                  name={`company-${index}`}
                  value={job.company}
                  className="text-xs underline"
                  onChange={(value) => {
                    const newExperience = [...cvData.experience];
                    newExperience[index].company = value;
                    setCvData((prev) => ({ ...prev, experience: newExperience }));
                  }}
                />
                <EditableInputField
                  elementType="span"
                  name={`companyType-${index}`}
                  value={job.companyType}
                  className="text-xs"
                  onChange={(value) => {
                    const newExperience = [...cvData.experience];
                    newExperience[index].companyType = value;
                    setCvData((prev) => ({ ...prev, experience: newExperience }));
                  }}
                />
                <EditableInputField
                  elementType="span"
                  name={`sector-${index}`}
                  value={job.sector}
                  className=""
                  onChange={(value) => {
                    const newExperience = [...cvData.experience];
                    newExperience[index].sector = value;
                    setCvData((prev) => ({ ...prev, experience: newExperience }));
                  }}
                />
              </p>
              <h4 className="flex items-center justify-between text-base font-semibold">
                <EditableInputField
                  value={job.position}
                  elementType="span"
                  name={`position-${index}`}
                  onChange={(value) => {
                    const newExperience = [...cvData.experience];
                    newExperience[index].position = value;
                    setCvData((prev) => ({ ...prev, experience: newExperience }));
                  }}
                />
                <EditableInputField
                  value={job.duration}
                  elementType="span"
                  name={`duration-${index}`}
                  className="text-xs font-normal text-[#838994]"
                  onChange={(value) => {
                    const newExperience = [...cvData.experience];
                    newExperience[index].duration = value;
                    setCvData((prev) => ({ ...prev, experience: newExperience }));
                  }}
                />
              </h4>
              <EditableTextareaField
                elementType="p"
                value={job.description}
                onChange={(value) => {
                  const newExperience = [...cvData.experience];
                  newExperience[index].description = value;
                  setCvData((prev) => ({ ...prev, experience: newExperience }));
                }}
                className="text-xs font-normal text-[#474F53]"
              />
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h3 className="mb-2 text-xs font-bold">WYKSZTAŁCENIE</h3>
          {cvData.education.map((edu, index) => (
            <div key={`edu-${index}`}>
              <EditableInputField
                elementType="h4"
                name={`institution-${index}`}
                value={edu.institution}
                className="mb-1 text-xs font-normal text-[#838994]"
                onChange={(value) => {
                  const newEducation = [...cvData.education];
                  newEducation[index].institution = value;
                  setCvData((prev) => ({ ...prev, education: newEducation }));
                }}
              />
              <div className="flex items-center justify-between">
                <p className="text-base font-normal">
                  <EditableInputField
                    elementType="span"
                    name={`degree-${index}`}
                    value={edu.degree}
                    className="text-base font-normal"
                    onChange={(value) => {
                      const newEducation = [...cvData.education];
                      newEducation[index].degree = value;
                      setCvData((prev) => ({ ...prev, education: newEducation }));
                    }}
                  />
                  <span> i </span>
                  <EditableTextareaField
                    elementType="span"
                    value={edu.fieldOfStudy}
                    onChange={(value) => {
                      const newEducation = [...cvData.education];
                      newEducation[index].fieldOfStudy = value;
                      setCvData((prev) => ({ ...prev, education: newEducation }));
                    }}
                    className="text-base font-normal"
                  />
                </p>
                <EditableInputField
                  elementType="span"
                  name={`duration-${index}`}
                  value={edu.duration}
                  className="text-xs font-normal text-[#838994]"
                  onChange={(value) => {
                    const newEducation = [...cvData.education];
                    newEducation[index].duration = value;
                    setCvData((prev) => ({ ...prev, education: newEducation }));
                  }}
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
