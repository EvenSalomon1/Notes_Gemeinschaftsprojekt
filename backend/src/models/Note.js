import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  {
    collection: "notes",
    timestamps: true,
  }
);

export const Note = mongoose.model("Note", noteSchema);
