import {
  getMyEnquiries,
  getEnquiriesForListing,
  getAllEnquiries,
  getUnreadCount,
  deleteMessage,
} from "../services/message.service.js";

export const getMyMessages = async (req, res) => {
  try {
    const messages = await getMyEnquiries(req.user._id);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminMessages = async (req, res) => {
  try {
    const result = await getAllEnquiries(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getListingMessages = async (req, res) => {
  try {
    const messages = await getEnquiriesForListing(req.params.listingId);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const unreadCount = async (req, res) => {
  try {
    const count = await getUnreadCount();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const removeMessage = async (req, res) => {
  try {
    await deleteMessage(req.params.id);
    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
};
