import FirecrawlApp, { ScrapeResponse } from "@mendable/firecrawl-js";
import { extractJobData, JobData } from "../utils/jobDataExtractor";

const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY || "",
});

export async function getJobDescription(url: string): Promise<JobData> {
  try {
    const scrapeResult = (await app.scrapeUrl(url, {
      formats: ["markdown", "html"],
    })) as ScrapeResponse;

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`);
    }

    const content = scrapeResult.data.content as string;
    const { jobData } = await extractJobData(content);
    const { jobTitle, jobDescription, companyName } = jobData;
    return { jobTitle, jobDescription, companyName };
  } catch (e) {
    console.error("Error extracting job description:", e);
    throw e;
  }
}
