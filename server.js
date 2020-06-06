const express = require("express");
const helmet = require("helmet");
const auth_router = require("./auth/auth-router");
const user_router = require("./users/user-router");
const session = require("express-session");
const knexSessionConnect = require("connect-session-knex")(session);

const sessionConfig = {
  name: "simps",
  secret: "secret times",
  cookie: {
    maxAge: 1000 * 60 * 60, // this is one hour
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
  //knex session time
  store: new knexSessionConnect({
    knex: require("./db-config"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60,
  }),
};

//PUT THIS IN THE MODEL IDIOTconst db = require("./users/user-model");

const cors = require("cors");

const server = express();
server.use(cors());
server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use("/api", auth_router);
server.use("/api/users", user_router);

server.get("/", (req, res) => {
  console.log("we in here,");

  res.status(200).json("you succeeded.");
});

module.exports = server;
