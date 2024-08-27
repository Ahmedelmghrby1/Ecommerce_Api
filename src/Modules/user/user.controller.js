// import slugify from "slugify";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { User } from "../../../Database/Models/user.model.js";


// add category
const addUser = catchError(async(req,res,next)=>{
    let user = new User(req.body)
    await user.save()
    res.status(200).json({message:"user added successfully",user})
})
// all user
const allUser = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(User.find(), req.query)
    .pagination().sort().fields().filter().search()
    let user = await apiFeatures.mongooseQuery ;
    res.status(200).json({ message: "success",page:apiFeatures.pageNumber, user });

})

// get user
const getUser = catchError(async(req,res,next)=>{
    let user = await User.findById(req.params.id)
    user || next(new AppError("user not found",404))
    !user || res.status(200).json({message:"success",user})
})
// update user
const updateUser = catchError(async(req,res,next)=>{
    let user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    user || next(new AppError("user not found",404))
    !user || res.status(200).json({message:"success",user})
})
// delete user
const deleteUser = deleteOne(User)

export{
    addUser,
    allUser,
    getUser,
    updateUser,
    deleteUser
}