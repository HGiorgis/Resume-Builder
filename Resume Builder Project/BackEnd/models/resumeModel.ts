import mongoose, { Schema, Document } from "mongoose";

interface IResume extends Document {
  user: mongoose.Schema.Types.ObjectId;
  template: mongoose.Schema.Types.ObjectId;
  personalInfo: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  workExperience: Array<{
    jobTitle: string;
    company: string;
    duration: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    year: number;
  }>;
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema: Schema<IResume> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: [true, "Template ID is required"],
    },
    personalInfo: {
      name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
      },
      address: {
        type: String,
        maxlength: [200, "Address must be less than 200 characters long"],
      },
      phone: {
        type: String,
        match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
      },
      email: {
        type: String,
        match: [/\S+@\S+\.\S+/, "Invalid email format"],
      },
    },
    workExperience: [
      {
        jobTitle: {
          type: String,
          required: [true, "Job title is required"],
        },
        company: {
          type: String,
          required: [true, "Company is required"],
        },
        duration: {
          type: String,
          required: [true, "Duration is required"],
        },
      },
    ],
    education: [
      {
        school: {
          type: String,
          required: [true, "School name is required"],
        },
        degree: {
          type: String,
          required: [true, "Degree is required"],
        },
        year: {
          type: Number,
          required: [true, "Year is required"],
          min: [1900, "Year cannot be earlier than 1900"],
          max: [
            new Date().getFullYear(),
            `Year cannot be later than ${new Date().getFullYear()}`,
          ],
        },
      },
    ],
    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model<IResume>("Resume", resumeSchema);

export default Resume;
