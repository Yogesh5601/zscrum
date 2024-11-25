import { model, models } from "mongoose";
import { userSchema } from "./userSchema";
import { LandlordSchema } from "./landlordSchema";
import { TenantSchema } from "./tenantSchema";
import { InvitationSchema } from "./invitationSchema";

const User = models.User || model("User", userSchema);
const Landlord = models.Landlord || model("Landlord", LandlordSchema);
const Tenant = models.Tenant || model("Tenant", TenantSchema);
const Invitation = models.Invitation || model("Invitation", InvitationSchema);
export { User, Landlord, Tenant, Invitation };
