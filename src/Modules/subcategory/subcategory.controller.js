// import slugify from "slugify";
import slugify from "slugify";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { SubCategory } from "../../../Database/Models/subcategory.model.js";


// add category
const addSubCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subcategory = new SubCategory(req.body)
    await subcategory.save()
    res.status(200).json({message:"subcategory added successfully",subcategory})
})
// all category
const allSubCategory = catchError(async(req,res,next)=>{
    let subcategories = await SubCategory.find()
    res.status(200).json({message:"success",subcategories})

})

// get category
const getSubCategory = catchError(async(req,res,next)=>{
    let subcategory = await SubCategory.findById(req.params.id)
    subcategory || next(new AppError("subcategory not found",404))
    !subcategory || res.status(200).json({message:"success",subcategory})
})
// update category
const updateSubCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subcategory = await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    subcategory || next(new AppError("category not found",404))
    !subcategory || res.status(200).json({message:"success",subcategory})
})
// delete category
const deleteSubCategory = catchError(async(req,res,next)=>{
    let subcategory = await SubCategory.findByIdAndDelete(req.params.id)
    subcategory || next(new AppError("subcategory not found",404))
   !subcategory || res.status(200).json({message:"Deleted successfully"})
})

export{
    addSubCategory,
    allSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}