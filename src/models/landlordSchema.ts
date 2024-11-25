import { Schema } from "mongoose";

export const LandlordSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  tenants: [{ type: Schema.Types.ObjectId, ref: "Tenant" }],
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

