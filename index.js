import dotenv from "dotenv"
dotenv.config();

import { validateEnv } from "./config/env.js";
validateEnv();

import express, { json, urlencoded } from "express";
import session from "express-session";
import { Passport } from "passport";
import cors from "cors";
import passport from "passport";
import dbConnect from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.routes.js"; 

import cloudinary from "./config/cloudinary.js";
import { createServer } from "http";
import { initSocket } from "./config/socket.js";



dbConnect();
const app =  express();

const httpServer = createServer(app);
const io = initSocket(httpServer);

app.use((req, res, next)=>{
    req.io = io;
    next();
})


//middlewares
const corseOptions = {
    origin: "https://smota-livid.vercel.app/",
    credentials: true,
};
app.use(cors(corseOptions));
app.use(json({limit: "100mb"}));
app.use(urlencoded({limit: "100mb", extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 5000;
httpServer.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});