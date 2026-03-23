import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //Listing information

    status: {
      type: String,
      enum: ["active", "inactive", "sold", "draft"],
      default: "active",
    },

    //General Information
    used: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },

    make: { type: String, trim: true }, 
    model: { type: String, trim: true }, 

    listedDate: { type: Date, default: Date.now },
    currentLocation: { type: String, required: true },
    price: { type: Number, required: true },
    negotiable: { type: Boolean, default: false },
    description: { type: String, trim: true },

    images: [{type: String}],

    //Basic Details
    basicDetails: {
      year: { type: Number },
      grade: { type: String },
      exteriorColor: { type: String },
      interiorColor: { type: String },
      mileage: { type: Number },
      speed: { type: Number },
      fuelType: {
        type: String,
        enum: ["petrol", "diesel", "electric", "hybrid", "CNG", "other"],
      },
      isElectric: { type: Boolean },
      transmission: {
        type: String,
        enum: ["automatic", "manual", "CVT", "other"],
      },
      engineSize: { type: String },  // e.g. "2.0L"
      drivetrain: {
        type: String,
        enum: ["FWD", "RWD", "AWD", "4WD"],
      },
      condition: {
        type: String,
        enum: ["excellent", "good", "fair", "poor"],
      },
      vin: { type: String, trim: true },
      plateNumber: { type: String, trim: true },
    },

    //features
    comfort: [{ type: String }],
    multimedia: [{ type: String }],
    safety: [{ type: String }],
    security: [{ type: String }],

      // ─── Vehicle history 
    vechicleHistory: {
      accidentsOrDamages: { type: Boolean, default: false },
      oneOwnerVehicle: { type: Boolean, default: false },
      personalUseOnly: { type: Boolean, default: true },
      serviceHistoryAvailable: { type: Boolean, default: false },
      importedVehicle: { type: Boolean, default: false },
    },

    //benefits
    benefits: [{ type: String }],
 

    //ANalytics
    
    views: { type: Number, default: 0 },

  },
  { timestamps: true }
);  

carSchema.index({ status: 1 });
carSchema.index({ status: 1, currentLocation: 1 });
carSchema.index({ price: 1 });
carSchema.index({ "basicDetails.year": 1 });
carSchema.index({ make: 1, model: 1 });
carSchema.index({ name: "text", description: "text" }); 

export default mongoose.model("Car", carSchema);
