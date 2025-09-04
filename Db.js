import mongoose from "mongoose";

 const connectDb = async() =>{

try {
    await mongoose.connect("mongodb://localhost:27017/SigmaBlog")
    console.log("Database is connected");
    
} catch (error) {
  console.log(error);
    
}
}

export default connectDb