import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          "profile.fullName": fullName,
          "profile.phone": phone,
          "profile.address": address,
        },
      },
      { new: true },
    ).select(
      "-password -verificationToken -twoFactorSecret -resetPasswordToken -resetPasswordExpire",
    );
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: err.message,
    });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "profile.profilePicture": req.uploadedImages[0],
        },
      },
      { new: true },
    ).select(
      "-password -verificationToken -twoFactorSecret -resetPasswordToken -resetPasswordExpire",
    );
    res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating avatar",
      error: err.message,
    });
  }
};
