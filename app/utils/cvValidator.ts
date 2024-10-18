import { openai } from "openai.config";
import { generateObject } from "ai";
import { z } from "zod";

// Schema to validate response from gpt
const cvValidationSchema = z.object({
  isCV: z.boolean(),
});

export type CVValidation = z.infer<typeof cvValidationSchema>;

// Function to validate if the extracted text is a CV

export const validateCV = async (text: string): Promise<CVValidation> => {
  const PROMPT = `
        You are an expert in analyzing documents. The following text "${text}" has been extracted from a file. Your task is to determine whether the document is a CV (Curriculum Vitae) or not.

        Given the following text:
        "${text}"

        Answer with a simple boolean flag: 
        - true if the document is a CV,
        - false if it is not a CV.;
    `;

  const response = await generateObject({
    model: openai("gpt-4o"),
    schema: cvValidationSchema,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: PROMPT }],
      },
    ],
  });

  if (!response.object.isCV) {
    throw new Error("The uploaded document is not a CV.");
  }
  return response.object;
};
