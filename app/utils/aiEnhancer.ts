import { OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

// Initialize the OpenAI model (replace with your OpenAI API key)
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY, // Ensure you have this in your environment variables
  temperature: 0.7, // Adjust based on how creative vs factual you want the enhancement
});

export async function enhanceCV(cvText: string, jobDescription: string): Promise<string> {
  const template = new PromptTemplate({
    inputVariables: ["cv", "job"],
    template: `
      You are an expert CV writer. Take the following CV and tailor it to match the given job description. 
      Make sure the CV highlights relevant experience, skills, and achievements.

      CV: {cv}
      Job Description: {job}
      
      Provide an enhanced version of the CV below:
    `,
  });

  const prompt = await template.format({ cv: cvText, job: jobDescription });
  const enhancedCv = await model.invoke(prompt);

  return enhancedCv;
}
