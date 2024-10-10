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
  portfolio: z.string().optional(),
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
  const PROMPT = `
      You are an expert CV writer. Take the following CV ${cvText} and tailor it to match the given job description ${jobDescription}.

      You have to focus on keywords included in the job description and make sure the CV contains them. It is very important to pass the ATS system.

      You can edit any data in CV like skills, technologies. You can change the description of experience.

      Keep to the true facts like experience length, education length, etc.
      
      Provide an enhanced version of the CV below in the same language as provided:
    `;
  const resp = await generateObject({
    model: openai("gpt-4o"),
    schema: classicCVTemplateSchema,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: PROMPT }],
      },
    ],
  });

  return { type: "success", enhancedCv: resp.object };
};
