// import slugify from "slugify";
import slugify from "slugify";
import { Category } from "../../../Database/Models/category.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";


// add category
const addCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let category = new Category(req.body)
    await category.save()
    res.status(200).json({message:"category added successfully",category})
})
// all category
const allCategory = catchError(async(req,res,next)=>{
    let categories = await Category.find()
    res.status(200).json({message:"success",categories})

})

// get category
const getCategory = catchError(async(req,res,next)=>{
    let category = await Category.findById(req.params.id)
    category || next(new AppError("category not found",404))
    !category || res.status(200).json({message:"success",category})
})
// update category
const updateCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let category = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    category || next(new AppError("category not found",404))
    !category || res.status(200).json({message:"success",category})
})
// delete category
const deleteCategory = catchError(async(req,res,next)=>{
    let category = await Category.findByIdAndDelete(req.params.id)
    category || next(new AppError("category not found",404))
   !category || res.status(200).json({message:"Deleted successfully"})
})

export{
    addCategory,
    allCategory,
    getCategory,
    updateCategory,
    deleteCategory
}