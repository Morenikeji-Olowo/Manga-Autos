export const tokenBlacklist = new Set();
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import passport from "passport";
import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/User.js";

const signToken = (user) =>
  jsonwebtoken.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const newUser = await User.create({
      username,
      password,
      email,
      isMfaActive: false,
    });

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    newUser.verificationToken = verificationToken;
    await newUser.save();

    // Send verification email
    const verifyUrl = `${process.env.RENDER_URL}/api/auth/verify-email/${verificationToken}`;
    sendEmail(
      newUser.email,
      "Verify your email",
      `
  <p>Hello ${newUser.username},</p>
  <p>Please verify your account:</p>
  <a href="${verifyUrl}">${verifyUrl}</a>
`,
    ).catch((err) => console.error("Email failed:", err));

    res.status(201).json({
      message:
        "User registered successfully. Check your email to verify your account.",
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.error("Register error:", error);
    // Duplicate key — email or username already exists
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        error: "Account already exists",
        message: `An account with that ${field} already exists`,
      });
    }
    res
      .status(500)
      .json({ error: "Error registering user", message: error.message });
  }
};

const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email }).select("+verificationToken");

    if (!user || user.isEmailVerified) {
      return res.status(200).json({
        message:
          "If that email exists and is unverified, a new link has been sent",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    await user.save();

    const verifyUrl = `${process.env.RENDER_URL}/api/auth/verify-email/${verificationToken}`;
    await sendEmail(
      user.email,
      "Verify your email",
      `Please verify your account: ${verifyUrl}`,
    );

    res.status(200).json({
      success: true,
      message:
        "If that email exists and is unverified, a new link has been sent",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error resending email",
      message: error.message,
    });
  }
};
// ─── Verify email ────────────────────────────────────────
/*
  NEW. User clicks link from their email → hits this endpoint.
  We find them by token, mark email as verified, clear the token.
*/
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params

    const user = await User.findOne({ verificationToken: token }).select('+verificationToken')

    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/verify-email?status=invalid`)
    }

    user.isEmailVerified = true
    user.verificationToken = undefined
    await user.save()

    res.redirect(`${process.env.FRONTEND_URL}/verify-email?status=success`)

  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/verify-email?status=error`)
  }
}

// ─── Login ───────────────────────────────────────────────
// YOUR CODE — unchanged except signToken helper used
export const login = async (req, res) => {
  const { email, password, rememberDevice } = req.body;
  const deviceToken = req.cookies?.trustedDevice;

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res
      .status(401)
      .json({ message: "No account found with that email" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

  // Check if device is trusted — skip MFA if so
  if (deviceToken) {
    const trusted = user.trustedDevices?.find(
      (d) => d.token === deviceToken && d.expires > Date.now(),
    );
    if (trusted) {
      return res.json({
        message: "Login successful (trusted device)",
        token: signToken(user),
        username: user.username,
        isMfaActive: user.isMfaActive,
        isAdmin: user.isAdmin,
      });
    }
  }

  // MFA required — don't issue JWT yet
  if (user.isMfaActive) {
    return res.status(200).json({
      message: "MFA required",
      mfaRequired: true,
      userId: user._id,
      rememberDevice,
    });
  }

  // Normal login — issue JWT
  if (rememberDevice) {
    const newDeviceToken = crypto.randomBytes(32).toString("hex");
    user.trustedDevices.push({
      token: newDeviceToken,
      expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });
    await user.save();

    res.cookie("trustedDevice", newDeviceToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  return res.status(200).json({
    message: "Login successful",
    token: signToken(user),
    username: user.username,
    isMfaActive: user.isMfaActive,
    isAdmin: user.isAdmin,
  });
};

// ─── Google OAuth ────────────────────────────────────────
/*
  NEW. Two handlers:

  googleAuth     → just triggers Passport's Google redirect.
                   User gets sent to Google's login page.

  googleCallback → Google redirects back here after login.
                   Passport has already run our GoogleStrategy
                   and attached the user to req.user.
                   We issue a JWT and redirect to the frontend.
*/
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});

export const googleCallback = (req, res) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=oauth_failed`,
      );
    }

    const token = signToken(user);

    /*
      We redirect to the frontend with the token in the URL.
      The frontend grabs it, stores it, then removes it from
      the URL using history.replaceState so it doesn't stay visible.
    */
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  })(req, res);
};

// ─── Status / Get current user ───────────────────────────
// YOUR status function + new getMe that returns full profile
const status = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User logged in successfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "User not logged in" });
  }
};

export const getMe = (req, res) => {
  // req.user is set by verifyToken middleware before this runs
  res.status(200).json({
    username: req.user.username,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    isMfaActive: req.user.isMfaActive,
    isEmailVerified: req.user.isEmailVerified,
    role: req.user.role,
    profile: req.user.profile,
    authProvider: req.user.authProvider,
  });
};

// ─── Logout ──────────────────────────────────────────────
// YOUR CODE — unchanged
const logout = async (req, res) => {
  try{
    const token = req.headers.authorization?.split(" ")[1];

    if(token){
      tokenBlacklist.add(token);
    }
    res.status(200).json({ 
      success: true,
      message: "Logged out successfully" });
  }
  catch(error){
    res.status(500).json({ 
      success: false,
      error: "Error logging out", 
      message: error.message });
  }
};

// ─── 2FA ─────────────────────────────────────────────────
// YOUR CODE — unchanged
const setup2FA = async (req, res) => {
  try {
    const user = req.user;
    const secret = speakeasy.generateSecret();
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();

    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "carsales",
      encoding: "base32",
    });
    const qrImageUrl = await qrcode.toDataURL(url);

    res.status(200).json({ secret: secret.base32, qrcode: qrImageUrl });
  } catch (error) {
    res.status(500).json({ error: "Error setting up 2FA", message: error });
  }
};

export const verify2FA = async (req, res) => {
  const { token, userId, rememberDevice } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.twoFactorSecret) {
    return res.status(400).json({ message: "2FA not enabled for this user" });
  }

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
    window: 1,
  });
  if (!verified) return res.status(400).json({ message: "Invalid OTP" });

  if (rememberDevice) {
    const newDeviceToken = crypto.randomBytes(32).toString("hex");
    user.trustedDevices.push({
      token: newDeviceToken,
      expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
    });
    await user.save();
    res.cookie("trustedDevice", newDeviceToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  res.status(200).json({
    message: "2FA verified successfully",
    token: signToken(user),
    username: user.username,
    isMfaActive: user.isMfaActive,
  });
};

const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.isMfaActive = false;
    user.twoFactorSecret = "";
    await user.save();
    res.status(200).json({ message: "2FA reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error resetting 2FA", message: error });
  }
};

// ─── Password reset ──────────────────────────────────────
/*
  FIX: forgotPassword no longer returns 404 when email not found.
  Always returns the same message — prevents email enumeration.
  (Attacker could probe "is this email registered?" by watching
  the response — now they can't.)
*/
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const resetToken = crypto.randomBytes(20).toString("hex");
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins
      await user.save();

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      await sendEmail(
        user.email,
        "Password Reset",
        `Click here to reset: ${resetUrl}`,
      );
    }

    // Same response whether user exists or not
    res.status(200).json({
      message: "If that email is registered, a reset link has been sent",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error processing request", message: error.message });
  }
};

// YOUR CODE — unchanged
const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = newPassword; // pre-save hook hashes this
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error resetting password", message: error.message });
  }
};

const authController = {
  register,
  verifyEmail,
  login,
  googleAuth,
  resendVerification,
  googleCallback,
  status,
  getMe,
  logout,
  setup2FA,
  verify2FA,
  reset2FA,
  forgotPassword,
  resetPassword,
};

export default authController;
