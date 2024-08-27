// import slugify from "slugify";
import slugify from "slugify";
import { catchError } from "../../Middlewares/catchError.js";
import { AppError } from "../../utils/appError.js";
import { Brand } from "../../../Database/Models/brand.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";


const addBrand = catchError(async(req,res,next)=>{
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    let brand = new Brand(req.body)
    await brand.save()
    res.status(200).json({message:"Brand added successfully",brand})
})
// all Brand
const allBrand = catchError(async(req,res,next)=>{
    let apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .pagination().sort().fields().filter().search()
    let brand = await apiFeatures.mongooseQuery ;
    res.status(200).json({ message: "success",page:apiFeatures.pageNumber, brand });

})

// get Brand
const getBrand = catchError(async(req,res,next)=>{
    let brand = await Brand.findById(req.params.id)
    brand || next(new AppError("Brand not found",404))
    !brand || res.status(200).json({message:"success",brand})
})
// update Brand
const updateBrand = catchError(async(req,res,next)=>{
   if(req.body.slug) req.body.slug = slugify(req.body.name)
    if(req.file) req.body.logo = req.file.filename
    let brand = await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
    brand || next(new AppError("Brand not found",404))
    !brand || res.status(200).json({message:"success",brand})
})
// delete Brand
const deleteBrand = deleteOne(Brand)

export{
    addBrand,
    allBrand,
    getBrand,
    updateBrand,
    deleteBrand
}