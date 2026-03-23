import Message from "../models/Message.js";

export const getMyEnquiries = async (userId) => {
  return Message.find({
    sender: userId,
  })
    .populate("listing", "name make model images price status currentLocation")
    .sort({ createdAt: -1 })
    .lean();
};

export const getEnquiriesForListing = async (listingId) => {
  return Message.find({
    listing: listingId,
  })
    .populate("sender", "username email profile.fullName profile.phone")
    .sort({ createdAt: -1 })
    .lean();
};

export const getAllEnquiries = async () => {
  const filter = {};
  if (query.read !== undefined) {
    filter.read = query.read === "true";
  }
  if (query.listing) {
    filter.listing = query.listing;
  }

  const page = Math.max(1, Number(query.page)); // pagination
  const limit = Math.max(1, Number(query.limit) || 10); //limt per page
  const skip = (page - 1) * limit; //skip number

  const [total, messages] = await Promise.all([
    Message.countDocuments(filter),
    Message.find(filter)
      .populate("listing", "name make model images price")
      .populate("sender", "username email profile.fullName profile.phone")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
  ]);

  return {
    messages,
    pagination: { total, page, pages: Math.ceil(total / limit), limit },
  };
};


export const getUnreadCount = async () => {
  return Message.countDocuments({ read: false });
};
 
export const deleteMessage = async (messageId) => {
  const message = await Message.findByIdAndDelete(messageId);
  if (!message) {
    const error = new Error("Message not found");
    error.statusCode = 404;
    throw error;
  }
  return message;
};