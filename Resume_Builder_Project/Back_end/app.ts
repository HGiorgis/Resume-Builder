import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./controllers/errorController";
import dotenv from "dotenv";
import userRoute from "./routes/userRouter";
dotenv.config({ path: "./.env" });
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:3000"], // Adjust as necessary
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/v1/auth", userRoute);
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: "There is no route like this",
  });
});

// // Optionally handle errors globally
app.use(globalErrorHandler);
export default app;
