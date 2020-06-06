const router = require("express").Router();
// const helmet = require("helmet");
const users = require("./user-model");
const checkRole = require("../auth/check-role-middleware");
const restricted = require("../auth/restricted-middleware");
router.get("/", restricted, (req, res) => {
  users
    .getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "uhh idk" });
    });
});

module.exports = router;
