import mongoose from "mongoose";

 const connectDb = async() =>{

try {
    await mongoose.connect("mongodb+srv://osama:_OsamaHanan@cluster0.ynihopm.mongodb.net/SigmaBlog?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Database is connected");
    
    
} catch (error) {
  console.log(error);
    
}
}

export default connectDb