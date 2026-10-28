let courses = [];

module.exports = {
  getAll: () => courses,
  getById: (id) => courses.find(c => c.id === id),
  create: (course) => {
    courses.push(course);
    return course;
  }
};