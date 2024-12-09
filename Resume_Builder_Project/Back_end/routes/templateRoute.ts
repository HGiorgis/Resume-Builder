import express from "express";
import * as templateController from "./../controllers/templateController";
const router = express.Router();

router.get("/", templateController.getTemplates);
router.get("/:id", templateController.getTemplate);

export default router;

// get one template
// GET /api/templates;
// get a template
// /api/templates/:templateId
