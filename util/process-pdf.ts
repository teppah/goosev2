import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { getPageStartNumber, range } from "./utils";

export async function getZipFile(
  pdf: PDFDocument,
  pagesPerQ: number[],
  questionNameFormat: string
): Promise<JSZip> {
  const zipFile = new JSZip();

  await Promise.all(
    pagesPerQ.map(async (count, i) => {
      const start = getPageStartNumber(pagesPerQ, i);
      const currentQ = await PDFDocument.create();
      const pages = await currentQ.copyPages(
        pdf,
        range(start - 1, start + count - 1)
      );
      pages.forEach((page) => {
        currentQ.addPage(page);
      });

      const qBytes = await currentQ.save();
      const fileName = questionNameFormat.replace(/{d}/g, `${i + 1}`);
      zipFile.file(`${fileName}.pdf`, qBytes);
    })
  );

  return zipFile;
}
