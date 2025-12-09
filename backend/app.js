import express from "express";
import cors from "cors";
import {createServer} from "node:http";
import {connectToSocket} from "./controllers/socketManager.js"
import mongoose from "mongoose";
import userRoutes from "./routes/users.routes.js"
import contactRoutes from "./routes/contact.routes.js"
import "dotenv/config";

const app=express();
const PORT=process.env.PORT || 8080;
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use(cors());

const server=createServer(app);
const io=connectToSocket(server);

app.set("port",PORT);

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/contact",contactRoutes);


const start=async()=>{
    const connectDB=await mongoose.connect(process.env.MONGO_URL);
    console.log(`MONGO Connected DB Host: ${connectDB.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log(`server is running on ${PORT}`);
    });


}
start();