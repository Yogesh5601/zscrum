import { Schema } from "mongoose";

export const InvitationSchema = new Schema({
  landlordId: { type: Schema.Types.ObjectId, ref: "Landlord" },
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
