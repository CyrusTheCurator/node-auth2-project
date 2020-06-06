exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments("id");
    tbl.string("username").notNullable().unique();
    tbl.string("password").notNullable().unique();
    tbl.string("email").notNullable().unique();
    tbl.string("department").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
