// controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import User, { IUser } from "../models/userModel";
import AppError from "../utils/appError";
import crypto from "crypto";
import Email from "./../utils/email";
const signToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: IUser,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_COOKIE_EXPIRES_IN as string) *
          24 *
          60 *
          60 *
          1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  res.cookie("jwt", token, cookieOptions);
  // user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });
    const mail = new Email(newUser, "http://localhost:5371");
    mail.sendWelcome();

    createSendToken(newUser, 201, req, res);
  }
);

export const signin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.passwordCorrect(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 200, req, res);
  }
);

export const signout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new AppError("No user found", 404));

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const frontendURL = "http://localhost:5371";
    const resetURL = `${frontendURL}/reset-password/${resetToken}`;
    try {
      const mail = new Email(user, resetURL);
      mail.forgotPassword();

      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpires = undefined;
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

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const { password, passwordConfirm } = req.body;

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("The token is invalid or has expired", 404));
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();

    createSendToken(user, 200, req, res);
  }
);

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.body.userData._id).select("+password");
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const isPasswordCorrect = await user.passwordCorrect(
      req.body.passwordCurrent,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(new AppError("Your current password is incorrect", 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, req, res);
  }
);
