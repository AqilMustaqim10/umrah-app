import express from "express";
import {
  getUmrahChecklist,
  toggleUmrahItem,
  getUmrahProgress,
  getPackingChecklist,
  togglePackingItem,
  getPackingProgress,
  resetUmrahChecklist,
  resetPackingChecklist,
} from "../controllers/checklistController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All checklist routes require authentication
router.use(protect);

// ── Umrah checklist routes ─────────────────────────────────
router.get("/umrah", getUmrahChecklist);
router.get("/umrah/progress", getUmrahProgress);
router.patch("/umrah/:itemId", toggleUmrahItem);
router.delete("/umrah/reset", resetUmrahChecklist);

// ── Packing checklist routes ───────────────────────────────
router.get("/packing", getPackingChecklist);
router.get("/packing/progress", getPackingProgress);
router.patch("/packing/:itemId", togglePackingItem);
router.delete("/packing/reset", resetPackingChecklist);

export default router;
