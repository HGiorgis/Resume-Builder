import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  signin,
  signout,
  signup,
} from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(protect);
router.post("/signout", signout);

export default router;
