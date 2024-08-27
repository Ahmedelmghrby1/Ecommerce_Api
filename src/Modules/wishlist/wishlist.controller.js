// import slugify from "slugify";
import { User } from "../../../Database/Models/user.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";




const addToWishlist = catchError(async(req,res,next)=>{
    let wishlist = await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.product}},{new:true})
    wishlist || next(new AppError("wishlist not found",404))
    !wishlist || res.status(200).json({message:"success",wishlist:wishlist.wishlist})
})

const removeFromWishlist = catchError(async(req,res,next)=>{
    let wishlist = await User.findByIdAndUpdate(req.user._id,{$pull:{wishlist:req.params.id}},{new:true})
    wishlist || next(new AppError("wishlist not found",404))
    !wishlist || res.status(200).json({message:"success",wishlist:wishlist.wishlist})
})

const getLoggedUserWishlist = catchError(async(req,res,next)=>{
    let wishlist = await User.findById(req.user._id).populate('wishlist')
    wishlist || next(new AppError("wishlist not found",404))
    !wishlist || res.status(200).json({message:"success",wishlist:wishlist.wishlist})
})


export{
    addToWishlist,
    removeFromWishlist,
    getLoggedUserWishlist
}