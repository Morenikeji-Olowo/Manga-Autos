import express from "express";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const userRouter = express.Router();

userRouter.get("/cars", authMiddleware.protect, userController.getAllCars);
userRouter.get("/cars/:id", authMiddleware.protect, userController.getCarById);
userRouter.post("/car/search", authMiddleware.protect, userController.searchCars);

export default userRouter