const courseModel = require('./models/courseModel');
const categoryModel = require('./models/categoryModel');

exports.getCourses = (req, res) => {
  const courses = courseModel.getAll();
  res.status(200).json(courses);
};

exports.getCourseById = (req, res) => {
  const course = courseModel.getById(req.params.id);
  if (!course) {
    return res.status(404).json({ error: "Course not found." });
  }
  res.status(200).json(course);
};

exports.createCourse = (req, res) => {
  const { title, description, categoryId, price } = req.body;
  if (!title || !categoryId || price === undefined) {
    return res.status(400).json({ error: "Validation Error: Title, categoryId, and price are required." });
  }

  // Validate if category exists
  const category = categoryModel.getById(categoryId);
  if (!category) {
    return res.status(400).json({ error: "Invalid categoryId: Category does not exist." });
  }

  const newCourse = {
    id: Date.now().toString(),
    title,
    description: description || "",
    categoryId,
    price,
    instructorId: req.user.id // From auth middleware
  };

  courseModel.create(newCourse);
  res.status(201).json({ message: "Course created successfully", course: newCourse });
};