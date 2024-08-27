// import slugify from "slugify";
import slugify from "slugify";
import { Category } from "../../../Database/Models/category.model.js";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


// add category
const addCategory = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.image = req.file.filename
    let category = new Category(req.body)
    await category.save()
    res.status(200).json({message:"category added successfully",category})
})
// all category
const allCategory = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Category.find(), req.query)
  .pagination().sort().fields().filter().search()
  let categories = await apiFeatures.mongooseQuery ;
  res.status(200).json({ message: "success",page:apiFeatures.pageNumber, categories });
})

// get category
const getCategory = catchError(async(req,res,next)=>{
    let category = await Category.findById(req.params.id)
    category || next(new AppError("category not found",404))
    !category || res.status(200).json({message:"success",category})
})
// update category
const updateCategory = catchError(async(req,res,next)=>{
   if(req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.image = req.file.filename
    let category = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    category || next(new AppError("category not found",404))
    !category || res.status(200).json({message:"success",category})
})
// delete category
const deleteCategory = deleteOne(Category)

export{
    addCategory,
    allCategory,
    getCategory,
    updateCategory,
    deleteCategory
}