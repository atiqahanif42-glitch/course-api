const users = [];

module.exports = {
  findUserByEmail: (email) => users.find(u => u.email === email),
  createUser: (user) => {
    users.push(user);
    return user;
  }
};