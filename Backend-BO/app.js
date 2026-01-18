import express from 'express';
import "express-async-errors";

import categoryRoutes from './routes/category.routes.js';
 import subcategoryRoutes from './routes/subcategory.routes.js';
 import courseRoutes from './routes/course.routes.js';

const app = express();
app.use(express.json());


app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);
 app.use("/courses", courseRoutes);


export default app;