module.exports = (role) => {
  return function (req, res, next) {
    if (req.decodedJwt.role && req.decodedJwt.role === role) {
      next();
    } else {
      res.status(403).json({
        message:
          "you do not have authorization for this... What are you, an ant? I would like you to come back when you have the appropriate credentials please",
      });
    }
  };
};
