import { Router } from "express";
import { addCoupon, allCoupon, deleteCoupon, getCoupon, updateCoupon } from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const couponRouter = Router()

couponRouter.use(protectedRoutes,allowedTo("admin"))

couponRouter
.route('/')
.post(addCoupon)
.get(allCoupon)

couponRouter
.route('/:id')
.get(getCoupon)
.put(updateCoupon)
.delete(deleteCoupon)

export default couponRouter