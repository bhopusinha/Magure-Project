import mongoose, { InferSchemaType, model } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,select:false,unique:true},
    password:{type:String,required:true,select:false},
})


export default model<InferSchemaType<typeof userSchema>>("User",userSchema);