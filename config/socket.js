import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";
import Car from "../models/Car.js";
import Message from "../models/Message.js";
import { Server } from "socket.io";

const socketAuth = async (socket, next) => {
  try {
    const raw = socket.handshake.auth?.token;

    if (!raw) {
      return next(new Error("No token provided- log in to continue"));
    }

    const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user || !user.isActive) {
      return next(new Error("User not found"));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
};

const registerHandlers = (socket, io) => {
  const user = socket.user;

  socket.join(`user:${user._id}`);

  if (user.isAdmin) {
    socket.join("admin:inbox");
    console.log(`[socket] Admin ${user.username} connected`);
  } else {
    console.log(`[socket] Buyer ${user.username} connected`);
  }

  socket.on("send_enquiry", async ({ listingId, message }) => {
    try {
      if (!listingId || !message) {
        return socket.emit("error", {
          message: "Listing ID and message are required",
        });
      }

      const car = await Car.findById(listingId);

      if (!car) {
        return socket.emit("error", {
          message: "Listing not found",
        });
      }

      if (car.status !== "active") {
        return socket.emit("error", {
          message: "Listing is no longer available",
        });
      }

      const newMessage = await Message.create({
        listing: listingId,
        sender: user._id,
        message: message.trim(),
      });

      await newMessage.populate("listing", "name make model images price");
      await newMessage.populate("sender", "username email profile.fullName");

      socket.emit("enquiry_sent", {
        success: true,
        enquiry: newMessage,
      });

      io.to(
        "admin:inbox".emit("new_enquiry", {
          equiry: newMessage,
        }),
      );
    } catch (error) {
      console.log(error);
      socket.emit("error", {
        message: error.message,
      });
    }
  });

  socket.on("reply_enquiry", async ({ messageId, reply }) => {
    try {
      if (!user.isAdmin) {
        return socket.emit("error", {
          message: "Not Authorized",
        });
      }

      if (!messageId || !reply) {
        return socket.emit("error", {
          message: "Message ID and reply are required",
        });
      }

      const updated = await Message.findByIdAndUpdate(
        messageId,
        {
          $set: {
            reply: reply.trim(),
            repliedAt: Date.now(),
            read: true,
          },
        },
        { new: true },
      )
        .populate("listing", "name make model")
        .populate("sender", "username email profile.fullName");

      if (!updated) {
        return socket.emit("error", {
          message: "Message not found",
        });
      }

      socket.emit("reply_sent", {
        success: true,
        enquiry: updated,
      });

      io.to(`user:${updated.sender._id}`).emit("reply_received", {
        enquiry: updated,
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", {
        message: error.message,
      });
    }
  });

  socket.on("mark_read", async ({ messageId }) => {
    try {
      if (!user.isAdmin) {
        return socket.emit("error", {
          message: "Not Authorized",
        });
      }

      await Message.findByIdAndUpdate(messageId, {
        $set: {
          read: true,
        },
      });

      socket.emit("marked_read", {
        messageId,
        success: true,
      });
    } catch (error) {
      console.log(error);
      socket.emit("error", {
        message: error.message,
      });
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`[socket] ${user.username} disconnected: ${reason}`);
  });
};

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    registerHandlers(socket, io);
  });

  console.log("[socket] Socket.io initialised");
  return io;
};
