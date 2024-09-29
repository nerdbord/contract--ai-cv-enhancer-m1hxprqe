// import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio"; // Web scraper
// https://js.langchain.com/docs/integrations/document_loaders/web_loaders/web_cheerio/
// lub firecrawl https://www.npmjs.com/package/firecrawl
// import { extract } from "@extractus/article-extractor"; Optional if we need to extract structured text
// (z cheerio)
// https://www.npmjs.com/package/@extractus/article-extractor

// export async function getJobDescription(url: string): Promise<string> {
//   try {
//     const loader = new CheerioWebBaseLoader(url);
//     const docs = await loader.load();

//     const jobDescription = docs[0]?.pageContent; // Extract main content
//     if (!jobDescription) throw new Error("Job description not found");
//     console.log("JOBBBB DESCRIPTIONNNNNNNNNNNN: ", jobDescription);

//     return jobDescription;
//   } catch (error) {
//     console.error("Failed to scrape job description:", error);
//     throw new Error("Failed to scrape the job offer page.");
//   }
// }

// using FIRECRAWL:
import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";

const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY || "",
});

// Define schema to extract relevant parts from the job page
const jobSchema = z.object({
  jobTitle: z.string().optional(),
  jobDescription: z.string(),
});

export async function getJobDescription(url: string): Promise<string> {
  try {
    const scrapeResult = await app.scrapeUrl(url, {
      extractorOptions: { extractionSchema: jobSchema },
    });

    console.log("Scrape result:", scrapeResult);

    // Handle the extracted data
    const data = scrapeResult.data["llm_extraction"];
    if (data && data.jobDescription) {
      return data.jobDescription;
    } else {
      throw new Error("Failed to extract job description");
    }
  } catch (error) {
    console.error("Error extracting job description:", error);
    throw new Error("Job description extraction failed");
  }
}
