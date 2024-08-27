import { Router } from "express";
import { addSubCategory, allSubCategory, deleteSubCategory, getSubCategory, updateSubCategory } from "./subcategory.controller.js";


const subcategoryRouter = Router({mergeParams:true})

subcategoryRouter
.route('/')
.post(addSubCategory)
.get(allSubCategory)

subcategoryRouter
.route('/:id')
.get(getSubCategory)
.put(updateSubCategory)
.delete(deleteSubCategory)

export default subcategoryRouter