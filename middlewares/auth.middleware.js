import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";
import { tokenBlacklist } from "../controllers/auth.controller.js";
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if(tokenBlacklist.has(token)){
        return res.status(401).json({
          message: "Not authorized, session expired"
        })
      }
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user || !req.user.isActive) {
        return res.status(401).json({
          message: "Not authorized, User not found",
        });
      }
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Session Expired, login again",
        });
      }
      res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  } else {
    res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      message: "Not authorized as admin",
    });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return next();

    const token = authHeader.split(" ")[1];
    if(tokenBlacklist.has(token)){
      return next();
    }
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (user?.isActive) {
      req.user = user;
    }
    next();
  } catch (error) {
    next();
  }
};
const authMiddleware = { protect, admin, optionalAuth };
export default authMiddleware;
