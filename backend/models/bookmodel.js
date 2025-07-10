import mongoose from "mongoose";
import { stringify } from "postcss";
const bookSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },author:{
            type:String,
            required:true,
        },
        publishingyear:{
            type:Number,
            required:true,
        },
    },{
        timestamps:true,
    }
);

export const Book= mongoose.model('Book',bookSchema);