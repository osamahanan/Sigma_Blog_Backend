import express from "express"
import cors from "cors"
import connectDb from "./Db.js"
import Routes from "./Routes.js"
const app = express()
const port = 3000
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload"


cloudinary.config({
  cloud_name: 'dcjvfvl1q',
  api_key: '365238719311189',
  api_secret: 'QPuR-zXIRGfdWRM2p97KOdOlUFM',
});



app.use(cors({
    origin:["http://localhost:5174","http://localhost:5173"]
}))

app.use(express.json())


connectDb()
app.get("/", (req,res)=>{
  res.send("Hello World")
})
app.use(fileUpload())

app.use("/api",Routes)



app.listen(port,()=>{
    console.log(`🚀 Server started on port ${port}`);
    
})