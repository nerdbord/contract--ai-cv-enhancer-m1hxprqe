import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FileUploadProps {
  error: string | null;
}

export default function FileUpload({ error }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(error);

  // Dropzone for handling drag-and-drop logic
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setFileError("Unsupported file format! Please upload PDF or DOCX.");
        setFileName(null);
      } else {
        const file = acceptedFiles[0];
        setFileName(file.name);
        setFileError(null); // Clear error if valid file is dropped
      }
    },
  });

  return (
    <div>
      <Card className={`w-[1060px] rounded-3xl text-center ${fileError ? "border-red-500" : ""}`}>
        <CardHeader>
          <CardTitle>Wrzuć swoje CV</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Przeciągnij plik i upuść z pulpitu lub wybierz plik poprzez przycisk poniżej.</p>
          <p>
            Obsługujemy formaty <strong>DOCX</strong> i <strong>PDF</strong>.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-4 ${isDragActive ? "border-violet-800" : ""}`}
          >
            <input {...getInputProps()} id="cv" name="cv" hidden />
            {fileName ? (
              <p>Selected File: {fileName}</p>
            ) : (
              <Button>
                <Label htmlFor="cv">Wybierz plik z dysku</Label>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      {fileError && (
        <Alert variant="destructive" className="mt-4 max-w-[1060px] border-none">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{fileError}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
