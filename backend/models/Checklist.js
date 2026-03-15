import mongoose from "mongoose";

// ── Single checklist item schema ───────────────────────────
const checklistItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
    default: null,
  },
});

// ── Main checklist schema ──────────────────────────────────
const checklistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One checklist document per user
    },

    // Umrah steps checklist
    umrahItems: [checklistItemSchema],

    // Packing checklist
    packingItems: [checklistItemSchema],
  },
  {
    timestamps: true,
  },
);

const Checklist = mongoose.model("Checklist", checklistSchema);

export default Checklist;
