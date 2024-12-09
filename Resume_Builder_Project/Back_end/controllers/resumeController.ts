// router.route("/").post();
// router.route("/:id").patch().get().delete();
// router.get("/getMyResume");
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import Resume from "./../models/resumeModel";
import * as handler from "./factoryHandler";

export const addCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.userData) {
    return next(new AppError("User not authenticated", 401));
  }
  req.query.user = res.locals.userData._id;
  next();
};

export const createResume = handler.createOne(Resume);
export const deleteResume = handler.deleteOne(Resume);
export const getResume = handler.getOne(Resume);
export const getMyResume = handler.getAll(Resume);
export const updateResume = handler.updateOne(Resume);
