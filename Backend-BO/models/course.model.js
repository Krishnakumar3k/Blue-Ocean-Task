import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    categoryIds:[{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
    subCategoryIds:[{type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory'}],
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);
export default mongoose.model("Course", courseSchema);