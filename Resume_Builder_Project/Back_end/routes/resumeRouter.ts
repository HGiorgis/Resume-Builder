import express from "express";
import * as resumeController from "./../controllers/resumeController";
import { getMe } from "./../controllers/userController";
import { protect } from "../middleware/authMiddleware";
const router = express.Router();

router.use(protect);
router.route("/").post(resumeController.createResume);
router.get(
  "/getMyResume",
  resumeController.addCurrentUser,
  resumeController.getMyResume
);
router
  .route("/:id")
  .patch(resumeController.updateResume)
  .get(resumeController.getResume)
  .delete(resumeController.deleteResume);

export default router;
