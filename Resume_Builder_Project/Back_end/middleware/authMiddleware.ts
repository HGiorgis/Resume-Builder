import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "./../utils/appError";
import User from "../models/userModel";
import { IUser } from "../models/userModel";
import catchAsync from "./../utils/catchAsync";

interface JwtPayloadWithId extends jwt.JwtPayload {
  id: string;
  iat: number;
}
export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Extract token from headers or cookies
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayloadWithId;

      // Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(
          new AppError(
            "The user belonging to this token no longer exists.",
            401
          )
        );
      }

      // Check if user changed password after the token was issued
      const passwordChangedAtTimestamp = currentUser.passwordChangedAt
        ? Math.floor(currentUser.passwordChangedAt.getTime() / 1000)
        : 0;

      if (passwordChangedAtTimestamp > decoded.iat) {
        return next(
          new AppError(
            "User recently changed password! Please log in again.",
            401
          )
        );
      }

      res.locals.userData = currentUser;
      next();
    } catch (err) {
      return next(
        new AppError("Invalid token or token verification failed.", 401)
      );
    }
  }
);

export function restrictTo(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.userData; // Access userData

    if (!user) {
      return next(new AppError("User is not authenticated", 401));
    }

    if (!roles.includes(user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
}
