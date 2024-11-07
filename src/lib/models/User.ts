import mongoose, { Document, Model, Schema } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  preferences?: Map<string, string>;
  subscriptionLevel: "free" | "premium";
  createdAt: Date;
  updatedAt: Date;
}

// Create the User schema
const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  preferences: {
    type: Map,
    of: String,
  },
  subscriptionLevel: { type: String, enum: ["free", "premium"], default: "free" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
