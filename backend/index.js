import express from "express";
import { connection } from "./db.js";
import userRoute from "./routes/userRoute.js";
import itemRoute from "./routes/itemRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoutes.js";
import locationRoute from "./routes/locationRoutes.js";
import statsRoute from "./routes/statRoute.js"
import collegeRoute from "./routes/collegeRoute.js";
import claimRoute from "./routes/claimRoute.js";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv"
import cors from "cors";
import { createUploadsFolders } from "./utils/helper.js";




dotenv.config();


const app = express();
const port = 5000;

connection();
createUploadsFolders();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads/items', express.static('uploads/items'));
app.use('/uploads/profiles', express.static('uploads/profiles'));
app.use("/uploads/proofs", express.static("uploads/proofs"));

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
app.use("/api/stats", statsRoute);
app.use("/api/colleges", collegeRoute);
app.use("/api/claims", claimRoute);

app.listen(port, ()=> {
    console.log("Server running");
});