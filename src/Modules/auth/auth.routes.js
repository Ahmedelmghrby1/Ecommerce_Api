
import { Router } from "express";
import { checkEmail } from "../../Middlewares/checkEmail.js";
import { changeUserPassword, signin, signup } from "./auth.controller.js";

const authRouter = Router();

authRouter
.route("/signup")
.post(checkEmail, signup)

authRouter
.route("/signin")
.post(signin)

authRouter
.route("/change-password")
.patch(changeUserPassword)


export default authRouter;
