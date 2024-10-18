import { openai } from "openai.config";
import { generateObject } from "ai";
import { z } from "zod";

// Schema to validate the response from gpt

const jobUrlValidationSchema = z.object({
  isOffer: z.boolean(),
});

export type JobUrlValidation = z.infer<typeof jobUrlValidationSchema>;

// Function to validate if the url points to a job offer
export const validateJobUrl = async (url: string): Promise<JobUrlValidation> => {
  const PROMPT = `You are an expert in analyzing web links. The following URL "${url}" has been provided, and your task is to determine whether it points to a valid job offer or not.

  Given the URL:
  "${url}"

  Answer with a simple boolean flag:
  - true if the URL leads to a job offer,
  - false if it does not.`;

  const response = await generateObject({
    model: openai("gpt-4o"),
    schema: jobUrlValidationSchema,
    messages: [{ role: "user", content: [{ type: "text", text: PROMPT }] }],
  });

  if (!response.object.isOffer) {
    throw new Error("The provided link does not lead to a job offer.");
  }
  return response.object;
};
