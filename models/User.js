import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true,  trim: true , lowercase: true },

    password: { type: String, select: false },   

    //OAuth
    googleId: {
      type:String,
      default: null
    },
    authProvider:{
      type: String, 
      enum:["local", "google"],
      default: "local",
    },

    //Role
    isAdmin: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },

    //Email verification
    isEmailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },
    
    //MFA
    isMfaActive: { type: Boolean, default: false },
    twoFactorSecret: { type: String, select:false },
    
    //reset password
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false },

    //trustedDevices
    trustedDevices: {
      type: [
        {
          token: { type: String },
          expires: { type: Date },
        },
      ],
      default: [],
    },

    //Account state
    isActive:{
      type: Boolean, default: true
    },

    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car', default: [] }],

    // USER PROFILE (FUTURE-PROOF)
    profile: {
      fullName: { type: String },
      phone: { type: String },
      profilePicture: { type: String }, //Cloudinary
      address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;