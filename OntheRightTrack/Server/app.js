import express from "express";
import getUserFromToken from "./middleware/getUserFromToken.js";
import userRouter from "./api/users.js";
import applicationRouter from "./api/applications.js";
import cors from "cors";
import documentRouter from "./api/documents.js";

const app = express();
export default app;

app.use(cors());
app.use(express.json());
app.use(getUserFromToken);
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/applications", applicationRouter);
app.use("/documents", documentRouter);
app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      return res.status(400).send(err.message);
    case "23505":

    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});
// app.use("/uploads", express.static("uploads"));

// app.put("/users/:id", upload.single("avatar"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const avatarUrl = `/uploads/${req.file.filename}`;

//     const updatedUser = await updateUserInDB(req.params.id, {
//       avatar: avatarUrl,
//     });

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
