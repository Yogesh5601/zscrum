import mongoose, { Schema } from "mongoose";

export const InvitationSchema = new Schema({
  landlordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // TenantId only required if status is accepted
  },
  tenantEmail: {
    type: String,
    required: true,
  },
  // propertyDetails: {
  //   type: String,
  //   required: false,
  // },
  token: {
    type: String,
    required: true,
    unique: true, // Ensures the token is unique
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


