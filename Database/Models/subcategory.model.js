import { model, Schema, Types } from "mongoose";

const schema =new Schema({
name:{
    type:String,
    required:true,
    unique:[true , 'name is required'],
    trim:true,
    mineLength:[2, 'to0 short category name']
},
slug:{
    type:String,
    required:true,
    lowercase:true,
    unique:[true , 'slug is required'],
},
category:{
    type: Types.ObjectId,
    ref:'Category',
}
},
{
    timestamps:true,
    versionKey:false,
})

export const SubCategory = model ('SubCateory', schema)