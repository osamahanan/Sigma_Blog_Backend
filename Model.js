import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    title:String,
    description:String,
    image:String,
    category:String,
    author:String,
    image: {
        public_id: String,
        url: String
    }
});

export const BlogModel = mongoose.model("Blog",BlogSchema)