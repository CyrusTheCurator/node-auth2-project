const crypt = require("bcryptjs");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          username: "GoldfishAndTunaFTW",
          password: crypt.hashSync("quimble", 12),
          email: "blimpsarefake@aol.com",
          department: "Fish Inspectors",
        },
        {
          username: "radioMAN",
          password: crypt.hashSync("ineedtogooutside", 12),
          email: "lookupmyufoblog@sbcglobal.net",
          department: "Apocalypse Team",
        },
        {
          username: "MARGARETTR",
          password: crypt.hashSync("CHADMYGRANDSON", 12),
          email: "HELLO?",
          department: "Grandparent Squad",
        },
      ]);
    });
};
