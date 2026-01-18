import {Router} from 'express';
import courseController  from '../controllers/course.controller.js';
const router = Router();

router.post('/create', courseController.createCourse);
router.get('/list', courseController.listCourses);
router.put('/update/:id', courseController.updateCourse);
router.delete('/delete/:id', courseController.deleteCourse);

export default router;