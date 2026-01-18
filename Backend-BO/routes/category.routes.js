import {Router} from 'express';
import categoryController  from '../controllers/category.controller.js';
const router = Router();


router.post('/create', categoryController.createCategory);
router.get('/list', categoryController.listCategories);
router.put('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);
router.get('/sub-category-count', categoryController.subCategoryCount);

export default router;