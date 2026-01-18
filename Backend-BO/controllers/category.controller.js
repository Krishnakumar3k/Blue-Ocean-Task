import ApiFeatures from "../utils/apiFeatures.js";
import Category from "../models/category.model.js";
import categoryService from "../services/category.service.js";

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const category = await categoryService.createCategory(req.body);
      //console.log("Created Category:", category);
      res.status(201).json({
        success: true,
        data: category,
      });
    } catch (error) {
      console.error("Error creating category:", error);
    }
  },
  
 /* // code for the listCategories method  ----------------------------------krishna
  listCategories: async (req, res) => {
    const features = new ApiFeatures(
      Category.find({ isDeleted: false }),
      req.query
    )
      .search("name")
      .filter()
      .sort()
      .paginate();

    const categories = await categoryService.listCategories(
      features.query.getFilter ? features.query.getFilter() : {}
    );

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  }, */

   // LIST CATEGORIES (PAGINATION + SEARCH + SORT + FILTER)
  listCategories: async (req, res) => {
    try {
      //  Read query params
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search || "";
      const sortBy = req.query.sortBy || "createdAt";
      const order = req.query.order === "desc" ? -1 : 1;

      const skip = (page - 1) * limit;

      //  Build filter
      const filter = {
        isDeleted: false
      };

      if (search) {
        filter.name = { $regex: search, $options: "i" };
      }

      // Execute query
      const categories = await Category.find(filter)
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit);

      //  Response
      res.status(200).json({
        success: true,
        page,
        limit,
        count: categories.length,
        data: categories
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },


// UPDATE
  updateCategory: async (req, res) => {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: category,
    });
  },

  deleteCategory: async (req, res) => {
   try {
     await categoryService.softDeleteCategory(req.params.id);
     console.log("Deleted Category ID:", req.params.id);
     res.status(200).json({
       success: true,
       message: "Category deleted successfully",
     });
   } catch (error) {
    console.error("Error deleting category:", error);
   }
  },

  subCategoryCount: async (req, res) => {
    const result = await categoryService.categorySubCount();

    res.status(200).json({
      success: true,
      data: result,
    });
  },
};

export default categoryController;
