import { model, Schema } from "mongoose";

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
description:{
    type:String,
    require:true,
    mineLength:30,
    maxLength:1000
},
imageCover:String,
images:[String],
price:{
    type:Number,
    required:true,
    min:0,
},
priceAfterDiscount:{
    type:Number,
    required:true,
    min:0,
},
sold:Number,
stock:{
    type:Number,
    min:0
},
category:{
    type:Types.ObjectId,
    ref:'Category',
},
subcategory:{
    type:Types.ObjectId,
    ref:'SubCategory',
},
brand:{
    type:Types.ObjectId,
    ref:'Brand',
},
rateAvg:{
    type:Number,
    min:0,
    max:5
},
rateCount:Number

},
{
    timestamps:true,
    versionKey:false,
})

export const Category = model ('Cateory', schema)