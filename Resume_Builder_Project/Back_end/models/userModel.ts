import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  photo: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpires?: Date;
  reactivateToken?: string;
  reactivateTokenExpires?: Date;
  passwordCorrect: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
  changedPasswordAfter: (JWTTimestamp: number) => boolean;
  createPasswordResetToken: () => string;
  createReactivateToken: () => string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Email is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    photo: {
      type: String,
      default:
        "https://raw.githubusercontent.com/fayinana/HomeTradeNetwork-API-/main/file/image/user/default.jpg",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    reactivateToken: String,
    reactivateTokenExpires: Date,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.virtual("resumes", {
  ref: "Resume",
  foreignField: "user",
  localField: "_id",
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.methods.passwordCorrect = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number
): boolean {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
  console.log(resetToken);

  return resetToken;
};
userSchema.methods.createReactivateToken = function (): string {
  const reactivateToken = crypto.randomBytes(32).toString("hex");

  this.reactivateToken = crypto
    .createHash("sha256")
    .update(reactivateToken)
    .digest("hex");
  this.reactivateTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

  return reactivateToken;
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
