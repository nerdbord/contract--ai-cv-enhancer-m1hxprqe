import FirecrawlApp, { ScrapeResponse } from "@mendable/firecrawl-js";
import { extractJobData, JobData } from "../utils/jobDataExtractor";
import { validateJobUrl } from "./jobUrlValidator";

const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY || "",
});

export async function getJobData(url: string): Promise<JobData> {
  try {
    console.log("VALIDATING URL:", url);
    await validateJobUrl(url);
    const scrapeResult = (await app.scrapeUrl(url, {
      formats: ["markdown", "html"],
    })) as ScrapeResponse;

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`);
    }

    const content = scrapeResult.data.content as string;
    const jobDataResult = await extractJobData(content);
    return jobDataResult.jobData;
  } catch (e) {
    console.error("Error extracting job description:", e);
    throw e;
  }
}
