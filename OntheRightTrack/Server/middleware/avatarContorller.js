import { updateUserInDB, getUserById } from "../db/queries/users.js";
import fs from "fs";
import path from "path";

export const updateUserAvatar = async (req, res) => {
  try {
    if (req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await getUserById(req.params.id);

    if (user.avatar) {
      const oldPath = path.join("uploads", path.basename(user.avatar));
      fs.unlink(oldPath, (err) => {
        if (err) console.log("Failed to delete old avatar:", err);
      });
    }

    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const updatedUser = await updateUserInDB(req.params.id, {
      avatarurl: avatarUrl,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
