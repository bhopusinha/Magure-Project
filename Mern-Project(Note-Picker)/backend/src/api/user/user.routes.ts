import { Router } from "express";
import { login, userAuthentication, userLogout, userRegister } from "./user.controller";

const userRouter = Router();

userRouter.route('/').get(userAuthentication);
userRouter.route("/signup").post(userRegister);
userRouter.route("/login").post(login);
userRouter.route('/logout').post(userLogout);

export default userRouter;
