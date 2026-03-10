import express from "express";
const router = express.Router();
export default router;

import {
  createJobApplication,
  getApplicationById,
  getApplicationById,
  getAllApplications,
  getApplicationsByUserId,
  deleteApplication,
  updateApplication,
} from "../db/queries/job_applications";
import requireBody from "../middleware/requireBody";
import requireUser from "../middleware/requireUser";

router.get("/", requireUser, async (req, res, next) => {
  try {
    const applications = await getApplicationsByUserId(req.user.id);
    res.send(applications);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  requireUser,
  requireBody([
    "companyname",
    "jobtitle",
    "location",
    "applicationdate",
    "status",
  ]),
  async (req, res) => {
    const {
      companyname,
      jobtitle,
      location,
      applicationdate,
      status,
      joburl,
      notes,
    } = req.body;
    const application = await createJobApplication(
      companyname,
      jobtitle,
      location,
      applicationdate,
      status,
      joburl,
      notes,
      req.user.id,
    );
    res.status(201).send(application);
  },
);

router.param("id", async (req, res, next, id) => {
  const application = await getApplicationById(id);
  if (!application) return res.status(404).send("Application not found.");

  req.application = application;
  next();
});

router.get("/:id", requireUser, async (req, res) => {
  res.json(req.application);
});

router.delete("/:id", requireUser, async (req, res) => {
  if (req.application.user_id !== req.user.id)
    return res.status(404).send("This is not your application.");
  await deleteApplication(req.application.id);
  res.sendStatus(204);
});

router.put(
  "/:id",
  requireUser,
  requireBody([
    "companyname",
    "jobtitle",
    "location",
    "applicationdate",
    "status",
    "joburl",
    "notes",
  ]),
  async (req, res) => {
    if (req.application.user_id !== req.user.id)
      return res.status(403).send("This is not your application.");
    const {
      companyname,
      jobtitle,
      location,
      applicationdate,
      status,
      joburl,
      notes,
    } = req.body;
    const application = await updateApplication(
      req.application.id,
      companyname,
      jobtitle,
      location,
      applicationdate,
      status,
      joburl,
      notes,
      req.user.id,
    );
    res.send(application);
  },
);

router.patch(
  "/:id",
  requireUser,
  requireBody([
    "companyname",
    "jobtitle",
    "location",
    "applicationdate",
    "status",
    "joburl",
    "notes",
  ]),
  async (req, res) => {
    if (req.application.user_id !== req.user.id)
      return res.status(403).send("This is not your application.");
    const {
      companyname,
      jobtitle,
      location,
      applicationdate,
      status,
      joburl,
      notes,
    } = req.body;
    const application = await updateApplication(
      req.application.id,
      companyname,
      jobtitle,
      location,
      applicationdate,
      status,
      joburl,
      notes,
      req.user.id,
    );
    res.send(application);
  },
);
