import mongoose from "mongoose";

const savedCarSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
  },
  { timestamps: true }
);

savedCarSchema.index({ buyer: 1, listing: 1 }, { unique: true });

export default mongoose.model("SavedCar", savedCarSchema);