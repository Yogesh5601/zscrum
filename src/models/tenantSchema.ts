import { Schema } from "mongoose";

export const TenantSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  landlords: [{ type: Schema.Types.ObjectId, ref: "Landlord" }],
//   agreement: {
//     uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
//     fileUrl: String,
//     verified: { type: Boolean, default: false },
//   },
});
