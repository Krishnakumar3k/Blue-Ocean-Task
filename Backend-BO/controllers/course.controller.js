import ApiFeatures from "../utils/apiFeatures.js";
import Course from "../models/course.model.js";
import courseService from "../services/course.service.js";

const courseController = {
  createCourse: async (req, res) => {
    try {
      const course = await courseService.createCourse(req.body);

      res.status(201).json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  /* listCourses: async (req, res) => {
    try {
      const features = new ApiFeatures(
        Course.find({ isDeleted: false })
          .populate("categoryIds", "name")
          .populate("subCategoryIds", "name"),
        req.query
      )
        .filter()
        .sort()
        .paginate();

      const courses = await courseService.listCourses(
        features.query.getFilter ? features.query.getFilter() : {}
      );

      res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
      });
    } catch (error) {
      console.error("Error listing courses:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
 */
 
  
 //  LIST COURSES (PAGINATION + SEARCH + SORT + FILTER)
  listCourses: async (req, res) => {
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

      // Optional search (by title)
      if (search) {
        filter.title = { $regex: search, $options: "i" };
      }

      //  Execute query
      const courses = await Course.find(filter)
        .populate("categoryIds", "name")
        .populate("subCategoryIds", "name")
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit);

      //  Response
      res.status(200).json({
        success: true,
        page,
        limit,
        count: courses.length,
        data: courses
      });

    } catch (error) {
      console.error("Error listing courses:", error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },
 
 
 
  updateCourse: async (req, res) => {
    try {
      const course = await courseService.updateCourse(
        req.params.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      console.error("Error updating course:", error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  deleteCourse: async (req, res) => {
    try {
      await courseService.softDeleteCourse(req.params.id);

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default courseController;
