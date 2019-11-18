

const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = "postgres://pdlvtzngmeodde:5a1642d2a7af307da055782d4a2126757e9994e0d641f190b869d969dcb5f7ed@ec2-107-21-98-89.compute-1.amazonaws.com:5432/d8vs05k7pj9cq4";
// const connectionString = "postgres://postgres:reader@localhost:5432/teamwork";
const db = pgp(connectionString);

module.exports = db;