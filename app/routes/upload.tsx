import { ActionFunction, json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { getDocsFromPDF, getDocsFromDocx } from "~/utils/fileHandler"; // Helper functions

interface ActionData {
  success?: boolean;
  error?: string;
  extractedText?: string;
}

export const action: ActionFunction = async ({ request }) => {
  console.log("Form submitted");
  // const formData = await unstable_parseMultipartFormData(request, async ({ filename }) => {
  //   return filename;
  // });
  const formData = await request.formData();

  const file = formData.get("cv");

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

  return json({ success: true, extractedText });
};

export default function Upload() {
  const actionData = useActionData<ActionData>();
  const [fileName, setFileName] = useState<string | null>(null);

  console.log("actionData", actionData);

  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <Form method="post" encType="multipart/form-data">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="cv">Wybierz plik</Label>
          <Input
            id="cv"
            type="file"
            name="cv"
            accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => setFileName(e.target.files ? e.target.files[0]?.name : null)}
            required
          />
          <Button type="submit">Upload CV</Button>
        </div>
      </Form>
      {fileName && <p>Selected File: {fileName}</p>}
      {actionData?.success && <pre>{actionData.extractedText}</pre>}
      {actionData?.error && <p>Error: {actionData.error}</p>}
    </div>
  );
}
