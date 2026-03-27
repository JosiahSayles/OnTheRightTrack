import express from "express";
import multer from "multer";

import {
  createDocument,
  deleteDocumentById,
  getDocumentsByUserId,
  getDocumentById,
} from "../db/queries/documents.js";
import requireUser from "../middleware/requireUser.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

export default router;

router.get("/", requireUser, async (req, res, next) => {
  try {
    const documents = await getDocumentsByUserId(req.user.id);
    res.send(documents);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireUser, upload.single("file"), async (req, res, next) => {
  try {
    const { type } = req.body;

    const file = req.file;
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const fileurl = `/uploads/${req.file.filename}`;

    const document = await createDocument(
      type,
      file.filename,
      fileurl,
      req.user.id,
    );

    res.status(201).send(document);
  } catch (error) {
    next(error);
  }
});
router.param("id", async (req, res, next, id) => {
  const document = await getDocumentById(id);
  if (!document) return res.status(404).send("Document was not found");

  req.document = document;
  next();
});

router.delete("/:id", requireUser, async (req, res) => {
  if (req.document.user_id !== req.user.id)
    return res.status(403).send("This is not your document.");
  await deleteDocumentById(req.document.id);
  res.sendStatus(204);
});
