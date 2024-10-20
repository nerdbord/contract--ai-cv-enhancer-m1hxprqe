import { FC, useState } from "react";
import { CVData } from "~/utils/aiEnhancer";
import { Textarea } from "~/components/ui/textarea";
import { EditableInput } from "./EditableInput";

export interface TemplateCVProps {
  data: CVData;
  isModern?: boolean;
}

export const TemplateCV: FC<TemplateCVProps> = ({ data, isModern }) => {
  const [cvData, setCVdata] = useState<CVData>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCVdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCVdata((prevData) => ({
      ...prevData,
      contact: {
        ...prevData.contact,
        [name]: value,
      },
    }));
  };

  return (
    <div className="flex gap-4 bg-slate-100" id="element-to-pdf">
      {/* PIERWSZA-KOLUMNA */}
      <div className={`flex max-w-60 flex-col gap-5 pl-8 pt-8 ${isModern ? "bg-slate-200" : ""}`}>
        {/* Personal Information */}
        <EditableInput
          type="text"
          name="name"
          value={cvData.name}
          placeholder={cvData.name}
          onChange={handleChange}
          className="text-2xl font-semibold leading-6"
        />

        <section className="">
          <h3 className="mb-2 appearance-none border-none bg-transparent text-xs font-bold shadow-none outline-none">
            KONTAKT
          </h3>

          <EditableInput
            type="email"
            name="email"
            value={cvData.contact.email}
            placeholder={cvData.contact.email}
            onChange={handleContactChange}
            className="mx-0 mb-1 mt-0 text-xs"
          />

          <EditableInput
            type="tel"
            name="phone"
            value={cvData.contact.phone}
            placeholder={cvData.contact.phone}
            onChange={handleContactChange}
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
              <EditableInput
                type="url"
                name="portfolio"
                value={cvData.portfolio}
                placeholder={cvData.portfolio}
                onChange={handleChange}
                className="mx-0 mb-1 mt-0 text-xs"
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
              <EditableInput
                type="url"
                name="linkedin"
                value={cvData.contact.linkedin}
                placeholder={cvData.contact.linkedin}
                onChange={handleContactChange}
                className="mx-0 mb-1 mt-0 text-xs"
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
                <EditableInput
                  type="text"
                  name={`skills[${index}]`}
                  value={skill}
                  placeholder={skill}
                  onChange={(e) => {
                    const updatedSkills = [...cvData.skills];
                    updatedSkills[index] = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, skills: updatedSkills }));
                  }}
                  className=""
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
                <EditableInput
                  type="text"
                  name={`technologies[${index}]`}
                  value={technoItem}
                  placeholder={technoItem}
                  onChange={(e) => {
                    const updatedTechnologies = [...cvData.technologies];
                    updatedTechnologies[index] = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, technologies: updatedTechnologies }));
                  }}
                  className=""
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
              <EditableInput
                type="text"
                name={`certificates[${index}].certTitle`}
                value={cert.certTitle}
                placeholder={cert.certTitle}
                onChange={(e) => {
                  const updatedCertificates = [...cvData.certificates];
                  updatedCertificates[index].certTitle = e.target.value;
                  setCVdata((prevData) => ({ ...prevData, certificates: updatedCertificates }));
                }}
                className=""
              />

              <EditableInput
                type="text"
                name={`certificates[${index}].certDate`}
                value={cert.certDate}
                placeholder={cert.certDate}
                onChange={(e) => {
                  const updatedCertificates = [...cvData.certificates];
                  updatedCertificates[index].certDate = e.target.value;
                  setCVdata((prevData) => ({ ...prevData, certificates: updatedCertificates }));
                }}
                className=""
              />
            </div>
          ))}
        </section>

        {/* Clause */}
        <section className="pb-8 pr-7">
          <h3 className="mb-2 text-xs font-bold">KLAUZULA</h3>
          <p className="text-[8px] font-normal text-[#474F53]">
            Wyrażam zgode na przetwarzanie moich danych osobowych przez{" "}
            <EditableInput
              type="text"
              name="company"
              value={cvData.company}
              placeholder={cvData.company}
              onChange={handleChange}
              className="text-[8px] font-black"
            />
            w celu prowadzenia rekrutacji na aplikowane przeze mnie stanowisko.
          </p>
        </section>
      </div>
      {/* DRUGA-KOLUMNA */}
      <div className="flex flex-col gap-5 pr-8 pt-8">
        CV -
        <EditableInput
          type="text"
          name="positionTitle"
          value={cvData.positionTitle}
          placeholder={cvData.positionTitle}
          onChange={handleChange}
          className="text-base font-normal text-[#838994]"
        />
        {/* Summary */}
        <section>
          <h3 className="mb-2 gap-2 text-xs font-bold">O MNIE</h3>

          <Textarea
            name="summary"
            value={cvData.summary}
            onChange={handleChange}
            className="m-0 resize-none appearance-none overflow-y-hidden border-none bg-transparent p-0 text-xs font-normal text-[#474F53] shadow-none outline-none"
          />
        </section>
        {/* Experience */}
        <section>
          <h3 className="mb-2 text-xs font-bold">DOŚWIADCZENIE</h3>
          {cvData.experience.map((job, index) => (
            <div key={index}>
              <p className="mb-1 flex gap-1 text-xs font-normal text-[#838994]">
                <EditableInput
                  type="text"
                  name={`experience[${index}].company`}
                  placeholder={job.company}
                  onChange={(e) => {
                    const updatedExperience = [...cvData.experience];
                    updatedExperience[index].company = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, experience: updatedExperience }));
                  }}
                  className="underline"
                />

                <EditableInput
                  type="text"
                  name={`experience[${index}].companyType`}
                  placeholder={job.companyType}
                  onChange={(e) => {
                    const updatedExperience = [...cvData.experience];
                    updatedExperience[index].companyType = e.target.value;
                    setCVdata((prevData) => ({ ...prevData, experience: updatedExperience }));
                  }}
                  className=""
                />
              </p>

              <EditableInput
                type="text"
                name={`experience[${index}].position`}
                value={job.position}
                placeholder={job.position}
                onChange={(e) => {
                  const updatedExperience = [...cvData.experience];
                  updatedExperience[index].position = e.target.value;
                  setCVdata((prevData) => ({ ...prevData, experience: updatedExperience }));
                }}
                className="mb-1 text-sm font-semibold leading-6"
              />

              <Textarea
                name={`experience[${index}].description`}
                value={job.description}
                placeholder={job.description}
                onChange={(e) => {
                  const updatedExperience = [...cvData.experience];
                  updatedExperience[index].description = e.target.value;
                  setCVdata((prevData) => ({ ...prevData, experience: updatedExperience }));
                }}
                className="mb-3 resize-none appearance-none overflow-y-hidden border-none bg-transparent text-xs font-normal text-[#474F53] shadow-none outline-none"
              />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
