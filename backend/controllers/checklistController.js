import Checklist from "../models/Checklist.js";
import {
  defaultUmrahItems,
  defaultPackingItems,
} from "../utils/defaultChecklist.js";

// ── Helper: get or create checklist for user ───────────────
const getOrCreateChecklist = async (userId) => {
  let checklist = await Checklist.findOne({ user: userId });

  if (!checklist) {
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

export const getUmrahChecklist = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);
    res.status(200).json({ success: true, items: checklist.umrahItems });
  } catch (error) {
    console.error("Get Umrah checklist error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

export const toggleUmrahItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const checklist = await getOrCreateChecklist(req.user._id);
    const item = checklist.umrahItems.find((i) => i.id === itemId);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Checklist item not found" });
    }

    item.completed = !item.completed;
    item.completedAt = item.completed ? new Date() : null;
    await checklist.save();

    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error("Toggle Umrah item error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

export const getUmrahProgress = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);
    const total = checklist.umrahItems.length;
    const completed = checklist.umrahItems.filter((i) => i.completed).length;
    res.status(200).json({ success: true, progress: { completed, total } });
  } catch (error) {
    console.error("Get Umrah progress error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

export const getPackingChecklist = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);
    res.status(200).json({ success: true, items: checklist.packingItems });
  } catch (error) {
    console.error("Get Packing checklist error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

export const togglePackingItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const checklist = await getOrCreateChecklist(req.user._id);
    const item = checklist.packingItems.find((i) => i.id === itemId);

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Checklist item not found" });
    }

    item.completed = !item.completed;
    item.completedAt = item.completed ? new Date() : null;
    await checklist.save();

    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error("Toggle Packing item error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

// ── THIS WAS MISSING ───────────────────────────────────────
export const getPackingProgress = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);
    const total = checklist.packingItems.length;
    const completed = checklist.packingItems.filter((i) => i.completed).length;
    res.status(200).json({ success: true, progress: { completed, total } });
  } catch (error) {
    console.error("Get Packing progress error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

export const resetUmrahChecklist = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);
    checklist.umrahItems = defaultUmrahItems.map((item) => ({
      ...item,
      completed: false,
      completedAt: null,
    }));
    await checklist.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Umrah checklist reset successfully",
        items: checklist.umrahItems,
      });
  } catch (error) {
    console.error("Reset Umrah checklist error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};

export const resetPackingChecklist = async (req, res) => {
  try {
    const checklist = await getOrCreateChecklist(req.user._id);
    checklist.packingItems = defaultPackingItems.map((item) => ({
      ...item,
      completed: false,
      completedAt: null,
    }));
    await checklist.save();
    res
      .status(200)
      .json({
        success: true,
        message: "Packing checklist reset successfully",
        items: checklist.packingItems,
      });
  } catch (error) {
    console.error("Reset packing checklist error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
};
