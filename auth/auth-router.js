const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Users = require("../users/user-model");
const cryptZ = require("bcryptjs");

const secrets = require("../secrets/secrets");

router.route("/register").post((req, res) => {
  // get all species from the database
  let user = req.body;
  const hash = cryptZ.hashSync(user.password, 12);
  user.password = hash;
  Users.addUser(user)
    .then((userRegRes) => {
      res.status(201).json(userRegRes);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "not sure what happened boss", err: err.message });
    });
});

router.route("/login").post((req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then((user) => {
      console.log(user.password, password);
      if (user && cryptZ.compareSync(password, user.password)) {
        const token = generateToken(user);

        req.session.user = user;
        res.status(200).json({ message: `welcome, ${username}`, token });
      } else {
        res.status(401).json({ message: " username or password incorrect" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.send(
          "for some reason we aren't allowing you to log out. What a shame"
        );
      } else {
        res.send("You have just gone and logged yourself out. Great job.");
      }
    });
  } else {
    res.end();
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id, //sub
    username: user.username,
  };

  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}
module.exports = router;
