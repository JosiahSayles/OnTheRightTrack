import express from "express";
import multer from "multer";

import {
  createDocument,
  deleteDocumentById,
  getDocumentsByUserId,
  getDocumentById,
} from "../db/queries/documents.js";
import requireUser from "../middleware/requireUser.js";
import cloudinary from "../config/cloudinary.js";

router.post("/", requireUser, upload.single("file"), async (req, res, next) => {
  try {
    const { type } = req.body;

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const fileBase64 = req.file.buffer.toString("base64");
    const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: "documents",
      resource_type: "auto",
    });

    const filename = req.body.filename || req.file.originalname;

    const document = await createDocument(
      type,
      filename,
      result.secure_url,
      req.user.id,
    );

    res.status(201).send(document);
  } catch (error) {
    console.error("Document upload error:", error);
    next(error);
  }
});

router.delete("/:id", requireUser, async (req, res) => {
  if (req.document.user_id !== req.user.id)
    return res.status(403).send("This is not your document.");

  const urlParts = req.document.fileurl.split("/");
  const publicIdWithExtension = urlParts.slice(-2).join("/");
  const publicId = publicIdWithExtension.split(".")[0];

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });
  } catch (err) {
    console.log("Cloudinary delete failed:", err.message);
  }

  await deleteDocumentById(req.document.id);
  res.sendStatus(204);
});
