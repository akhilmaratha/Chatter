import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose  from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app, server } from "./SocketIO/server.js";
import path from 'path'
const port=process.env.PORT;
app.use(express.json());
app.use(cookieParser());  // add this line before app.use(cors()) to parse cookies
app.use(cors());
try {
    mongoose.connect(process.env.MONGODB_URI,
        (console.log("Connected to MongoDB"))
    )
} catch (error) {
    console.log(error);
}
import userRoute from "./routes/user.route.js"
import messageRoute from "./routes/message.route.js";

// ----------------code for Deployment-------
if(process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();

    app.use(express.static(path.join(__dirname, "./frontend/dist")));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}


app.use("/api/user",userRoute)
app.use("/api/message", messageRoute);


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})