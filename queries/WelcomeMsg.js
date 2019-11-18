// Configuration files

const db = require("../config");

// add query functions

// GET index Display Welcome Page
function welcomeMsg(req, res) {
 res.send("Welcome to Teamwork")
  }

// GET API Welcome Page
function welcomeAPIMsg(req, res) {
  res.send("Welcome to Teamwork API")
  }


    module.exports = {     
  welcomeMsg,
  welcomeAPIMsg
};

