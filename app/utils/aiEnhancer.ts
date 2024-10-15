import { z } from "zod";
import { openai } from "openai.config";
import { generateObject } from "ai";

// ContactType schema
const contactSchema = z.object({
  phone: z.string(),
  email: z.string().email(),
  linkedin: z.string().optional(),
});

// ExperienceType schema
const experienceSchema = z.object({
  company: z.string(),
  sector: z.string(),
  companyType: z.string(),
  position: z.string(),
  duration: z.string(),
  description: z.string(),
});

// EducationType schema
const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  fieldOfStudy: z.string(),
  duration: z.string(),
});

// CertificateType schema
const certificateSchema = z.object({
  certTitle: z.string(),
  certDate: z.string(),
});

// ClasicCVTemplate schema
const classicCVTemplateSchema = z.object({
  name: z.string(),
  positionTitle: z.string(),
  portfolio: z.string().url(),
  contact: contactSchema,
  technologies: z.array(z.string()),
  summary: z.string(),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(z.string()),
  certificates: z.array(certificateSchema),
  company: z.string(),
});

export type CVData = z.infer<typeof classicCVTemplateSchema>;

export const enhance = async (
  cvText: string,
  jobDescription: string,
): Promise<{ type: "success"; enhancedCv: CVData }> => {
  // const PROMPT = `
  //     You are an expert CV writer. Take the following CV ${cvText} and tailor it to match the given job description ${jobDescription}.

  //     You have to focus on keywords included in the job description and make sure the CV contains them. It is very important to pass the ATS system.

  //     You can edit any data in CV like skills, technologies. You can change the description of experience.

  //     Keep to the true facts like experience length, education length, etc.

  //     Provide an enhanced version of the CV below in the same language as provided:
  //   `;

  const PROMPT_2 = `You are an expert CV writer. Your task is to tailor the following CV to a specific job application.

      The job position is included in "${jobDescription}". The company name is included "${jobDescription}" as well. Focus on matching the CV to the following job description: ${jobDescription}.

      Your goal is to ensure the CV passes the ATS (Applicant Tracking System) by incorporating relevant keywords from the job description. You may update the CV in the following ways:
  
      1. Adjust skills, technologies, and other sections to highlight relevant qualifications.
      2. Modify the descriptions of work experience to better align with the required qualifications.
      3. Ensure the CV showcases the candidate's fit for the position of the company which are included in "${jobDescription}".
  
      Important:
      - **Do not hallucinate** or invent any facts.
      - Keep all factual information like experience duration, education length, and other verifiable details **accurate and unchanged**.
      - Focus only on restructuring, optimizing, and enhancing the presentation of existing information to better align with the job description.

      Provide a professional and enhanced version of the CV, preserving the original language and structure as much as possible.

      Original CV:
      ${cvText}`;

  const resp = await generateObject({
    model: openai("gpt-4o"),
    schema: classicCVTemplateSchema,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: PROMPT_2 }],
      },
    ],
  });

  return { type: "success", enhancedCv: resp.object };
};
