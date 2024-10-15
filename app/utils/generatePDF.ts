export const generatePDF = async (element: HTMLElement, fileName: string) => {
  const htmlContent = `
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_PDF_ENDPOINT_API_KEY}`,
    },
    body: JSON.stringify({
      html: htmlContent,
      delivery_mode: "inline",
      zoom: 1.2,
    }),
  };

  try {
    const response = await fetch("https://api.pdfendpoint.com/v1/convert", options);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CV_${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
