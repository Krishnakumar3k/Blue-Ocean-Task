import Category from "../models/category.model.js";

const categoryService = {
  createCategory: (data) => Category.create(data),

  // listCategories: (filter = {}) => Category.find(filter),

  getCategoryById: (id) => Category.findById(id),


  // RETURN BASE QUERY ONLY
  getCategoryQuery: () => {
    return Category.find();
  },


  updateCategory: (id, data) =>
    Category.findByIdAndUpdate(id, data, { new: true }),

  softDeleteCategory: (id) =>
    Category.findByIdAndUpdate(id, { isDeleted: true }),

  categorySubCount: () =>
    Category.aggregate([
      { $match: { isDeleted: false } },
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "categoryId",
          as: "subs",
        },
      },
      {
        $project: {
          name: 1,
          subCategoryCount: { $size: "$subs" },
        },
      },
    ]),
};

export default categoryService;
