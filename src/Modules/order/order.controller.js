import { Cart } from "../../../Database/Models/cart.model.js"
import { Order } from "../../../Database/Models/order.model.js"
import { Product } from "../../../Database/Models/product.model.js"
import { catchError } from "../../Middlewares/catchError.js"
import { AppError } from "../../utils/appError.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Prm6QCwdPcaokUhcUDrYnlhfIlKiTPg1RrNUxaVgg9lwLZhv7aSmZ197gvspb7e8pLiDTnSvTC2CbUePKof6Yfm00JMEGZfBU');

const createCashOrder = catchError(async(req,res,next)=>{
    let cart = await Cart.findById(req.params.id)
    if(!cart) return next(new AppError('Cart not found',404))
    
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let order = new Order({
        user:req.user._id,
        orderItems:cart.cartItems,
        shippingAddress:req.body.shippingAddress,
        totalOrderPrice

    })
    await order.save()
    let options = cart.cartItems.map((prod)=>{
        return ({
            updateOne:{
                "filter":{_id: prod.product},
                "update":{$inc:{sold: prod.quantity, stock: -prod.quantity}}
            }
           })
    })
   await Product.bulkWrite(options)
   await Cart.findByIdAndDelete(cart._id)
    res.status(201).json({message:'Order created successfully',order})
    
})


const getUserOrder = catchError(async(req,res,next)=>{
    let orders = await Order.findOne({user:req.user._id}).populate('orderItems.product')
    if(!orders) return next(new AppError('No orders found',404))
    res.status(201).json({message:'success',orders})
    
})

const getAllOrder = catchError(async(req,res,next)=>{
    let orders = await Order.find()
    res.status(201).json({message:'success',orders})
    
})

const createCheckoutSession = catchError(async(req,res,next)=>{
    let cart = await Cart.findById(req.params.id)
    if(!cart) return next(new AppError('Cart not found',404))
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
    let session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'egp',
                unit_amount: totalOrderPrice * 100,
                product_data:{
                    name: req.user.name,
                }
            },
            quantity: 1,
          }],
          mode: 'payment',
          success_url: 'http://localhost:3000/orders',
          cancel_url: 'http://localhost:3000/cart',

          customer_email: req.user.email,
          client_reference_id: req.params.id,
          metadata: req.body.shippingAddress
    })
    res.status(201).json({message:'success',session})
})

export{
    createCashOrder,
    getUserOrder,
    getAllOrder,
    createCheckoutSession
}