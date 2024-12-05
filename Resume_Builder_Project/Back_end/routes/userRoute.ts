import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import * as userController from "../controllers/userController";

const router = Router();
router.post("/reactivateAccount", userController.sendReactivateLink);
router.patch("/reactivateMe/:token", userController.reactivateMe);
router.use(protect);
router.get("/me", userController.getMe, userController.getUser);
router.patch(
  "/updateMe",
  userController.getMe,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteMe", userController.getMe, userController.deleteMe);
export default router;
