import { Router } from "express";
import { addReview, allReview, deleteReview, getReview, updateReview } from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const reviewRouter = Router()

reviewRouter
.route('/')
.post(protectedRoutes,allowedTo('user'),addReview)
.get(allReview)

reviewRouter
.route('/:id')
.get(getReview)
.put(protectedRoutes,allowedTo('user'),updateReview)
.delete(protectedRoutes,allowedTo('user','admin'),deleteReview)

export default reviewRouter