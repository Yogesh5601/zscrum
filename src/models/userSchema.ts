import { Schema } from "mongoose";

export const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    role: {
      type: String,
      enum: ["Landlord", "Tenant"],
      required: true,
      default: "Tenant",
    },
    ratings: [{ type: Number }],
    isProfileComplete:{type:Boolean, default:false}
  },
  { timestamps: true }
);
