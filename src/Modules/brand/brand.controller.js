// import slugify from "slugify";
import slugify from "slugify";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { Brand } from "../../../Database/Models/brand.model.js";


// add category
const addBrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let brand = new Brand(req.body)
    await brand.save()
    res.status(200).json({message:"Brand added successfully",brand})
})
// all Brand
const allBrand = catchError(async(req,res,next)=>{
    let brand = await Brand.find()
    res.status(200).json({message:"success",brand})

})

// get Brand
const getBrand = catchError(async(req,res,next)=>{
    let brand = await Brand.findById(req.params.id)
    brand || next(new AppError("Brand not found",404))
    !brand || res.status(200).json({message:"success",brand})
})
// update Brand
const updateBrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    let brand = await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
    brand || next(new AppError("Brand not found",404))
    !brand || res.status(200).json({message:"success",brand})
})
// delete Brand
const deleteBrand = catchError(async(req,res,next)=>{
    let brand = await Brand.findByIdAndDelete(req.params.id)
    brand || next(new AppError("Brand not found",404))
   !brand || res.status(200).json({message:"Deleted successfully"})
})

export{
    addBrand,
    allBrand,
    getBrand,
    updateBrand,
    deleteBrand
}