const jwt = require("jsonwebtoken");
const secrets = require("../secrets/secrets");
module.exports = (req, res, next) => {
  // add code here to verify users are logged in
  // const tokenHeader = req.headers.authorization;
  // const parts = tokenHeader.split(" ");
  // const bearerTypeDirective = parts[0];
  // const token = parts[0]
  const [directive, token] = req.headers.authorization.split(" ");
  if (!directive || directive != "bearer") {
    res.status(401).json({ message: "git gud scrub" });
  }
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: `You sent us a bad token` });
      } else {
        req.decodedJwt = decodedToken;
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ message: `you dont have the token to access this` });
  }
};
