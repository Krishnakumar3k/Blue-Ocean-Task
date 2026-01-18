# DataBase connection-----------------
 - create the .env file and 
 - Go to monngoDB atlas and create new cluster and copy the path and use in .env file with  MONGO_URI=
 - 1. PORT=8000
 - 2. NODE_ENV=development
 - 3. MONGO_URI=mongodb+srv:( paste cluster path in .env file )


## All API 

#  Category Api --------------------------------------------------------------------------------------
  POST Category: https://localhost:8000/categories/create
  GET Category : http://localhost:8000/categories/list
  PUT Category : http://localhost:8000/categories/update/:id ( Note : at place of pass category id for update)
  DELETE softDelete Category : http://localhost:8000/categories/update/:id
  
  GET Category : http://localhost:8000/categories/list?search=programming
  GET Category : http://localhost:8000/categories/list?page=1&limit=1

# Aggregation : Each Category with the count of SubCategories associated with it.
  GET : http://localhost:8000/categories/sub-category-count

# SubCategory Api ------------------------------------------------------------------------------------
- SubCategory → Category  (Every SubCategory must belong to a valid Category.)

 POST SubCategory : http://localhost:8000/subcategories/create
 GET  SubCategory : http://localhost:8000/subcategories/list
 PUT  SubCategory : http://localhost:8000/subcategories/update/:id
 DELETE  SubCategory : http://localhost:8000/subcategories/delete/:id

 GET Pagination SubCategory : http://localhost:8000/subcategories/list?page=1&limit=5
 GET Search SubCategory     : http://localhost:8000/subcategories/list?search=javaScript
 GET Sort SubCategory       : http://localhost:8000/subcategories/list?sortBy=name&order=asc
 GET Sort SubCategory       : http://localhost:8000/subcategories/list?sortBy=name&order=desc


# Courses Api ------------------------------------------------------------------------------------
 
 POST Courses : http://localhost:8000/courses/create
 GET  Courses : http://localhost:8000/courses/list
 PUT  Courses : http://localhost:8000/courses/update/:id
 DELETE Courses : http://localhost:8000/courses/delete/:id

 GET Pagination Courses : http://localhost:8000/courses/list?page=1&limit=1
 GET  Search Courses : http://localhost:8000/courses/list?search=mern


  


 