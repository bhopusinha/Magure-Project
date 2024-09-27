import { Request, RequestHandler } from "express";
import User from "./user.model";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { LoginBody, userType } from "./dtos/user.dtos";


export const userAuthentication: RequestHandler = async (req, res, next) => {
  const userId = req.session.userId;

  try {
    if (!userId) {
      throw createHttpError(401, "User not authenticates");
    }

    const user = await User.findById(userId).select("+password +email").exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const userRegister: RequestHandler<
  unknown,
  unknown,
  userType,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUser = await User.findOne({ username: username }).exec();

    if (existingUser) {
      throw createHttpError(
        409,
        "Username already taken, Please choose a different one or log is instead!"
      );
    }

    const existingEmail = await User.findOne({ email: email }).exec();

    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email address already exists , Please log in instead "
      );
    }

    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hasPassword,
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};


export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    const user = await User.findOne({ username: username })
      .select("+password +email")
      .exec();

    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const userLogout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
