import { Router } from "express";
import { addBrand, allBrand, deleteBrand, getBrand, updateBrand } from "./brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";

const brandRouter = Router()

brandRouter
.route('/')
.post(uploadSingleFile('logo','brands'),addBrand)
.get(allBrand)

brandRouter
.route('/:id')
.get(getBrand)
.put(uploadSingleFile('logo','brands'),updateBrand)
.delete(deleteBrand)

export default brandRouter