import Checklist from "../models/Checklist.js";
import {
  defaultUmrahItems,
  defaultPackingItems,
} from "../utils/defaultChecklist.js";

// ── Helper: get or create checklist for user ───────────────
const getOrCreateChecklist = async (userId) => {
  let checklist = await Checklist.findOne({ user: userId });

  if (!checklist) {
    // First time — create default checklist
    checklist = await Checklist.create({
      user: userId,
      umrahItems: defaultUmrahItems.map((item) => ({
        ...item,
        completed: false,
        completedAt: null,
      })),
      packingItems: defaultPackingItems.map((item) => ({
        ...item,
        completed: false,
        completedAt: null,
      })),
    });
  }

  return checklist;
};

// ─────────────────────────────────────────────────────────
// @desc    Get Umrah checklist
// @route   GET /api/checklist/umrah
// @access  Private
// ─────────────────────────────────────────────────────────
export const getUmrahChecklist = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);

    res.status(200).json({
      success: true,
      items: checklist.umrahItems,
    });
  } catch (error) {
    console.error("Get Umrah checklist error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Toggle Umrah checklist item
// @route   PATCH /api/checklist/umrah/:itemId
// @access  Private
// ─────────────────────────────────────────────────────────
export const toggleUmrahItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const checklist = await getOrCreateChecklist(req.user._id);

    // Find the item
    const item = checklist.umrahItems.find((i) => i.id === itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Checklist item not found",
      });
    }

    // Toggle completed state
    item.completed = !item.completed;
    item.completedAt = item.completed ? new Date() : null;

    await checklist.save();

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Toggle Umrah item error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get Umrah checklist progress
// @route   GET /api/checklist/umrah/progress
// @access  Private
// ─────────────────────────────────────────────────────────
export const getUmrahProgress = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);

    const total = checklist.umrahItems.length;
    const completed = checklist.umrahItems.filter((i) => i.completed).length;

    res.status(200).json({
      success: true,
      progress: { completed, total },
    });
  } catch (error) {
    console.error("Get Umrah progress error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get Packing checklist
// @route   GET /api/checklist/packing
// @access  Private
// ─────────────────────────────────────────────────────────
export const getPackingChecklist = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);

    res.status(200).json({
      success: true,
      items: checklist.packingItems,
    });
  } catch (error) {
    console.error("Get Packing checklist error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Toggle Packing checklist item
// @route   PATCH /api/checklist/packing/:itemId
// @access  Private
// ─────────────────────────────────────────────────────────
export const togglePackingItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const checklist = await getOrCreateChecklist(req.user._id);

    const item = checklist.packingItems.find((i) => i.id === itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Checklist item not found",
      });
    }

    item.completed = !item.completed;
    item.completedAt = item.completed ? new Date() : null;

    await checklist.save();

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Toggle Packing item error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Get Packing checklist progress
// @route   GET /api/checklist/packing/progress
// @access  Private
// ─────────────────────────────────────────────────────────
export const getPackingProgress = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);

    const total = checklist.packingItems.length;
    const completed = checklist.packingItems.filter((i) => i.completed).length;

    res.status(200).json({
      success: true,
      progress: { completed, total },
    });
  } catch (error) {
    console.error("Get Packing progress error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────
// @desc    Reset Umrah checklist to defaults
// @route   DELETE /api/checklist/umrah/reset
// @access  Private
// ─────────────────────────────────────────────────────────
export const resetUmrahChecklist = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);

    checklist.umrahItems = defaultUmrahItems.map((item) => ({
      ...item,
      completed: false,
      completedAt: null,
    }));

    await checklist.save();

    res.status(200).json({
      success: true,
      message: "Umrah checklist reset successfully",
      items: checklist.umrahItems,
    });
  } catch (error) {
    console.error("Reset Umrah checklist error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
