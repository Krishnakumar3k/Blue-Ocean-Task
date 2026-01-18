import SubCategory from "../models/subcategory.model.js";
import Category from "../models/category.model.js";

const subcategoryService = {
  createSubcategory: async (data) => {
    const category = await Category.findOne({
      _id: data.categoryId,
      isDeleted: false,
    });

    if (!category) {
      throw new Error("Invalid Category");
    }

    return SubCategory.create(data);
  },

/*   listSubcategories: (filter = {}) =>
    SubCategory.find({ ...filter, isDeleted: false }), */
  
  getSubcategoryQuery: () => {
    return SubCategory.find();
  },

  updateSubcategory: (id, data) =>
    SubCategory.findByIdAndUpdate(id, data, { new: true }),

  softDeleteSubcategory: (id) =>
    SubCategory.findByIdAndUpdate(id, { isDeleted: true }),
};

export default subcategoryService;
