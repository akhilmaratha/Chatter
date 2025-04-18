import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";
import path from "path";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'  // Replace with your frontend URL
}));

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

if(process.env.NODE_ENV==="production"){
  const __dirname = path.resolve();
 app.use(express.static(path.join(__dirname,"./Frontend/dist")));
 app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./Frontend/dist","index.html"));
})  
}



server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
