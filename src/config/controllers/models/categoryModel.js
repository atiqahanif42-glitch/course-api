let categories = [
  { id: "1", name: "Programming", description: "Coding & Software Development" }
];

module.exports = {
  getAll: () => categories,
  getById: (id) => categories.find(c => c.id === id),
  create: (category) => {
    categories.push(category);
    return category;
  }
};