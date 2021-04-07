import handler from "util/api/base";
import multer from "multer";
import { PDFDocument, PageSizes } from "pdf-lib";
import JSZip from "jszip";
import type { NextApiRequest, NextApiResponse } from "next";

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

handler.post(upload.single("zip"), async (req, res) => {
  const splitString: string = req.body?.splitString;
  if (req.file === undefined) {
    res.status(400).end("Missing multipart/form-data `zip` file");
    return;
  }
  if (splitString === undefined) {
    res.status(400).end("Missing multipart/form-data `splitString` key");
    return;
  }
  if (req.file.mimetype !== "application/zip") {
    res.status(400).end("Wrong multipart/form-data `zip` file: not a zip file");
    return;
  }

  const sourceZip = await JSZip.loadAsync(req.file.buffer);

  const pageBuffers = await Promise.all(
    Object.entries(sourceZip.files)
      // we want ordered pages; assume the page order is directly correlated to filename
      .sort(([a, ...rest1], [b, ...rest2]) => a.localeCompare(b))
      .map((a) => a[1])
      .filter((file) => !file.dir)
      .map(async (file) => {
        const stream = file.nodeStream();
        const buffer = await streamToBuffer(stream);
        return buffer;
      })
  );
  // const stream = zippedFile.nodeStream();
  // async iterator... how cool is that?!
  // but weird stuff with Babel and Symbol.asyncIterable makes it unsupported...
  // https://stackoverflow.com/questions/56595401/typeerror-object-is-not-async-iterable-with-async-generator-function
  // for await (const chunk of stream) {
  //   console.log(chunk);
  //   chunks.push(chunk);
  // }
  // const buffer = Buffer.concat(chunks);
  console.log(pageBuffers);

  res.end("WIP");
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
