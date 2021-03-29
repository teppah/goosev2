import handler from "util/api/base";
import multer from "multer";
import { PDFDocument } from "pdf-lib";

const upload = multer({ storage: multer.memoryStorage() });

handler.post(upload.single("document"), async (req, res) => {
  console.log("files:");
  console.log(req.file);
  const file = req.file;
  const a = await PDFDocument.load(file.buffer);
  console.log(a);
  res.end("test");
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
