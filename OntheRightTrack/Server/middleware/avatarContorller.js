import { updateUserInDB, getUserById } from "../db/queries/users.js";
import cloudinary from "../config/cloudinary.js";

export const updateUserAvatar = async (req, res) => {
  try {
    if (req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await getUserById(req.params.id);

    const fileBase64 = req.file.buffer.toString("base64");
    const fileUri = `data:${req.file.mimetype};base64,${fileBase64}`;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: "avatars",
      public_id: `user-${req.user.id}`,
      overwrite: true,
    });

    if (user.avatarurl && user.avatarurl.includes("cloudinary")) {
      try {
        await cloudinary.uploader.destroy(`avatars/user-${req.user.id}`);
      } catch (err) {
        console.log("Failed to delete old avatar:", err.message);
      }
    }

    const updatedUser = await updateUserInDB(req.params.id, {
      avatarurl: result.secure_url,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Avatar upload error:", error);
    res.status(500).json({ message: error.message });
  }
};
