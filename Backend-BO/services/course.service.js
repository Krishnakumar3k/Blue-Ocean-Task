import mongoose from "mongoose";
import Course from "../models/course.model.js";
import Category from "../models/category.model.js";
import SubCategory from "../models/subcategory.model.js";

const courseService = {
  createCourse: async (data) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      //  Validate Categories
      const categories = await Category.find({
        _id: { $in: data.categoryIds },
        isDeleted: false,
      });

      if (categories.length !== data.categoryIds.length) {
        throw new Error("Invalid Category selected");
      }

      //  Validate SubCategories
      const subCategories = await SubCategory.find({
        _id: { $in: data.subCategoryIds },
        isDeleted: false,
      });

      for (const sub of subCategories) {
        if (!data.categoryIds.includes(sub.categoryId.toString())) {
          throw new Error(
            "SubCategory does not belong to selected Category"
          );
        }
      }

      // Create Course (Transaction)
      const course = await Course.create([data], { session });

      await session.commitTransaction();
      return course[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  
/* 
  listCourses: (filter = {}) =>
    Course.find({ ...filter, isDeleted: false }),
 */

  getCourseQuery: () => {
    return Course.find();
  },
  updateCourse: (id, data) =>
    Course.findByIdAndUpdate(id, data, { new: true }),

  softDeleteCourse: (id) =>
    Course.findByIdAndUpdate(id, { isDeleted: true }),
};

export default courseService;
