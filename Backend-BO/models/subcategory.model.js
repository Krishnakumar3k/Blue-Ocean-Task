import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        categoryId: { 
            type: mongoose.Schema.Types.ObjectId, // Here we define categoryId as an ObjectId
             ref: 'Category',
              required: true
             },
        isDeleted: { type: Boolean, default: false }
    },
    { timestamps: true }
);  


export default mongoose.model("Subcategory", subcategorySchema);