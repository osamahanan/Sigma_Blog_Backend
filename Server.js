import express from "express"
import cors from "cors"
import connectDb from "./Db.js"
import blogRouter from "./Routes.js"
const app = express()
const port = 3000
import { v2 as cloudinary } from "cloudinary"
import fileUpload from "express-fileupload"

cloudinary.config({
  cloud_name: "dcjvfvl1q",
  api_key: "365238719311189",
  api_secret: "QPuR-zXIRGfdWRM2p97KOdOlUFM",
});

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://sigma-blog-pied.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);



app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Connect to database
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }
  
  try {
    await connectDb();
    isConnected = true;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
};

app.use(fileUpload())

// Connect to database on startup
connectToDatabase();


// Middleware to ensure database connection
app.use(async (req, res, next) => {
  try {
    if (!isConnected) {
      await connectToDatabase();
    }
    next();
  } catch (error) {
    console.error('Database connection error in middleware:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed' 
    });
  }
});


// app.use("/api", blogRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});



app.listen(port,()=>{
    console.log(`server is running ${port}`);
    
})

