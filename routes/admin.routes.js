import express from "express";
import { createCar, deleteCar, manageCars, markCarAsSold, updateCar } from "../controllers/admin.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { multerUpload, uploadToCloudinary } from "../middlewares/upload.middleware.js";
import { getAdminMessages, getListingMessages, removeMessage, unreadCount } from "../controllers/message.controller.js";

const adminRouter = express.Router();
adminRouter.use(authMiddleware.protect, authMiddleware.admin);

adminRouter.get("/cars", manageCars);
adminRouter.post(
  "/cars",
  multerUpload.array("images", 15),
  uploadToCloudinary,
  createCar
);
adminRouter.put(
  "/cars/:id",
  multerUpload.array("images", 15),
  uploadToCloudinary,
  updateCar
);
adminRouter.delete("/cars/:id",deleteCar );
adminRouter.patch("/cars/:id/sold",markCarAsSold );


adminRouter.get("/messages/unread-count", unreadCount);
adminRouter.get("/messages/listing/:listingId", getListingMessages);
adminRouter.get("/messages", getAdminMessages);
adminRouter.delete("/messages/:id", removeMessage);

export default adminRouter;