import express from "express";
const router = express.Router();
export default router;

import {
  createUser,
  getUserByEmailandPassword,
  updateUserInDB,
} from "../db/queries/users.js";
import requireBody from "../middleware/requireBody.js";
import { createToken } from "../utils/jwt.js";
import getUserFromToken from "../middleware/getUserFromToken.js";
import { updateUserAvatar } from "../middleware/avatarContorller.js";
import upload from "../middleware/upload.js";

router.post(
  "/register",
  requireBody(["firstname", "lastname", "email", "password"]),
  async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const user = await createUser(firstname, lastname, email, password);

    const token = createToken({ id: user.id });
    res.status(201).send({ token });
  },
);

router.post("/login", requireBody(["email", "password"]), async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmailandPassword(email, password);
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });
  const token = createToken({ id: user.id });
  res.send({ token });
});

router.get("/user", getUserFromToken, async (req, res) => {
  res.send(req.user);
});

router.put(
  "/:id/avatar",
  getUserFromToken,
  upload.single("avatar"),
  updateUserAvatar,
);

router.put(
  "/:id",
  getUserFromToken,
  requireBody(["firstname", "lastname", "email"]), // ✅ FIX
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).send("Unauthorized");
      }

      if (req.user.id !== Number(req.params.id)) {
        return res.status(403).send("Forbidden");
      }

      const { firstname, lastname, email } = req.body;

      const userInfo = await updateUserInDB(req.user.id, {
        firstname,
        lastname,
        email,
      });

      res.status(200).json(userInfo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
);
