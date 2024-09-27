import createHttpError from "http-errors";
import Note from "./note.model";
import { NextFunction, Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import { CreateNotebody, notePramas, updateBody } from "./dtos/note.dto";



export const getNote: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // throw Error("Branzing!");
    const notes = await Note.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    return next(error);
  }
};



export const getSingleNote: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { noteId } = req.params;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await Note.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not Found!");
    }

    res.status(202).json({ success: true, data: note });
  } catch (error) {
    return next(error);
  }
};

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNotebody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title) {
      throw createHttpError(400, "Note must have title!");
    }

    const note = await Note.create({
      title: title,
      text: text,
    });

    res.status(201).json(note);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};



export const updateNote: RequestHandler<
  notePramas,
  unknown,
  updateBody,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note Id");
    }

    const note = await Note.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not Found!");
    }

    if (!title) {
      throw createHttpError(400, "Note must have title!");
    }

    note.title = title;
    note.text = text;

    const updateNote = await note.save();

    res.status(201).json(updateNote);
  } catch (error) {
    return next(error);
  }
};

export const deleteNote: RequestHandler<
  notePramas,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note Id");
    }

    const note = await Note.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found!");
    }

    await Note.findByIdAndDelete(noteId).exec();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
