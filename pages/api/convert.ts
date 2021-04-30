import handler from "util/api/base";
import multer from "multer";
import { PDFDocument } from "pdf-lib";
import { getPageFormatArray, isFormatStringValid } from "util/utils";
import { getZipFile } from "util/process-pdf";

const upload = multer({ storage: multer.memoryStorage() });
// const fields: multer.Field[] = [
//   {
//     name: "document",
//     maxCount: 1,
//   },
// ];

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (data) => {
      chunks.push(data);
    });
    stream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    stream.on("error", (e) => {
      reject(e);
    });
  });
}

handler.post(upload.single("file"), async (req, res) => {
  const formatString: string = req.body?.formatString;
  if (req.file === undefined) {
    res.status(400).end("Missing multipart/form-data `pdf` file");
    return;
  }
  if (req.file.mimetype !== "application/pdf") {
    res.status(400).end("Wrong multipart/form-data `pdf` file: not a pdf file");
    return;
  }
  if (formatString === undefined) {
    res.status(400).end("Missing multipart/form-data `formatString` key");
    return;
  }
  if (!isFormatStringValid(formatString)) {
    res
      .status(400)
      .end(
        "Invalid multipart/form-data `formatString` key: can only contain space-separated numbers"
      );
    return;
  }

  // --- don't load zip for now, just load the pdf, and split the pdf ---
  // const sourceZip = await JSZip.loadAsync(req.file.buffer);
  // const pageBuffers = await Promise.all(
  //   Object.entries(sourceZip.files)
  //     // we want ordered pages; assume the page order is directly correlated to filename
  //     .sort(([a, ...rest1], [b, ...rest2]) => a.localeCompare(b))
  //     .map((a) => a[1])
  //     .filter((file) => !file.dir)
  //     .map(async (file) => {
  //       const stream = file.nodeStream();
  //       const buffer = await streamToBuffer(stream);
  //       return buffer;
  //     })
  // );
  // const stream = zippedFile.nodeStream();
  // async iterator... how cool is that?!
  // but weird stuff with Babel and Symbol.asyncIterable makes it unsupported...
  // https://stackoverflow.com/questions/56595401/typeerror-object-is-not-async-iterable-with-async-generator-function
  // for await (const chunk of stream) {
  //   console.log(chunk);
  //   chunks.push(chunk);
  // }
  // const buffer = Buffer.concat(chunks);
  // console.log(pageBuffers);
  // make one big pdf, then give to processPDF

  const sourcePdf = await PDFDocument.load(req.file.buffer);
  const pageFormatArray = getPageFormatArray(formatString);
  const formatPageCount = pageFormatArray.reduce((prev, cur) => prev + cur);
  if (sourcePdf.getPageCount() !== formatPageCount) {
    res
      .status(400)
      .end(
        "Invalid multipart/form-data `formatString` key: not the same number of pages as source file"
      );
    return;
  }
  const zip = await getZipFile(sourcePdf, pageFormatArray, "Question {d}");

  res.setHeader("Content-Type", "application/zip");
  res.send(
    zip.generateNodeStream({
      type: "nodebuffer",
      streamFiles: true,
      compression: "DEFLATE",
      mimeType: "application/zip",
    })
  );
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
