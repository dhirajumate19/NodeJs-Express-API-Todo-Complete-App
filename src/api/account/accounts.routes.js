import express from "express";
import { handleSignIn, handlerSignUp } from "./accounts.controller.js";
import {
  validateUserSignIn,
  validateUserSignUpDetail,
} from "./accounts.vaidation.js";

const userRoute = express.Router();

userRoute.post("/signup", validateUserSignUpDetail, handlerSignUp);

userRoute.post("/signin", validateUserSignIn, handleSignIn);

export default userRoute;
