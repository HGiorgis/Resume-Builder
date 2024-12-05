// Built-in import
import crypto from "crypto";

// Third-party imports
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import axios from "axios";

// App imports
import User from "../models/userModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import * as handler from "./factoryHandler";
import { createSendToken } from "./authController";
import Email from "../utils/email";

// Multer storage configuration
const multerStorage = multer.memoryStorage();

// Multer filter to allow only images
const multerFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Multer upload setup
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserPhoto = upload.single("photo");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || "";
const GITHUB_API_URL = process.env.GITHUB_API_URL?.replace(
  "<GITHUB_REPO>",
  GITHUB_REPO
);

// Resize user photo and upload to GitHub
export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    const userData = res.locals.userData;
    const filename = `user-${userData._id}-${Date.now()}.jpeg`;

    const buffer = await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    const response = await axios.put(
      `${GITHUB_API_URL}/user/${filename}`,
      {
        message: `Upload photo ${filename}`,
        content: buffer.toString("base64"),
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      return next(new AppError("Failed to upload image to GitHub", 500));
    }

    req.file.filename = filename;
    next();
  }
);

// Utility to filter allowed fields in objects
const filterObj = (
  obj: Record<string, any>,
  ...allowedFields: string[]
): Record<string, any> => {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Middleware to attach user ID to request
export const getMe = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.userData) {
    return next(new AppError("User not authenticated", 401));
  }

  req.query.isActive = "true";
  req.params.id = res.locals.userData._id;
  next();
};

// Update user details
export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const imagePath =
      "https://raw.githubusercontent.com/fayinana/HomeTradeNetwork-API-/refs/heads/main/file/image/user";

    const userData = res.locals.userData; // Retrieve userData

    if (req.body.password) {
      return next(
        new AppError(
          "This is not the route to change password! Use /changePassword.",
          404
        )
      );
    }

    const filteredBody = filterObj(req.body, "name", "email");
    if (req.file) filteredBody.photo = `${imagePath}/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      userData._id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  }
);

// Deactivate user account
export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(res.locals.userData._id, { isActive: false });

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

// Send reactivation link to email
export const sendReactivateLink = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new AppError("No user found", 404));

    const reactivateToken = user.createReactivateToken();
    await user.save({ validateBeforeSave: false });

    const frontendURL = "http://localhost:5371";
    const resetURL = `${frontendURL}/reset-password/${reactivateToken}`;

    try {
      const mail = new Email(user, resetURL);
      await mail.reactivateAccount();
      res.status(200).json({
        status: "success",
        message: "Reactivation link sent to email!",
      });
    } catch (err) {
      user.reactivateToken = undefined;
      user.reactivateTokenExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          "There was an error sending the email. Please try again later.",
          500
        )
      );
    }
  }
);

// Reactivate user account
export const reactivateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      reactivateToken: hashedToken,
      reactivateTokenExpires: { $gt: Date.now() },
    });

    if (!user)
      return next(new AppError("The token is invalid or expired.", 404));
    user.isActive = true;
    user.reactivateToken = undefined;
    user.reactivateTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    createSendToken(user, 200, req, res);
  }
);

// CRUD Handlers
export const getUser = handler.getOne(User);
export const deleteUser = handler.deleteOne(User);
