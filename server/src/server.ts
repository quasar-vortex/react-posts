import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import type { Post } from "./types/Post";
import db from "./config/db";
import postRouter from "./posts/postRouter";
import CustomError from "./config/error";

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
  console.log("Body: ", req.body);
  console.log("Params: ", req.params);
  console.log("Query: ", req.query);
  next();
});
app.use("/posts", postRouter);
// Catch All Error Handler
const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res
      .status(err.code)
      .json({ message: err.message, code: err.code, data: null });
    return;
  }
  res
    .status(500)
    .json({ message: "Internal Server Error", code: 500, data: null });
};
app.use(errorMiddleware);

// Main
const main = () => {
  app.listen(PORT, () => {
    console.log("Running on: " + PORT);
  });
};

main();
