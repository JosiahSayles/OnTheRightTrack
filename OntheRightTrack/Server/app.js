import express from "express";
import getUserFromToken from "./middleware/getUserFromToken";
import userRouter from "./api/users";
import applicationRouter from "./api/applications";

const app = express();
export default app;

app.use(express.json());
app.use(getUserFromToken);
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.use("/applications", applicationRouter);

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

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
