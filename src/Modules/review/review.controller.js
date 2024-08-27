// import slugify from "slugify";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { Review } from "../../../Database/Models/review.model.js";


const addReview = catchError(async(req,res,next)=>{
    req.body.user=req.user._id
    let isExist = await Review.findOne({user: req.user._id , product: req.body.product})
    if(isExist) return next(new AppError("You have already reviewed this product", 409))
    let review = new Review(req.body)
    await review.save()
    res.status(200).json({message:"Review added successfully",review})
})
// all review
const allReview = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Review.find(), req.query)
    .pagination().sort().fields().filter().search()
    let review = await apiFeatures.mongooseQuery ;
    res.status(200).json({ message: "success",page:apiFeatures.pageNumber, review });

})

// get review
const getReview = catchError(async(req,res,next)=>{
    let review = await Review.findById(req.params.id)
    review || next(new AppError("Review not found",404))
    !review || res.status(200).json({message:"success",review})
})
// update review
const updateReview = catchError(async(req,res,next)=>{
    let review = await Review.findOneAndUpdate({_id:req.params.id , user:req.user._id},req.body,{new:true})
    review || next(new AppError("Review not found",404))
    !review || res.status(200).json({message:"success",review})
})
// delete review
const deleteReview = deleteOne(Review)

export{
    addReview,
    allReview,
    getReview,
    updateReview,
    deleteReview
}