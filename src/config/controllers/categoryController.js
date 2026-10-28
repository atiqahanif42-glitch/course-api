const Category = require('./models/categoryModel');

exports.getCategories = (req, res) => {
  const categories = categoryModel.getAll();
  res.status(200).json(categories);
};

exports.createCategory = (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Validation Error: Category 'name' is required." });
  }

  const newCategory = { id: Date.now().toString(), name, description: description || "" };
  categoryModel.create(newCategory);
  res.status(201).json({ message: "Category created successfully", category: newCategory });
};