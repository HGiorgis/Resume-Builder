import { Router } from "express";
import * as authController from "./../controllers/authController";
import { protect } from "./../middleware/authMiddleware";

const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(protect);
router.post("/signout", authController.signout);
router.patch("/changePassword", authController.changePassword);

export default router;
