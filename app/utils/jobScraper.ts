import FirecrawlApp, { ScrapeResponse } from "@mendable/firecrawl-js";

const app = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY || "",
});

export async function getJobDescription(url: string) {
  try {
    const scrapeResult = (await app.scrapeUrl(url, {
      formats: ["markdown", "html"],
    })) as ScrapeResponse;

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`);
    }

    return scrapeResult.data.content as string;
  } catch (e) {
    console.error("Error extracting job description:", e);
    throw e;
  }
}
