import { ActionFunction, json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

import { getDocsFromPDF, getDocsFromDocx } from "~/utils/fileHandler";
import { enhanceCV } from "~/utils/aiEnhancer";
import { getJobDescription } from "~/utils/jobScraper";
import type { MetaFunction } from "@remix-run/node";
import { Stepper } from "~/components/Stepper";

export const meta: MetaFunction = () => {
  return [
    { title: "AI cv enhancer app." },
    { name: "description", content: "Welcome to AI CV enhancer app!" },
  ];
};

interface ActionData {
  success?: boolean;
  error?: string;
  // extractedText?: string;
  enhancedCV?: string;
}

export const action: ActionFunction = async ({ request }) => {
  console.log("Form submitted");

  const formData = await request.formData();

  const file = formData.get("cv");
  const jobDescription = formData.get("jobDescription") as string;
  const jobUrl = formData.get("jobUrl") as string;
  console.log(jobUrl);

  if (!file || !(file instanceof File)) {
    return json({ error: "File upload failed or incorrect file type!" }, { status: 400 });
  }

  let extractedText;

  if (file.type === "application/pdf") {
    // extractedText = await extractDocxText(file);
    extractedText = (await getDocsFromPDF(file)).pageContent;
    console.log(extractedText);
  } else if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    // extractedText = await extractPdfText(file);
    extractedText = (await getDocsFromDocx(file)).pageContent;
    console.log(extractedText);
  } else {
    return json({ error: "Unsupported file format! Please upload PDF or DOCX." }, { status: 400 });
  }

  // Scrape the job description from the provided URL
  // let jobDescription;
  try {
    const jobDescription = await getJobDescription(jobUrl);
    console.log(jobDescription);
  } catch (error) {
    return json({ error: "Failed to extract job description from the URL." }, { status: 400 });
  }

  // Use AI to enhance the extracted CV text based on job description
  const enhancedCV = await enhanceCV(extractedText, jobDescription);

  return json({ success: true, enhancedCV });

  // return json({ success: true, extractedText });
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const [fileName, setFileName] = useState<string | null>(null);

  console.log("actionData", actionData);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-10 flex w-full flex-col items-center justify-between">
        <Stepper currentStep={1} />
      </div>
      <h1 className="max-w-[769px] pb-11 text-center text-5xl font-extrabold">
        <span className="block text-center">Poprawimy Twoje CV</span> i{" "}
        <span className="text-violet-800">dopasujemy do oferty</span>, na którą chcesz aplikować!
      </h1>
      <Form method="post" encType="multipart/form-data">
        <Card className="w-[1060px] rounded-3xl text-center">
          <CardHeader>
            <CardTitle>Wrzuć swoje CV</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p>Przeciągnij plik i upuść z pulpitu lub wybierz plik poprzez przycisk poniżej.</p>
            <p>
              Obsługujemy formaty <strong>DOCX</strong> i <strong>PDF</strong>.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <div>
              <Button>
                <Label htmlFor="cv">Wybierz plik z dysku</Label>
              </Button>
              <input
                id="cv"
                type="file"
                name="cv"
                accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => setFileName(e.target.files ? e.target.files[0]?.name : null)}
                required
                hidden
              />
            </div>
          </CardFooter>
        </Card>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="jobDescription">Podaj opis stanowiska pracy</Label>
          <Input
            id="jobDescription"
            type="text"
            name="jobDescription"
            placeholder="Wklej tutaj opis stanowiska pracy"
            required
          />
          <Label htmlFor="jobUrl">Podaj URL oferty pracy</Label>
          <Input
            id="jobUrl"
            type="url"
            name="jobUrl"
            placeholder="Wklej tutaj URL oferty pracy"
            required
          />
          <Button type="submit">Upload & Enhance CV</Button>
        </div>
      </Form>
      {fileName && <p>Selected File: {fileName}</p>}
      {/* {actionData?.success && <pre className="ml-12">{actionData.extractedText}</pre>} */}
      {actionData?.success && <pre className="ml-12">{actionData.enhancedCV}</pre>}
      {actionData?.error && <p>Error: {actionData.error}</p>}
    </div>
  );
}
