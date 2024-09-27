import express from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getSingleNote,
  updateNote,
} from "./note.controller";

const noteRouter = express.Router();

noteRouter.route("/").get(getNote);
noteRouter.route("/:noteId").get(getSingleNote).patch(updateNote).delete(deleteNote);
noteRouter.route("/add").post(createNote);

export default noteRouter;
