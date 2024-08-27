// import slugify from "slugify";
import slugify from "slugify";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { SubCategory } from "../../../Database/Models/subcategory.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


// add subcategory
const addSubCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subcategory = new SubCategory(req.body)
    await subcategory.save()
    res.status(200).json({message:"subcategory added successfully",subcategory})
})
// all subcategory
const allSubCategory = catchError(async(req,res,next)=>{
    let filterObj={}
    if(req.params.category) filterObj.category=req.params.category

    let apiFeatures = new ApiFeatures(SubCategory.find(filterObj), req.query)
    .pagination().sort().fields().filter().search()
    let subcategories = await apiFeatures.mongooseQuery ;
    res.status(200).json({ message: "success",page:apiFeatures.pageNumber, subcategories });
})

// get subcategory
const getSubCategory = catchError(async(req,res,next)=>{
    let subcategory = await SubCategory.findById(req.params.id)
    subcategory || next(new AppError("subcategory not found",404))
    !subcategory || res.status(200).json({message:"success",subcategory})
})
// update subcategory
const updateSubCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let subcategory = await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    subcategory || next(new AppError("category not found",404))
    !subcategory || res.status(200).json({message:"success",subcategory})
})
// delete subcategory
const deleteSubCategory = deleteOne(SubCategory)

export{
    addSubCategory,
    allSubCategory,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}