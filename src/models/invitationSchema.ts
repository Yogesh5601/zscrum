import mongoose, { Schema } from "mongoose";
export const InvitationSchema = new Schema({
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  TenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // "User" must match the model name
  tenantEmail: String,
  propertyDetails: String,
  token: String,
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});
