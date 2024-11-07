import mongoose, { Document, Model, Schema } from "mongoose";

interface ITopic extends Document {
  title: string;
  description: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
}

const topicSchema: Schema<ITopic> = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  subject: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Topic:Model<ITopic> = mongoose.models.Topic ||mongoose.model<ITopic>("Topic",topicSchema);

export default Topic