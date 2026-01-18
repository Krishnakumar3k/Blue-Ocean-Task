import { Router } from "express";
import subcategoryController from "../controllers/subcategory.controller.js";

const router = Router();


router.post("/create", subcategoryController.createSubcategory);
router.get("/list", subcategoryController.listSubcategories);
router.put("/update/:id", subcategoryController.updateSubcategory);
router.delete("/delete/:id", subcategoryController.softDeleteSubcategory);


export default router;