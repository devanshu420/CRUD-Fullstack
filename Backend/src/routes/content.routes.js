import express from "express";
import {
  createContentController,
  getContentController,
  updateContentController,
  deleteContentController,
} from "../controller/content.controller.js";

const router = express.Router();

// POST /content-create
router.post("/content-create", createContentController);

router.get("/", getContentController);

router.patch("/content-update/:id", updateContentController);

router.delete("/content-delete/:id", deleteContentController);

export default router;
