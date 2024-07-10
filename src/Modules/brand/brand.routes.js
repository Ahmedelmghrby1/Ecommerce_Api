import { Router } from "express";
import { addBrand, allBrand, deleteBrand, getBrand, updateBrand } from "./brand.controller.js";

const brandRouter = Router()

brandRouter
.route('/')
.post(addBrand)
.get(allBrand)

brandRouter
.route('/:id')
.get(getBrand)
.put(updateBrand)
.delete(deleteBrand)

export default brandRouter