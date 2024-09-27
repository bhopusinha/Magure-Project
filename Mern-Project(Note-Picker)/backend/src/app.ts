import express, { NextFunction, Request, Response } from "express";
import connectDB from "./config/database.config";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import session from "express-session";
import env from "./config/environment.config";
import MongoStore from "connect-mongo";
import { noteRouter, userRouter } from "./api/index";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: env.session_secret ?? " ",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.db,
    }),
  })
);

connectDB();

app.use("/api/notes", noteRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
  return next(createHttpError(404, "Endpoint not found !!"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occurred";
  let statuscode = 500;

  if (isHttpError(error)) {
    statuscode = error.status;
    errorMessage = error.message;
  }

  return res.status(statuscode).json({ error: errorMessage });
});

export default app;
