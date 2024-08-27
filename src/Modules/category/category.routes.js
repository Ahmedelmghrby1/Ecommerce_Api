import { Router } from "express";
import { addCategory, allCategory, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../Middlewares/validation.js";
import { addcategoryValidation } from "./category.validation.js";
import subcategoryRouter from "../subcategory/subcategory.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = Router()

categoryRouter.use('/:category/subcategories',subcategoryRouter)

categoryRouter
.route('/')
.post(protectedRoutes,allowedTo("admin"),uploadSingleFile('image','categories'),validate(addcategoryValidation),addCategory)
.get(allCategory)

categoryRouter
.route('/:id')
.get(getCategory)
.put(protectedRoutes,allowedTo("admin"),uploadSingleFile('image','categories'),updateCategory)
.delete(protectedRoutes,deleteCategory)

export default categoryRouter