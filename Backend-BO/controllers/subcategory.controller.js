import Subcategory from "../models/subcategory.model.js";

const subcategoryController = {

  // CREATE
  createSubcategory: async (req, res) => {
    try {
      const subcategory = await Subcategory.create(req.body);
      res.status(201).json(subcategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // LIST WITH PAGINATION + SEARCH + SORT 
  listSubcategories: async (req, res) => {
    try {
      //  Read query params ------------------------------------ Krishna Kumar
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search || "";
      const sortBy = req.query.sortBy || "createdAt";
      const order = req.query.order === "desc" ? -1 : 1;

      const skip = (page - 1) * limit;
      //  Build filter object
      const filter = {
        isDeleted: false
      };

      if (search) {
        filter.name = { $regex: search, $options: "i" };
      }

      //  Execute query
      const data = await Subcategory.find(filter)
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit);

      //  Send response
      res.status(200).json({
        success: true,
        page,
        limit,
        count: data.length,
        data
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // UPDATE
  updateSubcategory: async (req, res) => {
    try {
      const subcategory = await Subcategory.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      res.json(subcategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // SOFT DELETE
  softDeleteSubcategory: async (req, res) => {
    try {
      const subcategory = await Subcategory.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true },
        { new: true }
      );

      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found" });
      }

      res.json({ success: true, message: "Subcategory deleted" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export default subcategoryController;
