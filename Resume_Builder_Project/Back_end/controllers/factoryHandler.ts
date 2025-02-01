import { Request, Response, NextFunction } from "express";
import APIFeatures from "../utils/apiFeatures";
import AppError from "../utils/appError";
import catchAsync from "./../utils/catchAsync";
import { Model, Document } from "mongoose";

// Define a generic type for Mongoose models
type MongooseModel<T extends Document> = Model<T>;

// Generic function for deleting a document
export function deleteOne<T extends Document>(Model: MongooseModel<T>) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new AppError("Invalid ID: no document found with that ID", 404)
      );
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
}

// Generic function for updating a document
export function updateOne<T extends Document>(Model: MongooseModel<T>) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(
        new AppError("Invalid ID: no document found with that ID", 404)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
}

// Generic function for getting a single document
export function getOne<T extends Document>(
  Model: MongooseModel<T>,
  popOptions?: any
) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      query = query.populate(popOptions);
    }

    if (req.query.isActive) {
      query = query.where({ isActive: Boolean(req.query.isActive) });
    }
    const doc = await query;
    if (!doc) {
      return next(
        new AppError("Invalid ID: no document found with that ID", 404)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
}

// Generic function for creating a document
export function createOne<T extends Document>(Model: MongooseModel<T>) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
}

// Generic function for getting all documents with query features
export function getAll<T extends Document>(Model: MongooseModel<T>) {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let filter: Record<string, any> = {};
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();
    const docs = await features.query;
    res.status(200).json({
      status: "success",
      result: docs.length,
      data: {
        data: docs,
      },
    });
  });
}
