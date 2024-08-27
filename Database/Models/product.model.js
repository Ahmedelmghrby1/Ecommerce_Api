import { model, Schema, Types } from "mongoose";

const schema =new Schema({
title:{
    type:String,
    required:true,
    unique:[true , 'title is required'],
    trim:true,
    mineLength:[2, 'to0 short product title']
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
    toJSON:{
        virtuals:true
    },id:false
})
schema.virtual('myReview',{
    ref:'Review',
    localField:'_id',
    foreignField:'product'

})
schema.pre("findOne", function(){
    this.populate('myReview')
})


schema.post('init',function(doc){
    if(doc.imageCover) {doc.imageCover = process.env.BASE_URL + "products/" + doc.imageCover}
    if(doc.images)  {doc.images = doc.images.map(img=> process.env.BASE_URL + "products/" + img)}
})


export const Product = model ('Product', schema)