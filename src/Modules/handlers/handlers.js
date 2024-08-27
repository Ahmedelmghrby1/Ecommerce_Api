import { catchError } from "../../Middlewares/catchError.js"
import { AppError } from "../../utils/appError.js"


export const deleteOne = (model)=>{
    return catchError(async(req,res,next)=>{
        let document = await model.findByIdAndDelete(req.params.id)
        document || next(new AppError("document not found",404))
       !document || res.status(200).json({message:"Deleted successfully"})
    })
}