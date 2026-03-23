import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { getMyMessages } from "../controllers/message.controller";

const messageRouter = Router();
messageRouter.use(authMiddleware.protect);

messageRouter.get("/mine", getMyMessages);

export default messageRouter;