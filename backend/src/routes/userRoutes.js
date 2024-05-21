import express from "express";
import { UserController } from "../controller/userController.js";
import { validateRefreshToken } from "../middlewares/doJwtAuth.js";

export const usersRouter = express
  .Router()
  .post("/register", UserController.postRegisterUserCtrl)
  .post("/verify", UserController.postVerifyUserCtrl)
  .post("/login", UserController.postLoginUserCtrl)
  .post("/refresh-token", validateRefreshToken, UserController.postRefreshAccessTokenCtrl);
