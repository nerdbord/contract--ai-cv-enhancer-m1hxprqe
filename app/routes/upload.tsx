/* eslint-disable prettier/prettier */
import { ActionFunction, unstable_parseMultipartFormData, json } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { extractDocxText, extractPdfText } from "~/utils/fileHandler"; // Helper functions

interface ActionData {
  success?: boolean;
  error?: string;
  extractedText?: string;
}

export const action: ActionFunction = async ({ request }) => {
  console.log("Form submitted");
  const formData = await unstable_parseMultipartFormData(request, async ({ filename }) => {
    return filename;
  });

  const file = formData.get("cv");

  if (!file || !(file instanceof File)) {
    return json({ error: "File upload failed or incorrect file type!" }, { status: 400 });
  }

  let extractedText = {};

  if (file.name.endsWith(".docx")) {
    extractedText = await extractDocxText(file);
    console.log(extractedText);
  } else if (file.name.endsWith(".pdf")) {
    extractedText = await extractPdfText(file);
    console.log(extractedText);
  } else {
    return json({ error: "Unsupported file format! Please upload PDF or DOCX." }, { status: 400 });
  }

  return json({ success: true, extractedText });
};

export default function Upload() {
  const actionData = useActionData<ActionData>();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <Form method="post" encType="multipart/form-data">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="cv">Wybierz plik</Label>
          <Input
            id="cv"
            type="file"
            name="cv"
            accept=".pdf,.docx"
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
