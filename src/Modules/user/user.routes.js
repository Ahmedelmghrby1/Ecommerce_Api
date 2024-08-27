import { Router } from "express";
import {
  addUser,
  allUser,
  deleteUser,
  getUser,
  updateUser,
} from "./user.controller.js";
import { checkEmail } from "../../Middlewares/checkEmail.js";

const userRouter = Router();


userRouter.route("/").post(checkEmail, addUser).get(allUser);

userRouter
  .route("/:id")
  .get(getUser)
  .put(checkEmail, updateUser)
  .delete(deleteUser);

export default userRouter;
