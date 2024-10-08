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
logo:String
},
{
    timestamps:true,
    versionKey:false,
})
schema.post('init',function(doc){
    doc.logo = process.env.BASE_URL + "brands/" + doc.logo
})

export const Brand = model ('Brand', schema)