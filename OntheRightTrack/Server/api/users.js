import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByEmailandPassword } from "../db/queries/users";
import requireBody from "../middleware/requireBody";
import { createToken } from "../utils/jwt";
import getUserFromToken from "../middleware/getUserFromToken";

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
  if (!user) return res.status(401).send("Invalid Email or Password.");
  const token = createToken({ id: user.id });
  res.send({ token });
});

router.get("/user", getUserFromToken, async (req, res) => {
  res.send(req.user);
});
