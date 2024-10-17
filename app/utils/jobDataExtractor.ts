import { z } from "zod";
import { openai } from "openai.config";
import { generateObject } from "ai";

// Job description schema:

const jobDescriptionSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string(),
  companyName: z.string(),
});

export type JobData = z.infer<typeof jobDescriptionSchema>;

export const extractJobData = async (
  scrapedContent: string,
): Promise<{ type: "success"; jobData: JobData }> => {
  const PROMPT = `Given the following text from a job posting: ${scrapedContent}, extract the following structured information:
    1. Job title
    2. Job description
    3. Company name
  
    Make sure the extracted information is accurate and concise.
    Provide the output as a structured JSON object.
    `;

  const resp = await generateObject({
    model: openai("gpt-4o"),
    schema: jobDescriptionSchema,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: PROMPT }],
      },
    ],
  });

  return { type: "success", jobData: resp.object };
};
