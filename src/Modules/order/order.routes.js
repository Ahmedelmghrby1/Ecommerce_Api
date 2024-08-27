import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createCashOrder, createCheckoutSession, getAllOrder, getUserOrder } from "./order.controller.js";

const orderRouter = Router()

orderRouter
.route('/')
.get(protectedRoutes,allowedTo('admin'),getAllOrder)
orderRouter.get('/users',protectedRoutes,allowedTo('user','admin'),getUserOrder)


orderRouter
.route('/:id')
.post(protectedRoutes,allowedTo('user'),createCashOrder)

orderRouter.post('/checkout/:id',protectedRoutes,allowedTo('user'),createCheckoutSession)


export default orderRouter