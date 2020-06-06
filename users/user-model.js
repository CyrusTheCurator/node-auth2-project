const db = require("../db-config");

module.exports = {
  getUsers,
  getUserById,
  addUser,
  findBy,
};
//helpers go here
function getUsers() {
  return db("users").select("id", "username", "email").orderBy("id");
}

function getUserById(id) {
  return db("users").select("id", "username", "email").where({ id });
}
function addUser(user) {
  return db("users").insert(user);
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}
