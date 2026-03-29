import { Router } from "express";
import passport, { Passport } from "passport";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const authRouter = Router();

//public routes
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/verify-email/:token", authController.verifyEmail);
authRouter.post('/resend-verification', authController.resendVerification);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password/:token", authController.resetPassword);

//google auth
authRouter.get("/google", authController.googleAuth);
authRouter.get("/google/callback",authController.googleCallback)


//protected Routes
authRouter.post("/status", authMiddleware.protect, authController.status);
authRouter.get("/me", authMiddleware.protect, authController.getMe);
authRouter.post("/logout", authMiddleware.protect, authController.logout);

//2Fa
authRouter.post("/2fa/setup", authMiddleware.protect, authController.setup2FA);
authRouter.post("/2fa/verify", authController.verify2FA);
authRouter.post("/2fa/reset", authMiddleware.protect, authController.reset2FA);


export default authRouter;
