import mongoose, { Schema, Document } from "mongoose";

interface ITemplate extends Document {
  name: string;
  image_preview_url: string;
  created_at: Date;
}

const templateSchema: Schema<ITemplate> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Template name is required"],
      minlength: [3, "Template name must be at least 3 characters long"],
      maxlength: [100, "Template name must be less than 100 characters long"],
    },
    image_preview_url: {
      type: String,
      required: [true, "Image preview URL is required"],
      match: [/^(http|https):\/\/[^\s$.?#].[^\s]*$/, "Invalid URL format"],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Template = mongoose.model<ITemplate>("Template", templateSchema);
export default Template;
