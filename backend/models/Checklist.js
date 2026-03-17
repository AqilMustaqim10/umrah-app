import mongoose from "mongoose";

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
  category: {
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

const checklistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    umrahItems: [checklistItemSchema],
    packingItems: [checklistItemSchema],
  },
  {
    timestamps: true,
  },
);

const Checklist = mongoose.model("Checklist", checklistSchema);

export default Checklist;
