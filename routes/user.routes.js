import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { updateAvatar, updateProfile } from "../controllers/profile.controller.js";
import { multerUpload, uploadToCloudinary } from "../middlewares/upload.middleware.js";
const userRouter = express.Router();

userRouter.get("/cars", authMiddleware.protect, userController.getAllCars);
userRouter.get("/cars/:id", authMiddleware.protect, userController.getCarById);
userRouter.post("/car/search", authMiddleware.protect, userController.searchCars);

userRouter.put('/profile', authMiddleware.protect, updateProfile);
userRouter.put('/profile/avatar', authMiddleware.protect, multerUpload.single('avatar'), uploadToCloudinary, updateAvatar);

export default userRouter