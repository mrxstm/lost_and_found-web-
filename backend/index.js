import express from "express";
import { connection } from "./db.js";
import userRoute from "./routes/userRoute.js";
import itemRoute from "./routes/itemRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoutes.js";
import locationRoute from "./routes/locationRoutes.js";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import cors from "cors";
import { createUploadsFolder } from "./utils/helper.js";


dotenv.config();


const app = express();
const port = 5000;

connection();
createUploadsFolder();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true              
}));

//routes
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/admin", adminRoute)
app.use("/api/item", itemRoute)
app.use("/api/locations", locationRoute)

app.listen(port, ()=> {
    console.log("Server running");
});