import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

import { Coupon } from "../../../Database/Models/coupon.model.js";

const addCoupon = catchError(async(req,res,next)=>{
    let isExist = await Coupon.findOne({code:req.body.code})
    if(isExist) return next(new AppError('Coupon already exist',409))
    let coupon = new Coupon(req.body)
    await coupon.save()
    res.status(200).json({message:"coupon added successfully",coupon})
})
// all coupon
const allCoupon = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Coupon.find(), req.query)
    .pagination().sort().fields().filter().search()
    let coupon = await apiFeatures.mongooseQuery ;
    res.status(200).json({ message: "success",page:apiFeatures.pageNumber, coupon });

})

// get coupon
const getCoupon = catchError(async(req,res,next)=>{
    let coupon = await Coupon.findById(req.params.id)
    coupon || next(new AppError("coupon not found",404))
    !coupon || res.status(200).json({message:"success",coupon})
})
// update coupon
const updateCoupon = catchError(async(req,res,next)=>{
    let coupon = await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
    coupon || next(new AppError("coupon not found",404))
    !coupon || res.status(200).json({message:"success",coupon})
})

const deleteCoupon = deleteOne(Coupon)

export{
    addCoupon,
    allCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon
}