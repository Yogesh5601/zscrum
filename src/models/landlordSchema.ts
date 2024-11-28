import mongoose, { Schema } from "mongoose";

export const LandlordSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tenant" }],
  invitations: [
    {
      email: String,
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

